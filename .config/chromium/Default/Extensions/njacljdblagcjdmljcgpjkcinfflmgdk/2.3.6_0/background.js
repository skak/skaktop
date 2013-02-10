function openAllBookmarksInWindow(urls, isIncognito) {
    var urlsLength = urls.length;
    var fisrtUrl = urls[0];
    chrome.windows.create({ url: fisrtUrl, incognito: isIncognito }, function(window) {
        if (isIncognito && !window && urlsLength > 1) {
            alert("This function requires 'Allow Incognito' option to be enabled for this extension.");
            return;
        }
        for (var i = 1; i < urlsLength; i++) {
            var url = urls[i];
            chrome.tabs.create({ windowId: window.id, url: url, selected: false });
        }
    });
};
