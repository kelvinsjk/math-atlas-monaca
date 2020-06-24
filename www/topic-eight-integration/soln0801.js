/// <reference path="./math_atlas/math-atlas-monaca/www/lib/onsenui/js/onsenui.d.ts" />
"use strict";
// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
let queriesObject;
let choiceArray, mnoString;
let a, b, aChoice, bChoice, c, n;
let sASign, sANum, sADen;
let sBSign, sBNum, sBDen;
let sMSign, sMNum, sMDen;
let sNSign, sNNum, sNDen;
let sOSign, sONum, sODen;
let nMinus;
let sRadio;
let runningMark;
let actualB;
let actualM;
let actualN;
let actualO;
// question tab initialization
let onPageLoadZero = function () {
    // mcq choices
    choiceArray = [
        "a \\tan b",
        "a \\sin^{-1} b",
        "a \\sqrt{b}",
        "a \\pi+b",
        "a \\ln b",
        "a \\mathrm{e}^{b}"
    ];
    mnoString = "m\\mathrm{e}^{n}+o";
    // Randomly generated elements. TODO: change to take from queriesObject
    queriesObject = parseQueryY(window.location.search);
    a = Number(queriesObject.a);
    b = Number(queriesObject.b);
    aChoice = Number(queriesObject.aChoice); // 1: cosine, 2: sine
    c = Number(queriesObject.c);
    n = Number(queriesObject.n);
    bChoice = Number(queriesObject.bChoice);
    sASign = queriesObject.sASign;
    sANum = Number(queriesObject.sANum);
    sADen = Number(queriesObject.sADen);
    sBSign = queriesObject.sBSign;
    sBNum = Number(queriesObject.sBNum);
    sBDen = Number(queriesObject.sBDen);
    sMSign = queriesObject.sMSign;
    sMNum = Number(queriesObject.sMNum);
    sMDen = Number(queriesObject.sMDen);
    sNSign = queriesObject.sNSign;
    sNNum = Number(queriesObject.sNNum);
    sNDen = Number(queriesObject.sNDen);
    sOSign = queriesObject.sOSign;
    sONum = Number(queriesObject.sONum);
    sODen = Number(queriesObject.sODen);
    sRadio = Number(queriesObject.sRadio);
    if (c == 5) {
        c = 6;
    }
    ; // c: 3, 4 or 6 representing pi/3, pi/4 or pi/6
    nMinus = n - 1;
    runningMark = 0;
    // (a) values for aChoice 1: + sign
    let sign = '+', upperLimitFraction = simplifyFractionY(a, b), upperLimitType;
    let sqrt3 = '\\sqrt{3}';
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
    // actual answers
    // let actualA = new Fraction("1/" + (a * b * c).toString());
    actualB = new Fraction("0");
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
        ;
        // actual answers
        // actualA = new Fraction("1/" + (a * b * 2).toString());
        let actualBFraction = simplifyFractionY(c + 1, c - 1);
				if (actualBFraction[1]==1){
        	actualB = new Fraction(actualBFraction[0].toString());
				} else{
        	actualB = new Fraction(actualBFraction[0] + "/" + actualBFraction[1]);
				}
    }
    // generate question (a)
    let integralAString = "\\displaystyle \\int_0^";
    // question generation
    integralAString += "{" + upperLimitType + "}" + fractionBuilderY(1, (a * a).toString() + sign + (b * b).toString() + "x^2") + "\\; \\mathrm{d}x";
    // end of (a)
    // (b) values for bChoice 1: ln
    let xTypeset = 'x^{' + nMinus + '}';
    if (nMinus == 0) {
        xTypeset = '';
    }
    ;
    let integralBString = "\\displaystyle \\int_1^\\mathrm{e}" + xTypeset + "\\ln x \\; \\mathrm{d}x.";
    // values for bChoice 2: exp
    if (bChoice == 2) {
        integralBString = "\\displaystyle \\int_0^1 x \\mathrm{e}^{" + polyBuilderY([n, 0]) + "} \\mathrm{d}x.";
    }
    // actual answers
    if (Math.abs(n) == 1) {
        if (n == 1) {
            actualM = new Fraction("0");
        }
        else {
            actualM = new Fraction("-2");
        }
        ;
    }
    else {
        let actualMFraction = simplifyFractionY(n - 1, n*n);
        actualM = new Fraction(actualMFraction[0] + "/" + actualMFraction[1]);
    }
    actualN = new Fraction(n.toString());
    actualO = new Fraction("1/" + (n * n));
    katex.render(integralAString + ".", document.getElementById('integralA'), { throwOnError: false, displayMode: true });
    katex.render(integralBString, document.getElementById('integralB'), { throwOnError: false, displayMode: true });
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1);
};
// answer tab initialization
let onPageLoad = function () {
    // (a) typesetting student answer
    let studentAnswerString;
    if (sADen == 1) { // not a fraction
        studentAnswerString = choiceArray[sRadio].replace('a', sASign + sANum);
    }
    else { // fraction
        let sA = new Fraction(sASign + sANum + "/" + sADen);
        studentAnswerString = choiceArray[sRadio].replace('a', sA.typeset);
    }
    if (aChoice == 1) { // option 1: pi answer, b an integer
        if (sBNum == 0 && sRadio == 3) { // for a \\pi + b case, typeset nothing if b=0
            studentAnswerString = studentAnswerString.replace('+b', '');
        }
        else {
            studentAnswerString = studentAnswerString.replace('b', sBNum.toString());
        }
    }
    else { // option 2: ln answer
        if (sBDen == 1) { // not a fraction
            studentAnswerString = studentAnswerString.replace('b', sBSign + sBNum);
        }
        else { // fraction
            let sB = new Fraction(sBSign + sBNum + "/" + sBDen);
            studentAnswerString = studentAnswerString.replace('b', sB.typeset);
        }
    }
    katex.render(studentAnswerString, document.getElementById('studentA'), { throwOnError: false });
    // (a) typesetting actual answer
    if (aChoice == 1) {
        katex.render(fractionBuilderY(1, a * b * c) + "\\pi", document.getElementById('actualA'), { throwOnError: false });
    }
    else {
        katex.render(fractionBuilderY(1, a * b * 2) + "\\ln" + actualB.typeset + '.', document.getElementById('actualA'), { throwOnError: false });
    }
    // (a) marking
    let partAMark = 0;
    if ((aChoice == 1 && sRadio == 3) || (aChoice == 2 && sRadio == 4)) {
        partAMark++;
    }
    ;
		var choiceOneCheck = (aChoice == 1 && sASign == '' && ((sANum == 1 && sADen == (a * b * c)) || (sADen == 1 && sANum.toPrecision(11) == (1 / a / b / c).toPrecision(11))));
		var choiceTwoCheck = (aChoice == 2 && sASign == '' && ((sANum == 1 && sADen == (2 * a * b)) || (sADen == 1 && sANum.toPrecision(11) == (1 / 2 / b / a).toPrecision(11))));
    if (choiceOneCheck || choiceTwoCheck) {
        partAMark++;
    }
    ;
		choiceOneCheck = (aChoice == 1 && sBSign == '' && sBNum == 0 && sBDen == 1);
		choiceTwoCheck = (aChoice == 2 && sBSign == actualB.sign && ( (sBNum == actualB.num && sBDen == actualB.den) || (sBDen==1 && (sBNum).toPrecision(11)==(actualB.float).toPrecision(11) ) ));
    if (choiceOneCheck || choiceTwoCheck) {
        partAMark++;
    }
    ;
    if (partAMark > 0) {
        document.getElementById('checkMarkOne').style.color = "#0076ff";
        document.getElementById('checkMarkOne').style.opacity = "1.0";
        if (partAMark > 1) {
            document.getElementById('checkMarkTwo').style.color = "#0076ff";
            document.getElementById('checkMarkTwo').style.opacity = "1.0";
            if (partAMark == 3) {
                document.getElementById('checkMarkThree').style.color = "#0076ff";
                document.getElementById('checkMarkThree').style.opacity = "1.0";
            }
        }
    }
    runningMark += partAMark;
    // (b) typesetting student answer
    if (sMDen == 1) { // not a fraction
        studentAnswerString = mnoString.replace('m', sMSign + sMNum);
    }
    else { // fraction
        let sM = new Fraction(sMSign + sMNum + "/" + sMDen);
        studentAnswerString = mnoString.replace('m', sM.typeset);
    }
    if (sNDen == 1) { // not a fraction
        if (sNNum == 1 && sNSign == '') {
            studentAnswerString = studentAnswerString.replace('n', '');
        }
        else {
            studentAnswerString = studentAnswerString.replace('n', sNSign + sNNum);
        }
    }
    else { // fraction
        let sN = new Fraction(sNSign + sNNum + "/" + sNDen);
        studentAnswerString = studentAnswerString.replace('n', sN.typeset);
    }
    if (sODen == 1) { // not a fraction
        studentAnswerString = studentAnswerString.replace('o', sOSign + sONum);
    }
    else { // fraction
        let sO = new Fraction(sOSign + sONum + "/" + sODen);
        studentAnswerString = studentAnswerString.replace('o', sO.typeset);
    }
    katex.render(studentAnswerString, document.getElementById('studentB'), { throwOnError: false });
    // (b) typesetting actual answer
    if (n == 1) {
        katex.render("1", document.getElementById('actualB'), { throwOnError: false });
    }
    else {
        katex.render(actualM.typeset + "\\mathrm{e}^{" + actualN.typeset + "}+" + actualO.typeset+'.', document.getElementById('actualB'), { throwOnError: false });
    }
    // (b) marking
    let partBiMark = 0, partBiiMark = 0, partBiiiMark = 0;
    if (sMSign == actualM.sign && ((sMNum == actualM.num && sMDen == actualM.den) ||  (sMDen==1 && (sMNum).toPrecision(11)== (actualM.float).toPrecision(11))  )   ) {
        partBiMark += 1;
    }
    ;
    if (sNSign == actualN.sign && sNNum == actualN.num && sNDen == actualN.den) {
        partBiiMark += 2;
    }
    ; // evidence of by parts: 2 marks
    if (sOSign == actualO.sign && ((sONum == actualO.num && sODen == actualO.den) ||  (sODen==1 && (sONum).toPrecision(11)== (actualO.float).toPrecision(11))  )   ) {
        partBiiiMark += 1;
    }
    ;
    let partBMark = partBiMark + partBiiMark + partBiiiMark;
    if (partBMark <= 2) { // chance for extra working marks
        if ((partBiMark == 0 && Math.abs(actualM.float).toFixed(2) == (sMNum / sMDen).toFixed(2)) || (partBiiMark < 2 && Math.abs(n) == sNNum && sNDen == 1) || (partBiiiMark == 0 && Math.abs(actualO.float).toFixed(2) == (sONum / sODen).toFixed(2))) {
            partBMark++;
        }
    }
    if (partBMark > 0) {
        document.getElementById('checkMarkFour').style.color = "#0076ff";
        document.getElementById('checkMarkFour').style.opacity = "1.0";
        if (partBMark > 1) {
            document.getElementById('checkMarkFive').style.color = "#0076ff";
            document.getElementById('checkMarkFive').style.opacity = "1.0";
            if (partBMark > 2) {
                document.getElementById('checkMarkSix').style.opacity = "1.0";
                document.getElementById('checkMarkSix').style.color = "#0076ff";
                if (partBMark == 4) {
                    document.getElementById('checkMarkSeven').style.opacity = "1.0";
                    document.getElementById('checkMarkSeven').style.color = "#0076ff";
                }
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
    setTimeout(function () { progressBar.animate(runningMark / 7); }, 500);
    document.getElementById('progressBarText').innerHTML = runningMark + '/7';
    // final marks comment
    var comments = "You have scored ";
    if (runningMark == 7) {
        comments += "7/7 for this question. Well done! Keep up the good work.";
    }
    else if (runningMark > 2) {
        comments += runningMark + "/7 for this question. Just a bit more fine-tuning to get the full marks. \
			Try to see how you can arrive at the actual answer and try again!";
    }
    else {
        comments += runningMark + "/7 for this question. Let's try to figure out how we can get the answer and try again! \
		Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
    }
    ;
    document.getElementById('answerComments').innerHTML = comments;
};
