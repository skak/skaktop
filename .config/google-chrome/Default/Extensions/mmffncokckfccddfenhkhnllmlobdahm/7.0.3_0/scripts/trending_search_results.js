//Copyright: 2009 Yongqian Li

(function()
{
    return;

    //var $ = smarterwiki_$;
    var confirm_disable = window.confirm_disable || "Are you sure you want to disable this?\n\nTo re-enable, go to Tools -> FastestFox";
    var disable_str = window.disable_label || "disable";

    var safe_SW_getBoolPref = function(name)
    {
        try
        {
            return SW_getBoolPref(name);
        }
        catch(err)
        {
            return null;
        }
    };
    
    var setBoolPref = function(pref_name, value, callback)
    {
        SW_setBoolPref("extensions.smarterwiki." + pref_name, value);
        if(callback)
        {
            callback(value);
        }
    };

    var getBoolPref = function(pref_name, callback)
    {
        if(callback)
        {
            callback(safe_SW_getBoolPref("extensions.smarterwiki." + pref_name));
        }
    };
    if(window.chrome && window.chrome.extension) // detect chrome
    {
        var get_localStorage = function(key, callback) //only used for Chrome
        {    
            chrome.extension.sendMessage({"msg_type": "get_localStorage", "key": key}, function(response)
            {
                if(callback)
                {
                    callback(response.value);
                }
            });
        };
        var set_localStorage = function(key, value, callback) //only used for Chrome
        {    
            chrome.extension.sendMessage({"msg_type": "set_localStorage", "key": key, "value": value}, function(response)
            {
                if(callback)
                {
                    callback(response.status);
                }
            });
        };

        setBoolPref = function(pref_name, value, callback)
        {
            set_localStorage("pref." + pref_name, value, callback);
        };

        getBoolPref = function(pref_name, callback)
        {
            get_localStorage("pref." + pref_name, function(str)
            {
                if(callback) {
                    callback(str == "true");
                }
            });
        };
        
        SW_$ = $;
        SW_LOG = function(){};
        $.get = function(url, data, callback, type)
        {
            chrome.extension.sendMessage({"msg_type": "$.get", "url": url, "data": data, "type": type}, function(response)
            {
                if(callback)
                {
                    callback(response.data, response.textStatus);
                }
            });            
        };
    }
    else
    {
        SW_$ = {};
        SW_$.get = SW_$get;
    }
    
    
    var get_log_msg_url = function(msg)
    {
        msg["rand"] = parseInt(Math.random() * 1000000000);
        var params = [];
        for(var k in msg)
        {
            params.push(encodeURIComponent(k) + "=" + encodeURIComponent(msg[k]));
        }
        /*
        if("https:" == document.location.protocol)
        {
            return "https://ssl.msgs.smarterfox.com/log_msg?" + params.join("&");
        }
        */
        return "http://m.smarterfox.com/ping?" + params.join("&");
    };
    

    var log_msg_async = function(msg, callback)
    {
        return ping_url_async(get_log_msg_url(msg), callback);
    };

    var ping_url_async = function(url, callback)
    {
        var $ting = $('<img style="display: none;" />');
        if(callback)
        {
            $ting.load(callback);
        }
        $ting.attr("src", url);
        return $ting;
    };

    var track_click = function($a, msg)
    {
        $a.mouseup(function(event)
        {
            var original_href = $a.attr("href");
            msg["redirect_to"] = original_href;
            $a.attr("href", get_log_msg_url(msg));

            setTimeout(function()
            {
                $a.attr("href", original_href);
            }, 10);
        });
    };        
    
    var truncate_string = function(s, len)
    {
        if(s.length > len)
        {
            return s.substring(0, len) + "...";
        }
        return s;
    };

    var getSearchResultsURL = function(url, terms)
    {
        var language = navigator.language ? navigator.language : navigator.userLanguage;
        var url = url.replace(/{searchTerms}/g, encodeURIComponent(terms));
        url = url.replace(/{language}/g, language);
        return url;
    };

    var searchOneRiotURL = "http://www.oneriot.com/search?p=smarterfox&ssrc=smarterfox_popup_bubble&spid=8493c8f1-0b5b-4116-99fd-f0bcb0a3b602&q={searchTerms}";
    
    var doc = window.document;
    
    var add_tracking = function(doc)
    {
        var oneriotURLRegExp = new RegExp("http://display.oneriot.com/ad.php\\?appId=fastestfox01.*");
        var match = oneriotURLRegExp.exec(doc.location.href);
        if(match)
        {
            $("a").each(function()
            {
                track_click($(this), {
                    "name": "trending_search_result_clicked", 
                    "source": "Google Search", 
                    "type": "OneRiot", 
                    "ver": "IAB_300x250_2",
                    "action": "searched"});
            });
            log_msg_async({
                "name": "trending_search_result_ping", 
                "source": "Google Search", 
                "type": "OneRiot", 
                "ver": "IAB_300x250_2"});
        }
    };
    add_tracking(doc);
}());