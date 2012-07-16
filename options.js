function _gt(msg) {
	return (chrome.i18n && chrome.i18n.getMessage(msg)) || msg;
}

var background = chrome.extension.getBackgroundPage();

var Configs = {
	eachInput: function(configs, callback) {
		var _this = this;
		$("input").each(function(){
			var e = $(this)[0];
			if(e.name !== "" && configs[e.name] !== undefined) {
				callback.call(_this, e);
			}
		});
	},
	load: function(forceDefault) {
		var configs = background.Configs.load(forceDefault);
		Configs.eachInput(configs, function(e) {
			switch(e.type) {
				case "checkbox":
					e.checked = (configs[e.name] === "on")?true:false;
					break;
				default:
					e.value = configs[e.name];
					break;
			}
		});
		if (forceDefault) {
			showMessage(_gt("Options_are_reset_to_default"));
		}
	},
	save: function() {
		var configs = background.Configs.load();
		Configs.eachInput(configs, function(e) {
			switch(e.type) {
				case "checkbox":
					configs[e.name] = e.checked?"on":"off";
					break;
				default:
					configs[e.name] = e.value;
					break;
			}
		});
		background.Configs.save(configs);
		showMessage(_gt("Options_saved"));
	},
	forceDefault: function() {
		Configs.load(true);
	}
};

function showMessage(msg) {
		$("#message").stop().text(msg).show().css('opacity', '1.0').fadeOut(5000);
}

function isAuthenticated(callback) {
	chrome.extension.sendRequest({"request": "isAuthenticated"},
								 function(resp) { callback(resp); });
}

function signin() {
	background.signin(function(result) { showAction(); });
}

function signout() {
	background.signout();
	showAction();
}

function showAction() {
	isAuthenticated(function(resp) {
		if(resp) {
			$("#signin").hide();
			$("#signout").show();
		} else {
			$("#signin").show();
			$("#signout").hide();
		}
	});
}

$(function(){Configs.load()});
showAction();

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#signinButton').addEventListener('click', signin);
	document.querySelector('#signoutButton').addEventListener('click', signout);
	document.querySelector('#saveButton').addEventListener('click', Configs.save);
	document.querySelector('#loadButton').addEventListener('click', Configs.load);
	document.querySelector('#resetButton').addEventListener('click', Configs.forceDefault);
})
