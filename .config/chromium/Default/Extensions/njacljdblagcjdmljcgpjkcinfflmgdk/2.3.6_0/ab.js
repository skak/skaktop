// AB Library Object creations
var AB = {};

// store the main tree node
AB.btree = null;

// Utilities
AB.util = {
    isJsURL: function (url)
    {
        return url.substr(0, 11) == 'javascript:';
    },

    onLinkClicked: function (e, href)
    {
        var open_in, bg_tabs;
        if (e.button == 0)
        {
            open_in = getStorageValue('open_in', "1");
            bg_tabs = getStorageValue('bg_tabs', "true");
        }
        else
        {
            open_in = getStorageValue('open_in_middle', "1");
            bg_tabs = getStorageValue('bg_tabs_middle', "true");
        }
        if (AB.util.isJsURL(href))
        {
            chrome.tabs.getSelected(null, function (tab) { chrome.tabs.executeScript(tab.id, { 'code': href.substr(11) }); });
        } else if (open_in == "1")
        {
            chrome.tabs.create({ url: href, selected: (bg_tabs == "false") });
            if (localStorage['keep_opened'] == "false")
                window.close();
        } else if (open_in == "2")
        {
            chrome.windows.create({ url: href });
            window.close();
        } else
        {
            chrome.tabs.getSelected(null, function (tab) { chrome.tabs.update(tab.id, { url: href }); });
            if (localStorage['keep_opened'] == "false")
                window.close();
        }
    }
};

