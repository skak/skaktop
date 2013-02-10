//THIS IS LEGACY - from the old POPUP.HTML paradigm -- but we needed to put all JS in an external JS file.


/*
      var oauth = ChromeExOAuth.initBackgroundPage({
        'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
        'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
        'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
        'consumer_key' : 'anonymous',
        'consumer_secret' : 'anonymous',
        'scope' : 'http://www.google.com/m8/feeds/',
        'app_name' : 'MightyText - Contacts Sync'
      });


	  var GOOGLE_CONTACTS_OAUTH_STATUS='UNKNOWN';



//global variables

	var which_phone_num_from_hash_tag_in_url=window.location.hash.substr(1); // MA NOTE -- get rid of the #
      var resultdivclean = '<div id="results" style="display:none"><ul id="anchors-for-tabs" style="width:770px;font-size:14px;max-height:80px;overflow:auto;padding:0px;padding-left:5px"></ul></div>';

      var db;
      var status_of_just_sent_message=0; //would prefer to not make this global, but having scope problems in FullCycle func
      var text_message_array = new Array();

      var localContactsArray = new Array();
      var log = document.getElementById('log');
	  var just_added_msg_id='';
	  var dynamic_info_global='';



_gaq.push(["_trackEvent","Popup","Initial-Load","",1]);


function onloadCheckHashTag()
 
{


if (which_phone_num_from_hash_tag_in_url=="options")
	{
	setTimeout("showOptionsPage();",1500);
	}
	
else if (window.localStorage.usingWebAppNewwwwww==1)
		{
		goToActiveMightyTextTab();
		window.close();
		}

else //is a legacy CRX USER!
	{
	$("html").show();
	
	checkLocalTablesExist();
	fullRefresh();
	}

}



getDynamicInfo();
onloadCheckHashTag();
*/
