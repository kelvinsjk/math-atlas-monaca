// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 13: question 1301
// global variables
let qnVariant;
let qnVariableArray; // (a,b,c,y)
let studentInputX;
let studentInputY;
let sX;
let sY;
// onPageLoad: initialize qn
let onPageLoad = function () {
    // Randomly generated elements
    qnVariant = getRandomIntY(1, 3); // 1: az, 2: aiz, 3: az^*
    const a = 2 * getRandomNonZeroY(1, 9), y = getRandomNonZeroY(1, 9);
    const c = a * y, b = (4 * y * y - a * a) / 4; // b guaranteed to be integer since a is even
    qnVariableArray = [a, b, c, y];
    // symbol based on qn variant:
    let symbol = "z";
    if (qnVariant == 1) {
        symbol = "iz";
    }
    else if (qnVariant == 2) {
        symbol = "z^*";
    }
    let complexString = '';
    if (b) {
        complexString = b.toString();
    }
    if (c) {
        if (c > 0) {
            if (c == 1) {
                complexString += "+i";
            }
            else {
                complexString += "+" + c + "i";
            }
        }
        else {
            if (c == -1) {
                complexString += "-i";
            }
            else {
                complexString += c + "i";
            }
        }
    }
    // generate equation
    const complexEqn = polyBuilderY([a, 0], symbol) + "+zz^* =" + complexString;
    // typeset question
    katex.render('z', document.getElementById('z'), { throwOnError: false });
    katex.render('y', document.getElementById('x'), { throwOnError: false });
    katex.render('x', document.getElementById('y'), { throwOnError: false });
    katex.render('z', document.getElementById('z_two'), { throwOnError: false });
    katex.render('z', document.getElementById('z_three'), { throwOnError: false });
    katex.render('z^*', document.getElementById('z_star'), { throwOnError: false });
    katex.render('x+yi', document.getElementById('x_plus'), { throwOnError: false });
    katex.render(complexEqn+',', document.getElementById('complex_equation'), { throwOnError: false, displayMode: true });
};
// answer tab: start answering (a)
let startAnswering = function () {
    // change button to say "go to Question" instead
    document.getElementById('answer_button').style.display = 'none';
    document.getElementById('goto_answer_button').style.display = 'block';
    // show tabBar and go to answer tab
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setAttribute('hide-tabs', 'false');
    tabBar.setAttribute('position', 'top');
    tabBar.setAttribute('swipeable', 'true');
    tabBar.setActiveTab(1).then(function () {
        // student inputs
        studentInputX = new StudentInput('i', 'xInputDiv', 'x', 'submitButton');
        studentInputX.addToDOM();
        studentInputY = new StudentInput('i', 'yInputDiv', 'y', 'submitButton');
        studentInputY.addToDOM();
        studentInputX.linkInput = studentInputY;
        document.getElementById('samsung_warning').innerHTML = studentInputX.samsungWarningText;
        // typeset
        katex.render('z', document.getElementById('z_four'), { throwOnError: false });
        katex.render('x+yi.', document.getElementById('x_plus_two'), { throwOnError: false });
        katex.render('x \\textrm{ and } y?', document.getElementById('x_and_y'), { throwOnError: false });
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
        studentInputX.updateValidity();
        studentInputY.updateValidity();
        sX = studentInputX.value;
        sY = studentInputY.value;
        let complexString = '';
        if (sX) {
            complexString = sX.toString();
        }
        if (sY) {
            if (sY > 0) {
                if (sX) {
                    complexString += "+";
                }
                if (sY == 1) {
                    complexString += "i";
                }
                else {
                    complexString += sY + "i";
                }
            }
            else {
                if (sY == -1) {
                    complexString += "-i";
                }
                else {
                    complexString += sY + "i";
                }
            }
        }
        let sType = "z=" + complexString;
        katex.render(sType, document.getElementById('student_answer'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = {
        a: qnVariableArray[0], y: qnVariableArray[3],
        qnVariant: qnVariant,
        sX: sX, sY: sY
    };
    // @ts-ignore
    window.location = htmlQueryConstructor('soln1301.html', queriesObject);
};
