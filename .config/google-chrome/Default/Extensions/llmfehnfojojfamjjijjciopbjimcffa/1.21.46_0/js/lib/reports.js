var ErrorMessage=function(b,a){return{e:b,initiator:a};};if(typeof this.IsDefined==="undefined"){this.IsDefined=function(a){return(typeof a!=="undefined")&&!!a;};}var Reports=new function(){function c(f){var e=undefined;if(IsDefined(f)){if(Crossrider.hasOwnProperty("manifest")&&Crossrider.manifest.hasOwnProperty("crossrider")&&Crossrider.manifest.crossrider.hasOwnProperty(f)&&Crossrider.manifest.crossrider[f].length>0){e=Crossrider.manifest.crossrider[f];}}return e;}function b(e){if(typeof Crossrider!=="undefined"){if(Crossrider.isStaging){Crossrider.Utils.internalDebug("_reportError : "+unescape(e));}var h=Crossrider._getSharedQueryStringParametersForStats();if(h.length>0&&h!==""){var g=c("errorHostUrl");if(IsDefined(g)){var f=g+"/ch-error.gif?"+h+"&"+e;d(f);}}}}function a(h){if(IsDefined(h)&&IsDefined(Crossrider)){var g=Crossrider._getSharedQueryStringParametersForStats();if(g.length>0&&g!==""){var f=c("statsHostUrl");if(IsDefined(f)){var e=f+"/"+h+g;d(e);}}}}function d(h,i){try{var j=arguments.callee;var f=document.getElementsByTagName("body")[0];var g=document.createElement("img");g.src=h;g.onload=function(e){f.removeChild(this);};f.appendChild(g);g.onerror=function(){f.removeChild(this);i=i||1;if(i<10){setTimeout(function(){j(h,i+1);},1000*10);}};}catch(k){Crossrider.Utils.internalDebug("_sendPixel Error : "+k.message);}}return{error:function(g){if(IsDefined(appAPI)&&appAPI.isBackground){if(g&&g.hasOwnProperty("e")&&g.hasOwnProperty("initiator")){var j=g.e;if(j.message.toLowerCase()!=="Attempting to use a disconnected port object".toLowerCase()){var i=g.initiator;i=i&&(typeof i==="string")?i:"";var h=j&&j.message?j.message.trim():"";var f=j?j.toString():"";if(f.indexOf(":")>0){f=f.split(":")[0].trim();}else{f="unknown";}var k="msg="+escape(h)+"&errtype="+escape(f)+"&funcName="+escape(i);b(k);}else{if(typeof Crossrider!=="undefined"&&Crossrider.isStaging){Crossrider.Utils.internalDebug("_sendPixel Error : "+j.message);}}}}},dailyStats:function(){a("stats.gif?action=daily&");},firstInstall:function(){a("install.gif?");},install:function(){a("apps.gif?action=install&");},uninstall:function(){a("apps.gif?action=uninstall&");},update:function(e){a("apps.gif?action=update&oldver="+(IsDefined(e)?e:"")+"&");}};}();var UserReport=new function(){function a(c){var d="["+new Date().toDateString()+" "+new Date().toLocaleTimeString()+"]";if(IsDefined(c)&&c.hasOwnProperty("e")&&c.hasOwnProperty("initiator")){var h=c.e;var g=c.initiator;g=g&&(typeof g==="string")?g:"unknown";var f=h&&h.message?h.message.trim():"";var b=h?h.toString():"";if(b.indexOf(":")>0){b=b.split(":")[0].trim();}else{b="unknown";}var i="<ErrorType: "+b+", Message: "+f+" ,FuncName: "+g+">";console.log(d+" "+i);}}return{error:function(b){a(b);},surroundCallbackWithTryCatch:function(d,c){var b=undefined;if(IsDefined(d)&&typeof d==="function"){b=function(){var f=d;var h=undefined;try{h=f.apply(null,arguments);}catch(g){UserReport.error(new ErrorMessage(g,c));}return h;};}return b;}};}();
