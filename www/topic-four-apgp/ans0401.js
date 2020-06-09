// This is a JavaScript file

// Our question will be of the form : First 3 terms of GP is equal to 1st, (m+1)th, (m+n+1)th term of AP.
// (ai) We will show the equation mr^2 - (m+n) r + c = 0 (students will be asked for second and third coefficient)
// (aii) We will find common ratio r
// (bi) We will find the common difference d
// (bii) We will find the smallest and largest value of n such that S_n (AP) is larger than ha, where h is predetermined.

// global variables
var studentJArray, studentNMin, studentNMax;

// Query: Parse queriesObject from previous page
var queriesObject = parseQuery(window.location.search);
var m = Number(queriesObject.m), n = Number(queriesObject.n);
var hMax = Math.floor(Math.floor(1 + m * m / (m - n)) / 2);
var h = getRandomInt(2, hMax);
if (m == 2) {
	var mPlusOneString = '3rd';
} else {
	var mPlusOneString = (m + 1) + 'th';
};

// coefficients of polynomial to show: simplify if necessary
var a = m, b = -(m + n), c = n;
var divisor = gcd(m, gcd(n, m + n));
if (divisor != 1) { a = a / divisor, b = b / divisor, c = c / divisor };
divisor = gcd(m, n);
mSimplified = m / divisor;
nSimplified = n / divisor;

// things that need id
document.addEventListener('init', function (event) {
	if (event.target.matches('#qn001atab')) {
		katex.render("a", document.getElementById('a'), { throwOnError: false });
		katex.render("d", document.getElementById('d'), { throwOnError: false });
		katex.render("a", document.getElementById('aTwo'), { throwOnError: false });
		katex.render("d", document.getElementById('dTwo'), { throwOnError: false });
		katex.render("r", document.getElementById('r'), { throwOnError: false });
		document.getElementById('mPlusOne').innerHTML = mPlusOneString;
		document.getElementById('mPlusNPlusOne').innerHTML = (m + n + 1) + 'th';
		katex.render(polyBuilder([a, b, c], 'r') + "=0.", document.getElementById('show'), { throwOnError: false });
		document.getElementById('qnAiToHide').style.display = 'none';
		katex.render("r=" + fractionBuilder(nSimplified, mSimplified), document.getElementById('rAnswer'), { throwOnError: false });
		katex.render("a", document.getElementById('aThree'), { throwOnError: false });
		katex.render("d", document.getElementById('dThree'), { throwOnError: false });
		katex.render("n", document.getElementById('n'), { throwOnError: false });
		katex.render("S_n", document.getElementById('sN'), { throwOnError: false });
		katex.render("a > 0", document.getElementById('aMore'), { throwOnError: false });
		katex.render("n", document.getElementById('nTwo'), { throwOnError: false });
		katex.render("S_n", document.getElementById('sNTwo'), { throwOnError: false });
		katex.render(h+"a", document.getElementById('hA'), { throwOnError: false });
	};
}, false); // End of window.onload

// start answering: make tabs visible
var startAnswering = function () {
	// show tabBar and go to answer tab
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	// change button to say "go to Question" instead
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	// typeset (bi): key in d (fraction)
	katex.render("d=ja", document.getElementById('dEquals'), { throwOnError: false });
	katex.render("j", document.getElementById('j'), { throwOnError: false });
	katex.render("j=", document.getElementById('jEquals'), { throwOnError: false });
	katex.render('-'+fractionBuilder(22,7), document.getElementById('fractionExample'), { throwOnError: false });
	katex.render("-22 / 7", document.getElementById('decimalExample'), { throwOnError: false });
	// Input answer box for (bi)
	var input_field = document.querySelector('#inputJ'); // class type: fraction
	// prevents spaces
	input_field.addEventListener('textInput', function (e) {
		var char = e.data;
		var keyCode = char.charCodeAt(0);
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true;
	}); // end of spacebar prevention
	// typeset (bii): nMin, nMax
	katex.render("n", document.getElementById('nThree'), { throwOnError: false });
	katex.render("S_n", document.getElementById('sNThree'), { throwOnError: false });
	katex.render(h+"a", document.getElementById('hATwo'), { throwOnError: false });
	katex.render("n=", document.getElementById('nEquals'), { throwOnError: false });
	katex.render("n=", document.getElementById('nEqualsTwo'), { throwOnError: false });
};

var moveOn = function () {
	// show dialog: create one if it's not present
	var dialog = document.getElementById('my-dialog');
	if (!dialog) {
		var modal = document.querySelector('ons-modal');
		modal.show();
		ons.createElement('dialog.html', { append: true }).then(function () {
			modal.hide();
			moveOn();
		})
	} else {
		// check whether input valid or blank
		var input_field = document.querySelector('#inputJ');
		var input_field_two = document.querySelector('#inputNMin');
		var input_field_three = document.querySelector('#inputNMax');
		dialog = document.getElementById('my-dialog');
		console.log(input_field.validity.valid, input_field_two.validity.valid, input_field_three.validity.valid)
		if (input_field.value && input_field.validity.valid && input_field_two.value && input_field_two.validity.valid && input_field_three.value && input_field_three.validity.valid) {
			// typesetting bi: d
			studentJArray = handleFractions(document.getElementById('inputJ').value)
			if (studentJArray[2] == 1) { // not a fraction
				if (studentJArray[1] == 1) { // if j = /pm 1, then d=\pm a, don't need to typeset '1'
					var studentJTypeset = studentJArray[0];
				} else { // typeset number
					var studentJTypeset = studentJArray[0] + studentJArray[1];
				};
			} else { // typeset fraction
				var studentJTypeset = studentJArray[0] + fractionBuilder(studentJArray[1], studentJArray[2]);
			};
			katex.render('d=' + studentJTypeset + 'a', document.getElementById('studentD'), { throwOnError: false });
			// typesetting bii: nMin and nMax
			studentNMin = document.getElementById('inputNMin').value;
			studentNMax = document.getElementById('inputNMax').value;
			katex.render('n=' + inputNMin.value, document.getElementById('studentNMin'), { throwOnError: false });
			katex.render('n=' + inputNMax.value, document.getElementById('studentNMax'), { throwOnError: false });
			document.getElementById('invalidInput').style.display = 'none';
			document.getElementById('bAnswer').style.display = 'block';
			document.getElementById('moveOnButton').style.display = 'block';
		} else { //input not valid
			document.getElementById('invalidInput').style.display = 'block';
			document.getElementById('bAnswer').style.display = 'none';
			document.getElementById('moveOnButton').style.display = 'none';
		}
		// shows dialog
		dialog.show();
	} // end of if/else (dialog)
};

// passes Option selected to answer page
var proceedTob = function () {
	queriesObject.biJSign = studentJArray[0];
	queriesObject.biJNum = studentJArray[1];
	queriesObject.biJDen = studentJArray[2];
	queriesObject.biiNMin = studentNMin;
	queriesObject.biiNMax = studentNMax;
	queriesObject.h = h;
	window.location = htmlQueryConstructor('soln0401.html',queriesObject);
};