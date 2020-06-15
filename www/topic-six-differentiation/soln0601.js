// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: question 0601
// global variables
var reasonArray = [
    "\\frac{\\mathrm{d}A}{\\mathrm{d}x} < 0",
    "\\frac{\\mathrm{d}A}{\\mathrm{d}x} = 0",
    "\\frac{\\mathrm{d}A}{\\mathrm{d}x} > 0",
    "\\frac{\\mathrm{d}^2A}{\\mathrm{d}x^2} < 0",
    "\\frac{\\mathrm{d}^2A}{\\mathrm{d}x^2} = 0",
    "\\frac{\\mathrm{d}^2A}{\\mathrm{d}x^2} > 0"
];
var minMaxFlag = true, minMaxChoice; // 1: min, 2: max
// numbers from ObjectQuery TODO: change this
var queriesObject = parseQueryY(window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), k = Number(queriesObject.k), sOrT = Number(queriesObject.sOrT); // 1: semicircle, 2: triangle
var sX = Number(queriesObject.sX), sY = Number(queriesObject.sY), minOrMax = Number(queriesObject.minOrMax), reason = Number(queriesObject.reason);
var aiM = Number(queriesObject.aiM), aiiM = Number(queriesObject.aiiM);
var runningMark = aiM + aiiM;
// typesetting solution
var actualB, actualA = k / 2 / a;
var minOrMaxText = 'minimum';
if (minOrMax == 2) {
    minOrMaxText = 'maximum';
}
;
var special = Math.PI, specialB = Math.PI * b / 4 / a;
if (sOrT == 2) {
    special = Math.sqrt(3);
    specialB = ((a + 2 * b) / 8 / a * special);
}
;
var actualX = (k / 2 / a) / (special * b / 2 / a - special / 4 + 1);
var actualY = (k / 2 / a - actualX / 2 - specialB * actualX);
// question construction
// diagram
var svgString = "\n\t<svg viewBox=\"-110 -110 220 220\">\n\t\t<g fill=\"none\" stroke=\"black\">\n\t\t\t<line x1=\"-100\" y1=\"0\"   x2=\"-100\" y2=\"100\"/>\n\t\t\t<line x1=\"100\"  y1=\"100\" x2=\"-100\" y2=\"100\"/>\n\t\t\t<line x1=\"100\"  y1=\"100\" x2=\"100\"  y2 = \"0\"/>\n\t\t\t<path d=\"M -100,0\n\t\t\t\tA 100 100 180 1 1 100 0\"/>\n\t\t</g>\n\t\t<g fill=\"none\" stroke=\"black\" stroke-opacity=\"0.5\">\n\t\t\t<path stroke-dasharray=\"7\" d=\"M-100 0 100 0\"/>\n\t\t\t<line x1=\"-100\" y1=\"95\"  x2=\"-95\" y2=\"95\"/>\n\t\t\t<line x1=\"-95\"  y1=\"100\" x2=\"-95\" y2=\"95\"/>\n\t\t\t<line x1=\"100\"  y1=\"95\"  x2=\"95\"  y2=\"95\"/>\n\t\t\t<line x1=\"95\"   y1=\"100\" x2=\"95\"  y2=\"95\"/>\n\t\t</g>\n\t\t<text x=\"0\"   y=\"90\" style=\"text-anchor:middle\" font-family=\"serif\" font-style=\"italic\">x</text>\n\t\t<text x=\"-95\" y=\"50\" style=\"text-anchor:start\"  font-family=\"serif\" font-style=\"italic\">y</text>\n\t\t<text x=\"95\"  y=\"50\" style=\"text-anchor:end\"    font-family=\"serif\" font-style=\"italic\">y</text>\n\t</svg>\n", shapeString = 'a semicircle of diameter', shapeType = 'semicircle', term = '\\pi ';
var actualBArray = simplifyFractionY(b, 4 * a), actualBCost;
if (actualBArray[1] == 1) {
    actualB = new Fraction(actualBArray[0].toString());
}
else {
    actualB = new Fraction(actualBArray[0].toString() + '/' + actualBArray[1].toString());
}
var actualBType = actualB.typeset;
if (actualB.float == 1) {
    actualBType = '';
}
var yString = "y=" + actualA + "-" + actualBType + term + "x-\\frac{x}{2}";
var actualCType = ''; // typeset nothing if '1' is keyed
if (actualA != 1) {
    actualCType = actualA.toString();
}
;
var actualDFraction = simplifyFractionY(a - 2 * b, 8 * a);
var actualD = new Fraction(actualDFraction[0].toString() + '/' + actualDFraction[1].toString());
var actualDType = actualD.typeset;
if (sOrT == 2) { //triangle
    svgString = "\n    <svg viewBox=\"-110 -180 220 300\">\n    <g fill=\"none\" stroke=\"black\">\n    <polygon points=\"-100,0, 0,-173.2, 100,0, 100,100, -100,100\"/>  \t\n    </g>\n    <g fill=\"none\" stroke=\"black\" stroke-opacity=\"0.5\">\n    <path stroke-dasharray=\"7\" d=\"M-100 0 100 0\" />\n    <line x1=\"-100\" y1=\"95\" x2=\"-95\" y2=\"95\" />\n    <line x1=\"-95\" y1=\"100\" x2=\"-95\" y2=\"95\" />\n    <line x1=\"100\" y1=\"95\" x2=\"95\" y2=\"95\" />\n    <line x1=\"95\" y1=\"100\" x2=\"95\" y2=\"95\" />\n    <line x1=\"0\" y1=\"5\" x2=\"0\" y2=\"-5\" />\n    <line x1=\"0\" y1=\"95\" x2=\"0\" y2=\"105\" />\n    <line x1=\"-45.67\" y1=\"-84.1\" x2=\"-54.33\" y2=\"-89.1\" />\n    <line x1=\"45.67\" y1=\"-84.1\" x2=\"54.33\" y2=\"-89.1\" />\n    </g>\n    <text x=\"0\" y=\"90\" style=\"text-anchor:middle\" font-family=\"serif\" font-style=\"italic\">x</text>\n    <text x=\"-95\" y=\"50\" style=\"text-anchor:start\" font-family=\"serif\" font-style=\"italic\">y</text>\n    <text x=\"95\" y=\"50\" style=\"text-anchor:end\" font-family=\"serif\" font-style=\"italic\">y</text>\n    </svg>\n\t";
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
    yString = "y=" + actualA + "-" + actualB.typeset + term + "x-\\frac{x}{2}";
} // end of triangle case
var AString = "A=" + actualCType + "x" + actualDType + term + "x^2-\\frac{1}{2}x^2";
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
        var tabBar = document.querySelector('ons-tabbar');
        tabBar.setActiveTab(1);
    }
    ;
    if (event.target.matches('#ans001tab')) {
        // typeset question
        // typeset question
        katex.render("x", document.getElementById('x'), { throwOnError: false });
        katex.render("x", document.getElementById('xTwo'), { throwOnError: false });
        katex.render("x", document.getElementById('xThree'), { throwOnError: false });
        katex.render("y", document.getElementById('y'), { throwOnError: false });
        katex.render("y", document.getElementById('yTwo'), { throwOnError: false });
        document.getElementById('costR').innerHTML = '$' + a.toString();
        document.getElementById('costK').innerHTML = '$' + k.toString();
        document.getElementById('shapeTwo').innerHTML = shapeType;
        katex.render("A", document.getElementById('A'), { throwOnError: false });
        katex.render("A", document.getElementById('ATwo'), { throwOnError: false });
        katex.render("A", document.getElementById('AThree'), { throwOnError: false });
        katex.render(yString + ".", document.getElementById('yShow'), { throwOnError: false });
        // shape
        document.getElementById('svgDiv').innerHTML = svgString;
        document.getElementById('shape').innerHTML = shapeString;
        if (sOrT == 1) { // semicircle
            document.getElementById('costTS').innerHTML = '$' + b.toString();
        }
        else {
            katex.render("\\$ " + actualBCost.typeset + term, document.getElementById('costTS'), { throwOnError: false });
            document.getElementById('marksOnDisplay').innerHTML = '1+3';
        }
        katex.render(AString + ".", document.getElementById('AEquals'), { throwOnError: false });
        // (ai)
        if (aiM > 0) {
            document.getElementById('checkMarkOne').style.display = 'inline';
            if (aiM == 2) {
                document.getElementById('checkMarkTwoA').style.display = 'inline';
            }
        }
        katex.render(yString, document.getElementById('showAi'), { throwOnError: false });
        // (aii)
        if (aiiM > 0) {
            document.getElementById('checkMarkTwoB').style.display = 'inline';
            if (aiiM > 1) {
                document.getElementById('checkMarkThree').style.display = 'inline';
                if (aiiM == 3) {
                    document.getElementById('checkMarkFour').style.display = 'inline';
                }
            }
        }
        katex.render(AString + ".", document.getElementById('showAii'), { throwOnError: false });
        // (bi) typeset
        katex.render("x=" + sX + ",y=" + sY + ".", document.getElementById('studentAnswerBi'), { throwOnError: false });
        katex.render("x=" + actualX.toFixed(3) + ",y=" + actualY.toFixed(3) + ".", document.getElementById('actualXY'), { throwOnError: false });
        // (bi) marking
        var biMarks = 0;
        if (sX.toPrecision(2) == actualX.toPrecision(2)) { // close enough
            biMarks += 1;
            if (Math.abs(sX-actualX) < 0.002) {
                biMarks += 1;
            }
        }
        if (sY.toPrecision(2) == actualY.toPrecision(2)) { // close enough
            biMarks += 1;
            if ( Math.abs(sY-actualY) < 0.002  ) {
                biMarks += 1;
            }
        }
        if (biMarks < 3) { // check for consistency between x and y
            if ((sOrT == 1 && sY.toPrecision(2) == (k / 2 / a - sX / 2 - special * b * sX / 4 / a).toPrecision(2)) || (sOrT == 2 && sY.toPrecision(2) == (k / 2 / a - sX / 2 - (a + 2 * b) / 8 / a * special * sX).toPrecision(2))) {
                biMarks += 1;
            }
        }
        if (biMarks > 0) {
            document.getElementById('checkMarkFive').style.display = 'inline';
            if (biMarks > 1) {
                document.getElementById('checkMarkSix').style.display = 'inline';
                if (biMarks > 2) {
                    document.getElementById('checkMarkSeven').style.display = 'inline';
                    if (biMarks == 4) {
                        document.getElementById('checkMarkEight').style.display = 'inline';
                    }
                }
            }
        }
        runningMark += biMarks;
        // (bii) typeset
        katex.render("A", document.getElementById('AFour'), { throwOnError: false });
        katex.render("A", document.getElementById('AFive'), { throwOnError: false });
        document.getElementById('studentMinOrMax').innerHTML = minOrMaxText;
        katex.render(reasonArray[reason], document.getElementById('studentFDoublePrime'), { throwOnError: false });
        katex.render(reasonArray[3], document.getElementById('fDoublePrime'), { throwOnError: false });
        // (bii) marking
        if (minOrMax == 2 || reason == 3) {
            runningMark += 1;
            document.getElementById('checkMarkNine').style.display = 'inline';
            if (minOrMax == 2 && reason == 3) {
                runningMark += 1;
                document.getElementById('checkMarkTen').style.display = 'inline';
            }
        }
        ;
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 10); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/10';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 10) {
            comments += "10/10 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 4) {
            comments += runningMark + "/10 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/10 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    }
    ; // end of event listener tab
}, false); // End of window.onload