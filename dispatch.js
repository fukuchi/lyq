function dispatcher() {
	var GoogleHosts = {
		"maps": "Map",
		"video": "Video",
		"images": "Image",
		"news": "News"
	};
	var GoogleServicetypes = {
		"isch": "Image",
		"nws": "News",
		"vid": "Video"
	};

	BingServices = {
		"maps": "Map",
		"videos": "Video",
		"images": "Image",
		"news": "News"
	};

	function _gt(msg) {
		return (chrome.i18n && chrome.i18n.getMessage(msg)) || msg;
	}

	function decode(msg) {
		return decodeURIComponent(msg.replace(/\+/g, " "));
	}

	function tweetGoogleMap(loc) {
		if (loc.special.query) {
			tweet(_gt(GoogleServices["maps"]) + ": " + loc.special.query, loc.special.href);
		}
	}

	function tweetGoogle(loc) {
		var prefix = "";
		if (loc.special && loc.special["service"] === "maps") {
			return tweetGoogleMap(loc);
		}

		var params = loc.search.split('&');
		for (var i in params) {
			values = params[i].split('=');
			if (values[0] === "tbm") {
				prefix = _gt(GoogleServicetypes[values[1]]) + ": ";
			}
		}
		if (!prefix) {
			for (var key in GoogleHosts) {
				if (loc.hostname.indexOf(key) === 0) {
					prefix = _gt(GoogleHosts[key]) + ": ";
					break;
				}
			}
		}
		var m = loc.search.match(/(\?|&)q=([^?&]*)/);
		if (m && m[2]) {
			tweet(prefix + decode(m[2]), loc.href);
		}
	}

	function tweetBingMap(loc) {
		if (loc.special.query) {
			tweet(_gt("Bing") + " " + _gt(BingServices["maps"]) + ": " + loc.special.query);
		}
	}

	function tweetBing(loc) {
		var prefix = _gt("Bing");
		if (loc.special && loc.special["service"] === "maps") {
			return tweetBingMap(loc);
		}
		for (var key in BingServices) {
			if (loc.pathname.indexOf(key) === 1) {
				prefix += " " + _gt(BingServices[key]);
				break;
			}
		}
		var m = loc.search.match(/(\?|&)q=([^&]*)/);
		if (m && m[2]) {
			tweet(prefix + ": " + decode(m[2]), loc.href);
		}
	}

	function tweetYouTube(loc) {
		var m = loc.search.match(/(\?|&)search_query=([^&]*)/);
		if (m && m[2]) {
			tweet(_gt("YouTube") + ": " + decode(m[2]), loc.href);
		}
	}

	function tweetNicovideo(loc) {
		var m = loc.pathname.match(/^\/([^/]*)\/([^/]*)/);
		if (m && m[1].match(/(search|tag)/) && m[2]) {
			tweet(_gt("NicoNico") + ": " + decode(m[2]), loc.href);
		}
	}

	function tweetTwitter(loc) {
		var query = loc.special.query;
		var href = loc.special.href;
		if(query) {
			tweet(_gt("Twitter") + ": " + decode(query), href);
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
		   } else if (host === "twitter.com") {
			   tweetTwitter(loc);
		   }
	   }
	};
}
