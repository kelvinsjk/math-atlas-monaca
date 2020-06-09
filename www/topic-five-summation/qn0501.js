// This is a JavaScript file

// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary
// Our question will be of the form : u_n = Num(n)/Den(n), where Den(n)=n (then Num(n) is 1 or n-1 or n+1), or Den(n)=n^2 (then Num(n) is 1)
// the variable nTranslate: 0: we use n, 1: we switch n to n-1, 2: we switch n to n+1. nSwap 0: u_n-1 - u_n, 1: u_n - u_n+1, 2: u_n+1 - u_n, 3: u_n - u_n-1
// (ai) Prove that u_n - u_{n+1} = \frac{a+bn}{g(n)}, where a and b are to be determined.
// (aii) Find sum (u_n - u_{n+1}) from n=h (h from 1 to 5) to N. The answer will be of the form c +/- f(n), where c is open ended and f(n) is MCQ
// (aiii) We will ask for a reason for convergence and the sum to infinity
// (b) We will ask for sum (u_n - u_{n+1}) where n is replaced with n \pm 1 or n\pm 2. The bottom limit will always change accordingly so that it matches (ai) but the top limit will be N

// global variables
var proceedToAiiiText = 'Proceed to next part';
var studentA, studentB, studentC, studentChoice;
var partAiMark = 0, partAiiMark = 0;
var studentCArray, studentCTypeset, n;
var studentSArray, studentATypeset;
const radioIds = ['radioZero', 'radioOne', 'radioTwo', 'radioThree', 'radioFour', 'radioFive'];
const radioTwoIds = ['radioTwoZero', 'radioTwoOne', 'radioTwoTwo', 'radioTwoThree', 'radioTwoFour', 'radioTwoFive'];
const reasonIds = ['reasonZero', 'reasonOne', 'reasonTwo', 'reasonThree', 'reasonFour', 'reasonFive'];
const reasonTwoIds = ['reasonTwoZero', 'reasonTwoOne', 'reasonTwoTwo', 'reasonTwoThree', 'reasonTwoFour', 'reasonTwoFive'];
const caretIds = ['caretZero', 'caretOne', 'caretTwo', 'caretThree', 'caretFour', 'caretFive'];
const caretTwoIds = ['caretTwoZero', 'caretTwoOne', 'caretTwoTwo', 'caretTwoThree', 'caretTwoFour', 'caretTwoFive'];
const nArray = ['1', 'n-2', 'n-1', 'n', 'n+1', 'n+2'];
const uNArray = ['u_{n-1}', 'u_{n+1}'];
var radioFlag = false;
var actualCSign = '';
var cType;
var radioFlagTwo = false, radioProceed = false;
var iD, iDTwo;

