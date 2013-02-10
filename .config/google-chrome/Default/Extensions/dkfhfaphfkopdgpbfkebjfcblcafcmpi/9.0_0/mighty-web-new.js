function webapp_channel_api_get_token()
{

textyDebug('Getting channel API token...');

var channelURL= baseUrl + '/getJson?function=getChannelTokenForWebApp';
//alert(channelURL);
$.ajax({
   type: "GET",
   url: channelURL,
   dataType: "jsonp",
   jsonpCallback: "capiwagda",	

   success: function(msg){
     console.log('Response from cloud after channel attempt (should have valid_token prepend): ' + msg);
   	 
	 if (msg.search("valid_token:")<0)
    	console.log("No valid_token prepend found from Channel API!");
	 else
    	{
	    	//get rid of prepend since we got a valid token -- this is our own custom prepend
	    	msg=msg.replace("valid_token:","")
	    
	    //msg='AHRlWrrPcmQHPVSF3h2XBUKZm1HdULbvZioUa8jBh-roZqF6tq2ryEaj4Wcr-cq-AHCMHthozw1yQ2XB58D4LTONFt2UcnVB7XZzOWbyn9iFaK9kdppDfxIb6UIh0WmOozbEgC9D1N69';
	    
	    var channel = new goog.appengine.Channel(msg);
	    
	    //proposed logic -- every time, try to open a socket. If can't open socket, get new channel
	    
	    var socket = channel.open();
	    
    	socket.onopen = function(){
    	console.log('Channel Opened via Channel API with token: ' + msg);
    	console.log('Current time - when channel API new socket is opened : ' + Date());

		//generic_notif_popup("channel opened. token is " + msg);
		_gaq.push(["_trackEvent","Background","ChannelAPI-Open-Socket","",1]);
		};	

	
	    socket.onmessage = function(message) {
	    _gaq.push(["_trackEvent","Background","ChannelAPI-Message-Received","",1]);
	    console.log('**** CHANNEL SOCKET ONMESSAGE *** ');
	    console.log('Message arrived via channel API= ' + message.data);
	    
	    

	    
	    process_incoming_channel_api_msg_CRX(message.data);
	    
	    //document.getElementById('msg').innerHTML =  'New Message arrived: <a href="" onclick="window.location.reload;">Refresh</a>';

    	};
    	
	
    	socket.onerror = function(message){
    	console.log('!!!!!!!!!!!!! TOKEN GONE (via onerror callback)!!!!!!!!!!!!');
    	//generic_notif_popup("onerror - channel API");
    	_gaq.push(["_trackEvent","Background","ChannelAPI-Socket-ONERROR-Token-Expired","",1]);
    	webapp_channel_api_get_token();
    	};


    	socket.onclose = function(message){
    	console.log('!!!!!!!!!!!!! TOKEN GONE (via onclose callback) !!!!!!!!!!!!');
    	//generic_notif_popup("onclose - channel API");
    	_gaq.push(["_trackEvent","Background","ChannelAPI-Socket-ONCLOSE","",1]);
		webapp_channel_api_get_token();
    	};	
   	}
   
   }
 }
 
 ).responseText;


}




function process_incoming_channel_api_msg_CRX(inbound_data)
{
	var json_msg_response_as_object =  jQuery.parseJSON(inbound_data);
	
	if (json_msg_response_as_object.new_content !== undefined) // "new_content"

	{
	var sms = json_msg_response_as_object.new_content;
	
	//IMPORTANT!
	// ui-tabs-selected gets the object of the currently selected tab.  
	//the "phone_num_clean" is in the <a id=>
	// use this to match the selected tab with the incoming message phone # (for auto-refreshing the tab panel!)
	if (
			(sms.inbox_outbox != 61) && // don't show notifs if the CAPI message is an outbox sync from phone.
			(sms.type != 84)            // don't show notifs for "incoming call ANSWERED" -- type 84
		)
		
		
		{	
			
			var incoming_phone_action_verb = '';
			var notif_body = '';
			if (sms.type==10)
				{
				incoming_phone_action_verb = 'Text Message from ';
				notif_body = "'" + sms.body + "'";
				}

			else if (sms.type==11)  //MMS inbound -- must check if its initial awake, or second notif (after image is uploaded and ready)
				{
				
				if (sms.mms_object_key !== undefined) //image has uploaded
					{
					incoming_phone_action_verb = 'MMS from ';
					notif_body = "'" + sms.body + "' (MMS Downloaded)";
					}
				else  //initial ping that MMS is incoming...
					{
					incoming_phone_action_verb = 'MMS from ';
					notif_body = "Image Downloading on Phone…";
					}
				}
				
					
				 
			else if (sms.type==80)  //no need to set Notif Body
				incoming_phone_action_verb = 'Incoming Call from ';
			else if (sms.type==81) //no need to set Notif Body
				incoming_phone_action_verb = 'Missed Call from ';
				

		   //var googleContactArraySingleContactJStorage=$.jStorage.get(sms.phone_num_clean ,"no-jstorage-val-found"); //2nd param is the default value if the key is not found in jStorage
       
    	    
    	    var num_or_name='';
    	    var bestContactThumbnail="http://icons.iconarchive.com/icons/kyo-tux/aeon/256/Misc-Buddy-Blue-icon.png";
    	    
    	    //if (googleContactArraySingleContactJStorage['name']) // if there's a match in jStorage, we'll have an array element (from JSON) called 'name'
        	//	num_or_name = googleContactArraySingleContactJStorage['name'];
        	//else
        	
        	num_or_name = sms.phone_num;
        	
 
			//document.getElementById('msg').innerHTML =  incoming_phone_action_verb + num_or_name + ': ' + notif_body;
			
			if (window.webkitNotifications) {
	
				var anchor_tab_to_force_click = '#' + sms.phone_num_clean;
				
				var n = window.webkitNotifications.createNotification(bestContactThumbnail, incoming_phone_action_verb + num_or_name, notif_body);
				
				n.onclick = function(x) {
				
	    			chrome.tabs.create({ 'url' : 'https://mightytext.net/dev' + anchor_tab_to_force_click });
					this.cancel(); 
					var msg_row_dom_element = '#sms-body-msgid-' + sms.id;
				   		
					};
					
				n.show();
				}	
	
			else {
	  				alert("Notifications are not supported for this Browser/OS version yet.");
				 }

	
	
	  }
	
	
	
	


	}


	//ACK of message sent from phone
	
	
	else if (json_msg_response_as_object.ack_processed !== undefined) // "ack_processed"
	{
	
	var ack_info = json_msg_response_as_object.ack_processed;
	//document.getElementById('msg').innerHTML =  'Phone Confirmation Send - ' + ack_info.phone_num + ': ' + ack_info.body + ' <a href="" onclick="window.location.reload;">Refresh</a>';
	//alert(ack_info.id);
	
	var status_text_for_this_msg_id = 'message-status-text-msgid-' + ack_info.id;

	var outbox_text_for_this_msg_id = 'outbox-message-msgid-' + ack_info.id;
	
	
	if(document.getElementById(status_text_for_this_msg_id) != null)	 	
	document.getElementById(status_text_for_this_msg_id).innerHTML = '<B>Phone Sent Message</B> <img style="margin-top:5px" src="checkmark-yes.png">';

	if(document.getElementById(outbox_text_for_this_msg_id) != null)	 	
	document.getElementById(outbox_text_for_this_msg_id).innerHTML = '<B>Phone Sent</B> <img src="checkmark-yes.png">';
	
	
	
	}
	
	else
	{
	console.log("unknown incoming CAPI content");
	}	
	
}












