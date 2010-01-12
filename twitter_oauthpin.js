(function () {
	var pin = document.getElementById("oauth_pin").innerText;
	chrome.extension.sendRequest({"request": "twitter_pin", "pin": pin},
		function(resp) {
			var content = document.getElementById("content");
			if(resp) {
				content.innerHTML = "<div class='message-content'><h2>Congratulations, Lyq is successfully authenticated.</h2><p>You can close this tab.</p></div>";
			} else {
				content.innerHTML = "<div class='message-content'><h2>Failed to authenticate Lyq.</h2><p>Please try again. You can close this tab.</p></div>";
			}
	});
}());
