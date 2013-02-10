var GraphRunner = (function(jQuery, d3) {
  /* Keep track of whether we're dragging or not, so we can
   * ignore mousover/mouseout events when a drag is in progress:*/
  var isNodeBeingDragged = false;
  window.addEventListener("mousedown", function(e) {
    if ($(e.target).closest("g.node").length)
      isNodeBeingDragged = true;
  }, true);
  window.addEventListener("mouseup", function(e) {
    isNodeBeingDragged = false;
  }, true);

  function Runner(options) {
    var trackers = options.trackers;
    var SVG_WIDTH = options.width;
    var SVG_HEIGHT = options.height;
    var hideFavicons = options.hideFavicons;
    var favicon = new Favicon();

    // Create the SVG element and populate it with some basic definitions
    // LONGTERM TODO: Since this is static markup, move it to index.html?
    var vis = d3.select("#chart")
      .append("svg:svg")
        .attr("width", SVG_WIDTH)
        .attr("height", SVG_HEIGHT);

    var defs = vis.append("svg:defs");
    defs.append("svg:marker")
        .attr("id", "Triangle")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 30)
        .attr("refY", 5)
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 4*2)
        .attr("markerHeight", 3*2)
        .attr("orient", "auto")
        .append("svg:path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z");

    var gradient = defs.append("svg:radialGradient")
      .attr("id", "glow-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("style", "stop-color:rgb(200, 240, 255);stop-opacity:1");

    gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("style", "stop-color:rgb(0,0,0);stop-opacity:0");

    vis.append("svg:g").attr("class", "links");
    vis.append("svg:g").attr("class", "nodes");

    // label goes on the top above the links and nodes
    vis.append("svg:path").attr("id", "domain-label");
    vis.append("svg:text").attr("id", "domain-label-text");

    /* Makes a would-be selector CSS safe. */
    function harden(selector) { return selector.replace('.', '-'); }

    /* Renders a site's favicon. */
    function setFavicon(className, name, attribute, url) {
      $('.' + className + '.' + harden(name)).attr(attribute, url);
    }

    function setDomainLink(target, d) {
      target.attr("href", "http://" + d.name);
      target.removeClass("tracker").removeClass("site");
      if (d.trackerInfo) {
        target.addClass("tracker");

        var domain = d.name;
        var whitelist = backgroundPage.whitelist;
        var blacklist = backgroundPage.blacklist;
        if (!trackingUnblocked && !whitelist[domain] || blacklist[domain])
          target.addClass("blocked");
      } else {
        target.addClass("site");
      }
    }

    function showDomainInfo(d) {
      var className = d.name.replace(/\./g, '-dot-');
      var info = $("#domain-infos").find("." + className);

      $("#domain-infos .info").hide();

      // TODO Why do we clone the div instead of just clearing the one and adding to it?
      // Oh, I see, we create a clone for each domain and then re-use it if it's already
      // created. An optimization?
      if (!info.length) {
        info = $("#templates .info").clone();
        info.addClass(className);
        info.find("a.domain").text(d.name);
        var img = $('<img>');
        if (d.trackerInfo)
          info.find("h2.domain").addClass("tracker");
        var attribute = "src";
        var faviconName = "favicon";
        img.attr(attribute, "../images/favicon.png")
           .addClass(faviconName + " " + harden(d.name));
        if (trackingUnblocked || !d.trackerInfo)
          favicon.get(d.host, function(url) {
            setFavicon(faviconName, d.name, attribute, url);
          });
        setDomainLink(info.find("a.domain"), d);
        info.find("h2.domain").prepend(img);
        img.error(function() { img.remove(); });
        $("#domain-infos").append(info);
      }
      else {
        var domain = d.name;
        var whitelist = backgroundPage.whitelist;
        var blacklist = backgroundPage.blacklist;
        if (trackingUnblocked && !blacklist[domain] || whitelist[domain])
          info.find("h2.domain:first > a.tracker.blocked").removeClass("blocked");
        else
          info.find("h2.domain:first > a.tracker").addClass("blocked");
      }

      // List referrers, if any (sites that set cookies read by this site)
      var referrers = info.find(".referrers");
      var domains = findReferringDomains(d);
      if (domains.length) {
        var list = referrers.find("ul");
        list.empty();
        domains.forEach(function(d) {
          var item = $('<li><a></a></li>');
          setDomainLink(item.find("a").text(d.name), d);
          list.append(item);
        });
        referrers.show();
      } else {
        referrers.hide();
      }

      // List referees, if any (sites that read cookies set by this site)
      var referrees = info.find(".referrees");
      domains = [];
      vis.selectAll("line.from-" + d.index).each(function(e) {
        domains.push(e.target);
      });
      if (domains.length) {
        var list = referrees.find("ul");
        list.empty();
        domains.forEach(function(d) {
          var item = $('<li><a></a></li>');
          setDomainLink(item.find("a").text(d.name), d);
          list.append(item);
        });
        referrees.show();
      } else {
        referrees.hide();
      }

      info.show();
    }

    function createNodes(nodes, force) {

      /* Represent each site as a node consisting of an svg group <g>
       * containing a <circle> and an <image>, where the image shows
       * the favicon; circle size shows number of links, color shows
       * type of site. */

      function getReferringLinkCount(d) {
        return selectReferringLinks(d)[0].length;
      }

      function radius(d) {
        var added = getReferringLinkCount(d) / 3;
        if (added > 7)
          added = 7;
        return 4 + added;
      }

      function selectArcs(d) {
        return vis.selectAll("line.to-" + d.index +
                             ",line.from-" + d.index);
      }

      function getClassForSite(d) {
        if (d.wasVisited) {
          return "visited";
        }
        if (d.trackerInfo) {
          return "tracker";
        } else {
          return "site";
        }
      }

      function showPopupLabel(d) {
        /* Show popup label to display domain name next to the circle.
         * The popup label is defined as a path so that it can be shaped not to overlap its circle
         * Cutout circle on left end, rounded right end, length dependent on length of text.
         * Get ready for some crazy math and string composition! */
        var r = 12; // radius of circles
        var pathStartX = d.x + r;
        var pathStartY = d.y - 4;
        var labelWidth = d.name.length * 7;
        var reverseWidth = 0 - labelWidth - r;
        d3.select("#domain-label").classed("hidden", false)
        .attr("d", "M " + pathStartX + " " + pathStartY + " l " + labelWidth + " 0 "
              + "a 8 8 0 0 1 0 16 l " + reverseWidth + " 0 a 12 12 0 0 0 12 -16")
        .attr("class", "round-border " + getClassForSite(d));
        d3.select("#domain-label-text").classed("hidden", false)
          .attr("x", d.x + 16)
          .attr("y", d.y + 7)
          .text(d.name);
        /* TODO label width and text offset determined by trial-and-error
         * and will not necessarily be correct with different font sizes.*/
      }

      function getConnectedDomains(d) {
        var connectedDomains = [d.name];
        findReferringDomains(d).forEach( function(e) {
          connectedDomains.push(e.name);
        });
        vis.selectAll("line.from-" + d.index).each(function(e) {
          connectedDomains.push(e.target.name);
        });

        return connectedDomains;
      }

      var node = vis.select("g.nodes").selectAll("g.node")
          .data(nodes);

      node.transition()
          .duration(1000)
          .attr("r", function(d) { return radius(d); });

      var whitelist = backgroundPage.whitelist;
      var blacklist = backgroundPage.blacklist;

      // For each node, create svg group <g> to hold circle, image, and title
      var gs = node.enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) {
            // <g> doesn't take x or y attributes but it can be positioned with a transformation
            return "translate(" + d.x + "," + d.y + ")";
          })
          .on("mouseover", function(d) {
            if (isNodeBeingDragged)
              return;
            /* Hide all lines except the ones going in or out of this node;
             * make those ones bold and show the triangles on the ends */
            vis.selectAll("line:not(.node)").classed("hidden", true);
            selectArcs(d).attr("marker-end", "url(#Triangle)")
                  .classed("hidden", false).classed("bold", true);
            showDomainInfo(d);
            if ($("#sidebar h1").is(":visible")) {
              $(".live-data").hide();
              $("#domain-infos, #show-instructions").show();
            }
            showPopupLabel(d);

            // Make directly-connected nodes opaque, the rest translucent:
            var subGraph = getConnectedDomains(d);
            d3.selectAll("g.node").classed("unrelated-domain", function(d) {
                return (subGraph.indexOf(d.name) == -1);
            });
          })
          .on("mouseout", function(d) {
            vis.selectAll("line:not(.node)").classed("hidden", false);
            selectArcs(d).attr("marker-end", null).classed("bold", false);
            d3.selectAll("g.node").classed("unrelated-domain", false);
            d3.select("#domain-label").classed("hidden", true);
            d3.select("#domain-label-text").classed("hidden", true);
          })
          .on("click", function(d) {
            if (d.trackerInfo) {
              var domain = d.name;
              var className = d.name.replace(/\./g, '-dot-');
              var header = $("#domain-infos ." + className + " h2.domain:first > a.tracker");
              var blocked =
                  !trackingUnblocked && !whitelist[domain] || blacklist[domain];
              if (blocked) {
                whitelist[domain] = true;
                delete blacklist[domain];
                header.removeClass("blocked");
              } else {
                delete whitelist[domain];
                blacklist[domain] = true;
                header.addClass("blocked");
              }
              localStorage.whitelist = JSON.stringify(whitelist);
              localStorage.blacklist = JSON.stringify(blacklist);
              d3.select(this).select("line").classed("hidden", blocked);
            }
          })
        .call(force.drag);


      // glow if site is visited
      gs.append("svg:circle")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", "18")
        .attr("class", "glow")
        .attr("fill", "url(#glow-gradient)")
        .classed("hidden", function(d) {
                return !d.wasVisited;
              });

      gs.append("svg:circle")
          .attr("cx", "0")
          .attr("cy", "0")
          .attr("r", 12) // was radius
          .attr("class", function(d) {
                return "node round-border " + getClassForSite(d);
                });

      if (!hideFavicons) {
        // If hiding favicons ("TED mode"), show initial letter of domain instead of favicon
        gs.append("svg:image")
          .attr("class", function(d) {
            var className = "node";
            if (trackingUnblocked || !d.trackerInfo)
              favicon.get(d.host, function(url) {
                setFavicon(className, d.name, "href", url);
              });
            return className + " " + harden(d.name);
          })
          .attr("width", "16")
          .attr("height", "16")
          .attr("x", "-8") // offset to make 16x16 favicon appear centered
          .attr("y", "-8")
          .attr("xlink:href", "../images/favicon.png");
      }

      // Ghostbustersification.
      gs.append("svg:line")
        .attr("x1", "-8")
        .attr("y1", "-8")
        .attr("x2", "8")
        .attr("y2", "8")
        .attr("class", function(d) {
          return "no node round-border " + getClassForSite(d);
        })
        .classed("hidden", function(d) {
          return (trackingUnblocked || d.wasVisited || !d.trackerInfo || whitelist[d.name]) && !blacklist[d.name];
        });

      return node;
    }

    function createLinks(links) {
      var link = vis.select("g.links").selectAll("line.link")
          .data(links)
        .enter().append("svg:line")
          .attr("class", function(d) { return "link from-" + d.source.index +
                                       " to-" + d.target.index; })
          .style("stroke-width", 1)
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      return link;
    }

    function draw(json) {
      var force = d3.layout.force()
          .charge(-250)
          .distance(120)
          .friction(0)
          .nodes(json.nodes)
          .links(json.links)
          .size([SVG_WIDTH, SVG_HEIGHT])
          .start();

      createLinks(json.links);
      createNodes(json.nodes, force);

      vis.style("opacity", 1e-6)
        .transition()
          .duration(1000)
          .style("opacity", 1);

      force.on("tick", function() {
         vis.selectAll("line.link").attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

         vis.selectAll("g.node").attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
         });
      });

      return {
        vis: vis,
        force: force
      };
    }

    function selectReferringLinks(d) {
      return vis.selectAll("line.to-" + d.index);
    }

    function findReferringDomains(d, list, domain) {
      if (!list) {
        list = [];
        domain = d.name;
      }

      selectReferringLinks(d).each(function(d) {
        if (list.indexOf(d.source) == -1 &&
            d.source.name != domain) {
          list.push(d.source);
          findReferringDomains(d.source, list, domain);
        }
      });

      return list;
    }

    function CollusionGraph(trackers) {
      var nodes = [];
      var links = [];
      var domainIds = {};

      function getNodeId(domain) {
        var name = domain.name;
        if (!(name in domainIds)) {
          domainIds[name] = nodes.length;
          var trackerInfo = null;
          for (var i = 0; i < trackers.length; i++)
            if (trackers[i].domain == name) {
              trackerInfo = trackers[i];
              break;
            }
          nodes.push({
            name: name,
            host: domain.host,
            trackerInfo: trackerInfo
          });
        }
        return domainIds[name];
      }

      function addLink(options) {
        var fromId = getNodeId(options.from);
        var toId = getNodeId(options.to);
        var link = vis.select("line.to-" + toId + ".from-" + fromId);
        if (!link[0][0])
          links.push({source: fromId, target: toId});
      }

      var drawing = draw({nodes: nodes, links: links});

      return {
        data: null,
        update: function(json) {
          query({currentWindow: true, active: true}, function(tabs) {
            this.data = json;
            drawing.force.stop();

            for (var name in json) {
              var domain = json[name];
              var referrers = domain.referrers;
              for (var referrerName in referrers)
                if (!sitesHidden || tabs[0].url.indexOf(referrerName) + 1)
                  addLink({
                    from: {name: referrerName, host: referrers[referrerName].host},
                    to: {name: name, host: domain.host}
                  });
            }
            for (var n = 0; n < nodes.length; n++) {
              if (json[nodes[n].name]) {
                nodes[n].wasVisited = json[nodes[n].name].visited;
              } else {
                nodes[n].wasVisited = false;
              }

              /* For nodes that don't already have a position, initialize them near the center.
               * This way the graph will start from center. If it already has a position, leave it.
               * Note that initializing them all exactly at center causes there to be zero distance,
               * which makes the repulsive force explode!! So add some random factor. */
              if (typeof nodes[n].x == "undefined") {
                nodes[n].x = nodes[n].px = SVG_WIDTH / 2 - 25 + Math.floor( Math.random() * 50 ) ;
                nodes[n].y = nodes[n].py = SVG_HEIGHT / 2 - 25 + Math.floor( Math.random() * 50 );
              }
            }

            drawing.force.nodes(nodes);
            drawing.force.links(links);
            drawing.force.start();
            createLinks(links);
            createNodes(nodes, drawing.force);
          });
        }
      };
    }

    var graph = CollusionGraph(trackers);

    var self = {
      graph: graph,
      width: SVG_WIDTH,
      height: SVG_HEIGHT
    };

    return self;
  }

  var GraphRunner = {
    Runner: Runner
  };

  return GraphRunner;
})(jQuery, d3);
