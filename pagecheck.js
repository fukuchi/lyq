onLyqOn();

function onLyqOn() {
  var loc = document.location;
  chrome.extension.sendRequest({"request": "lyq"}, function(resp) {
	if(resp === "on") {
		var req = {
			"request": "tweet",
			"href": loc.href,
			"hostname": loc.hostname,
			"search": loc.search,
			"pathname": loc.pathname,
		};
		chrome.extension.sendRequest(req);
	}
  });
}
