// This is a JavaScript file

// Our question will be of the form : First 3 terms of GP is equal to 1st, (m+1)th, (m+n+1)th term of AP.
// (ai) We will show the equation mr^2 - (m+n) r + c = 0 (students will be asked for second and third coefficient)
// (aii) We will find common ratio r
// (aiii) We will ask for a reason for convergence
// (aiv) We will ask for the sum to infinity in the form ka. 

// global variables
var proceedToAiiiText = 'Proceed to next part'; //check if this is necessary
var studentB, studentC, studentR, studentK;
var partAiMark = 0, partAiiMark = 0;
var studentRArray, studentRTypeset, n;
const radioIds = ['radioZero', 'radioOne', 'radioTwo', 'radioThree', 'radioFour', 'radioFive'];
const reasonIds = ['reasonZero', 'reasonOne', 'reasonTwo', 'reasonThree', 'reasonFour', 'reasonFive'];
const caretIds = ['caretZero', 'caretOne', 'caretTwo', 'caretThree', 'caretFour', 'caretFive']; 
var radioFlag = false, radioProceed = false;
var iD, studentKFractionArray;

// MCQ choices
const mcqPossibilities = [
	"00<span id='inBetween0'></span>.", // 00: -1<r<1
	"01<span id='inBetween1'></span>.", // 01: -1<d<1
	"02<span id='inBetween2'></span>.", // 02: -1<a<1
	"10<span id='moreThan0'></span>.", // 10: |r|>1
	"11<span id='moreThan1'></span>.", // 11: |d|>1
	"12<span id='moreThan2'></span>.", // 12: |a|>1
	"20as <span id='sN0'></span>.", // 20: as n --> infty, sN --> 0
	"21as <span id='sN1'></span>.", // 21: as n --> infty, sN --> infty
	"22as <span id='sN2'></span>.", // 22: as n --> 0, sN --> infty
], stringArrayOne = ['r', 'd', 'a'], stringArrayTwo = ['\\infty', '0', '\\infty', '\\infty', '0', '\\infty'];

// Generate numbers
var m = getRandomInt(2, 9);
if (m <= 7) {
	var n = getRandomInt(1, m - 1);
} else { // big m
	var n = getRandomInt(1, 6);
};
// var hMax = Math.floor(Math.floor(1 + m * m / (m - n)) / 2);
// var h = getRandomInt(2, hMax);
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
// generate MCQ options
var mcqArrayPlusAnswer = mcqPicker(mcqPossibilities, 6, 0);

// things that need id
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
		katex.render("a", document.getElementById('a'), {throwOnError:false});
		katex.render("d", document.getElementById('d'), {throwOnError:false});
		katex.render("a", document.getElementById('aTwo'), {throwOnError:false});		
		katex.render("d", document.getElementById('dTwo'), {throwOnError:false});
		katex.render("r", document.getElementById('r'), {throwOnError:false});
		document.getElementById('mPlusOne').innerHTML = mPlusOneString;
		document.getElementById('mPlusNPlusOne').innerHTML = (m + n + 1) + 'th';
		katex.render(a + "r^2+br+c=0", document.getElementById('show'), { throwOnError: false });
		katex.render("b", document.getElementById('b'), { throwOnError: false });
		katex.render("c", document.getElementById('c'), { throwOnError: false });
		katex.render("b", document.getElementById('bTwo'), { throwOnError: false });
		katex.render("c", document.getElementById('cTwo'), { throwOnError: false });
		katex.render("b=", document.getElementById('bThree'), { throwOnError: false });
		katex.render("c=", document.getElementById('cThree'), { throwOnError: false });
	};
}, false); // End of window.onload

