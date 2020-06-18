/// <reference path="./math_atlas/math-atlas-monaca/www/lib/onsenui/js/onsenui.d.ts" />
"use strict";
// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: questions 0601
// global variables
let mnoString;
let sM, sN, sO;
let n, bChoice, nMinus;
let xTypeset, integralBString;
let studentInputM, studentInputN, studentInputO;
let queriesObject;
let onPageLoad = function () {
    mnoString = "m\\mathrm{e}^{n}+o.";
    // Randomly generated elements
    queriesObject = parseQueryY(window.location.search);
    n = getRandomNonZeroY(2, 9);
    bChoice = getRandomIntY(1, 2); // 1: ln, 2: exp
    nMinus = n - 1;
    // values for bChoice 1: ln
    xTypeset = 'x^{' + nMinus + '}';
    if (nMinus == 0) {
        xTypeset = '';
    }
    ;
    integralBString = "\\displaystyle \\int_1^\\mathrm{e}" + xTypeset + "\\ln x \\; \\mathrm{d}x.";
    // values for bChoice 2: exp
    if (bChoice == 2) {
        integralBString = "\\displaystyle \\int_0^1 x \\mathrm{e}^{" + polyBuilderY([n, 0]) + "} \\mathrm{d}x.";
    }
    // student input fields
    studentInputM = new StudentInput('f', 'mInputDiv', 'm', 'submitButton');
    studentInputN = new StudentInput('f', 'nInputDiv', 'n', 'submitButton');
    studentInputO = new StudentInput('f', 'oInputDiv', 'o', 'submitButton');
    katex.render(integralBString, document.getElementById('integralB'), { throwOnError: false, displayMode: true });
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
        katex.render(integralBString, document.getElementById('integralBTwo'), { throwOnError: false });
        katex.render(mnoString, document.getElementById('mno'), { throwOnError: false });
        katex.render("m,n", document.getElementById('mn'), { throwOnError: false });
        katex.render("o?", document.getElementById('o'), { throwOnError: false });
        katex.render("-" + fractionBuilderY(22, 7), document.getElementById('fractionExample'), { throwOnError: false });
        katex.render("-22/7", document.getElementById('decimalExample'), { throwOnError: false });
        studentInputM.addToDOM();
        studentInputN.addToDOM();
        studentInputO.addToDOM();
        studentInputM.linkInput = studentInputN;
        studentInputM.linkInput = studentInputO;
        studentInputN.linkInput = studentInputO;
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
        sM = studentInputM.value;
        let studentAnswerString = mnoString.replace('m', sM.typeset);
        sN = studentInputN.value;
        let sNTypeset = '';
        if (sN.float != 1) {
            sNTypeset = sN.typeset;
        }
        ;
        studentAnswerString = studentAnswerString.replace('n', sNTypeset);
        sO = studentInputO.value;
        studentAnswerString = studentAnswerString.replace('o', sO.typeset);
        katex.render(studentAnswerString, document.getElementById('studentB'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    // @ts-ignore
    queriesObject.n = n;
    queriesObject.bChoice = bChoice;
    // @ts-ignore
    queriesObject.sMSign = sM.sign;
    queriesObject.sMNum = sM.num;
    queriesObject.sMDen = sM.den;
    // @ts-ignore
    queriesObject.sNSign = sN.sign;
    queriesObject.sNNum = sN.num;
    queriesObject.sNDen = sN.den;
    // @ts-ignore
    queriesObject.sOSign = sO.sign;
    queriesObject.sONum = sO.num;
    queriesObject.sODen = sO.den;
    // @ts-ignore
    window.location = htmlQueryConstructor('soln0801.html', queriesObject);
};
