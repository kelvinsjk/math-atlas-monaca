// This is a JavaScript file

// This contains the site/app related scripts: both for Onsen UI and custom

ons.ready(function() {
	console.log("Onsen UI served " + window.location.href);
});

// Section A --- Menus 
window.fn = {};
// left menu
window.fn.open = function() {
var menu = document.getElementById('menu');
menu.open();  
};

// Section B --- IphoneX
if (ons.platform.isIPhoneX()) {
document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}

// Section C -- Drop down menus, radio buttons

//Section D1 --- Close Dialog
var hideDialog = function(id) {
  document.getElementById(id).hide();
};
// Section D2 - Close Alert Dialog
// Show screen is custom on each page. Hide screen is generalized
var hideAlertDialog = function(dialogId) {
  document.getElementById(dialogId).hide();
 };
// Section D3 - Return Home Alert Dialog
// Show screen is custom on each page. Hide screen is generalized
var returnHome = function() {
  	var dialog = document.getElementById('home-alert-dialog');
  	if (dialog) { // it's already present
    	dialog.show();
  	} else {
    ons.createElement('home-alert-dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
    	});
 	};
 };

// Section E -- Modal/loading screens
var showModal = function() {
	var modal = document.querySelector('ons-modal');
	modal.show();
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	MathJax.Hub.Register.StartupHook("End",function () { modal.hide() });
		//setTimeout(function() {  modal.hide();}, 400);
};

// Section F ---  Change query to Object
var parseQuery = function(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};

// Section G --- Change Object to query
var htmlQueryConstructor = function(address, queryObject){
	var queryStringConstructor = '?'
	for (let key in queryObject) { // iterates queryObjects
		let value = queryObject[key]
		queryStringConstructor +=  key + '=' + value + '&'
	}
	return address+queryStringConstructor.slice(0, -1);
};