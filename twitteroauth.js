var TwitterOAuth = {
	consumerSettings: {
		"consumer_key": "CpIfE9K0wbYSlJKguUgEuw",
		"consumer_secret": "DrTVxcsi5qGB3sSDTtyjagYu6p3LfVYpJGtcS2GsyZE",
		"request_token_url": "http://twitter.com/oauth/request_token",
		"access_token_url": "http://twitter.com/oauth/access_token2",
		"authorize_url": "http://twitter.com/oauth/authorize"
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
		var accessor = {
			consumerSecret: this.consumerSettings.consumer_secret
		};
		var message = {
			method: "POST",
			action: this.consumerSettings.request_token_url,
			parameters: [
				['oauth_consumer_key', this.consumerSettings.consumer_key],
				['oauth_signature_method', 'HMAC-SHA1']
			]
		};
		var params;
		var _this = this;

		OAuth.completeRequest(message, accessor);
		params = OAuth.getParameterMap(message.parameters);
		$.ajax({
			type: "POST",
			url: _this.consumerSettings.request_token_url,
			data: params,
			timeout: 6000,
			success: function(data, status) {
				_this.requestTokenCallback.call(_this, data, status);
			},
			error: function(request, status, error) {
				var fmtError = "";
				try {
					fmtError = '"' + request.responseText+ '"(' + request.statusText + ")";
				} catch(e) {
					fmtError = '"' + error + '"(' + status + ")";
				}
				requestTokenCallback.call(_this, null, fmtError);
			}
		});
	},
	getAccessToken: function(callback) {
	}
};
