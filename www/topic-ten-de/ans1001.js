// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: questions 1001
// global variables
let a, b, c, d;
let studentInputC;
let sC;
let queriesObject;
let onPageLoad = function () {
    queriesObject = parseQueryY(window.location.search);
    let a = Number(queriesObject.a);
    let b = Number(queriesObject.b);
    let c = Number(queriesObject.c);
    let d = Number(queriesObject.d);
    // generate question
    let DE = polyBuilderY([a, 0], fractionBuilderY("\\mathrm{d}m", "\\mathrm{d}t"));
    DE += "=" + polyBuilderY([b, -c], "m");
    // typeset question
    katex.render("m,", document.getElementById('m'), { throwOnError: false });
    katex.render("m", document.getElementById('m_two'), { throwOnError: false });
    katex.render("t", document.getElementById('t'), { throwOnError: false });
    katex.render("t,", document.getElementById('t_two'), { throwOnError: false });
    katex.render("t.", document.getElementById('t_three'), { throwOnError: false });
    katex.render(DE + ".", document.getElementById('DE'), { throwOnError: false, displayMode: true });
    katex.render("m=" + d, document.getElementById('m_initial'), { throwOnError: false });
    katex.render("t=0", document.getElementById('t_equals_zero'), { throwOnError: false });
    // student input fields
    studentInputC = new StudentInput('f', 'cInputDiv', 'c', 'submitButton');
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
        // typeset
        katex.render("t.", document.getElementById('t_four'), { throwOnError: false });
        katex.render("t.", document.getElementById('t_five'), { throwOnError: false });
        katex.render("c", document.getElementById('c'), { throwOnError: false });
        katex.render("\\textrm{What is the exact value of } c?", document.getElementById('what_is_c'), { throwOnError: false });
        katex.render(fractionBuilderY(22, 7), document.getElementById('fraction_example'), { throwOnError: false });
        katex.render("22/7", document.getElementById('decimal_example'), { throwOnError: false });
        studentInputC.addToDOM();
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
        sC = studentInputC.value;
        katex.render("m \\textrm{ approaches }" + sC.typeset + ".", document.getElementById('student_b'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    // @ts-ignore
    queriesObject.sCSign = sC.sign;
    queriesObject.sCNum = sC.num;
    queriesObject.sCDen = sC.den;
    window.location = htmlQueryConstructor('soln1001.html', queriesObject);
};
