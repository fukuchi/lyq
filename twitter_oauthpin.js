(function () {
	var msg = $("#oauth_pin p")
	var msg_text = $("#bd").text();

	if (!msg_text.match(/Lyq/) || msg_text.match(/denied/i)) return;

	var pin = $.trim($("code").text());
	msg.html("<p>Now Lyq is reading the PIN automatically. (PIN: " + pin + ")</p>");

	chrome.extension.sendRequest({"request": "twitter_pin", "pin": pin},
		function(resp) {
			var content = document.getElementById("oauth_pin");
			if(resp) {
				content.innerHTML = "<div><h2>Congratulations, Lyq is successfully authenticated.</h2><p>You can close this tab.</p></div>";
			} else {
				content.innerHTML = "<div><h2>Failed to authenticate Lyq.</h2><p>Please close this tab and try to sign in again.</p></div>";
			}
	});
}());
