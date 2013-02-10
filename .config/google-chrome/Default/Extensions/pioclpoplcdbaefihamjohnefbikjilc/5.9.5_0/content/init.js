var contentPreview;
var pageInfo;
var clipper;

function init() {
  "use strict";

  var domReady = false;
  var msgReady = false;

  function togglePDFClipContextMenuOption() {
    var isPdf = false;
    var embed = document.querySelector("embed");
    if (embed) {
      if (/application\/pdf/i.test(embed.type)) {
        isPdf = true;
      }
    }
    Browser.sendToExtension({ name: "togglePDFContextMenuOption", show: isPdf });
  }

  function start() {
    if (!SAFARI) {
      togglePDFClipContextMenuOption();
    }
    pageInfo = new PageInfo();
    contentPreview = new ContentPreview();
    clipper = new Clipper();
    checkSimSearch();
  }

  if (SAFARI) {
    // Don't call this from frames.
    if (window && window != window.parent) return;
    Browser.sendToExtension({name: "main_getL10n"});
  }
  else {
    msgReady = true;
    go();
  }

  Browser.addMessageHandlers({
    l10nData: msgHandlerL10n
  });

  if (document.readyState == "complete") {
    domReady = true;
    go();
  }
  else {
    // on some pages only document.onreadystatechange will fire, so attach listeners to both.
    var loadedDomHandler = function() {
      if (!domReady) {
        domReady = true;
        go();
      }
    };

    window.addEventListener("DOMContentLoaded", loadedDomHandler);
    document.onreadystatechange = function() {
      if (document.readyState == "complete") {
        loadedDomHandler();
      }
    };

    // since Chrome doesn't have PDF has one of the contexts in its API, we
    // have to use this hack to make sure that the PDF clipping option only
    // shows up on PDF pages but not on non-PDF pages
    window.addEventListener("focus", function() {
      togglePDFClipContextMenuOption();
    });
  }

  function msgHandlerL10n(request, sender, sendResponse) {
    if (request.data) {
      Browser.i18n._setL10nData(request.data);
    }
    msgReady = true;
    go();
  }

  function go() {
    if (msgReady && domReady) {
      start();
    }
  }
}

Browser.runIfInTopFrame(init);
