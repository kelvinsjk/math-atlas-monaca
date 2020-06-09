// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary
// Our question will be of the form : u_n = Num(n)/Den(n), where Den(n)=n (then Num(n) is 1 or n-1 or n+1), or Den(n)=n^2 (then Num(n) is 1)
// the variable nTranslate: 0: we use n, 1: we switch n to n-1, 2: we switch n to n+1. nSwap 0: u_n-1 - u_n, 1: u_n - u_n+1, 2: u_n+1 - u_n, 3: u_n - u_n-1
// (ai) Prove that u_n - u_{n+1} = \frac{a+bn}{g(n)}, where a and b are to be determined.
// (aii) Find sum (u_n - u_{n+1}) from n=h (h from 1 to 5) to N. The answer will be of the form c +/- f(n), where c is open ended and f(n) is MCQ
// (aiii) We will ask for a reason for convergence and the sum to infinity
// (b) We will ask for sum (u_n - u_{n+1}) where n is replaced with n \pm 1 or n\pm 2. The bottom limit will always change accordingly so that it matches (ai) but the top limit will be N

// global variables
var studentD;
var radioTwoIds = ['radioTwoZero', 'radioTwoOne', 'radioTwoTwo', 'radioTwoThree', 'radioTwoFour', 'radioTwoFive'];
var reasonTwoIds = ['reasonTwoZero', 'reasonTwoOne', 'reasonTwoTwo', 'reasonTwoThree', 'reasonTwoFour', 'reasonTwoFive'];
var caretTwoIds = ['caretTwoZero', 'caretTwoOne', 'caretTwoTwo', 'caretTwoThree', 'caretTwoFour', 'caretTwoFive'];
var nArray = ['1', 'n-4', 'n-3', 'n-2', 'n-1', 'n', 'n+1', 'n+2', 'n+3', 'n+4'];
var uNArray = ['u_{n-1}', 'u_{n+1}'];
var radioFlagTwo = false, radioProceed = false;
var substitute = getRandomNonZeroY(1, 2); // replace n with n + substitute
var iDTwo;
// Translate all numbers except 0
function indexTranslate(n, y) {
    if (y === void 0) { y = 2; }
    if (n == 0) {
        return n;
    }
    else {
        return n + y;
    }
}

