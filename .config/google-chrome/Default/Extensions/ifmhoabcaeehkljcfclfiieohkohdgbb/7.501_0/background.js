/* Work-around for the content security policy bug in Chrome 23 */
chrome.extension.onRequest.addListener(function(message,sender,callback) {
	// Check for internal messages
	if (message && typeof message=="object" && message.command) {
		if (message.command=="ajax") {
			var obj = message.data;
			var request=new XMLHttpRequest();
			request.onreadystatechange=function() { if(request.readyState==4) { callback({'request':request}); } }
			request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
			try { request.open(obj.method,obj.url,true); } catch(e) { alert(e); return; }
			if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
			request.send(obj.data); return {};
		}
	}
});
