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
			"pathname": loc.pathname
		};
		if (loc.hostname.match(/maps\.google/)) {
			googleMap();
			//req["special"] = googleMap();
		}
		chrome.extension.sendRequest(req);
	}
  });

  function googleMap() {
  	var query = document.getElementById("q_d");
	var href = document.getElementById("link").getAttribute("href");
	query.onchange = function() {
		console.log("Form changed: " + query.value);
	}
  	return {"query": query.value, "href": href}
  }
}
