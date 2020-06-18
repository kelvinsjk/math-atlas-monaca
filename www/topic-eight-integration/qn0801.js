/// <reference path="./math_atlas/math-atlas-monaca/www/lib/onsenui/js/onsenui.d.ts" />
"use strict";
// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
// global variables
let mf26Flag, choiceArray, a, b, aChoice, c, sign, upperLimitFraction, upperLimitType;
let sqrt3, integralAString;
let studentInputA, studentInputB, studentRadioChoice;
// onPageLoad: initialize qn
let onPageLoad = function () {
    mf26Flag = true;
    // mcq choices
    choiceArray = [
        "a \\tan b",
        "a \\sin^{-1} b",
        "a \\sqrt{b}",
        "a \\pi+b",
        "a \\ln b",
        "a \\mathrm{e}^{b}"
    ];
    // Randomly generated elements
    a = getRandomIntY(1, 9);
    b = getRandomIntY(2, 9);
    aChoice = getRandomIntY(1, 2);
    c = getRandomIntY(3, 5);
    if (c == 5) {
        c = 6;
    }
    ; // c: 3, 4 or 6 representing pi/3, pi/4 or pi/6
    // values for aChoice 1: + sign
    sign = '+';
    upperLimitFraction = simplifyFractionY(a, b);
    sqrt3 = '\\sqrt{3}';
    // typeset upper limit
    if (upperLimitFraction[1] == 1 && (c == 3 || c == 4)) { // handle integer cases first
        upperLimitType = upperLimitFraction[0].toString(); // a/b as int
        if (c == 3) {
            upperLimitType += sqrt3;
        }
        ; // a/b sqrt{3}
        if (c == 3 && upperLimitFraction[0] == 1) {
            upperLimitType = sqrt3;
        }
        ;
    }
    else { // fraction cases
        upperLimitType = "\\frac{";
        if (upperLimitFraction[0] != 1 || c != 3) {
            upperLimitType += upperLimitFraction[0].toString();
        }
        if (c == 3) {
            upperLimitType += sqrt3;
        }
        ; // for pi/3, we have a sqrt{3}/b
        upperLimitType += "}{";
        if (upperLimitFraction[1] != 1) {
            upperLimitType += upperLimitFraction[1];
        }
        ; // all fraction cases have b in denominator. integer case of a/b does not
        if (c == 6) {
            upperLimitType += sqrt3;
        }
        ; // for pi/6, sqrt{3} appears on denominator
        upperLimitType += "}";
    }
    // values for aChoice 2: - sign
    if (aChoice == 2) {
        sign = '-';
        upperLimitFraction = simplifyFractionY(a, b * c);
        if (upperLimitFraction[1] == 1) {
            upperLimitType = upperLimitFraction[0].toString();
        }
        else {
            upperLimitType = fractionBuilderY(upperLimitFraction[0], upperLimitFraction[1]);
        }
    }
    // generate question
    integralAString = "\\displaystyle \\int_0^";
    // question generation
    integralAString += "{" + upperLimitType + "}" + fractionBuilderY(1, (a * a).toString() + sign + (b * b).toString() + "x^2") + "\\; \\mathrm{d}x";
    // student input fields
    studentRadioChoice = new StudentRadio(choiceArray, "reasonRadioDiv", "Choice", "submitButton");
    studentInputA = new StudentInput('fP', 'aInputDiv', 'a', 'submitButton');
    if (aChoice == 1) {
        studentInputB = new StudentInput('iP', 'bInputDiv', 'b', 'submitButton');
    }
    else {
        studentInputB = new StudentInput('fP', 'bInputDiv', 'b', 'submitButton');
    }
    ;
    katex.render(integralAString + ".", document.getElementById('integralA'), { throwOnError: false, displayMode: true });
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
        katex.render(integralAString + '.', document.getElementById('integralATwo'), { throwOnError: false });
        katex.render(fractionBuilderY(22, 7), document.getElementById('fractionExample'), { throwOnError: false });
        katex.render("22/7", document.getElementById('decimalExample'), { throwOnError: false });
        studentRadioChoice.addToDOM();
        studentInputA.addToDOM();
        studentInputB.addToDOM();
        studentInputA.linkInput = studentInputB;
        studentInputA.linkRadio = studentRadioChoice;
        studentInputB.linkRadio = studentRadioChoice;
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
        let sA = studentInputA.value;
        let studentAnswerString = choiceArray[studentRadioChoice.option].replace('a', sA.typeset);
        if (aChoice == 1) {
            let sB = studentInputB.value;
            if (sB == 0 && studentRadioChoice.option == 3) { // for a \\pi + b case, typeset nothing if b=0
                studentAnswerString = studentAnswerString.replace('+b', '');
            }
            else {
                studentAnswerString = studentAnswerString.replace('b', sB.toString());
            }
        }
        else { // option 2
            let sB = studentInputB.value;
            studentAnswerString = studentAnswerString.replace('b', sB.typeset);
        }
        katex.render(studentAnswerString, document.getElementById('studentA'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let sA = studentInputA.value;
    let sBSign = '', sBNum, sBDen = 1;
    if (aChoice == 1) {
        let sB = studentInputB.value;
        sBNum = sB;
    }
    else {
        let sB = studentInputB.value;
        sBSign = sB.sign;
        sBNum = sB.num;
        sBDen = sB.den;
    }
    let queriesObject = { a: a, b: b, c: c, aChoice: aChoice, sRadio: studentRadioChoice.option, sASign: sA.sign, sANum: sA.num, sADen: sA.den, sBSign: sBSign, sBNum: sBNum, sBDen: sBDen };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans0801.html', queriesObject);
};
// MF26
// @ts-ignore
window.fn.openTwo = function () {
    let menu = document.getElementById('menuTwo');
    if (mf26Flag) {
        katex.render("a", document.getElementById('mf26a'), { throwOnError: false });
        katex.render("f(x)", document.getElementById('fx'), { throwOnError: false });
        katex.render("\\int f(x) \\; \\mathrm{d}x", document.getElementById('intFx'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{x^2+a^2}", document.getElementById('intOne'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{\\sqrt{a^2-x^2}}", document.getElementById('intTwo'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{x^2-a^2}", document.getElementById('intThree'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{a^2-x^2}", document.getElementById('intFour'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{a}\\tan^{-1} \\left ( \\frac{x}{a} \\right)", document.getElementById('intOneAns'), { throwOnError: false });
        katex.render("\\displaystyle \\sin^{-1} \\left (\\frac{x}{a}\\right)", document.getElementById('intTwoAns'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{2a}\\ln \\left( \\frac{x-a}{x+a} \\right)", document.getElementById('intThreeAns'), { throwOnError: false });
        katex.render("\\displaystyle \\frac{1}{2a}\\ln \\left( \\frac{a+x}{a-x} \\right)", document.getElementById('intFourAns'), { throwOnError: false });
        katex.render("(|x| < a)", document.getElementById('domainTwo'), { throwOnError: false });
        katex.render("(x > a)", document.getElementById('domainThree'), { throwOnError: false });
        katex.render("(|x| < a)", document.getElementById('domainFour'), { throwOnError: false });
        mf26Flag = false;
    }
    menu.open();
};
