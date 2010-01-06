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

	function tweetGoogle(loc) {
		var isGoogleMap = false;
		if (loc.hostname.match(/maps\.google/)) {
			isGoogleMap = true;
		}
		var prefix = "";
		for (var key in GoogleServices) {
			if (loc.hostname.indexOf(key) === 0) {
				prefix = _gt(GoogleServices[key]) + ": ";
				break;
			}
		}
		var m = loc.search.match(/(\?|&)q=([^?&]*)/);
		if (m && m[2]) {
			if (isGoogleMap) {
				tweet(prefix + m[2]);
			} else {
				tweet(prefix + m[2], loc);
			}
		}
	}

	function tweetBing(loc) {
		var prefix = _gt("Bing");
		for (var key in BingServices) {
			if (loc.pathname.indexOf(key) === 1) {
				prefix += _gt(BingServices[key]);
				break;
			}
		}
		var m = loc.search.match(/(\?|&)q=([^&]*)/);
		if (m && m[2]) {
			tweet(prefix + ": " + m[2], loc);
		}
	}

	function tweetYouTube(loc) {
		var m = loc.search.match(/(\?|&)search_query=([^&]*)/);
		if (m && m[2]) {
			tweet(_gt("YouTube") + ": " + m[2], loc);
		}
	}

	function tweetNicovideo(loc) {
		var m = loc.pathname.match(/^\/([^/]*)\/([^/]*)/);
		if (m && m[1].match(/(search|tag)/) && m[2]) {
			tweet(_gt("NicoNico") + ": " + m[2], loc);
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