// List Object
AB.list = Class.create({
    initialize: function (list_ul, title_ul, ext_box, resizer)
    {
        this.list_ul = list_ul;
        this.title_ul = title_ul;
        this.ext = ext_box;
        this.filter = '';
        this.node = 0;
        this.isRecentShown = false;

        // Resizer
        document.resizer = resizer;
        document.resizer.resizerDown = false;
        document.resizer.bodyWidth = 0;
        document.resizer.bodyHeight = 0;
        document.resizer.screenX = 0;
        document.resizer.screenY = 0;

        //if (localStorage.popupHeight) document.body.style.height = localStorage.popupHeight + 'px';
        if (localStorage["popupWidth"])
        {
            var popupWidth = localStorage["popupWidth"];

            // workaround for Chrome 9 width issue
            var rules = document.styleSheets[0].cssRules;
            var rule = rules[0];
            if (typeof popupWidth == "string")
                popupWidth = parseInt(popupWidth);
            rule.style.width = (4 + popupWidth) + 'px';

            document.body.style.width = popupWidth + 'px';
        }

        resizer.addEventListener('mousedown', function (e)
        {
            e.preventDefault();
            e.stopPropagation();
            document.resizer.resizerDown = true;
            document.resizer.bodyWidth = document.body.offsetWidth;
            document.resizer.bodyHeight = document.body.offsetHeight;
            document.resizer.screenX = e.screenX;
            document.resizer.screenY = e.screenY;
        });

        document.addEventListener('mousemove', function (e)
        {
            if (!document.resizer.resizerDown) return;
            e.preventDefault();
            var width = document.resizer.bodyWidth - (e.screenX - document.resizer.screenX);
            if (width < 280)
            {
                width = 280;
            } else if (width > 640)
            {
                width = 640;
            }
            document.body.style.width = width + 'px';
            localStorage.popupWidth = width;

            // workaround for Chrome 9 width issue
            var rules = document.styleSheets[0].cssRules;
            var rule = rules[0];
            rule.style.width = (4 + width) + 'px';

            //            var height = document.resizer.bodyHeight + (e.screenY - document.resizer.screenY);
            //            if (height < 552) {
            //                height = 552;
            //            } else if (height > 600) {
            //                height = 600;
            //            }
            //document.body.style.height = height + 'px';
            //localStorage.popupHeight = height;
        });
        document.addEventListener('mouseup', function (e)
        {
            if (!document.resizer.resizerDown) return;
            e.preventDefault();
            document.resizer.resizerDown = false;
        });
    },

    clearData: function ()
    {
        this.list_ul.innerHTML = '';
        this.title_ul.innerHTML = '';
    },

    populate: function (tree_node)
    {
        this.isRecentShown = false;
        if (tree_node)
        {
            this.node = tree_node;
        }
        if (this.node == 0 || !this.node)
        {
            this.node = 1;
        }

        var oThis = this;
        chrome.bookmarks.getChildren(String(this.node), function (tree)
        {
            oThis.clearData();

            if (oThis.node == "1" && oThis.filter == '')
            { // insert top level links if its the main folder and no filter
                chrome.bookmarks.getChildren("0", function (children)
                {
                    children.each(function (lnk)
                    {
                        if (lnk.id != 1)
                        {
                            var row = oThis._create_folder(lnk);
                            this.list_ul.insert({ top: row });
                        }
                    }, oThis);
                });
            }
            oThis._build_tree(tree);
        });
    },

    populate_recent: function ()
    {
        if (this.isRecentShown)
        {
            this.populate(0);
        }
        else
        {
            this.isRecentShown = true;
            this.filter = '';
            this.clearData();
            var row = this._create_recent_folder({ id: "0", title: _l("recentBookmarks") }, true);
            this.title_ul.insert({ top: row });
            // Insert recent bookmarks
            oThis = this;
            chrome.bookmarks.getRecent(parseInt(localStorage['recent_num']), function (children)
            {
                children.each(function (lnk)
                {
                    if (lnk.id != 1)
                    {
                        var row = oThis._add_item(lnk);
                    }
                }, oThis);
            });
        }
    },

    search: function (new_filter)
    {
        this.filter = new_filter;
        this.populate();
    },

    _build_tree: function (tree)
    {
        var oThis;
        if (this.filter == '')
        {
            oThis = this;
            if (tree[0])
                chrome.bookmarks.get(tree[0].parentId, function (lnk) { oThis._build_title(lnk); });
            else
                chrome.bookmarks.get(this.node, function (lnk) { oThis._build_title(lnk); });
        } else
        {
            oThis = this;
            chrome.bookmarks.getChildren("0", function (children)
            {
                children.each(function (lnk)
                {
                    if (lnk.id != 1)
                    {
                        oThis._add_item(lnk);
                    }
                }, oThis);
            });
            //chrome.bookmarks.get(tree[0].parentId, function(lnk){ oThis._add_item(lnk[0]); });
        }
        tree.each(this._add_item, this);
    },

    _build_title: function (tree)
    {
        // do things here
        var row;
        if (tree[0].id != "0")
        {
            row = this._create_folder(tree[0], true);
            this.title_ul.insert({ top: row });
            var oThis = this;
            chrome.bookmarks.get(tree[0].parentId, function (lnk) { oThis._build_title(lnk); });
        } else
        {
            row = this._create_folder({ id: "0", title: "\\" }, true);
            this.title_ul.insert({ top: row });
        }
    },

    _add_item: function (lnk)
    {
        var row;
        // URLs
        if (lnk.url)
        {
            if (this.filter != '' && !(lnk.url.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || lnk.title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0))
            {
                return;
            }
            row = this._create_node(lnk);

            this.list_ul.insert(row);
        } else
        {
            if (this.filter != '')
            {
                // filter folder name
                if (lnk.title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
                {
                    row = this._create_folder(lnk);
                    this.list_ul.insert(row);
                }
                // filtering
                var oThis = this;
                var childs = chrome.bookmarks.getChildren(lnk.id, function (childs) { childs.each(oThis._add_item, oThis); });
            } else
            {
                // building a tree
                row = this._create_folder(lnk);
                this.list_ul.insert(row);
            }
        }
    },

    _create_recent_folder: function (fldr)
    {
        var icon = new Element('img', { style: "height:16px; width:16px;", src: "img/calendar-star.png" });

        var link = new Element('a', { style: "cursor: pointer;" }).insert(icon).insert(" " + fldr.title);
        link.alt = fldr.id;
        link.observe('click', function (e)
        {
            e.stop();
            disp_list.filter = '';
            disp_list.populate(this.alt);
            // todo: scroll list back up
        });

        var row = new Element('li').insert(link);

        return row;
    },

    _create_folder: function (fldr, show_open)
    {
        var icon = new Element('img', { style: "height:16px; width:16px;" });
        if (show_open)
        {
            icon.src = 'img/folder_open.png';
        } else
        {
            icon.src = 'img/folder.png';
        }

        var link = new Element('a', { style: "cursor: pointer; font-weight:bold" }).insert(icon).insert(" " + fldr.title);
        link.alt = fldr.id;
        link.observe('click', function (e)
        {
            e.stop();
            disp_list.filter = '';
            disp_list.populate(this.alt);
            // todo: scroll list back up
        });

        var showExtInfoBottom = getStorageValueBool('ext', true);
        var showExtInfoTooltip = getStorageValueBool('ext_tooltips', true);

        if (showExtInfoBottom || showExtInfoTooltip)
        {
            // show extended info on link when hovering
            link.observe("mouseover", function (e)
            {
                chrome.bookmarks.get(this.alt, function (lnk)
                {
                    lnk = lnk[0];

                    disp_list._getFolderPath(lnk.id, "", true, function (res)
                    {
                        if (showExtInfoBottom)
                        {
                            disp_list.ext.innerHTML = "";
                            // link info
                            var icon = new Element('img', { style: "height:16px; width:16px;" });
                            var bmk_date = new Date(lnk.dateAdded);
                            icon.src = 'img/folder.png';
                            var title = new Element('div', { className: 'title' }).insert(icon).insert(" " + lnk.title);
                            var type = new Element('div', { className: 'type' }).insert(_l("type") + ": " + _l("folder"));
                            var url = new Element('div', { className: 'url' }).insert(res.folderPath);
                            var added = new Element('div', { className: 'added' }).insert(_l("added") + ": " + bmk_date.toLocaleDateString() + " " + bmk_date.toLocaleTimeString());

                            // show in the ext
                            disp_list.ext.insert(title).insert(type).insert(url).insert(added);
                        }
                        if (showExtInfoTooltip)
                        {
                            // Show tooltip
                            disp_list.list_ul.title = res.folderPath;
                        }
                    });
                });
            });
        };

        var row = new Element('li').insert(link);

        return row;
    },

    _getFolderPath: function (id, currentPath, includeCurrent, callback)
    {
        if (!id || id <= 1)
        {
            callback({ folderPath: currentPath });
            return;
        }
        var oThis = this;
        chrome.bookmarks.get(id, function (result)
        {
            parentId = result[0].parentId;
            if (includeCurrent)
            {
                var title = result[0].title;
                var fullTitle = currentPath ? title + "/" + currentPath : title;
            }
            else
                var fullTitle = "";
            oThis._getFolderPath(parentId, fullTitle, true, callback);
        });
    },

    _create_node: function (lnk)
    {
        // Icon
        var icon = new Element('img', { style: "height:16px; width:16px;" });
        if (AB.util.isJsURL(lnk.url))
        {
            icon.src = 'img/script.png';
        } else
        {
            icon.src = 'chrome://favicon/' + lnk.url;
        }


        // Link
        var link = new Element('a').insert(icon).insert(" " + lnk.title);
        link.href = lnk.url;
        link.alt = lnk.id;
        link.observe('mouseup', function (e)
        {
            if (e.button == 2)  // Right-button clicked
                return;
            e.stop();
            AB.util.onLinkClicked(e, this.href);
        });

        var showExtInfoBottom = getStorageValueBool('ext', true);
        var showExtInfoTooltip = getStorageValueBool('ext_tooltips', true);

        if (showExtInfoBottom || showExtInfoTooltip)
        {
            // show extended info on link when hovering
            link.observe("mouseover", function (e)
            {
                chrome.bookmarks.get(this.alt, function (lnk)
                {
                    lnk = lnk[0];

                    disp_list._getFolderPath(lnk.id, "", false, function (res)
                    {
                        if (showExtInfoBottom)
                        {
                            disp_list.ext.innerHTML = "";

                            // link info
                            var icon = new Element('img', { style: "height:16px; width:16px;" });
                            var bmk_date = new Date(lnk.dateAdded);
                            var today = new Date();
                            //var diff = Math.round((today.getTime() - bmk_date.getTime()) / 86400000); // Diff in days
                            if (!lnk.url)
                            {
                            } else if (AB.util.isJsURL(lnk.url))
                            {
                                icon.src = 'img/script.png';
                                var title = new Element('div', { className: 'title' }).insert(icon).insert(" " + lnk.title);
                                var type = new Element('div', { className: 'type' }).insert(_l("type") + ": " + _l("scriplet"));
                                var url = new Element('div', { className: 'url' }).insert(lnk.url);
                                var added = new Element('div', { className: 'added' }).insert(_l("added") + ": " + bmk_date.toLocaleDateString() + " " + bmk_date.toLocaleTimeString());
                            } else
                            {
                                icon.src = 'chrome://favicon/' + lnk.url;
                                var title = new Element('div', { className: 'title' }).insert(icon).insert(" " + lnk.title);
                                var type = new Element('div', { className: 'type' }).insert(_l("type") + ": " + _l("bookmark"));
                                var url = new Element('div', { className: 'url' }).insert(lnk.url);
                                var added = new Element('div', { className: 'added' }).insert(_l("added") + ": " + bmk_date.toLocaleDateString() + " " + bmk_date.toLocaleTimeString());
                            }

                            // show in the ext
                            disp_list.ext.insert(title).insert(type).insert(url).insert(added);
                        }
                        if (showExtInfoTooltip)
                        {
                            // Show tooltip
                            if (res.folderPath)
                                disp_list.list_ul.title = lnk.title + "\n-----------------\n" + res.folderPath + "\n-----------------\n" + lnk.url;
                            else
                                disp_list.list_ul.title = lnk.title + "\n-----------------\n" + lnk.url;
                        }
                    });
                });
            });
        }

        // row
        var row = new Element('li').insert(link);

        return row;
    }
});