// Generate numbers
var bottomLimit = getRandomInt(1, 5);
var square = getRandomInt(1, 2); // whether we square the denominator
var denIndex = getRandomInt(2, 4); // den is n-1, n or n
var den = Math.pow(2, denIndex); // convert to encoding
if (square == 2) { // we square the denominator
	var num = 0, numIndex=0, numType = 1, denType = squareX(nArray[denIndex]);
} else { // denominator non-square
	if (denIndex == 3) { // num could be 1, n-1 or n+1
		var numCase = getRandomInt(0, 2);
		if (numCase == 0) {
			var numIndex = 0;
		} else if (numCase == 1) {
			var numIndex = denIndex - 1;
		} else {
			var numIndex = denIndex + 1;
		}
	} else { // num could be 1 or n
		if (getRandomInt(1, 2) == 1) {
			var numIndex = 0;
		}
		else {
			var numIndex = 3;
		}
	} // end of deciding denIndex, numIndex
	if (numIndex == 0) { //encode num
		var num = 0;
	} else {
		var num = Math.pow(2,numIndex);
	};
	// typeset num and den
	var numType = nArray[numIndex], denType = nArray[denIndex];
};
// get u_n-1 or u_n+1
var uNPlusMinus = getRandomInt(0, 1); // 0: u_n-1, 1: u_n+1
if (uNPlusMinus==0) { // get u_n-1
	var numTwo = num / 2, denTwo = den / 2;
	if (numTwo == 0) {
		var numTwoIndex = 0;
	} else {
		var numTwoIndex = Math.log2(numTwo);
	};
	var denTwoIndex = Math.log2(denTwo);
} else { // get u_n+1
	var numTwo = num * 2, denTwo = den * 2;
	if (numTwo == 0) {
		var numTwoIndex = 0;
	} else {
		var numTwoIndex = Math.log2(numTwo);
	};
	var denTwoIndex = Math.log2(denTwo);
};
var numTypeTwo = nArray[numTwoIndex], denTypeTwo = nArray[denTwoIndex];
// whether u_n - xxx or xxx - u_n
var uNFrontBehind = getRandomInt(1, 2); //1: u_n - xxx, 2: xxx-u_n
// typeset denominator
if (square == 2) {
	denTypeTwo = squareX(denTypeTwo);
	var denTypeMixed = denType + denTypeTwo;
} else {
	var denTypeMixed = parenthesisX(denType) + parenthesisX(denTypeTwo);
};
// calculate actualA and actualB
if (square == 2) {
	if (den < denTwo) { 
		var actualA = 2, actualB = 2 * denIndex - 5;
	} else {
		var actualA = -2, actualB = -2 * denTwoIndex + 5;
	};
	if (uNFrontBehind== 2) {
		actualA *= -1; actualB *= -1;
	};
} else {
	var actualA = 0;
	if (den < denTwo) {
		if (num == 0 || num > den) {
			var actualB = 1;
		} else {
			var actualB = -1;
		};
	} else {
		if (num == 0 || num > den) {
			var actualB = -1;
		} else {
			var actualB = 1
		};
	};
	if (uNFrontBehind== 2) {
		actualB *= -1;
	};
};
var fractionType = fractionBuilder(polyBuilder([actualA, actualB], 'n'), denTypeMixed);
// if denominator is n-1 or n-2, we must start our bottom limit from 2 or 3
bottomLimit += 3 - Math.min(denIndex, denTwoIndex, 3);
// create strings for radio buttons in (aii)
var optionStringsAii = ['', '', '', '', '', ''];
optionStringsAii[0] = fractionBuilder(numType, denType).replace(/n/g, 'N');
optionStringsAii[1] = '-' + optionStringsAii[0];
optionStringsAii[2] = fractionBuilder(numTypeTwo, denTypeTwo).replace(/n/g, 'N');
optionStringsAii[3] = '-' + optionStringsAii[2];;
optionStringsAii[4] = fractionType.replace(/n/g, 'N');
optionStringsAii[5] = fractionBuilder(polyBuilder([-actualA, -actualB], 'n'), denTypeMixed).replace(/n/g, 'N');
// calculate actualC and actualF(N)
if (denIndex < denTwoIndex) { 
	var smallerDenIndex = denIndex;
	var smallerNumIndex = numIndex;
	var actualFN = 3; // representing -u_n+1
} else {
	var smallerDenIndex = denTwoIndex;
	var smallerNumIndex = numTwoIndex;
	var actualFN = 1; // representing -u_n
};
var actualCDen = bottomLimit + smallerDenIndex - 3;
if (square == 2) { actualCDen = actualCDen * actualCDen; };
if (smallerNumIndex == 0) {
	var actualCNum = 1;
} else {
	var actualCNum = bottomLimit + smallerNumIndex - 3;
};
if ((uNFrontBehind == 2 && uNPlusMinus == 1) || (uNFrontBehind == 1 && uNPlusMinus == 0)) { actualCSign = '-'; actualFN -= 1; };
if (actualCNum==0) {actualCSign = '';};
if (actualFN % 2 == 0) { var plusSign = '+', minusSign=''; } else { var plusSign = '',minusSign='-'; };
// create strings for radio buttons in (aiii)
var optionStringsAiii = ['', '', '', '', '', ''];
optionStringsAiii[0] = '\\textrm{As } n \\to \\infty, '+fractionType+'\\to 0.'
optionStringsAiii[1] = '\\textrm{As } n \\to \\infty, '+fractionType+'\\to \\infty.'
optionStringsAiii[2] = '-1 < r < 1';
optionStringsAiii[3] = '\\textrm{As } N \\to \\infty, '+optionStringsAii[actualFN]+'\\to 0.'
optionStringsAiii[4] = '\\textrm{As } N \\to \\infty, '+optionStringsAii[actualFN]+'\\to' +minusSign+ '1.'
optionStringsAiii[5] = '\\textrm{As } N \\to \\infty, '+optionStringsAii[actualFN]+'\\to \\infty.'