// confirm (ai) input using an alert-dialog
var checkStudentInputTwo = function() {
	studentB = document.getElementById('inputB').value;
	studentC = document.getElementById('inputC').value;
	if (!studentB || !studentC) { //invalid input
		var showText = 'It appears that some of the inputs are blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
	} else { // handle student's answer
		if (document.getElementById('negativeB').checked) { studentB = -studentB };
		if (document.getElementById('negativeC').checked) { studentC = -studentC };
		var showText = "You have keyed in <br> <span id='aiConfirm'> </span>. <br> Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
	};
	// show dialog for confirmation
	var dialog = document.getElementById('my-alert-dialog-ai');
	if (dialog) { // it's already present
		document.getElementById('confirmationAi').innerHTML = showText;
		document.getElementById('alertTitleAi').innerHTML = titleText;
		document.getElementById('okButtonAi').style.visibility = visiText;
		dialog.show();
		if (studentB && studentC) { katex.render("b=" + studentB+ ", c="+studentC, document.getElementById('aiConfirm'), { throwOnError: false }); };
	} else {
		ons.createElement('alert-dialog-ai.html', { append: true })
		.then(function (dialog) {
			document.getElementById('confirmationAi').innerHTML = showText;
			document.getElementById('alertTitleAi').innerHTML = titleText;
			document.getElementById('okButtonAi').style.visibility = visiText;
			dialog.show();
			if (studentB && studentC) { katex.render("b=" + studentB+ ", c="+studentC, document.getElementById('aiConfirm'), { throwOnError: false }); };
		});
	};	
}

// student confirms (ai): go to (aii)
var checkAi = function () {
	// hide previous dialog and samsung warning
	hideAlertDialog('my-alert-dialog-ai');
	document.getElementById('samsungWarning').style.display = 'none';
	// show new Dialog to comment on answer
	ons.createElement('dialog-ai.html', { append: true })
		.then(function (dialog) {
			dialog.show();
			// mark student's (ai)
			if (b == studentB && c == studentC) { // full marks
				partAiMark = 4;
				document.getElementById('rightOrWrong').innerHTML = "Well done!";
				document.getElementById('answerAiComments').style.display = 'none';
				document.getElementById('aiMarksSpan').innerHTML = '4';
			} else if (b == studentB || c == studentC || studentB == -m - n || studentC == n || b == -studentB || studentB == m+n) { // partial marks
				katex.render("b=" + studentB + ', c=' + studentC, document.getElementById('studentAi'), { throwOnError: false });
				if ( (studentB == -m - n && studentC == n) || (studentB == -b && c == studentC) ) {
					document.getElementById('aiMarksSpan').innerHTML = 3;
					partAiMark = 3;
				} else {
					partAiMark = 2;
				};
			} else { // no marks
				katex.render("b=" + studentB+', c='+studentC, document.getElementById('studentAi'), { throwOnError: false });
				document.getElementById('aiMarksReceived').style.display = 'none';
			};
			katex.render("b=" + b + ", c=" + c, document.getElementById('aiAnswer'), { throwOnError: false });
		});
}

// end of (ai): proceed to (aii)
var proceedToAii = function () {
	// hide Dialog
	hideDialog('my-dialog-ai');
	// change show in (ai) to actual answer
	document.getElementById('qnAiToHide').style.display = 'none';
	katex.render(polyBuilder([a, b, c], 'r') + "=0.", document.getElementById('show'), { throwOnError: false });
	document.getElementById('qnA').style.display = 'none';
	// modify marks on display
	document.getElementById('questionOrPart').innerHTML = "These parts are";
	document.getElementById('marksOnDisplay').innerHTML = "4+2";
	// show (aii) question and r input
	document.getElementById('qnAii').style.display = 'block';
	document.getElementById('aiiSubmitButton').style.display = 'block';
	katex.render('r', document.getElementById('rTwo'), { throwOnError: false });
	katex.render('-'+fractionBuilder(22,7), document.getElementById('fractionExample'), { throwOnError: false });
	katex.render('-22/7', document.getElementById('decimalExample'), { throwOnError: false });
	katex.render('r=', document.getElementById('rEquals'), { throwOnError: false });
	// prevents spaces
	var input_field = document.querySelector('#inputR'); // class type: fraction
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
}

// show dialog:confirming r value
var checkStudentInputR = function () {
	studentR = document.getElementById('inputR').value;
	if (!studentR || !document.getElementById('inputR').validity.valid) {
		var showText = 'It appears that the input is blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
	} else {
		var showText = "You have keyed in <span id='aiiConfirm'> </span>. Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
		studentRArray = handleFractions(studentR);
		if (studentRArray[2] == 1) {studentRTypeset = studentRArray[0] + studentRArray[1]; } else {studentRTypeset = studentRArray[0]+ fractionBuilder(studentRArray[1], studentRArray[2]); };
	};
	// show dialog
	var dialog = document.getElementById('my-alert-dialog-aii');
	if (dialog) { // it's already present
		document.getElementById('confirmationAii').innerHTML = showText;
		document.getElementById('alertTitleAii').innerHTML = titleText;
		document.getElementById('okButtonAii').style.visibility = visiText;
		dialog.show();
		if (studentR && document.getElementById('inputR').validity.valid) { katex.render("r=" + studentRTypeset, document.getElementById('aiiConfirm'), { throwOnError: false }); };
	} else { // create new dialog
		ons.createElement('alert-dialog-aii.html', { append: true })
		.then(function (dialog) {
			document.getElementById('confirmationAii').innerHTML = showText;
			document.getElementById('alertTitleAii').innerHTML = titleText;
			document.getElementById('okButtonAii').style.visibility = visiText;
			dialog.show();
			if (studentR && document.getElementById('inputR').validity.valid) { katex.render("r=" + studentRTypeset, document.getElementById('aiiConfirm'), { throwOnError: false }); };
		});
	};
}

// after (aii) confirmation: give students r value answer 
var checkAii = function () {
	hideAlertDialog('my-alert-dialog-aii');
	// show new Dialog to comment on answer
	ons.createElement('dialog-aii.html', { append: true })
		.then(function (dialog) {
			dialog.show();
			if (Math.abs(studentRArray[3]).toPrecision(3) == (n/m).toPrecision(3) || studentRArray[3]==1) { // chance for mark: ans correct to 3sf, up to sign, or use r=1 as answer
				if ((studentRArray[0] == "" && studentRArray[1] == nSimplified && studentRArray[2] == mSimplified) || (studentRArray[0] == "" && studentRArray[2] == 1 && studentRArray[1]==n/m)) {
					partAiiMark = 2;
					document.getElementById('rightOrWrongTwo').innerHTML = "Well done!";
					document.getElementById('answerAiiComments').style.display = 'none';
					document.getElementById('aiiMarksSpan').innerHTML = '2';
				} else {
					partAiiMark = 1;
					katex.render("r=" + studentRTypeset, document.getElementById('studentAii'), { throwOnError: false });
					document.getElementById('aiiMarksSpan').innerHTML = '1';
				};
			} else { // no marks
				katex.render("r=" + studentRTypeset, document.getElementById('studentAii'), { throwOnError: false });
				document.getElementById('aiiMarksReceived').style.display = 'none';
			};
			katex.render("r=" + fractionBuilder(nSimplified,mSimplified), document.getElementById('aiiAnswer'), { throwOnError: false });
		});
}

// proceed to (aiii)
var proceedToAiii = function () {
	// hide Dialog
	hideDialog('my-dialog-aii');
	// change show to actual answer
	document.getElementById('qnAiiQuestion').style.display = 'none';
	document.getElementById('aiiSubmitButton').style.display = 'none';
	katex.render("r=" + fractionBuilder(nSimplified, mSimplified), document.getElementById('rAnswer'), { throwOnError: false });
	document.getElementById('qnAiiDone').style.display = 'block';
	// modify marks on display
	document.getElementById('questionOrPart').innerHTML = "Part (a) of this question is";
	document.getElementById('marksOnDisplay').innerHTML = "4+2+1+2";
	// show rest of (a) question 
	document.getElementById('qnARest').style.display = 'block';
	katex.render('a', document.getElementById('aThree'), { throwOnError: false });
	katex.render('ka', document.getElementById('kA'), { throwOnError: false });
	katex.render('k', document.getElementById('k'), { throwOnError: false });
	document.getElementById('answerButton').style.display = 'block';
}

