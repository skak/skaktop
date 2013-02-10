/*

  (The WTFPL)

              DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                      Version 2, December 2004

   Copyright (C) 2012 Norio Nomura

   Everyone is permitted to copy and distribute verbatim or modified
   copies of this license document, and changing it is allowed as long
   as the name is changed.

              DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
     TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

    0. You just DO WHAT THE FUCK YOU WANT TO.

 */

if (window.top === window) {
  (function (){
    if (! /in_reply_to=/g.test(window.location)) {
      if (window.location.hash){
        window.close();
      } else {
        var status = window.document.getElementById('status')
        if (status && status.textContent) {
          window.location.replace(window.location + '#status');
          window.location = 'tweetbot:///post?text=' + encodeURIComponent(status.textContent);
          window.setTimeout(function () {window.close();}, 500);
        }
      }
    }
  })();
}
