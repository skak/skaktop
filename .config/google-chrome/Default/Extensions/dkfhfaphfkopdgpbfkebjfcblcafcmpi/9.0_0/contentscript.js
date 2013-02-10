/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /sandwich/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({page_url: document.URL}, function(response) {});
  
  
} else {
  // No match was found.
}


function onRequestGiveURL(request, sender, sendResponse) {
        // Show the page action for the tab that the sender (content script)
        // was on.
        //alert(request.page_url);
        //chrome.pageAction.show(sender.tab.id);
		alert('222');
        // Return nothing to let the connection be cleaned up.
        sendResponse({});
      };

      // Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequestGiveURL);