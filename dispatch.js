function dispatcher() {
	var GoogleServices = {
		"maps": "Map",
		"video": "Video",
		"images": "Image",
		"news": "News"
	};

	BingServices = {
		"maps": "Map",
		"videos": "Video",
		"images": "Image",
		"news": "News"
	};

	function _gt(msg) {
		return chrome.i18n.getMessage(msg);
	}

	function tweetGoogleMap(loc) {
		if (loc.special.query) {
			tweet(_gt(GoogleServices["maps"]) + loc.special.query, loc.special.href);
		}
	}

	function tweetGoogle(loc) {
		var prefix = "";
		if (loc.hostname.match(/maps\.google/)) {
			return; // currently Google Maps is not supported.
			//return tweetGoogleMap(loc);
		}
		for (var key in GoogleServices) {
			if (loc.hostname.indexOf(key) === 0) {
				prefix = _gt(GoogleServices[key]) + ": ";
				break;
			}
		}
		var m = loc.search.match(/(\?|&)q=([^?&]*)/);
		if (m && m[2]) {
			tweet(prefix + m[2], loc.href);
		}
	}

	function tweetBing(loc) {
		var prefix = _gt("Bing");
		if (loc.hostname.match(/maps\.google/)) {
			return; //currently Bing Map is not supported.
		}
		for (var key in BingServices) {
			if (loc.pathname.indexOf(key) === 1) {
				prefix += " " + _gt(BingServices[key]);
				break;
			}
		}
		var m = loc.search.match(/(\?|&)q=([^&]*)/);
		if (m && m[2]) {
			tweet(prefix + ": " + m[2], loc.href);
		}
	}

	function tweetYouTube(loc) {
		var m = loc.search.match(/(\?|&)search_query=([^&]*)/);
		if (m && m[2]) {
			tweet(_gt("YouTube") + ": " + m[2], loc.href);
		}
	}

	function tweetNicovideo(loc) {
		var m = loc.pathname.match(/^\/([^/]*)\/([^/]*)/);
		if (m && m[1].match(/(search|tag)/) && m[2]) {
			tweet(_gt("NicoNico") + ": " + m[2], loc.href);
		}
	}

	return {
		tweet: function(loc) {
		   var host = loc.hostname;
		   if (host.match(/^.*\.google\.com$/) || host.match(/^.*\.google\.co\..*$/)) {
			   tweetGoogle(loc);
		   } else if (host === "www.bing.com") {
			   tweetBing(loc);
		   } else if (host === "www.youtube.com") {
			   tweetYouTube(loc);
		   } else if (host === "www.nicovideo.jp") {
			   tweetNicovideo(loc);
		   } else if (host === "localhost") {
			   tweetTest(loc);
		   }
	   }
	};
}
