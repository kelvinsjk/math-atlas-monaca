// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 7: question 0701
// Randomly generated elements. TODO: change to take from queriesObject
let queriesObject = parseQueryY(window.location.search);
let a = Number(queriesObject.a), alpha = Number(queriesObject.alpha), b = Number(queriesObject.b), cosOrSin = Number(queriesObject.cOrS); // 1: cosine, 2: sine
let sC = Number(queriesObject.sC), sDSign = queriesObject.sDSign, sDNum = Number(queriesObject.sDNum), sDDen = Number(queriesObject.sDDen), partAMark = Number(queriesObject.aiM);
// Randomly generated elements TODO: change to take from query
/* let a = getRandomIntY(1, 13), alpha = getRandomIntY(3, 4), b = a, cosOrSin = getRandomIntY(1, 2); // 1: cosine, 2: sine
while (Number.isInteger(Math.sqrt(a * b))) { // ensure ab is not a perfect square
    b = getRandomIntY(1, 13);
} */
let runningMark = partAMark;
// actual answers
let actualA = a * a + b * b - 2 * a * b, actualB = a * b;
let actualC = Math.abs(a - b);
let simplifiedD = simplifyFractionY(a * b, 2 * Math.abs(a - b));
let actualD = new Fraction(simplifiedD[0] + "/" + simplifiedD[1]);
if (simplifiedD[1] == 1) {
    actualD = new Fraction(simplifiedD[0].toString());
}
; // not a fraction
let ABStringStart = 'AB \\approx ';
let ABStringEnd = 'c+d\\theta^2';
let bPrimeType;
// question generation
let BCString = 'BC=' + a + ', AC=' + b;
let ABString = '\\left (' + actualA + '+' + actualB + '\\theta^2 \\right)^{\\frac{1}{2}}';
let ABTwo = 'AB \\approx ';
if (cosOrSin == 2) {
    let k = 6 - alpha; // k referring to sqrt(k)/2 from sin alpha
    let bPrimeNum = surdSimplifier(a * b * k);
    if (bPrimeNum[0] % 2 == 0) { // not fractions
        bPrimeType = surdTypeset([bPrimeNum[0] / 2, bPrimeNum[1]]);
    }
    else { // answer of form sqrt(abk)/2
        bPrimeType = fractionBuilderY(surdTypeset(bPrimeNum), 2);
    }
    BCString = 'BC=' + bPrimeType;
    let sqrtAB = surdSimplifier(a * b);
    let oldA = actualA;
    actualA = sqrtAB[0];
    actualB = sqrtAB[1];
    ABString = surdTypeset([actualA, actualB]) + '\\theta';
    ABTwo = '\\left (' + oldA + '+AB^2 \\right)^{\\frac{1}{2}} \\approx ';
}
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        // typeset qn tab
        katex.render("ABC", document.getElementById('ABC'), { throwOnError: false });
        katex.render(BCString, document.getElementById('BC'), { throwOnError: false });
        katex.render("BCA = \\theta", document.getElementById('BCAAngle'), { throwOnError: false });
        katex.render("\\theta", document.getElementById('theta'), { throwOnError: false });
        katex.render(ABStringStart + ABString + '.', document.getElementById('AB'), { throwOnError: false, displayMode: true });
        katex.render("c", document.getElementById('c'), { throwOnError: false });
        katex.render("d", document.getElementById('d'), { throwOnError: false });
        if (cosOrSin == 2) {
            katex.render('BAC=' + fractionBuilderY("\\pi", alpha), document.getElementById('ABCAngle'), { throwOnError: false });
            document.getElementById('sineExtra').style.display = "inline";
        }
        katex.render(ABTwo + ABStringEnd + ".", document.getElementById('ABTwo'), { throwOnError: false, displayMode: true });
        let tabBar = document.querySelector('ons-tabbar');
        tabBar.setActiveTab(1);
    }
    ;
    if (event.target.matches('#ans001tab')) {
        // typeset (a)
        katex.render(ABStringStart + ABString, document.getElementById('showA'), { throwOnError: false });
        if (partAMark > 0) {
            document.getElementById('checkMarkOne').style.display = 'inline';
            if (partAMark == 2) {
                document.getElementById('checkMarkTwo').style.display = 'inline';
            }
        }
        // typeset (b)
        let sDTypeset = sDSign + sDNum;
        if (sDDen != 1) {
            sDTypeset = sDSign + fractionBuilderY(sDNum, sDDen);
        }
        ;
        katex.render(ABTwo + sC + "+" + sDTypeset + "\\theta^2", document.getElementById('studentB'), { throwOnError: false });
        katex.render(ABTwo + actualC + "+" + actualD.typeset + "\\theta^2", document.getElementById('actualB'), { throwOnError: false });
        // mark (b)
        let partBMark = 0;
        if (actualC == sC) {
            partBMark++;
        }
        ;
        if (actualD.float.toPrecision(2) == (sDNum / sDDen).toPrecision(2)) {
            partBMark++;
            if (sDSign == '' && ((sDDen == 1 && sDNum.toFixed(5) == actualD.float.toFixed(5)) || (sDDen == actualD.den && sDNum == actualD.num))) { // full marks
                partBMark++;
            }
        }
        else if (((sDNum / sDDen) * Math.abs(a - b)).toPrecision(2) == actualD.float.toPrecision(2)) { // chance for working mark if forgot to expand
            partBMark++;
        }
        if (partBMark > 0) {
            document.getElementById('checkMarkThree').style.display = 'inline';
            if (partBMark > 1) {
                document.getElementById('checkMarkFour').style.display = 'inline';
                if (partBMark == 3) {
                    document.getElementById('checkMarkFive').style.display = 'inline';
                }
            }
        }
        runningMark += partBMark;
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 5); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/5';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 5) {
            comments += "5/5 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 2) {
            comments += runningMark + "/5 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/5 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    }
    ; // end of event listener tab
}, false); // End of window.onload