// things that need id
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
		katex.render("u_1, u_2, u_3, \\ldots", document.getElementById('uOneTwo'), {throwOnError:false});
		katex.render("u_n ="+fractionBuilder(numType,denType), document.getElementById('uN'), {throwOnError:false});
		katex.render("n \\geq 1.", document.getElementById('nGreater'), { throwOnError: false });
		if (uNFrontBehind == 1) { // u_n - xxx 
			katex.render("u_n -"+uNArray[uNPlusMinus]+'='+fractionBuilder('an+b',denTypeMixed), document.getElementById('uNMinus'), {throwOnError:false});		
		} else { // xxx - u_n
			katex.render(uNArray[uNPlusMinus]+'-u_n ='+fractionBuilder('an+b',denTypeMixed), document.getElementById('uNMinus'), {throwOnError:false});		
		}
		katex.render("a", document.getElementById('a'), {throwOnError:false});
		katex.render("b", document.getElementById('b'), {throwOnError:false});
		katex.render("a", document.getElementById('aTwo'), {throwOnError:false});
		katex.render("b", document.getElementById('bTwo'), {throwOnError:false});
		katex.render("a=", document.getElementById('aEquals'), {throwOnError:false});
		katex.render("b=", document.getElementById('bEquals'), {throwOnError:false});
	};
}, false); // End of window.onload

// confirm (ai) input using an alert-dialog
var checkStudentInputTwo = function() {
	studentA = document.getElementById('inputA').value;
	studentB = document.getElementById('inputB').value;
	if (!studentB || !studentA) {
		var showText = 'It appears that some of the inputs are blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
	} else {
		if (document.getElementById('negativeB').checked) { studentB = -studentB };
		if (document.getElementById('negativeA').checked) { studentA = -studentA };
		var showText = "You have keyed in <span id='aiConfirm'> </span>. Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
	};
	var dialog = document.getElementById('my-alert-dialog-ai');
	if (dialog) { // it's already present
		document.getElementById('confirmationAi').innerHTML = showText;
		document.getElementById('alertTitleAi').innerHTML = titleText;
		document.getElementById('okButtonAi').style.visibility = visiText;
		dialog.show();
		if ( (studentB||studentB===0) && (studentA || studentA===0) ) { katex.render("a=" + studentA+ ", b="+studentB, document.getElementById('aiConfirm'), { throwOnError: false }); };
	} else {
		ons.createElement('alert-dialog-ai.html', { append: true })
		.then(function (dialog) {
			document.getElementById('confirmationAi').innerHTML = showText;
			document.getElementById('alertTitleAi').innerHTML = titleText;
			document.getElementById('okButtonAi').style.visibility = visiText;
			dialog.show();
			if ((studentB||studentB===0) && (studentA || studentA===0) ) { katex.render("a=" + studentA+ ", b="+studentB, document.getElementById('aiConfirm'), { throwOnError: false }); };
		});
	};	
}

