/// <reference path="./math_atlas/math-atlas-monaca/www/lib/onsenui/js/onsenui.d.ts" />
"use strict";
// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: questions 0601
// global variables
let n, qnCase; // case 0: sine, upperLimit pi/2, 1: sine, upper limit pi, 2: cosine, 3: exp
let studentInputV;
let sV;
let queriesObject = parseQueryY(window.location.search);
// TODO: take from queriesObject
n = Number(queriesObject.n);
qnCase = Number(queriesObject.qnCase);
let onPageLoad = function () {
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
    katex.render("R", document.getElementById('R_two'), { throwOnError: false });
    katex.render(curve, document.getElementById('curve'), { throwOnError: false });
    katex.render("x=" + upperLimit, document.getElementById('line'), { throwOnError: false });
    katex.render("x", document.getElementById('x'), { throwOnError: false });
    katex.render("x", document.getElementById('x_two'), { throwOnError: false });
    katex.render(upperLimit + '.', document.getElementById('upper_limit'), { throwOnError: false });
    // student input fields
    studentInputV = new StudentInput('iP', 'VInputDiv', 'V', 'submitButton');
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
        katex.render("R", document.getElementById('R_three'), { throwOnError: false });
        katex.render("x", document.getElementById('x_three'), { throwOnError: false });
        studentInputV.addToDOM();
        const inputElement = document.getElementById('inputV');
        inputElement.step = "0.001";
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
        sV = studentInputV.value;
        katex.render("\\textrm{Volume = }" + sV + "\\textrm{ units}^3", document.getElementById('student_b'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    // @ts-ignore
    queriesObject.sV = sV;
    window.location = htmlQueryConstructor('soln0901.html', queriesObject);
};
