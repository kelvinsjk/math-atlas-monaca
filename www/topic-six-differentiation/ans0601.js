// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 6: question 0601
// global variables
var studentInputX, studentInputY;
var actualX, actualY;
var studentRadioReason;
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
var queriesObject = parseQuery(window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), k = Number(queriesObject.k), sOrT = Number(queriesObject.sOrT); // 1: semicircle, 2: triangle
var actualB, actualA = k / 2 / a;
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
}
var AString = "A=" + actualCType + "x" + actualDType + term + "x^2-\\frac{1}{2}x^2";
// things that need id
document.addEventListener('init', function (event) {
    if (event.target.matches('#qn001atab')) {
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
        }
        katex.render(AString + ".", document.getElementById('AEquals'), { throwOnError: false });
    }
}, false); // End of window.onload
// start answering: make tabs visible
var startAnswering = function () {
    // show tabBar and go to answer tab
    var tabBar = document.querySelector('ons-tabbar');
    tabBar.setAttribute('hide-tabs', 'false');
    tabBar.setAttribute('position', 'top');
    tabBar.setAttribute('swipeable', 'true');
    tabBar.setActiveTab(1)
        .then(function () {
        // typeset math
        katex.render("x", document.getElementById('xFour'), { throwOnError: false });
        katex.render("y", document.getElementById('yFour'), { throwOnError: false });
        katex.render("A", document.getElementById('AFour'), { throwOnError: false });
        katex.render("A", document.getElementById('ASix'), { throwOnError: false });
        // create student input classes
        studentInputX = new StudentInput("iP", "xInputDiv", "x", 'submitButton');
        studentInputY = new StudentInput("iP", "yInputDiv", "y", 'submitButton');
        studentRadioReason = new StudentRadio(reasonArray, "reasonRadioDiv", "Reason", "submitButton");
        // link inputs (3C2 = 3 links)
        studentInputX.linkInput = studentInputY;
        studentInputX.linkRadio = studentRadioReason;
        studentInputY.linkRadio = studentRadioReason;
        // add x and y inputs to dom 
        studentInputX.addToDOM();
        studentInputY.addToDOM();
        studentRadioReason.addToDOM();
        var inputXElement = document.getElementById(studentInputX.inputID);
        inputXElement.step = "0.001";
        var inputYElement = document.getElementById(studentInputY.inputID);
        inputYElement.step = "0.001";
    });
    // change button to say "go to Question" instead
    document.getElementById('answerButton').style.display = 'none';
    document.getElementById('goToAnswerButton').style.display = 'block';
};
var minMaxHandler = function (value) {
    if (minMaxFlag) { // first time, show reasons
        document.getElementById('because').style.display = 'inline';
        document.getElementById('reasonRadioDiv').style.display = 'block';
    } // updates choice thereafter
    minMaxChoice = Number(value);
};
var moveOn = function () {
    // show dialog: create one if it's not present
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
        var dialog_1 = document.getElementById('my-dialog');
        // typesetting student's answer
        var sXValue = studentInputX.value, sYValue = studentInputY.value;
        katex.render("x=" + sXValue.toFixed(3) + ', y=' + sYValue.toFixed(3), document.getElementById('studentBi'), { throwOnError: false });
        katex.render("A", document.getElementById('ASeven'), { throwOnError: false });
        var minString = 'minimum';
        if (minMaxChoice == 2) {
            minString = 'maximum';
        }
        ;
        document.getElementById('minOrMax').innerHTML = minString;
        katex.render(reasonArray[studentRadioReason.option], document.getElementById('studentBii'), { throwOnError: false });
        // shows dialog
        dialog_1.show();
    } // end of if/else (dialog)
};
// passes Option selected to answer page
var proceedTob = function () {
    queriesObject.sX = studentInputX.value;
    queriesObject.sY = studentInputY.value;
    queriesObject.minOrMax = minMaxChoice;
    queriesObject.reason = studentRadioReason.option;
    window.location = htmlQueryConstructor('soln0601.html', queriesObject);
};