lyqInject();

function lyqInject() {
  var loc = document.location;
  var onLyqOn = function (func) {
	chrome.extension.sendRequest({"request": "lyq"}, function(resp) {
		if(resp === "on") func();
	});
  };

  if (loc.hostname.match(/maps\.google/)) {
	googleMap();
  } else {
  	onLyqOn(function() {
  		var req = {
			"request": "tweet",
			"href": loc.href,
			"hostname": loc.hostname,
			"search": loc.search,
			"pathname": loc.pathname
		};
		chrome.extension.sendRequest(req);
  	});
  }

  function googleMap(req) {
	var q_form = document.getElementById("q_form");
	var tweet = function(query, href) {
		onLyqOn(function() {
			var req = {
				"request": "tweet",
				"href": loc.href,
				"hostname": loc.hostname,
				"search": loc.search,
				"pathname": loc.pathname,
				"special" : {"query": query, "href": href}
			};
			chrome.extension.sendRequest(req);
		});
	}
	q_form.addEventListener("submit", function() {
		var query, href;
		query = document.getElementById("q_d").value;
		setTimeout(function() { // bad, dirty hack
			href = document.getElementById("link").href;
			tweet(query, href);
		}, 1000);
	}, false);
  }
}