// go from (ai) to (aii): give answer comments and show actual answer
var checkAi = function () {
	hideAlertDialog('my-alert-dialog-ai');
	document.getElementById('samsungWarning').style.display = 'none';
	// show new Dialog to comment on answer
	ons.createElement('dialog-ai.html', { append: true })
		.then(function (dialog) {
			dialog.show();
			if (actualA == studentA && actualB == studentB) { // full marks (2)
				partAiMark = 2;
				document.getElementById('rightOrWrong').innerHTML = "Well done!";
				document.getElementById('answerAiComments').style.display = 'none';
				document.getElementById('aiMarksSpan').innerHTML = '2';
			} else if (actualA == studentA || actualB == studentB) { // 1 mark
				katex.render("a=" + studentA + ', b=' + studentB, document.getElementById('studentAi'), { throwOnError: false });
				partAiMark = 1;
				document.getElementById('aiMarksSpan').innerHTML = '1';
			} else { // no marks
				katex.render("a=" + studentA + ', b=' + studentB, document.getElementById('studentAi'), { throwOnError: false });
				document.getElementById('aiMarksReceived').style.display = 'none';
			};
			katex.render("a=" + actualA + ", b=" + actualB, document.getElementById('aiAnswer'), { throwOnError: false });
		});
}

// proceed to (aii)
var proceedToAii = function () {
	// hide Dialog
	hideDialog('my-dialog-ai');
	// change show to actual answer
	document.getElementById('qnAiToHide').innerHTML = '.';
	document.getElementById('qnA').style.display = 'none';
	if (uNFrontBehind == 1) { // u_n - xxx 
		katex.render("u_n -" + uNArray[uNPlusMinus] + '=' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
	} else { // xxx - u_n
		katex.render(uNArray[uNPlusMinus] + '-u_n =' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
	};
	// modify marks on display
	document.getElementById('questionOrPart').innerHTML = "These parts are";
	document.getElementById('marksOnDisplay').innerHTML = "2+2";
	// show (aii) question and input
	document.getElementById('qnAii').style.display = 'block';
	katex.render('\\displaystyle \\sum_{n=' + bottomLimit +'}^N '+fractionType, document.getElementById('summation'), { throwOnError: false });
	katex.render('c+f(N)', document.getElementById('summationForm'), { throwOnError: false });
	katex.render('-'+fractionBuilder(22,7), document.getElementById('fractionExample'), { throwOnError: false });
	katex.render('-22/7', document.getElementById('decimalExample'), { throwOnError: false });
	katex.render('c=', document.getElementById('cEquals'), { throwOnError: false });
	// prevents spaces
	var input_field = document.querySelector('#inputC'); // class type: fraction
	input_field.addEventListener('textInput', function (e) {
		var char = e.data;
		var keyCode = char.charCodeAt(0);
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true; // end of spacebar prevention
	}); 
	// shows submit button if inputC and radio button is hit
	input_field.addEventListener('input', function (e) {
		if (input_field.validity.valid && input_field.value && radioFlag) {
			document.getElementById('aiiSubmitButton').style.display = 'block';
		} else {
			document.getElementById('aiiSubmitButton').style.display = 'none';
		};
	});
	// typeset radio buttons
	reasonIds.forEach(function (radioString, i) {
		document.getElementById(radioString).innerHTML = "<span id='reasonTypeSet"+i+"'></span>";
		katex.render("f(N)=" + optionStringsAii[i], document.getElementById('reasonTypeSet' + i), { throwOnError: false });
	});
}

// radio button control. 
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
	// shows Submit button
	var input_field = document.querySelector('#inputC');
	if (radioFlag && input_field.value && input_field.validity.valid) {
		document.getElementById('aiiSubmitButton').style.display = 'block';
	} else {
		document.getElementById('aiiSubmitButton').style.display = 'none';
	};
};

// show dialog: C value and f(N) choice for (aii)
var checkStudentInputC = function () {
	studentC = document.getElementById('inputC').value;
	var showText = "You have keyed in <span id='aiiConfirm'> </span>, <span id='aiiFN'></span>. Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
	studentCArray = handleFractions(studentC);
	if (studentCArray[2] == 1) {studentCTypeset = studentCArray[0] + studentCArray[1]; } else {studentCTypeset = studentCArray[0]+ fractionBuilder(studentCArray[1], studentCArray[2]); };
	var dialog = document.getElementById('my-alert-dialog-aii');
	if (dialog) { // it's already present
		document.getElementById('confirmationAii').innerHTML = showText;
		document.getElementById('alertTitleAii').innerHTML = titleText;
		document.getElementById('okButtonAii').style.visibility = visiText;
		dialog.show();
		katex.render("c=" + studentCTypeset, document.getElementById('aiiConfirm'), { throwOnError: false });
		document.getElementById('aiiFN').innerHTML = document.getElementById(reasonIds[iD]).cloneNode(true).innerHTML;
	} else {
		ons.createElement('alert-dialog-aii.html', { append: true })
		.then(function (dialog) {
			document.getElementById('confirmationAii').innerHTML = showText;
			document.getElementById('alertTitleAii').innerHTML = titleText;
			document.getElementById('okButtonAii').style.visibility = visiText;
			dialog.show();
			katex.render("c=" + studentCTypeset, document.getElementById('aiiConfirm'), { throwOnError: false });
			document.getElementById('aiiFN').innerHTML = document.getElementById(reasonIds[iD]).cloneNode(true).innerHTML;
		});
	};
}

// give student's C value and f(N) answer 
var checkAii = function () {
	hideAlertDialog('my-alert-dialog-aii');
	// show new Dialog to comment on answer
	ons.createElement('dialog-aii.html', { append: true })
		.then(function (dialog) {
			dialog.show();
			if ( (studentCArray[0] == actualCSign && ((studentCArray[1] == actualCNum && studentCArray[2] == actualCDen) || (studentCArray[2] == 1 && studentCArray[1] == actualCNum / actualCDen))) || (studentCArray[1]==0 && actualCNum==0)  ) {
				partAiiMark += 1;
			}
			if (iD == actualFN) { partAiiMark += 1; };
			if (partAiiMark > 0 ) { // chance for mark: ans correct to 3sf, up to sign, or use r=1 as answer
				if (partAiiMark == 2) {
					partAiiMark = 2;
					document.getElementById('rightOrWrongTwo').innerHTML = "Well done!";
					document.getElementById('answerAiiComments').style.display = 'none';
					document.getElementById('aiiMarksSpan').innerHTML = '2';
				} else { // 1 mark 
					katex.render("c=" + studentCTypeset, document.getElementById('studentAii'), { throwOnError: false });
					document.getElementById('studentAiiFN').innerHTML = document.getElementById(reasonIds[iD]).cloneNode(true).innerHTML;
					document.getElementById('aiiMarksSpan').innerHTML = '1';
				};
			} else { 
				katex.render("c=" + studentCTypeset, document.getElementById('studentAii'), { throwOnError: false });
				document.getElementById('studentAiiFN').innerHTML = document.getElementById(reasonIds[iD]).cloneNode(true).innerHTML;
				document.getElementById('aiiMarksReceived').style.display = 'none';
			}; 
			if (actualCDen == 1) { cType = actualCNum } else { cType = fractionBuilder(actualCNum, actualCDen) };
			katex.render("c=" + actualCSign+cType, document.getElementById('aiiAnswer'), { throwOnError: false });
			document.getElementById('aiiFNAnswer').innerHTML = document.getElementById(reasonIds[actualFN]).cloneNode(true).innerHTML;
		});
}

// proceed to (aiii)
var proceedToAiii = function () {
	// hide Dialog
	hideDialog('my-dialog-aii');
	// change show to actual answer
	document.getElementById('qnAiiQuestion').style.display = 'none';
	if (actualCNum==0){cType=''; plusSign=''};
	katex.render('\\displaystyle \\sum_{n=' + bottomLimit + '}^N ' + fractionType + '=' + actualCSign + cType + plusSign + optionStringsAii[actualFN]+'.', document.getElementById('summationAnswer'), { throwOnError: false, displayMode: true });
	document.getElementById('qnAiiDone').style.display = 'block';
	document.getElementById('aiiSubmitButton').style.display = 'none';
	// modify marks on display
	document.getElementById('questionOrPart').innerHTML = "Part (a) of this question is";
	document.getElementById('marksOnDisplay').innerHTML = "2+2+1+1";
	// show rest of (a) question 
	document.getElementById('qnARest').style.display = 'block';
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
	reasonTwoIds.forEach(function (radioString, i) {
		document.getElementById(radioString).innerHTML = "<span id='reasonTypeSetTwo" + i + "'></span>";
		katex.render(optionStringsAiii[i], document.getElementById('reasonTypeSetTwo' + i), { throwOnError: false });
	});
};


// radio button control for question tab. Shows part S_infinity first time an option is chosen
var radioClickTwo = function (indexStr) {
	iDTwo = Number(indexStr);
	if (radioFlagTwo) { // radio buttons hidden: show all. Hide caret
		radioTwoIds.forEach(function (radioString, i) {
			document.getElementById(radioString).style.display = 'block';
		});
		document.getElementById(caretTwoIds[iDTwo]).style.display = 'none'
		radioFlagTwo = false;
	} else { // radio buttons shown: hide all but actual answer. Show caret
		radioTwoIds.forEach(function (radioString, i) {
			if (i != iDTwo) { document.getElementById(radioString).style.display = 'none' };
		});
		document.getElementById(caretTwoIds[iDTwo]).style.display = 'inline';
		radioFlagTwo = true;
	};
	var input_field = document.querySelector('#inputS'); // class type: fraction
	if (input_field.validity.valid && input_field.value && radioFlagTwo) {
	document.getElementById('submitButton').style.display = 'block';
} else {
	document.getElementById('submitButton').style.display = 'none';
};
	// shows summation input on first click
	if (!radioProceed) {
		document.getElementById('aivQuestion').style.display = 'block';
		radioProceed = true;
		katex.render("-\\frac{22}{7}", document.getElementById('fractionExampleTwo'),{ throwOnError: false });
		katex.render("-22/7", document.getElementById('decimalExampleTwo'), { throwOnError: false });
		katex.render("S_{\\infty}=", document.getElementById('sInfinityEquals'), { throwOnError: false });
		// prevents spaces
		var input_field = document.querySelector('#inputS'); // class type: fraction
		input_field.addEventListener('textInput', function (e) {
			var char = e.data;
			var keyCode = char.charCodeAt(0);
			// Stop processing if spacebar is pressed
			if (keyCode == 32) {
				e.preventDefault();
				return false;
			}
			return true; // end of spacebar prevention
		});
		// shows submit button if inputC and radio button is hit
		input_field.addEventListener('input', function (e) {
			if (input_field.validity.valid && input_field.value && radioFlagTwo) {
				document.getElementById('submitButton').style.display = 'block';
			} else {
				document.getElementById('submitButton').style.display = 'none';
			};
		});
	}
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
		document.getElementById('answerAiii').innerHTML = document.getElementById(reasonTwoIds[iDTwo]).cloneNode(true).innerHTML;
		// typesetting aiv
		studentSFractionArray = handleFractions(document.getElementById('inputS').value);
		if (studentSFractionArray[2] == 1) { // not a fraction
			var studentSTypeset = studentSFractionArray[0] + studentSFractionArray[1];
		} else {
			var studentSTypeset = studentSFractionArray[0] + fractionBuilder(studentSFractionArray[1],studentSFractionArray[2]);
		};
		katex.render("S_{\\infty}=" + studentSTypeset, document.getElementById('answerAiv'), { throwOnError: false });
		// shows dialog
		dialog.show();
	} // end of if/else (dialog)
};

// passes Option selected to answer page
var proceedTob = function() {
	var queriesObject = { num: numIndex, numTwo: numTwoIndex, den: denIndex, denTwo: denTwoIndex, square: square, bottom: bottomLimit, uNFront: uNFrontBehind, aiM: partAiMark, aiiM: partAiiMark, aiiiR: iDTwo, aivSSign: studentSFractionArray[0], aivSNum: studentSFractionArray[1], aivSDen: studentSFractionArray[2]};
	window.location = htmlQueryConstructor('ans0501.html',queriesObject);
};