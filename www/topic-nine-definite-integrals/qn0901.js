/// <reference path="./math_atlas/math-atlas-monaca/www/lib/onsenui/js/onsenui.d.ts" />
"use strict";
// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
// global variables
let n, qnCase; // case 0: sine, upperLimit pi/2, 1: sine, upper limit pi, 2: cosine, 3: exp
let studentInputA, studentInputC, studentRadioB;
let sA, sB, sC;
// onPageLoad: initialize qn
let onPageLoad = function () {
    // Randomly generated elements
    n = getRandomIntY(1, 9);
    qnCase = getRandomIntY(0, 3);
    // generate question
    let curve = "y=x^2", nx = polyBuilderY([n, 0]);
    let upperLimit = '';
    switch (qnCase) {
        case 0:
            curve += "\\sin " + nx;
            upperLimit = "\\frac{\\pi}{" + (2 * n).toString() + "}";
            break;
        case 1:
            curve += "\\sin " + nx;
            if (n == 1) {
                upperLimit = "\\pi";
            }
            else {
                upperLimit = "\\frac{\\pi}{" + (n).toString() + "}";
            }
            ;
            break;
        case 2:
            curve += "\\cos " + nx;
            upperLimit = "\\frac{\\pi}{" + (2 * n).toString() + "}";
            break;
        case 3:
            curve += "\\mathrm{e}^{" + nx + "}";
            let upperLimitFraction = new Fraction("2/" + n);
            upperLimitFraction.simplify();
            upperLimit = upperLimitFraction.typeset;
            break;
    }
    // typeset question
    katex.render("R", document.getElementById('R'), { throwOnError: false });
    katex.render("R" + '.', document.getElementById('RTwo'), { throwOnError: false });
    katex.render(curve, document.getElementById('curve'), { throwOnError: false });
    katex.render("x=" + upperLimit, document.getElementById('line'), { throwOnError: false });
    katex.render("x", document.getElementById('x'), { throwOnError: false });
    katex.render(upperLimit + '.', document.getElementById('upperLimit'), { throwOnError: false });
    // student input fields
    studentRadioB = new StudentRadio(['b=1', 'b=2', 'b=3'], "bRadioDiv", "B", "submitButton");
    studentInputA = new StudentInput('f', 'aInputDiv', 'a', 'submitButton');
    studentInputC = new StudentInput('f', 'cInputDiv', 'c', 'submitButton');
};
// answer tab: start answering (a)
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
        // generate answer form
        let answerForm = "a\\pi^b + c";
        if (qnCase == 3) { // exponential case
            answerForm = "a \\mathrm{e}^b + c";
        }
        // typeset
        katex.render("R.", document.getElementById('RThree'), { throwOnError: false });
        katex.render(answerForm + '.', document.getElementById('answerForm'), { throwOnError: false });
        katex.render("a,b", document.getElementById('ab'), { throwOnError: false });
        katex.render("c?", document.getElementById('c'), { throwOnError: false });
        katex.render("a", document.getElementById('a'), { throwOnError: false });
        katex.render("b.", document.getElementById('b'), { throwOnError: false });
        katex.render("c", document.getElementById('cTwo'), { throwOnError: false });
        katex.render("-" + fractionBuilderY(22, 7), document.getElementById('fractionExample'), { throwOnError: false });
        katex.render("-22/7", document.getElementById('decimalExample'), { throwOnError: false });
        studentInputA.addToDOM();
        studentRadioB.addToDOM();
        studentInputC.addToDOM();
        studentInputA.linkRadio = studentRadioB;
        studentInputA.linkInput = studentInputC;
        studentRadioB.linkInput = studentInputC;
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
        sA = studentInputA.value;
        sC = studentInputC.value;
        sB = studentRadioB.option + 1;
        let sType;
        // typeset a
        if (sA.num == 1 && sA.den == 1) {
            sType = sA.sign;
        }
        else {
            sType = sA.typeset;
        }
        ;
        // typeset bTerm
        let bTerm = "\\pi";
        if (qnCase == 3) {
            bTerm = "\\mathrm{e}";
        }
        ;
        if (sB != 1) {
            bTerm += "^" + sB;
        }
        ;
        sType += bTerm;
        // typeset c
        if (sC.sign != "-") {
            sType += "+";
        }
        ;
        sType += sC.typeset;
        katex.render(sType, document.getElementById('studentA'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = { n: n, qnCase: qnCase, sASign: sA.sign, sANum: sA.num, sADen: sA.den, sB: sB, sCSign: sC.sign, sCNum: sC.num, sCDen: sC.den };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans0901.html', queriesObject);
};
