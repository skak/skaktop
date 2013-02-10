document.addEventListener("DOMContentLoaded", function ()
{
    localizeDocument();
});

var _l = chrome.i18n.getMessage;
var $e = document.getElementById;

localizeAfterElement = function (el)
{
    var child = document.createTextNode(chrome.i18n.getMessage(el.getAttribute('_la')));
    el.appendChild(child);
    el.removeAttribute('_la');
}

localizeBeforeElement = function (el)
{
    var child = document.createTextNode(chrome.i18n.getMessage(el.getAttribute('_lb')));
    el.insertBefore(child, el.firstChild);
    el.removeAttribute('_lb');
}

localizeTitle = function (el)
{
    var title = el.getAttribute('_ltitle');
    var locMsg = chrome.i18n.getMessage(title);
    el.removeAttribute('_ltitle');
    el.writeAttribute("title", locMsg);
}

localizeDocument = function (el)
{
    el = (el ? el : document);
    el.querySelectorAll('[_la]').evalForEach(localizeAfterElement);
    el.querySelectorAll('[_lb]').evalForEach(localizeBeforeElement);
    el.querySelectorAll('[_ltitle]').evalForEach(localizeTitle);
}

NodeList.prototype.evalForEach = function (func)
{
    for (var idx = 0, len = this.length; idx < len; idx++)
    {
        var node = this[idx];
        func(node);
    }
}

function populateCombobox(comboBoxOrId, parentId)
{
    chrome.bookmarks.getTree(function (bookmarks)
    {
        if (parentId == null)
        {
            parentId = "1";
        }
        if (typeof comboBoxOrId == 'string')
            comboBoxOrId = document.getElementById(comboBoxOrId);
        comboBoxOrId.options.length = 0;
        populateComboboxImpl(comboBoxOrId, bookmarks, parentId, 0);
    });
}

function populateComboboxImpl(comboBox, bookmarks, parentId, level)
{
    if (bookmarks == null)
        return;
    var bmkNumber = bookmarks.length;
    for (var i = 0; i < bmkNumber; i++)
    {
        var bookmark = bookmarks[i];
        if (!bookmark.url)  // Is Folder
        {
            if (bookmark.parentId)
            {
                var item = document.createElement('option');
                var levelSpaces = "";
                if (level > 1)
                {
                    levelSpaces = levelSpaces + "\u251C";
                    for (j = 2; j < level; j++)
                    {
                        levelSpaces = levelSpaces + "\u253C";
                    }
                }
                item.text = levelSpaces + bookmark.title;
                item.value = bookmark.id;
                comboBox.add(item);
                if (bookmark.id == parentId)
                {
                    item.defaultSelected = true;
                    item.selected = true;
                }
            }
            populateComboboxImpl(comboBox, bookmark.children, parentId, level + 1);
        }
    }
}

function getStorageValue(valueId, defaultValue, saveDefaultIfUndefined)
{
    result = localStorage[valueId];
    if (!result || result == null)
    {
        // undefined or null - return default
        if (defaultValue != null && saveDefaultIfUndefined)
            localStorage[valueId] = defaultValue;
        return defaultValue;
    }
    return result;
}

function getStorageValueBool(valueId, defaultValue, saveDefaultIfUndefined)
{
    result = localStorage[valueId];
    if (!result || result == null)
    {
        // undefined or null - return default
        if (defaultValue != null && saveDefaultIfUndefined)
            localStorage[valueId] = defaultValue;
        return defaultValue == 'true';
    }
    return result == 'true';
}