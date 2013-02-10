var lastTargetNode = null;

function menu(evt)
{
    evt = evt || window.event;
    evt.cancelBubble = true;
    // var bookmarks = document.getElementById("results");
    // bookmarks.setOpacity(0.5);

    var contextMenu = document.getElementById("contextMenuId");

    var targetNode = evt.target; // srcElement;
    lastTargetNode = targetNode;
    var nodeId = targetNode.alt;
    var url = targetNode.href;
    var isFolder = (url == "");
    var text = targetNode.innerText.substring(1);

    var html = "<ul>";
    var isPanel = targetNode.id == "results";
    if (isFolder || isPanel)
    {
        if (isPanel)
            nodeId = disp_list.node;
        html += "<li><a href='#' onclick=\"saveTabToFolder('"
				+ nodeId
				+ "')\"><img src='img/star-add.png'><span _la='addBookmarkHere'> </span></a></li>";
        html += "<li><a href='#' onclick=\"saveSessionToFolder('"
				+ nodeId
				+ "')\"><img src='img/notebook-add.png'><span _la='saveSessionHere'> </span></a></li>";
        html += "<li class='separator'></li>";
        html += "<li><a href='#' onclick=\"openAllBookmarks('"
				+ nodeId
				+ "', false, false)\"><img src='img/open.png'><span _la='openAllBookmarks'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openAllBookmarks('"
				+ nodeId
				+ "', true, false)\"><img src='img/open.png'><span _la='openAllInNewWindow'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openAllBookmarks('"
				+ nodeId
				+ "', true, true)\"><img src='img/open.png'><span _la='openFolderInIncognitoWindow'> </span></a></li>";
        html += "<li class='separator'></li>";
        html += "<li><a href='#' onclick=\"createNewFolder('"
				+ nodeId
				+ "')\"><img src='img/folder-new.png'><span _la='createNewFolder'> </span></a></li>";
        if (isPanel)
        {
            // Bookmarks panel
            lastTargetNode = null;
        } else
        {
            html += "<li><a href='#' onclick=\"editFolder('"
					+ nodeId
					+ "')\"><img src='img/edit.png'><span _la='editFolder'> </span></a></li>";
            html += "<li><a href='#' onclick=\"removeFolder('"
					+ nodeId
					+ "', '"
					+ text
					+ "')\"><img src='img/folder_closed-delete.png'><span _la='deleteFolder'> </span></a></li>";
            targetNode.style.outline = '2px groove #ffcc00';
        }
    } else
    {
        html += "<li><a href='#' onclick=\"openInTab('"
				+ nodeId
				+ "', true, false)\"><img src='img/open.png'><span _la='openBmInBackgroundTab'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openInTab('"
				+ nodeId
				+ "', true, true)\"><img src='img/open.png'><span _la='openBmInForegroundTab'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openInTab('"
				+ nodeId
				+ "', false, false)\"><img src='img/open.png'><span _la='openBmInCurrentTab'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openInWindow('"
				+ nodeId
				+ "', false)\"><img src='img/open.png'><span _la='openBmInNewWindow'> </span></a></li>";
        html += "<li><a href='#' onclick=\"openInWindow('"
				+ nodeId
				+ "', true)\"><img src='img/open.png'><span _la='openBmInIncognitoWindow'> </span></a></li>";
        html += "<li class='separator'></li>";
        html += "<li><a href='#' onclick=\"editBookmark('"
					+ nodeId
					+ "')\"><img src='img/edit.png'><span _la='editBookmark'> </span></a></li>";
        html += "<li><a href='#' onclick=\"removeBookmark('"
				+ nodeId
				+ "')\"><img src='img/star-delete.png'><span _la='deleteBookmark'> </span></a></li>";
        targetNode.style.outline = '2px groove #ffcc00';
    }
    html += "</ul>";
    contextMenu.innerHTML = html;
    localizeDocument(contextMenu);
    var position = defPosition(evt);
    var menuX = position.x;
    var menuY = position.y - 10;
    var menuHeight = contextMenu.getHeight();
    var menuWidth = contextMenu.getWidth();
    if (menuX + menuWidth > window.innerWidth)
        menuX = window.innerWidth - menuWidth;
    if (menuY + menuHeight > window.innerHeight)
        menuY = window.innerHeight - menuHeight;
    contextMenu.style.top = menuY + "px";
    contextMenu.style.left = menuX + "px";
    contextMenu.style.display = "";
    return false;
}

