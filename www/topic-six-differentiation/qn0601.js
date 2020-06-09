// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: questions 0601
// global variables
var partAiMark = 0, partAiiMark = 0;
var studentInputB;
var actualB, actualA;
var sB;
var yStringTwo, yStringActual, AString, AStringTwo;
var sD;
// Generate numbers
var a = getRandomIntY(2, 9), bPlus = getRandomIntY(1, 9), kMultiply = getRandomIntY(1, 10), sOrT = getRandomIntY(1, 2); // 1: semicircle, 2: triangle
var b = a + bPlus, k = lcmY(a, b) * 2 * kMultiply;
// diagram
var svgString = "\n\t<svg viewBox=\"-110 -110 220 220\">\n\t\t<g fill=\"none\" stroke=\"black\">\n\t\t\t<line x1=\"-100\" y1=\"0\"   x2=\"-100\" y2=\"100\"/>\n\t\t\t<line x1=\"100\"  y1=\"100\" x2=\"-100\" y2=\"100\"/>\n\t\t\t<line x1=\"100\"  y1=\"100\" x2=\"100\"  y2 = \"0\"/>\n\t\t\t<path d=\"M -100,0\n\t\t\t\tA 100 100 180 1 1 100 0\"/>\n\t\t</g>\n\t\t<g fill=\"none\" stroke=\"black\" stroke-opacity=\"0.5\">\n\t\t\t<path stroke-dasharray=\"7\" d=\"M-100 0 100 0\"/>\n\t\t\t<line x1=\"-100\" y1=\"95\"  x2=\"-95\" y2=\"95\"/>\n\t\t\t<line x1=\"-95\"  y1=\"100\" x2=\"-95\" y2=\"95\"/>\n\t\t\t<line x1=\"100\"  y1=\"95\"  x2=\"95\"  y2=\"95\"/>\n\t\t\t<line x1=\"95\"   y1=\"100\" x2=\"95\"  y2=\"95\"/>\n\t\t</g>\n\t\t<text x=\"0\"   y=\"90\" style=\"text-anchor:middle\" font-family=\"serif\" font-style=\"italic\">x</text>\n\t\t<text x=\"-95\" y=\"50\" style=\"text-anchor:start\"  font-family=\"serif\" font-style=\"italic\">y</text>\n\t\t<text x=\"95\"  y=\"50\" style=\"text-anchor:end\"    font-family=\"serif\" font-style=\"italic\">y</text>\n\t</svg>\n", shapeString = 'a semicircle of diameter', shapeType = 'semicircle', term = '\\pi ';
var yString = "y=a+b" + term + "x-\\frac{x}{2}";
var actualBArray = simplifyFractionY(b, 4 * a), actualBCost;
if (actualBArray[1] == 1) {
    actualB = new Fraction(actualBArray[0].toString());
}
else {
    actualB = new Fraction(actualBArray[0].toString() + '/' + actualBArray[1].toString());
}
if (sOrT == 2) { //triangle
    svgString = "\n\t\t<svg viewBox=\"-110 -180 220 300\">\n\t\t\t<g fill=\"none\" stroke=\"black\">\n\t\t\t\t<polygon points=\"-100,0, 0,-173.2, 100,0, 100,100, -100,100\"/>  \t\n\t\t\t</g>\n\t\t\t<g fill=\"none\" stroke=\"black\" stroke-opacity=\"0.5\">\n\t\t\t\t<path stroke-dasharray=\"7\" d=\"M-100 0 100 0\" />\n\t\t\t\t<line x1=\"-100\" y1=\"95\" x2=\"-95\" y2=\"95\" />\n\t\t\t\t<line x1=\"-95\" y1=\"100\" x2=\"-95\" y2=\"95\" />\n\t\t\t\t<line x1=\"100\" y1=\"95\" x2=\"95\" y2=\"95\" />\n\t\t\t\t<line x1=\"95\" y1=\"100\" x2=\"95\" y2=\"95\" />\n\t\t\t\t<line x1=\"0\" y1=\"5\" x2=\"0\" y2=\"-5\" />\n\t\t\t\t<line x1=\"0\" y1=\"95\" x2=\"0\" y2=\"105\" />\n\t\t\t\t<line x1=\"-45.67\" y1=\"-84.1\" x2=\"-54.33\" y2=\"-89.1\" />\n\t\t\t\t<line x1=\"45.67\" y1=\"-84.1\" x2=\"54.33\" y2=\"-89.1\" />\n\t\t\t</g>\n\t\t\t\t<text x=\"0\" y=\"90\" style=\"text-anchor:middle\" font-family=\"serif\" font-style=\"italic\">x</text>\n\t\t\t\t<text x=\"-95\" y=\"50\" style=\"text-anchor:start\" font-family=\"serif\" font-style=\"italic\">y</text>\n\t\t\t\t<text x=\"95\" y=\"50\" style=\"text-anchor:end\" font-family=\"serif\" font-style=\"italic\">y</text>\n\t\t</svg>\n\t";
    shapeString = 'an equilateral triangle with sides';
    shapeType = 'triangle';
    term = '\\sqrt{3}';
    // typeset costTS
    var actualCostArray = simplifyFractionY(a + 2 * b, 8);
    if (actualCostArray[1] == 1) {
        actualBCost = new Fraction(actualCostArray[0].toString());
    }
    else {
        actualBCost = new Fraction(actualCostArray[0].toString() + '/' + actualCostArray[1].toString());
    }
    ;
    // typeset coefficient of x
    actualBArray = simplifyFractionY(a + 2 * b, 8 * a);
    if (actualBArray[1] == 1) {
        actualB = new Fraction(actualBArray[0].toString());
    }
    else {
        actualB = new Fraction(actualBArray[0].toString() + '/' + actualBArray[1].toString());
    }
    ;
    yString = "y=a-" + actualB.typeset + term + "x-\\frac{x}{2}";
}
else { // semi-circle
    studentInputB = new StudentInput('f', 'bInputDiv', 'b');
}
var studentInputA = new StudentInput('iP', 'aInputDiv', 'a');
var studentInputC = new StudentInput('iP', 'cInputDiv', 'c', 'submitButton');
var studentInputD = new StudentInput('f', 'dInputDiv', 'd', 'submitButton');
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        // typeset question
        katex.render("x", document.getElementById('x'), { throwOnError: false });
        katex.render("y", document.getElementById('y'), { throwOnError: false });
        katex.render("x", document.getElementById('xTwo'), { throwOnError: false });
        document.getElementById('costR').innerHTML = '$' + a.toString();
        document.getElementById('costK').innerHTML = '$' + k.toString();
        document.getElementById('shapeTwo').innerHTML = shapeType;
        katex.render("A", document.getElementById('A'), { throwOnError: false });
        katex.render("a", document.getElementById('a'), { throwOnError: false });
        katex.render("a", document.getElementById('aTwo'), { throwOnError: false });
        katex.render(yString, document.getElementById('yEquals'), { throwOnError: false });
        // shape
        document.getElementById('svgDiv').innerHTML = svgString;
        document.getElementById('shape').innerHTML = shapeString;
        // input box for a: positive integer type
        studentInputA.addToDOM();
        if (sOrT == 1) { // semicircle
            document.getElementById('costTS').innerHTML = '$' + b.toString();
            katex.render("\\textrm{and } b", document.getElementById('andB'), { throwOnError: false });
            katex.render("\\textrm{ and } b", document.getElementById('andBTwo'), { throwOnError: false });
            document.getElementById('isOrAre').innerHTML = 'are constants';
            document.getElementById('isOrAreTwo').innerHTML = 'are the values';
            document.getElementById('andB').style.display = 'inline';
            studentInputB.addToDOM();
            document.getElementById('marksOnDisplay').innerHTML = "2 marks";
            // shows instruction
            studentInputB.insertFractionHeader('fractionText');
        }
        else { // triangle
            // shows modified b for triangle case
            katex.render("\\$ " + actualBCost.typeset + term, document.getElementById('costTS'), { throwOnError: false });
        }
    }
    ; // end of event listener tab
}, false); // End of window.onload
// (ai): asks for student confirmation
var checkStudentInput = function () {
    var inputBValidity = true; // default if only a is needed
    if (sOrT == 1) {
        inputBValidity = studentInputB.updateValidity();
    }
    ;
    var showText, titleText, visiText;
    var proceedFlag;
    if (!studentInputA.updateValidity() || !inputBValidity) {
        showText = 'It appears that some of the inputs are blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
        proceedFlag = false;
    }
    else {
        showText = "You have keyed in <div id='aiConfirm'></div> Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
        proceedFlag = true;
    }
    ;
    var dialog = document.getElementById('my-alert-dialog-ai');
    if (dialog) { // it's already present
        document.getElementById('confirmationAi').innerHTML = showText;
        document.getElementById('alertTitleAi').innerHTML = titleText;
        document.getElementById('okButtonAi').style.visibility = visiText;
        dialog.show();
        if (proceedFlag) {
            yStringTwo = yString.replace("a", studentInputA.value.toString());
            if (sOrT == 1) { // semicircle: a and b
                sB = studentInputB.value;
                var sBType = sB.typeset;
                if (sB.float < 0) {
                    yStringTwo = yStringTwo.replace("+", '');
                    if (sB.float == -1) {
                        sBType = '-';
                    }
                }
                ;
                if (sB.float == 1) {
                    sBType = '';
                }
                yStringTwo = yStringTwo.replace("b", sBType);
            }
            // render into dialog
            katex.render(yStringTwo + '.', document.getElementById('aiConfirm'), { throwOnError: false });
        }
        ;
    }
    else {
        // @ts-ignore
        ons.createElement('alert-dialog-ai.html', { append: true }).then(function () { checkStudentInput(); });
    }
    ;
}; // end of ai confirmation dialog
// (ai) confirmed: mark, show answer and show (aii)
var checkAi = function () {
    // @ts-ignore
    hideAlertDialog('my-alert-dialog-ai');
    // typeset actual answer
    actualA = k / 2 / a;
    yStringActual = yString.replace("a", actualA.toString());
    if (sOrT == 1) { // semicircle: a and b
        // typeset answer
        var actualBFraction = simplifyFractionY(b, 4 * a);
        actualB = new Fraction(actualBFraction[0].toString() + '/' + actualBFraction[1].toString());
        var actualBType = actualB.typeset;
        yStringActual = yStringActual.replace("+", '-');
        if (actualB.float == 1) {
            actualBType = '';
        }
        yStringActual = yStringActual.replace("b", actualBType);
    }
    // mark a
    if (studentInputA.value == actualA) {
        partAiMark += 1;
    }
    // mark b if necessary, gives comments
    if (sOrT == 1 && sB.float.toPrecision(7) == (-b / 4 / a).toPrecision(7)) { // semicircle
        partAiMark += 1;
    }
    // show new Dialog to comment on answer
    // @ts-ignore
    ons.createElement('dialog-ai.html', { append: true }).then(function (dialog) {
        dialog.show();
        katex.render(yStringActual + '.', document.getElementById('aiAnswer'), { throwOnError: false });
        if ((sOrT == 1 && partAiMark == 2) || (sOrT == 2 && partAiMark == 1)) { // full marks (1/2)
            document.getElementById('rightOrWrong').innerHTML = "Well done!";
            document.getElementById('answerAiComments').style.display = 'none';
            document.getElementById('aiMarksSpan').innerHTML = partAiMark.toString();
        }
        else if (partAiMark > 0) { // non-zero
            katex.render(yStringTwo, document.getElementById('studentAi'), { throwOnError: false });
            document.getElementById('aiMarksSpan').innerHTML = partAiMark.toString();
        }
        else { // no marks
            katex.render(yStringTwo, document.getElementById('studentAi'), { throwOnError: false });
            document.getElementById('aiMarksReceived').style.display = 'none';
        }
        ;
    });
};
// go to (aii)
var proceedToAii = function () {
    // @ts-ignore
    hideAlertDialog('my-dialog-ai');
    // hide update part (ai) and show (aii)
    katex.render(yStringActual + '.', document.getElementById('yEquals'), { throwOnError: false });
    document.getElementById('qnA').style.display = 'none';
    document.getElementById('qnAiToHide').style.display = 'none';
    document.getElementById('qnAii').style.display = 'block';
    document.getElementById('answerButton').style.display = 'block';
    // update marksOnDisplay
    document.getElementById('questionOrPart').innerHTML = 'Part (a) of this question is';
    document.getElementById('marksOnDisplay').innerHTML = '1+3 marks';
    if (sOrT == 1) {
        document.getElementById('marksOnDisplay').innerHTML = '2+2';
    }
    ;
    // typeset (aii)
    katex.render('A', document.getElementById('ATwo'), { throwOnError: false });
    katex.render('x', document.getElementById('xThree'), { throwOnError: false });
};
// answer tab: start answering (aii)
var startAnswering = function () {
    // change button to say "go to Question" instead
    document.getElementById('answerButton').style.display = 'none';
    document.getElementById('goToAnswerButton').style.display = 'block';
    // show tabBar and go to answer tab
    var tabBar = document.querySelector('ons-tabbar');
    tabBar.setAttribute('hide-tabs', 'false');
    tabBar.setAttribute('position', 'top');
    tabBar.setAttribute('swipeable', 'true');
    tabBar.setActiveTab(1).then(function () {
        katex.render("A", document.getElementById('AThree'), { throwOnError: false });
        AString = "cx+d" + term + "x^2-\\frac{1}{2}x^2";
        katex.render(AString, document.getElementById('AForm'), { throwOnError: false });
        katex.render("c", document.getElementById('c'), { throwOnError: false });
        katex.render("d", document.getElementById('d'), { throwOnError: false });
        studentInputC.otherInput = [studentInputD];
        studentInputD.otherInput = [studentInputC];
        studentInputC.addToDOM();
        studentInputD.addToDOM();
        studentInputD.insertFractionHeader('fractionTextTwo');
    });
};
// (aii): asks for student confirmation
var moveOn = function () {
    // show confirmation dialog: create one if it's not present
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
        // typesetting student answer
        var studentCType = ''; // typeset nothing if '1' is keyed
        if (studentInputC.value != 1) {
            studentCType = studentInputC.value.toString();
        }
        AStringTwo = AString.replace("c", studentCType);
        sD = studentInputD.value;
        var sDType = sD.typeset;
        if (sD.float < 0) {
            AStringTwo = AStringTwo.replace("+", '');
            if (sD.float == -1) {
                sDType = '-';
            }
        }
        ;
        if (sD.float == 1) {
            sDType = '';
        }
        AStringTwo = AStringTwo.replace("d", sDType);
        // render into dialog
        katex.render("A=" + AStringTwo + '.', document.getElementById('studentAii'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// (aii) confirmed: mark, show answer and move to (b)
var showAnswerAii = function () {
    // @ts-ignore
    hideDialog('my-dialog');
    // typeset actual answer
    var actualCType = ''; // typeset nothing if '1' is keyed
    if (actualA != 1) {
        actualCType = actualA.toString();
    }
    var AStringActual = AString.replace("c", actualCType);
    var actualDFraction = simplifyFractionY(a - 2 * b, 8 * a);
    var actualD = new Fraction(actualDFraction[0].toString() + '/' + actualDFraction[1].toString());
    var actualDType = actualD.typeset;
    AStringActual = AStringActual.replace("+", '');
    AStringActual = AStringActual.replace("d", actualDType);
    // mark c
    if (studentInputC.value == actualA) {
        partAiiMark += 1;
    }
    // mark d
    if (sD.float.toPrecision(7) == (actualD.float).toPrecision(7)) {
        partAiiMark += 1;
        if (sOrT == 2) {
            partAiiMark += 1;
        }
        ;
    }
    // show new Dialog to comment on answer
    // @ts-ignore
    ons.createElement('dialog-aii.html', { append: true }).then(function (dialog) {
        dialog.show();
        katex.render("A=" + AStringActual + '.', document.getElementById('aiiAnswer'), { throwOnError: false });
        if ((sOrT == 1 && partAiiMark == 2) || (sOrT == 2 && partAiiMark == 3)) { // full marks (2/3)
            document.getElementById('rightOrWrongTwo').innerHTML = "Well done!";
            document.getElementById('answerAiiComments').style.display = 'none';
            document.getElementById('aiiMarksSpan').innerHTML = partAiiMark.toString();
        }
        else if (partAiiMark > 0) { // non-zero
            katex.render("A=" + AStringTwo, document.getElementById('studentAiiTwo'), { throwOnError: false });
            document.getElementById('aiiMarksSpan').innerHTML = partAiiMark.toString();
        }
        else { // no marks
            katex.render("A=" + AStringTwo, document.getElementById('studentAiiTwo'), { throwOnError: false });
            document.getElementById('aiiMarksReceived').style.display = 'none';
        }
        ;
    });
};
// passes Option selected to answer page
var proceedTob = function () {
    var sD = studentInputD.value;
    var queriesObject = { a: a, b: b, k: k, sOrT: sOrT, aiM: partAiMark, aiiM: partAiiMark };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans0601.html', queriesObject);
};