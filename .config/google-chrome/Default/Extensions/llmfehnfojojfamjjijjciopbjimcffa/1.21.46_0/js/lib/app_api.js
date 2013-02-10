var AppApi=function(){};AppApi.prototype={_dom:{},_removedCookies:{},_cookies:{},init:function(a){crLogger.trace("AppAPI.init : start");this.db=new DBManager(TableNames.USER_COOKIES);this.db.async=new AsyncDBManager(TableNames.DB_ASYNC);this.internal={};this.internal.db=DBManager(TableNames.INTERNAL_DB);this.internal.db.async=AsyncDBManager(TableNames.INTERNAL_DB_ASYNC);this.db._self=this;this.internal.db._self=this;this.__should_activate_validation__=true;this.cookie=new Cookie(this);this.tabID=a.tabID;this.manifest=a.manifest;this.appID=this.manifest.crossrider.appID;this.cr_version=this.manifest.version;this.version=this.manifest.ver;this.platform=this.manifest.platform;this.debugMode=this.manifest.crossrider.debug;this._cookies=a._cookies;this.message=new Message(this);this.message.setTabId(a.tabID);this._initInternalMessaging();this.isBackground=false;this.db.init(this);this.db.async.init(this);this.internal.db.init(this);this.internal.db.async.init(this);this.asyncAPI=AsyncAPI.init(this);this._getUserScripts();for(var b in TableNames){if(b.toLowerCase().indexOf("length")<0){this._removedCookies[TableNames[b]]={};}}crLogger.trace("AppAPI.init : end");},_initInternalMessaging:function(){if(typeof chrome.extension.onMessage==="undefined"){chrome.extension.onRequest.addListener(this._onRequest.bind(this));}else{chrome.extension.onMessage.addListener(this._onRequest.bind(this));}},_getUserScripts:function(){this._cr_app_api_page_ready=true;crLogger.trace("_getUserScripts : start");InternalMessaging.messageToBackground({action:"addUserScripts"});},_onRequest:function(d,c,a){var e=d.action,g=null;var b=!(InternalMessaging.responseLater);if(e){if(d.hasOwnProperty("scope")&&this[d.scope].hasOwnProperty(e)){g=this[d.scope][e];}else{g=this[e];}}if(typeof(g)==="function"){var f=d.params&&typeof(d.params["push"])==="function"?d.params:[];if(d.passCallback===true){f.push(a);}b=g.apply(this,f);return b;}},initContentScript:function(b,a,d){var c;b.forEach(function(e){c=document.createElement("link");c.setAttribute("rel","stylesheet");c.setAttribute("type","text/css");c.setAttribute("href",e);document.getElementsByTagName("head")[0].appendChild(c);}.bind(this));if(a){this._bic=a;d();}else{setTimeout(function(){_this=this;InternalMessaging.messageToBackground({action:"setToolbarUniqueID",params:[],passCallback:true},function(e){_this._bic=e;d();});},10);return InternalMessaging.responseLater;}},openURL:function(b,a){InternalMessaging.messageToBackground({action:"openURL",params:[b,a]});},superAlert:function(a){InternalMessaging.messageToBackground({action:"superAlert",params:[a]});},removeExpiredCookies:function(b,d){if(d.length>0){for(var c=0;c<d.length;++c){var a=d[c];if((d.indexOf(a)>=0)&&this._cookies[b].hasOwnProperty(a)){delete this._cookies[b][a];}}}},updateCookie:function(c,d,b){var a=this;if(!this._cookies){setTimeout(function(){a.updateCookie(c,d,b);},25);return;}if(this._removedCookies[b][c]){delete this._removedCookies[b][c];}var e=d.expires instanceof (Date)?d.expires:new Date(d.expires);this._cookies[b][c]={value:d.value,expires:e};},updateCookieExpiration:function(c,a,b){this._cookies[b][c].expires=a;},unsetCookie:function(b,a){if(this._cookies[a][b]){this._removedCookies[a][b]=true;delete this._cookies[a][b];}},removeAllCookies:function(a,b,c){for(cookie in this._cookies[a]){this._removedCookies[a][cookie]=true;if(b&&c.indexOf(cookie)<0){delete this._cookies[a][cookie];}}if(!b){this._cookies[a]={};}},updateRealCookie:function(a,b){if(this._removedCookies[TableNames.USER_COOKIES]["real"+a]){delete this._removedCookies[TableNames.USER_COOKIES]["real"+a];}else{this._cookies[TableNames.USER_COOKIES].mysite[a]={value:b.value,expires:b.expires};}},unsetRealCookie:function(a){if(this._cookies[TableNames.USER_COOKIES].mysite[a]){this._removedCookies[TableNames.USER_COOKIES]["real"+a]=true;delete this._cookies[TableNames.USER_COOKIES].mysite[a];}},getTabId:function(){return this.tabID;},isDebugMode:function(){return this.debugMode;},getCrossriderID:function(){return this._bic;},fb_respond:function(b,a){this.fbAPI.callback(b,a);},handleMessage:function(a){this.message.call(a);},background:{reload:function(){InternalMessaging.messageToBackground({action:"reload"});}},getAPIInfo:function(){return{appID:this.appID,cr_version:this.cr_version,version:this.version,platform:this.platform};}};var cookiesNotSetYet=0;function main_code(){crLogger.trace("main_code : start");InternalMessaging.messageToBackground({action:"getAppData",passCallback:true},function(c){crLogger.trace("main_code : callback : start");if(typeof c!=="undefined"&&c.hasOwnProperty("manifest")&&c.hasOwnProperty("_cookies")){var a=(window.top!==window.self);var d=(c.manifest.runiniframe==="true");if(!d&&a){return;}if(!c._cookies.hasOwnProperty("_cr_verify_cookies_are_good")){if(cookiesNotSetYet<3){cookiesNotSetYet++;DBCookiesNotSetYet();}else{var b="cookiesNotSetYet var limit was reached";InternalMessaging.messageToBackground({action:"reportError",params:[b,"main_code"]});}return;}delete c._cookies._cr_verify_cookies_are_good;window.appAPI=new AppApi();appAPI.init(c);}else{if(cookiesNotSetYet<3){cookiesNotSetYet++;DBCookiesNotSetYet();}}});}function DBCookiesNotSetYet(){InternalMessaging.messageToBackground({action:"refreshMemoryCookiesFromDB",passCallback:true},function(){setTimeout(main_code,50);});}main_code();