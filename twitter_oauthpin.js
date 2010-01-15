(function () {
 	var msg = document.getElementsByClassName("message-content")[0];
	var msg_text = msg.textContent;

	if (!msg_text.match(/Lyq/) || msg_text.match(/denied/i)) return;

	var pin = document.getElementById("oauth_pin").innerText.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");
	msg.children[1].textContent = "Now Lyq is reading the PIN automatically. (PIN: " + pin + ")";

	chrome.extension.sendRequest({"request": "twitter_pin", "pin": pin},
		function(resp) {
			var content = document.getElementById("content");
			if(resp) {
				content.innerHTML = "<div class='message-content'><h2>Congratulations, Lyq is successfully authenticated.</h2><p>You can close this tab.</p></div>";
			} else {
				content.innerHTML = "<div class='message-content'><h2>Failed to authenticate Lyq.</h2><p>Please close this tab and try to sign in again.</p></div>";
			}
	});
}());
