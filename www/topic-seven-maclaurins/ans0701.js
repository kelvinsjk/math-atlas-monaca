// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 7: questions 0701
// global variables
let bPrimeType;
let ABStringStudent;
// Randomly generated elements. TODO: change to take from queriesObject
let queriesObject = parseQueryY(window.location.search);
let a = Number(queriesObject.a), alpha = Number(queriesObject.alpha), b = Number(queriesObject.b), cosOrSin = Number(queriesObject.cOrS); // 1: cosine, 2: sine
// actual answers
let actualA = a * a + b * b - 2 * a * b, actualB = a * b;
let ABStringStart = 'AB \\approx ';
let ABStringEnd = 'c+d\\theta^2';
// question generation
let BCString = 'BC=' + a + ', AC=' + b;
let ABString = '\\left (' + actualA + '+' + actualB + '\\theta^2 \\right)^{\\frac{1}{2}}';
let ABTwo = 'AB \\approx ';
if (cosOrSin == 2) {
    let oldA = actualA;
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
    ABString = surdTypeset([actualA, actualB]) + '\\theta';
    ABTwo = '\\left (' + oldA + '+AB^2 \\right)^{\\frac{1}{2}} \\approx ';
}
// student input fields
let studentInputC = new StudentInput('iP', 'cInputDiv', 'c', 'submitButton');
let studentInputD = new StudentInput('fP', 'dInputDiv', 'd', 'submitButton');
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        // typeset question
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
    }
    ; // end of event listener tab
}, false); // End of window.onload
window.fn.openTwo = function() {
var menu = document.getElementById('menuTwo');
menu.open();
katex.render("(1+x)^n = 1 + nx + \\frac{n(n-1)}{x^2}+\\ldots + \\frac{n(n-1)\\ldots(n-r+1)}{r!}x^r + \\ldots", document.getElementById('binomial'), {throwOnError: false, displayMode:true});
katex.render("\\sin x = x - \\frac{x^3}{3!}+ \\frac{x^5}{5!} - \\ldots + \\frac{(-1)^r x^{2r+1} }{(2r+1)!} + \\ldots", document.getElementById('sinExpand'), {throwOnError: false, displayMode:true});
katex.render("\\cos x = 1 - \\frac{x^2}{2!}+ \\frac{x^4}{4!} - \\ldots + \\frac{(-1)^{r+1} x^{2r} }{(2r)!} + \\ldots", document.getElementById('cosExpand'), {throwOnError: false, displayMode:true});
};
// answer tab: start answering (b)
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
        katex.render(ABTwo + ABStringEnd + ".", document.getElementById('ABThree'), { throwOnError: false });
        katex.render("c", document.getElementById('cTwo'), { throwOnError: false });
        katex.render("d", document.getElementById('dTwo'), { throwOnError: false });
        studentInputC.addToDOM();
        studentInputD.addToDOM();
        studentInputC.linkInput = studentInputD;
        studentInputD.insertFractionHeader('fractionText');
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
        let studentDTypeset = ''; // if student's answer is 1
        // @ts-ignore
        if (studentInputD.value.float != 1) {
            studentDTypeset = studentInputD.value.typeset;
        }
        // @ts-ignore
        ABStringStudent = ABStringEnd.replace('c', studentInputC.value.toString());
        ABStringStudent = ABStringStudent.replace('d', studentDTypeset);
        katex.render(ABTwo + ABStringStudent, document.getElementById('studentB'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    queriesObject.sC = studentInputC.value;
    // @ts-ignore
    queriesObject.sDSign = studentInputD.value.sign;
    queriesObject.sDNum = studentInputD.value.num;
    queriesObject.sDDen = studentInputD.value.den;
    // @ts-ignore
    window.location = htmlQueryConstructor('soln0701.html', queriesObject);
};
