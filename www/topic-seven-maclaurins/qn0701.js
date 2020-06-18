// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: questions 0601
// global variables
let partAMark = 0;
let bPrimeType;
// Randomly generated elements
let a = getRandomIntY(1, 13), alpha = getRandomIntY(3, 4), b = a, cosOrSin = getRandomIntY(1, 2); // 1: cosine, 2: sine
while (Number.isInteger(Math.sqrt(a * b))) { // ensure ab is not a perfect square
    b = getRandomIntY(1, 13);
}
// actual answers
let actualA = a * a + b * b - 2 * a * b, actualB = a * b;
let ABStringStart = 'AB \\approx ';
let ABStringTwo;
// question generation
let BCString = 'BC=' + a + ', AC=' + b;
let ABString = '\\left ( a + b \\theta^2 \\right)^{\\frac{1}{2}}';
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
    actualA = sqrtAB[0];
    actualB = sqrtAB[1];
    ABString = 'a \\sqrt{b} \\theta';
}
// student input fields
let studentInputA = new StudentInput('iP', 'aInputDiv', 'a', 'submitButton');
let studentInputB = new StudentInput('iP', 'bInputDiv', 'b', 'submitButton');
let tabFlag = false;
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        // typeset question
        katex.render("ABC", document.getElementById('ABC'), { throwOnError: false });
        katex.render(BCString, document.getElementById('BC'), { throwOnError: false });
        katex.render("BCA = \\theta", document.getElementById('BCAAngle'), { throwOnError: false });
        katex.render("\\theta", document.getElementById('theta'), { throwOnError: false });
        katex.render(ABStringStart + ABString + ',', document.getElementById('AB'), { throwOnError: false, displayMode: true });
        katex.render("a", document.getElementById('a'), { throwOnError: false });
        katex.render("b", document.getElementById('b'), { throwOnError: false });
        if (cosOrSin == 2) {
            katex.render('BAC=' + fractionBuilderY("\\pi", alpha), document.getElementById('ABCAngle'), { throwOnError: false });
            document.getElementById('sineExtra').style.display = "inline";
        }
			tabFlag = true;
    }
    ; // end of event listener tab
}, false); // End of window.onload
setTimeout( function() {
	if (!tabFlag) {
			        // typeset question
        katex.render("ABC", document.getElementById('ABC'), { throwOnError: false });
        katex.render(BCString, document.getElementById('BC'), { throwOnError: false });
        katex.render("BCA = \\theta", document.getElementById('BCAAngle'), { throwOnError: false });
        katex.render("\\theta", document.getElementById('theta'), { throwOnError: false });
        katex.render(ABStringStart + ABString + ',', document.getElementById('AB'), { throwOnError: false, displayMode: true });
        katex.render("a", document.getElementById('a'), { throwOnError: false });
        katex.render("b", document.getElementById('b'), { throwOnError: false });
        if (cosOrSin == 2) {
            katex.render('BAC=' + fractionBuilderY("\\pi", alpha), document.getElementById('ABCAngle'), { throwOnError: false });
            document.getElementById('sineExtra').style.display = "inline";
        }
	}
}, 1000);
window.fn.openTwo = function() {
var menu = document.getElementById('menuTwo');
menu.open();
katex.render("(1+x)^n = 1 + nx + \\frac{n(n-1)}{x^2}+\\ldots + \\frac{n(n-1)\\ldots(n-r+1)}{r!}x^r + \\ldots", document.getElementById('binomial'), {throwOnError: false, displayMode:true});
katex.render("\\sin x = x - \\frac{x^3}{3!}+ \\frac{x^5}{5!} - \\ldots + \\frac{(-1)^r x^{2r+1} }{(2r+1)!} + \\ldots", document.getElementById('sinExpand'), {throwOnError: false, displayMode:true});
katex.render("\\cos x = 1 - \\frac{x^2}{2!}+ \\frac{x^4}{4!} - \\ldots + \\frac{(-1)^{r+1} x^{2r} }{(2r)!} + \\ldots", document.getElementById('cosExpand'), {throwOnError: false, displayMode:true});
};
// answer tab: start answering (aii)
let startAnswering = function () {
    // change button to say "go to Question" instead
    document.getElementById('answerButton').style.display = 'none';
    document.getElementById('goToAnswerButton').style.display = 'block';
    // show tabBar and go to answer tab
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setAttribute('hide-tabs', 'false');
    tabBar.setAttribute('position', 'top');
    tabBar.setAttribute('swipeable', 'true');
    tabBar.setActiveTab(1).then(function () {
        katex.render(ABStringStart +ABString, document.getElementById('ABTwo'), { throwOnError: false });
        katex.render("a", document.getElementById('aTwo'), { throwOnError: false });
        katex.render("b", document.getElementById('bTwo'), { throwOnError: false });
        studentInputA.addToDOM();
        studentInputB.addToDOM();
        studentInputA.linkInput = studentInputB;
        if (cosOrSin == 2) {
            document.getElementById('abExtra').innerHTML = 'after we simplify our surd to simplest form, such that both <span id="abExtraTwo"></span> are integers?';
            katex.render("a\\textrm{ and } b", document.getElementById('abExtraTwo'), { throwOnError: false });
        }
    });
};
// moveOn: (a) asks for student confirmation
let moveOn = function () {
    // show confirmation dialog: create one if it's not present
    let dialog = document.getElementById('my-dialog');
    if (!dialog) {
        let modal = document.querySelector('ons-modal');
        modal.show();
        // @ts-ignore
        ons.createElement('dialog.html', { append: true }).then(function () {
            modal.hide();
            moveOn();
        });
    }
    else {
        // typesetting student answer
        if (cosOrSin == 2) {
            // @ts-ignore
            ABStringTwo = surdTypeset([studentInputA.value, studentInputB.value]) + "\\theta";
            katex.render(ABStringStart + ABStringTwo, document.getElementById('studentA'), { throwOnError: false });
        }
        else { // 
            let studentBTypeset = ''; // if student's answer is 1
            // @ts-ignore
            if (studentInputB.value != 1) {
                studentBTypeset = studentInputB.value.toString();
            }
            // @ts-ignore
            ABStringTwo = ABString.replace('a', studentInputA.value.toString());
            ABStringTwo = ABStringTwo.replace('b', studentBTypeset);
            katex.render(ABStringStart + ABStringTwo, document.getElementById('studentA'), { throwOnError: false });
        }
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// (aii) confirmed: mark, show answer and move to (b)
let showAnswerA = function () {
    // @ts-ignore
    hideDialog('my-dialog');
    // mark answer
    if (studentInputA.value == actualA) {
        partAMark += 1;
    }
    ;
    if (studentInputB.value == actualB) {
        partAMark += 1;
    }
    ;
    // typeset actual answer
    let ABStringActual;
    if (cosOrSin == 1) {
        ABStringActual = ABString.replace("a", actualA.toString());
        ABStringActual = ABStringActual.replace("b", actualB.toString());
    }
    else {
        // @ts-ignore
        if ((studentInputA.value * Math.sqrt(studentInputB.value)).toPrecision(3) == (actualA * Math.sqrt(actualB)).toPrecision(3) && partAMark == 0) {
            partAMark += 1;
        }
        ;
        ABStringActual = surdTypeset([actualA, actualB]);
    }
    // show new Dialog to comment on answer
    // @ts-ignore
    ons.createElement('dialog-aii.html', { append: true }).then(function (dialog) {
        dialog.show();
				var ABEnd = '';
				if (cosOrSin==2){ var ABEnd = '\\theta'};
				ABEnd += '.';
        katex.render(ABStringStart + ABStringActual +  ABEnd, document.getElementById('aAnswer'), { throwOnError: false });
        if (partAMark == 2) { // full marks )
            document.getElementById('rightOrWrong').innerHTML = "Well done!";
            document.getElementById('answerAComments').style.display = 'none';
            document.getElementById('aMarksSpan').innerHTML = partAMark.toString();
        }
        else if (partAMark > 0) { // non-zero
            katex.render(ABStringStart + ABStringTwo, document.getElementById('studentATwo'), { throwOnError: false });
            document.getElementById('aMarksSpan').innerHTML = partAMark.toString();
        }
        else { // no marks
            katex.render(ABStringStart + ABStringTwo, document.getElementById('studentATwo'), { throwOnError: false });
            document.getElementById('aMarksReceived').style.display = 'none';
        }
        ;
    });
};
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = { a: a, b: b, alpha: alpha, cOrS: cosOrSin, aiM: partAMark };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans0701.html', queriesObject);
};