function editBookmark(nodeId)
{
    chrome.bookmarks.get(nodeId, function (bmks)
    {
        var bmk = bmks[0];
        title = bmk.title;
        url = bmk.url;
        var inputName = document.getElementById('edit-bookmarks-name');
        var inputURL = document.getElementById('edit-bookmarks-url');
        var folderSelector = document.getElementById('edit-bookmarks-folder');
        populateCombobox(folderSelector, bmk.parentId);
        inputName.value = title;
        inputURL.value = url;
        var $dialog = $j('#edit-bookmarks')
			.dialog({
			    title: _l('editBookmark'),
			    modal: true,
			    //show: "puff",
			    hide: "explode",
			    buttons: { "Ok": function () { $j(this).dialog("close"); onBookmarkEdited(nodeId, inputName.value, inputURL.value, folderSelector.value); },
			        "Cancel": function () { $j(this).dialog("close"); }
			    }
			});
    });
}

//function onEditBookmarksOpened(event, ui)
//{
//    var ebm = document.getElementById('edit-bookmarks-name');
//    ebm.select();
//}

function onBookmarkEdited(nodeId, newTitle, newUrl, newParentId)
{
    chrome.bookmarks.update(nodeId, { title: newTitle, url: newUrl }, function (bmk)
    {
        if (!newParentId || bmk.parentId == newParentId || bmk.id == newParentId)
        {
            disp_list.populate();
        }
        else
        {
            // Folder changed - move bookmark
            chrome.bookmarks.move(nodeId, { parentId: newParentId }, function (bmk)
            {
                disp_list.populate();
            });
        }
    });
}

function editFolder(nodeId)
{
    chrome.bookmarks.get(nodeId, function (bmk)
    {
        title = bmk[0].title;
        var inputName = document.getElementById('edit-folder-name');
        inputName.value = title;
        var folderSelector = document.getElementById('edit-folder-folder');
        populateCombobox(folderSelector, bmk[0].parentId);
        var $dialog = $j('#edit-folder');
        $dialog.dialog({
            title: _l('editFolder'),
            modal: true,
            //show: "puff",
            hide: "explode",
            height: 150,
            buttons: { "Ok": function () { $j(this).dialog("close"); onBookmarkEdited(nodeId, inputName.value, "", folderSelector.value); },
                "Cancel": function () { $j(this).dialog("close"); }
            }
        });
    });
}

function createNewFolder(nodeId)
{
    var inputName = document.getElementById('create-folder-name');
    inputName.value = _l("newFolder");
    var $dialog = $j('#create-folder')
			.dialog({
			    title: _l('createNewFolder'),
			    modal: true,
			    //show: "puff",
			    hide: "explode",
			    height: 120,
			    buttons: { "Ok": function () { $j(this).dialog("close"); onCreateNewFolder(nodeId, inputName.value); },
			        "Cancel": function () { $j(this).dialog("close"); }
			    }
			});
}

function onCreateNewFolder(folderId, newTitle)
{
    if (folderId == "undefined")
        folderId = "1";

    chrome.bookmarks.create({
        parentId: folderId,
        title: newTitle,
        url: ""
    }, function (bmk) { disp_list.populate(); });
}

function hideMenu()
{
    document.getElementById("contextMenuId").style.display = "none";
    if (lastTargetNode)
    {
        lastTargetNode.style.outline = 'none';
    }
}

function defPosition(event)
{
    var x = event.clientX + window.scrollX;
    var y = event.clientY + window.scrollY;
    return {
        x: x,
        y: y
    };
}

function openInTab(nodeId, isNew, select)
{
    chrome.bookmarks.get(nodeId, function (bmk)
    {
        newUrl = bmk[0].url;
        if (isNew)
            chrome.tabs.create({
                url: newUrl,
                selected: select
            });
        else
        {
            chrome.tabs.getSelected(null, function (tab)
            {
                chrome.tabs.update(tab.id, {
                    url: newUrl,
                    selected: select
                });
            });
        }
    });
}

function openInWindow(nodeId, isIncognito)
{
    chrome.bookmarks.get(nodeId, function (bmk)
    {
        newUrl = bmk[0].url;
        chrome.windows.create({
            url: newUrl,
            incognito: isIncognito
        });
    });
}

function openAllBookmarks(nodeId, inWindow, isIncognito)
{
    var urls = new Array();
    chrome.bookmarks.getChildren(nodeId, function (bookmarks)
    {
        for (var i = 0; i < bookmarks.length; i++)
        {
            var url = bookmarks[i].url;
            if (url) // Do not open emty urls (folders)
                urls.push(url);
        }
        var urlsLength = urls.length;
        if (urlsLength == 0)
            return;
        if (inWindow)
        {
            var backgrondPage = chrome.extension.getBackgroundPage();
            backgrondPage.openAllBookmarksInWindow(urls, isIncognito);
        } else
        {
            for (var j = 0; j < urlsLength; j++)
            {
                url = urls[j];
                chrome.tabs.create({
                    url: url,
                    selected: false
                });
            }
        }
    });
}