// start answering: make tabs visible
var startAnswering = function(){
	// show tabBar and go to answer tab
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	// change button to say "go to Question" instead
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	// typeset (aiii): radio buttons
	reasonIds.forEach(function (radioString, i) {
		optionString = mcqArrayPlusAnswer[0][i];
		document.getElementById(radioString).innerHTML = optionString.slice(2);
		if (optionString[0] == '0') { // in between
			katex.render("-1<" + stringArrayOne[Number(optionString[1])] + "<1", document.getElementById('inBetween' + optionString[1]), { throwOnError: false });
		} else if (optionString[0] == '1') { // more than
			katex.render("|" + stringArrayOne[Number(optionString[1])] + "|>1", document.getElementById('moreThan' + optionString[1]), { throwOnError: false });
		} else { // n tends to infinity/0
			katex.render("n \\to " + stringArrayTwo[Number(optionString[1])*2] + ", S_n \\to " + stringArrayTwo[Number(optionString[1])*2+1], document.getElementById('sN' + optionString[1]), { throwOnError: false });
		};
	});
};

// radio button control. Shows part (aiv) first time an option is chosen
var radioClick = function (indexStr) {
	iD = Number(indexStr);
	if (radioFlag) { // radio buttons hidden: show all. Hide caret
		radioIds.forEach(function (radioString, i) {
			document.getElementById(radioString).style.display = 'block';
		});
		document.getElementById(caretIds[iD]).style.display = 'none'
		radioFlag = false;
	} else { // radio buttons shown: hide all but actual answer. Show caret
		radioIds.forEach(function (radioString, i) {
			if (i != iD) { document.getElementById(radioString).style.display = 'none' };
		});
		document.getElementById(caretIds[iD]).style.display = 'inline';
		radioFlag = true;
	};
	if (!radioProceed) {
		document.getElementById('aivQuestion').style.display = 'block';
		radioProceed = true;
	};
	//Typeset (aiv) answer box
	katex.render("S_{\\infty}=ka", document.getElementById('sInf'), { throwOnError: false });
	katex.render("k", document.getElementById('kTwo'), { throwOnError: false });
	katex.render("k=", document.getElementById('kEquals'), { throwOnError: false });
	katex.render(fractionBuilder(22, 7), document.getElementById('fractionExampleTwo'), { throwOnError: false });
	katex.render('22/7', document.getElementById('decimalExampleTwo'), { throwOnError: false });
	// Input answer box for (aiv)
	var input_field = document.querySelector('#inputK'); // class type: fraction
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
	// only show button to proceed if input is valid
	input_field.addEventListener('input', function (e) {
		if (input_field.validity.valid && input_field.value) {
			document.getElementById('submitButton').style.display = 'block';
		} else {
			document.getElementById('submitButton').style.display = 'none';
		};
	});
};

var moveOn = function() {
	// show dialog: create one if it's not present
	var dialog = document.getElementById('my-dialog');
	if (!dialog) { 
		var modal = document.querySelector('ons-modal');
		modal.show(); 
		ons.createElement('dialog.html', { append: true }).then( function() {
			modal.hide();
			moveOn();
		})
	} else{ 
		dialog = document.getElementById('my-dialog');
		// typesetting aiii
		document.getElementById('answerAiii').innerHTML = document.getElementById(reasonIds[n]).cloneNode(true).innerHTML;
		// typesetting aiv
		studentKFractionArray = handleFractions(document.getElementById('inputK').value);
		if (studentKFractionArray[2] == 1) { // not a fraction
			if (studentKFractionArray[1] == 1) {
				var studentKTypeset = studentKFractionArray[0];
			} else {
				var studentKTypeset = studentKFractionArray[0] + studentKFractionArray[1];
			};
		} else {
			var studentKTypeset = studentKFractionArray[0] + fractionBuilder(studentKFractionArray[1],studentKFractionArray[2]);
		};
		katex.render("S_{\\infty}=" + studentKTypeset+"a", document.getElementById('answerAiv'), { throwOnError: false });
		// shows dialog
		dialog.show();
	} // end of if/else (dialog)
};

// passes Option selected to answer page
var proceedTob = function() {
	var reason = mcqArrayPlusAnswer[0][iD].slice(0,2)
	var queriesObject = { m: m, n: n, aiM: partAiMark, aiiM: partAiiMark, aiiiR: reason, aivKSign: studentKFractionArray[0], aivKNum: studentKFractionArray[1], aivKDen: studentKFractionArray[2]};
	window.location = htmlQueryConstructor('ans0401.html',queriesObject);
};