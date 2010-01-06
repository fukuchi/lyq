GoogleServices = {
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

onLyqOn();

function onLyqOn() {
  var loc = document.location;
  chrome.extension.sendRequest({request: "lyq"}, function(resp) {
	if(resp === "on") {
		dispatchTweetFunc(loc);
	}
  });
}

function dispatchTweetFunc(loc) {
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

function tweetGoogle(loc) {
	var isGoogleMap = false;
	if (loc.hostname.match(/maps\.google/)) {
		isGoogleMap = true;
	}
	var prefix = "";
	for (var key in GoogleServices) {
		if (loc.hostname.indexOf(key) === 0) {
			prefix = GoogleServices[key] + ": ";
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
	var prefix = "Bing";
	for (var key in BingServices) {
		if (loc.pathname.indexOf(key) === 1) {
			prefix += BingServices[key];
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
		tweet("YouTube" + ": " + m[2], loc);
	}
}

function tweetNicovideo(loc) {
	var m = loc.pathname.match(/^\/([^/]*)\/([^/]*)/);
	if (m && m[1].match(/(search|tag)/) && m[2]) {
		tweet("NicoNico" + ": " + m[2], loc);
	}
}

function tweet(msg, loc) {
	var req = {message: msg};
	if (loc) {
		req.uri = loc.href;
	}
	chrome.extension.sendRequest(req);
}

function tweetTest(msg) {
	var res = chrome.extension.sendRequest({request: "debug", message: msg});
	console.log(res);
}