// Query: Parse queriesObject from previous page
var queriesObject = parseQuery(window.location.search);
// Generate numbers
var numI = indexTranslate(Number(queriesObject.num)), denI = indexTranslate(Number(queriesObject.den)), numTwoI = indexTranslate(Number(queriesObject.numTwo)), denTwoI = indexTranslate(Number(queriesObject.denTwo)), square = Number(queriesObject.square), bottomLimit = Number(queriesObject.bottom), uNFront = Number(queriesObject.uNFront);
var newDenI = denI + substitute, newDenTwoI = denTwoI + substitute;
var denType, numType, denTypeMixed;
var newDenTypeMixed, newDenType;
if (square == 2) { // we square the denominator
    denType = squareY(nArray[denI]), numType = '1';
    newDenType = squareY(nArray[newDenI]);
}
else { // denominator non-square
    numType = nArray[numI], denType = nArray[denI];
    newDenType = nArray[newDenI];
}
;
// get u_n-1 or u_n+1
var numTypeTwo = nArray[numTwoI], denTypeTwo = nArray[denTwoI], newDenTypeTwo = nArray[newDenTwoI];
// typeset denominator
if (square == 2) {
    denTypeTwo = squareY(denTypeTwo);
    denTypeMixed = denType + denTypeTwo;
    newDenTypeTwo = squareY(newDenTypeTwo);
    newDenTypeMixed = newDenType + newDenTypeTwo;
}
else {
    denTypeMixed = parenthesisY(denType) + parenthesisY(denTypeTwo);
    newDenTypeMixed = parenthesisY(newDenType) + parenthesisY(newDenTypeTwo);
}
;
// calculate actualA and actualB
var actualA, actualB;
if (square == 2) {
    if (denI < denTwoI) {
        actualA = 2, actualB = 2 * (denI-2) - 5;
    }
    else {
        actualA = -2, actualB = -2 * (denTwoI-2) + 5;
    }
    ;
    if (uNFront == 2) {
        actualA *= -1;
        actualB *= -1;
    }
    ;
}
else {
    actualA = 0;
    if (denI < denTwoI) {
        if (numI == 0 || numI > denI) {
            actualB = 1;
        }
        else {
            actualB = -1;
        }
        ;
    }
    else {
        if (numI == 0 || numI > denI) {
            actualB = -1;
        }
        else {
            actualB = 1;
        }
        ;
    }
    ;
    if (uNFront == 2) {
        actualB *= -1;
    }
    ;
}
;
// typeset (a) question
var fractionType = fractionBuilderY(polyBuilderY([actualA, actualB], 'n'), denTypeMixed);
// if denominator is n-1 or n-2, we must start our bottom limit from 2 or 3
bottomLimit += 3 - Math.min(denI, denTwoI, 3);
// create strings for radio buttons in (aii)
var optionStringsAii = ['', '', '', '', '', ''];
optionStringsAii[0] = fractionBuilderY(numType, denType).replace(/n/g, 'N');
optionStringsAii[1] = '-' + optionStringsAii[0];
optionStringsAii[2] = fractionBuilderY(numTypeTwo, denTypeTwo).replace(/n/g, 'N');
optionStringsAii[3] = '-' + optionStringsAii[2];
;
optionStringsAii[4] = fractionType.replace(/n/g, 'N');
optionStringsAii[5] = fractionBuilderY(polyBuilderY([-actualA, -actualB], 'n'), denTypeMixed).replace(/n/g, 'N');
// calculate actualC and actualF(N)
var smallerNumIndex, smallerDenIndex, actualFN;
if (denI < denTwoI) {
    smallerNumIndex = numI;
    smallerDenIndex = denI;
    actualFN = 3; // representing -u_n+1
}
else {
    smallerDenIndex = denTwoI;
    smallerNumIndex = numTwoI;
    actualFN = 1; // representing -u_n
}
;
var actualCDen = bottomLimit + smallerDenIndex - 5;
if (square == 2) {
    actualCDen = actualCDen * actualCDen;
}
;
var actualCNum;
if (smallerNumIndex == 0) {
    actualCNum = 1;
}
else {
    actualCNum = bottomLimit + smallerNumIndex - 5;
}
;
var uNPlusMinus, actualCSign = '';
if (denTwoI > denI) {
    uNPlusMinus = 1;
}
else {
    uNPlusMinus = 0;
}
if ((uNFront == 2 && uNPlusMinus == 1) || (uNFront == 1 && uNPlusMinus == 0)) {
    actualCSign = '-';
    actualFN -= 1;
}
;
if (actualCNum == 0) {actualCSign = '-';};
var cType, plusSign, minusSign;
// add extra '+' sign in c+f(N) if f(N) is positive
if (actualFN % 2 == 0) {
    plusSign = '+';
    minusSign = '';
}
else {
    plusSign = '';
    minusSign = '-';
}
;
if (actualCNum == 0){
	cType = '';
} else if (actualCDen == 1) {
    cType = actualCNum.toString();
}
else {
    cType = fractionBuilderY(actualCNum, actualCDen);
}
;
// typeset (b) question: replacement
var newB = actualA * substitute + actualB;
var fractionTypeTwo = fractionBuilderY(polyBuilderY([actualA, newB], 'n'), newDenTypeMixed);
// create array for MCQ options in (b)
var numSub, denSub;
if (actualFN < 2) {
    numSub = numI;
    denSub = denI;
}
else {
    numSub = numTwoI;
    denSub = denTwoI;
}
;
var optionStringsB;
if (square == 1) {
    optionStringsB = [
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, -2)], nArray[denSub - 2]).replace(/n/g, 'N'),
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, -1)], nArray[denSub - 1]).replace(/n/g, 'N'),
        optionStringsAii[actualFN],
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, 1)], nArray[denSub + 1]).replace(/n/g, 'N'),
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, 2)], nArray[denSub + 2]).replace(/n/g, 'N'),
        fractionTypeTwo.replace(/n/g, 'N')
    ];
}
else {
    optionStringsB = [
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, -2)], squareY(nArray[denSub - 2])).replace(/n/g, 'N'),
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, -1)], squareY(nArray[denSub - 1])).replace(/n/g, 'N'),
        optionStringsAii[actualFN],
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, 1)], squareY(nArray[denSub + 1])).replace(/n/g, 'N'),
        minusSign + fractionBuilderY(nArray[indexTranslate(numSub, 2)], squareY(nArray[denSub + 2])).replace(/n/g, 'N'),
        fractionTypeTwo.replace(/n/g, 'N')
    ];
}
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        katex.render("u_1, u_2, u_3, \\ldots", document.getElementById('uOneTwo'), { throwOnError: false });
        katex.render("u_n =" + fractionBuilderY(numType, denType), document.getElementById('uN'), { throwOnError: false });
        katex.render("n \\geq 1.", document.getElementById('nGreater'), { throwOnError: false });
        if (uNFront == 1) { // u_n - xxx 
            katex.render("u_n -" + uNArray[uNPlusMinus] + '=' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
        }
        else { // xxx - u_n
            katex.render(uNArray[uNPlusMinus] + '-u_n =' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
        }
        ;
				if (actualCNum==0){actualCSign =''; cType=''; plusSign=''};
        katex.render('\\displaystyle \\sum_{n=' + bottomLimit + '}^N ' + fractionType + '=' + actualCSign + cType + plusSign + optionStringsAii[actualFN] + '.', document.getElementById('summationAnswer'), { throwOnError: false, displayMode: true });
        katex.render('\\displaystyle \\sum_{n=' + (bottomLimit - substitute) + '}^N ' + fractionTypeTwo, document.getElementById('summationSub'), { throwOnError: false, displayMode: true });
    }
    ;
}, false); // End of window.onload
// start answering: make tabs visible
var startAnswering = function () {
    // show tabBar and go to answer tab
    var tabBar = document.querySelector('ons-tabbar');
    tabBar.setAttribute('hide-tabs', 'false');
    tabBar.setAttribute('position', 'top');
    tabBar.setAttribute('swipeable', 'true');
    tabBar.setActiveTab(1)
        .then(function () {
        katex.render('\\displaystyle \\sum_{n=' + (bottomLimit - substitute) + '}^N ' + fractionTypeTwo, document.getElementById('summationSubTwo'), { throwOnError: false });
        katex.render('d+g(N)', document.getElementById('dPlus'), { throwOnError: false });
        katex.render('d', document.getElementById('d'), { throwOnError: false });
        katex.render('g(N)', document.getElementById('gN'), { throwOnError: false });
        katex.render('-\\frac{22}{7}', document.getElementById('fractionExample'), { throwOnError: false });
        katex.render('-22/7', document.getElementById('decimalExample'), { throwOnError: false });
        katex.render('d=', document.getElementById('dEquals'), { throwOnError: false });
        // typeset (aiii): radio buttons
        reasonTwoIds.forEach(function (radioString, i) {
            document.getElementById(radioString).innerHTML = "<span id='reasonTypeSetTwo" + i + "'></span>";
            katex.render('g(N)=' + optionStringsB[i], document.getElementById('reasonTypeSetTwo' + i), { throwOnError: false });
        });
        // prevents spaces
        var input_field = document.querySelector('#inputD'); // class type: fraction
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
        input_field.addEventListener('input', function () {
            if (input_field.validity.valid && input_field.value && radioFlagTwo) {
                document.getElementById('submitButton').style.display = 'block';
            }
            else {
                document.getElementById('submitButton').style.display = 'none';
            }
            ;
        });
    });
    // change button to say "go to Question" instead
    document.getElementById('answerButton').style.display = 'none';
    document.getElementById('goToAnswerButton').style.display = 'block';
};
// radio button control for question tab. Shows part S_infinity first time an option is chosen
var radioClickTwo = function (indexStr) {
    iDTwo = Number(indexStr);
    if (radioFlagTwo) { // radio buttons hidden: show all. Hide caret
        radioTwoIds.forEach(function (radioString, i) {
            document.getElementById(radioString).style.display = 'block';
        });
        document.getElementById(caretTwoIds[iDTwo]).style.display = 'none';
        radioFlagTwo = false;
    }
    else { // radio buttons shown: hide all but actual answer. Show caret
        radioTwoIds.forEach(function (radioString, i) {
            if (i != iDTwo) {
                document.getElementById(radioString).style.display = 'none';
            }
            ;
        });
        document.getElementById(caretTwoIds[iDTwo]).style.display = 'inline';
        radioFlagTwo = true;
    }
    ;
    // shows summation input on first click
    var input_field = document.querySelector('#inputD'); // class type: fraction
    if (input_field.validity.valid && input_field.value && radioFlagTwo) {
        document.getElementById('submitButton').style.display = 'block';
    }
    else {
        document.getElementById('submitButton').style.display = 'none';
    }
    ;
};
var moveOn = function () {
    // show dialog: create one if it's not present
    var dialog = document.getElementById('my-dialog');
    if (!dialog) {
        var modal_1 = document.querySelector('ons-modal');
        modal_1.show();
        // @ts-ignore
        ons.createElement('dialog.html', { append: true }).then(function () {
            modal_1.hide();
            moveOn();
        });
    }
    else {
        var dialog_1 = document.getElementById('my-dialog');
        // typesetting student's answer
        var input_field = document.querySelector('#inputD'); // class type: fraction
        studentD = new Fraction(input_field.value);
				var studentPlusSign = plusSign;
				if (iDTwo==5){ studentPlusSign = '+';};
				if (studentD.float == 0){sDTypeset = ''; studentPlusSign = '';} else{sDTypeset = studentD.Typeset;}
        katex.render('\\displaystyle \\sum_{n=' + (bottomLimit - substitute) + '}^N ' + fractionTypeTwo + '=' + sDTypeset + studentPlusSign + optionStringsB[iDTwo], document.getElementById('summationEquals'), { throwOnError: false, displayMode: true });
        // shows dialog
        dialog_1.show();
    } // end of if/else (dialog)
};
// passes Option selected to answer page
var proceedTob = function () {
	queriesObject.num = numI;
	queriesObject.den = denI;
	queriesObject.numTwo = numTwoI;
	queriesObject.denTwo = denTwoI;
	 queriesObject.substitute = substitute;
    queriesObject.sDSign = studentD.sign;
    queriesObject.sDNum = studentD.num;
    queriesObject.sDDen = studentD.den;
    queriesObject.gN = iDTwo; // console.log(queriesObject);
    window.location = htmlQueryConstructor('soln0501.html',queriesObject);
};