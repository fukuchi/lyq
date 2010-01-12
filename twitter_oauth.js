var TwitterOAuth = {
	consumerSettings: {
		"consumer_key": "CpIfE9K0wbYSlJKguUgEuw",
		"consumer_secret": "DrTVxcsi5qGB3sSDTtyjagYu6p3LfVYpJGtcS2GsyZE",
		"request_token_url": "http://twitter.com/oauth/request_token",
		"access_token_url": "http://twitter.com/oauth/access_token2",
		"authorize_url": "http://twitter.com/oauth/authorize"
	},
	oauth_token: null,
	oauth_token_secret: null,
	oauth_token_data: localStorage["oauth_token_data"],
	user_id: null,
	authenticated: false,
	onAuthenticated: null,

	reset: function() {
		this.oauth_token = null;
		this.oauth_token_secret = null;
		this.oauth_token_data = null;
		this.user_id = null;
		this.authenticated = false;
		this.onAuthenticated = null;
	},

	prepareForTweet: function() {
		if(this.oauth_token_data) {
			this.accessTokenCallback(this.oauth_token_data);
		} else {
			this.getRequestToken();
		}
	},

	prepareSignedParams: function(url, params) {
		var accessor = {
			consumerSecret: this.consumerSettings.consumer_secret
		};
		var message = {
			"method": "POST",
			"action": url,
			"parameters": [
				['oauth_consumer_key', this.consumerSettings.consumer_key],
				['oauth_signature_method', 'HMAC-SHA1']
			]
		};
		if(this.oauth_token) {
			OAuth.setParameter(message, "oauth_token", this.oauth_token);
		}
		if(params) {
			for(var p in params) {
				OAuth.setParameter(message, p, params[p]);
			}
		}
		OAuth.completeRequest(message, accessor);
		return OAuth.getParameterMap(message.parameters);
	},

	makeRequest: function(url, params, callback) {
		var sparams = this.prepareSignedParams(url, params);
		var _this = this;

		$.ajax({
			"type": "POST",
			"url": url,
			"data": sparams,
			"timeout": 6000,
			"success": function(data, status) {
				callback.call(_this, data, status);
			},
			"error": function(request, status, error) {
				var fmtError = "";
				try {
					fmtError = '"' + request.responseText+ '"(' + request.statusText + ")";
				} catch(e) {
					fmtError = '"' + error + '"(' + status + ")";
				}
				callback.call(_this, null, fmtError);
			}
		});
	},

	requestTokenCallback: function(data, status) {
		if(!data) {
			console.log("Failed to get request_token: " + status);
			alert("Failed to get request_token from twitter.com.\n\n" + status);
			return;
		}
		var params = OAuth.getParameterMap(data);
		this.oauth_token = params["oauth_token"];
		this.oauth_token_secret = params["oauth_token_secret"];
		chrome.tabs.create({
			"url": this.consumerSettings["authorize_url"] + "?oauth_token=" + this.oauth_token,
			"selected": true
		});
	},

	getRequestToken: function() {
		this.oauth_token_secret = null;
		this.oauth_token = null;

		this.makeRequest(this.consumerSettings.request_token_url,
						 {},
						 this.requestTokenCallback);
	},

	accessTokenCallback: function(data, status) {
		var params;
		var result;
		if(!data) {
			console.log("Faile to get access_token: " + status);
			alert("Failed to get access_token from twitter.com.\n\n" + status);
			result = false;
		} else {
			localStorage["oauth_token_data"] = data;
			params = OAuth.getParameterMap(data);
			this.oauth_token = params["oauth_token"];
			this.oauth_token_secret = params["oauth_token_secret"];
			this.user_id = params["user_id"];
			this.authenticated = true;

			result = true;
		}
		if(this.onAuthenticated) {
			this.onAuthenticated(result);
		}
	},

	getAccessToken: function(pin, callback) {
		this.onAuthenticated = callback;
		this.makeRequest(this.consumerSettings.request_token_url,
						 {"oauth_verifier": pin},
						 this.accessTokenCallback);
	}
};