function removeBookmark(nodeId)
{
    chrome.bookmarks.remove(nodeId);
    disp_list.populate();
}

function removeFolder(nodeId, folderName)
{
    var $dialog = $j('<div></div>')
    .html(_l("folder") + " '" + folderName
			+ "' " + _l("confirmDeleteFolder"))
			.dialog({
			    title: _l('deleteFolder'),
			    modal: true,
			    //show: "puff",
			    hide: "explode",
			    height: 120,
			    buttons: { "Ok": function ()
			    {
			        $j(this).dialog("close");
			        chrome.bookmarks.removeTree(nodeId);
			        disp_list.populate();
			    },
			        "Cancel": function () { $j(this).dialog("close"); }
			    }
			});

    return;
    if (confirm(_l("folder") + " '" + folderName
			+ "' " + _l("confirmDeleteFolder")) == true)
    {
        chrome.bookmarks.removeTree(nodeId);
        disp_list.populate();
    }
}

function saveTab()
{
    saveTabToFolder(localStorage['bookmarks_folder']);
}

function saveTabToFolder(folderId)
{
    chrome.tabs.getSelected(null, function (currentTab)
    {
        var tabTitle = currentTab.title;
        var tabUrl = currentTab.url;
        chrome.bookmarks.create({
            parentId: folderId,
            title: tabTitle,
            url: tabUrl
        });
        disp_list.populate();
    });
}

function addHandler(object, event, handler, useCapture)
{
    if (object.addEventListener)
    {
        object
				.addEventListener(event, handler, useCapture ? useCapture
						: false);
    } else if (object.attachEvent)
    {
        object.attachEvent('on' + event, handler);
    } else
        alert("Add handler is not supported");
}

addHandler(document, "mouseup", function ()
{
    hideMenu();
});
addHandler(document, "contextmenu", function ()
{
    hideMenu();
});
addHandler(document, "click", function ()
{
    hideMenu();
});

var disp_list = null;
var last_search = "";
var last_search_time = 0;

function run_search(time)
{
    if (time == last_search_time)
    {
        disp_list.search(last_search);
    }
};

var search_key = function ()
{
    if ($F('search_box') != last_search)
    {
        last_search = $F('search_box');

        $('bookmarks').innerHTML = '<li>Filtering <br/> <img src="img/loading.gif" /></li>';

        var dt = new Date();
        last_search_time = dt.getTime();
        setTimeout("run_search(" + last_search_time + ")", 400);
    }
};

function getTwoDigits(val)
{
    var str = val.toString();
    if (str.toString().length < 2)
        return ("0" + str);
    return str;
}

function lockStartupFolder()
{
    var currentStartupFolder = getStorageValue("startup_folder", "1");
    if (currentStartupFolder != "1" && currentStartupFolder != "0")
    {
        // Was locked - just unlock
        localStorage["startup_folder"] = "1";
        $("lock").src = "img/startup_folder_unlocked.png";
    }
    else
    {
        // Lock it
        var currentFolder = disp_list.node;
        localStorage["startup_folder"] = currentFolder;
        $("lock").src = "img/startup_folder_locked.png";
    }
}

function saveSession()
{
    saveSessionToFolder(localStorage['sessions_folder']);
}

function saveSessionToFolder(folderId)
{
    var d = new Date();
    var sessionFolderName = d.getFullYear() + '-'
			+ getTwoDigits(d.getMonth() + 1) + '-' + getTwoDigits(d.getDate())
			+ ' ' + getTwoDigits(d.getHours()) + ':'
			+ getTwoDigits(d.getMinutes()) + ':' + getTwoDigits(d.getSeconds());
    // chrome.windows.getAll(null, function(windows) {
    // if (windows.length > 1) {
    // chrome.windows.getCurrent(function(window) {
    // sessionName += " [" + window.id + "]";
    // });
    // }
    // });

    var sessionFolderId = folderId;
    chrome.tabs.getAllInWindow(null, function (tabs)
    {
        var tabsNum = tabs.length;
        sessionFolderName += " [" + tabsNum + "]";
        // Create folder for the session
        chrome.bookmarks.create({
            parentId: sessionFolderId,
            title: sessionFolderName
        }, function (result)
        {
            sessionFolderId = result.id;
            for (var i = 0; i < tabsNum; i++)
            {
                var tab = tabs[i];
                var tabTitle = tab.title;
                var tabUrl = tab.url;
                chrome.bookmarks.create({
                    parentId: sessionFolderId,
                    title: tabTitle,
                    url: tabUrl
                });
            }
            disp_list.populate();
        });
    });
}