(function () {
  var loc = document.location;
  var onLyqOn = function (func) {
	chrome.extension.sendRequest({"request": "lyq"}, function(resp) {
		if(resp === "on") func();
	});
  };

  if (loc.hostname.match(/maps\.google/)) {
	googleMap();
  } else if (loc.href.match(/www.bing.com\/maps\//)) {
    bingMap();
  } else if (loc.hostname === "twitter.com") {
    twitter();
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

  function googleMap() {
	var q_form = document.getElementById("q_form");
	var tweet = function(query, href) {
		onLyqOn(function() {
			var req = {
				"request": "tweet",
				"href": loc.href,
				"hostname": loc.hostname,
				"search": loc.search,
				"pathname": loc.pathname,
				"special" : {"service": "maps", "query": query, "href": href}
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

  function bingMap() {
	var veform = document.getElementById("veform");
	var tweet = function(query, href) {
	}
	veform.addEventListener("submit", function() {
		var query;
		query = document.getElementById("sb_form_q").value;
		onLyqOn(function() {
			var req = {
				"request": "tweet",
				"href": loc.href,
				"hostname": loc.hostname,
				"search": loc.search,
				"pathname": loc.pathname,
				"special" : {"service": "maps", "query": query}
			};
			chrome.extension.sendRequest(req);
		});
	}, false);
  }
  function twitter() {
	  var search = document.getElementById("sidebar_search");
	  search.addEventListener("submit", function() {
		var query, href;
		query = document.getElementById("sidebar_search_q").value;
		href = "http://" + document.location.hostname + "/#search?q=" + encodeURI(query).replace(/#/g, "%23");
		onLyqOn(function() {
			var req = {
				"request": "tweet",
				"href": loc.href,
				"hostname": loc.hostname,
				"search": loc.search,
				"pathname": loc.pathname,
				"special" : {"service": "twitter", "query": query, "href": href}
			};
			chrome.extension.sendRequest(req);
		});
	}, false);
  }
}());
