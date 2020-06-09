// This is a JavaScript file

// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary
// Our question will be of the form : u_n = Num(n)/Den(n), where Den(n)=n (then Num(n) is 1 or n-1 or n+1), or Den(n)=n^2 (then Num(n) is 1)
// the variable nTranslate: 0: we use n, 1: we switch n to n-1, 2: we switch n to n+1. nSwap 0: u_n-1 - u_n, 1: u_n - u_n+1, 2: u_n+1 - u_n, 3: u_n - u_n-1
// (ai) Prove that u_n - u_{n+1} = \frac{a+bn}{g(n)}, where a and b are to be determined.
// (aii) Find sum (u_n - u_{n+1}) from n=h (h from 1 to 5) to N. The answer will be of the form c +/- f(n), where c is open ended and f(n) is MCQ
// (aiii) We will ask for a reason for convergence and the sum to infinity
// (b) We will ask for sum (u_n - u_{n+1}) where n is replaced with n \pm 1 or n\pm 2. The bottom limit will always change accordingly so that it matches (ai) but the top limit will be N

//  Query: Add only if needed
var queriesObject = parseQuery(window.location.search);
var numI = (Number(queriesObject.num)), denI = (Number(queriesObject.den)), numTwoI = (Number(queriesObject.numTwo)), denTwoI = (Number(queriesObject.denTwo)), square = Number(queriesObject.square), bottomLimit = Number(queriesObject.bottom), uNFront = Number(queriesObject.uNFront);
var substitute = Number(queriesObject.substitute), sDSign = queriesObject.sDSign, sDNum = Number(queriesObject.sDNum), sDDen = Number(queriesObject.sDDen), studentGN = Number(queriesObject.gN);
var aiM = Number(queriesObject.aiM), aiiM = Number(queriesObject.aiiM), aiiiR = Number(queriesObject.aiiiR), aivSSign = queriesObject.aivSSign, aivSNum = Number(queriesObject.aivSNum), aivSDen = Number(queriesObject.aivSDen);
// indexTranslate function
function indexTranslate(n, y) {
    if (y === void 0) { y = 2; }
    if (n == 0) {
        return n;
    }
    else {
        return n + y;
    }
}
// global variables
var nArray = ['1', 'n-4', 'n-3', 'n-2', 'n-1', 'n', 'n+1', 'n+2', 'n+3', 'n+4'];
var uNArray = ['u_{n-1}', 'u_{n+1}'];
var runningMark = 0;
// Generate numbers
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
if (actualCDen == 1) {
    cType = actualCNum.toString();
}
else {
    cType = fractionBuilderY(actualCNum, actualCDen);
}
;
// typeset (aiii options)
var optionStringsAiii = ['', '', '', '', '', ''];
optionStringsAiii[0] = '\\textrm{as } n \\to \\infty, ' + fractionType + '\\to 0.';
optionStringsAiii[1] = '\\textrm{as } n \\to \\infty, ' + fractionType + '\\to \\infty.';
optionStringsAiii[2] = '-1 < r < 1';
optionStringsAiii[3] = '\\textrm{as } N \\to \\infty, ' + optionStringsAii[actualFN] + '\\to 0.';
optionStringsAiii[4] = '\\textrm{as } N \\to \\infty, ' + optionStringsAii[actualFN] + '\\to' + minusSign + '1.';
optionStringsAiii[5] = '\\textrm{as } N \\to \\infty, ' + optionStringsAii[actualFN] + '\\to \\infty.';
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
        var tabBar = document.querySelector('ons-tabbar');
        tabBar.setActiveTab(1);
    }
    ;
    if (event.target.matches('#ans001tab')) {
        // typeset question
        katex.render("u_1, u_2, u_3, \\ldots", document.getElementById('uOneTwo'), { throwOnError: false });
        katex.render("u_n =" + fractionBuilderY(numType, denType), document.getElementById('uN'), { throwOnError: false });
        katex.render("n \\geq 1.", document.getElementById('nGreater'), { throwOnError: false });
        if (uNFront == 1) { // u_n - xxx 
            katex.render("u_n -" + uNArray[uNPlusMinus] + '=' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
            katex.render("u_n -" + uNArray[uNPlusMinus] + '=' + fractionType, document.getElementById('showAi'), { throwOnError: false });
        }
        else { // xxx - u_n
            katex.render(uNArray[uNPlusMinus] + '-u_n =' + fractionType, document.getElementById('uNMinus'), { throwOnError: false });
            katex.render(uNArray[uNPlusMinus] + '-u_n =' + fractionType, document.getElementById('showAi'), { throwOnError: false });
        }
        ;
				if (actualCNum==0){actualCSign = ''; cType=''; plusSign=''};
        katex.render('\\displaystyle \\sum_{n=' + bottomLimit + '}^N ' + fractionType + '=' + actualCSign + cType + plusSign + optionStringsAii[actualFN] + '.', document.getElementById('summationAnswer'), { throwOnError: false, displayMode: true });
        katex.render('\\displaystyle \\sum_{n=' + bottomLimit + '}^N ' + fractionType + '=' + actualCSign + cType + plusSign + optionStringsAii[actualFN] + '.', document.getElementById('showAii'), { throwOnError: false });
        katex.render('\\displaystyle \\sum_{n=' + (bottomLimit - substitute) + '}^N ' + fractionTypeTwo, document.getElementById('summationSub'), { throwOnError: false, displayMode: true });
        // mark (ai) and (aii)
        if (aiM > 0) {
            runningMark += 1;
            document.getElementById('checkMarkOne').style.display = 'inline';
            if (aiM == 2) {
                document.getElementById('checkMarkTwo').style.display = 'inline';
                runningMark += 1;
            }
            ;
        }
        ;
        if (aiiM > 0) {
            runningMark += 1;
            document.getElementById('checkMarkThree').style.display = 'inline';
            if (aiiM == 2) {
                document.getElementById('checkMarkFour').style.display = 'inline';
                runningMark += 1;
            }
            ;
        }
        ;
        // (aiii)
        katex.render(optionStringsAiii[aiiiR], document.getElementById('studentReason'), { throwOnError: false });
        var actualAiii = void 0, limit = void 0;
        if (numI == 0) {
            actualAiii = 3;
            limit = 0;
        }
        else {
            actualAiii = 4;
            limit = Number(minusSign + 1);
        }
        ;
        katex.render(optionStringsAiii[actualAiii], document.getElementById('actualReason'), { throwOnError: false });
        if (aiiiR == actualAiii) {
            document.getElementById('checkMarkFive').style.display = 'inline';
            runningMark += 1;
        }
        ;
        // (aiv)
        if (aivSDen == 1) {
            katex.render("S_{\\infty}=" + aivSSign + aivSNum, document.getElementById('studentS'), { throwOnError: false });
        }
        else {
            katex.render("S_{\\infty}=" + aivSSign + fractionBuilderY(aivSNum, aivSDen), document.getElementById('studentS'), { throwOnError: false });
        }
        var realS = addFractionsY([Number(actualCSign + actualCNum), actualCDen], [limit, 1]);
        var actualSSign = '', actualSNum = void 0, actualSDen = realS[1];
        if (realS[0] > 0) {
            actualSNum = realS[0];
        }
        else {
            actualSNum = Math.abs(realS[0]), actualSSign = '-';
        }
        ;
        if (actualSDen == 1) {
            katex.render("S_{\\infty}=" + actualSSign + actualSNum, document.getElementById('actualS'), { throwOnError: false });
        }
        else {
            katex.render("S_{\\infty}=" + actualSSign + fractionBuilderY(actualSNum, actualSDen), document.getElementById('actualS'), { throwOnError: false });
        }
        ;
        if (((aivSNum / aivSDen).toPrecision(7) == (actualSNum / actualSDen).toPrecision(7)) && aivSSign == actualSSign) {
            document.getElementById('checkMarkSix').style.display = 'inline';
            runningMark += 1;
        }
        // (b)
        var stringFront = '\\displaystyle \\sum_{n=' + (bottomLimit - substitute) + '}^N ' + fractionTypeTwo + '=';
				var studentPlusSign = plusSign;
				if (studentGN==5){ studentPlusSign = '+';};
        if (sDDen == 1) {
					if (sDNum==0){sDSign='', sDType=''; studentPlusSign=''} else{sDType = sDNum;};
            katex.render(stringFront + sDSign + sDType + studentPlusSign + optionStringsB[studentGN], document.getElementById('studentSubstitution'), { throwOnError: false });
        }
        else {
            katex.render(stringFront + sDSign + fractionBuilderY(sDNum, sDDen) + studentPlusSign + optionStringsB[studentGN], document.getElementById('studentSubstitution'), { throwOnError: false });
        }
        ;
        if (actualCDen == 1) {
					if (actualCNum==0){actualCSign = ''; cType=''; plusSign=''};
            katex.render(stringFront + actualCSign + cType + plusSign + optionStringsB[2 + substitute], document.getElementById('actualSubstitution'), { throwOnError: false });
        }
        else {
            katex.render(stringFront + actualCSign + fractionBuilderY(actualCNum, actualCDen) + plusSign + optionStringsB[2 + substitute], document.getElementById('actualSubstitution'), { throwOnError: false });
        }
        ;
        if (((sDNum / sDDen).toPrecision(7) == (actualCNum / actualCDen).toPrecision(7)) && sDSign == actualCSign) {
            document.getElementById('checkMarkSeven').style.display = 'inline';
            runningMark += 1;
        }
        ;
        if (studentGN == (2 + substitute)) {
            document.getElementById('checkMarkEight').style.display = 'inline';
            runningMark += 1;
        }
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 8); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/8';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 8) {
            comments += "8/8 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 3) {
            comments += runningMark + "/8 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/8 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    }
    ; // end of event listener tab
}, false); // End of window.onload
