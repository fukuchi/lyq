find();

function find() {
  var loc = document.location;
  var host = loc.hostname;

  if (host.match(/^.*\.google\.com$/) || host.match(/^.*\.google\.co\..*$/)) {
	tweetGoogle(loc);
  } else if (host == 'www.youtube.com') {
	tweetYouTube(loc);
  } else if (host == 'www.nicovideo.jp') {
	tweetNicovideo(loc);
  }
}

function tweetGoogle(loc) {
	var isGoogleMap = false;
	if (loc.hostname.match(/maps\.google/)) {
		isGoogleMap = true;
	}
	var m = loc.search.match(/(\?|&)q=([^?&]*)/);
	if (m && m[2]) {
		if (isGoogleMap) {
			tweet(m[2]);
		} else {
			tweet(m[2], loc);
		}
	}
}

function tweetYouTube(loc) {
	var m = loc.search.match(/(\?|&)search_query=([^&]*)/);
	if (m && m[2]) {
		tweet("YouTube: " + m[2], loc);
	}
}

function tweetNicovideo(loc) {
	var m = loc.pathname.match(/^\/([^/]*)\/([^/]*)/);
	if (m && m[1].match(/(search|tag)/) && m[2]) {
		tweet("ニコニコ: " + m[2], loc);
	}
}

function tweet(msg, loc) {
	var req = {message: msg};
	if (loc) {
		req.uri = loc.href;
	}
	chrome.extension.sendRequest(req);
}
