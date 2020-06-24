// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
// global variables
let a, b, c, d;
let studentInputA, studentInputB, studentInputK;
let sA, sB, sK;
// onPageLoad: initialize qn
let onPageLoad = function () {
    // Randomly generated elements
    a = getRandomIntY(1, 9);
    b = getRandomIntY(1, 9);
    c = getRandomIntY(1, 9);
    d = getRandomIntY(1, 9);
    // generate question
    let DE = polyBuilderY([a, 0], fractionBuilderY("\\mathrm{d}m", "\\mathrm{d}t"));
    DE += "=" + polyBuilderY([b, -c], "m");
    // typeset question
    katex.render("m,", document.getElementById('m'), { throwOnError: false });
    katex.render("m", document.getElementById('m_two'), { throwOnError: false });
    katex.render("t", document.getElementById('t'), { throwOnError: false });
    katex.render("t,", document.getElementById('t_two'), { throwOnError: false });
    katex.render(DE + ".", document.getElementById('DE'), { throwOnError: false, displayMode: true });
    katex.render("m=" + d, document.getElementById('m_initial'), { throwOnError: false });
    katex.render("t=0", document.getElementById('t_equals_zero'), { throwOnError: false });
    // student input fields
    studentInputA = new StudentInput('f', 'aInputDiv', 'a', 'submitButton');
    studentInputB = new StudentInput('f', 'bInputDiv', 'b', "submitButton");
    studentInputK = new StudentInput('f', 'kInputDiv', 'k', 'submitButton');
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
        let answerForm = "a\\mathrm{e}^{kt}+b";
        // typeset
        katex.render("\\textrm{Find } m \\textrm{ in terms of } t.", document.getElementById('find_m'), { throwOnError: false });
        katex.render(answerForm + '.', document.getElementById('answer_form'), { throwOnError: false });
        katex.render("a,b \\textrm{ and } k?", document.getElementById('ab_k'), { throwOnError: false });
        katex.render("-" + fractionBuilderY(22, 7), document.getElementById('fraction_example'), { throwOnError: false });
        katex.render("-22/7", document.getElementById('decimal_example'), { throwOnError: false });
        studentInputA.addToDOM();
        studentInputB.addToDOM();
        studentInputK.addToDOM();
        studentInputA.linkInput = studentInputB;
        studentInputA.linkInput = studentInputK;
        studentInputB.linkInput = studentInputK;
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
        sB = studentInputB.value;
        sK = studentInputK.value;
        let exponent = polyBuilderY([sK.typeset, 0], 't');
        let sType = polyBuilderY([sA.typeset, sB.typeset], "\\mathrm{e}^{" + exponent + "}");
        katex.render(sType, document.getElementById('student_part_a'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = { a: a, b: b, c: c, d: d, sASign: sA.sign, sANum: sA.num, sADen: sA.den, sBSign: sB.sign, sBNum: sB.num, sBDen: sB.den, sKSign: sK.sign, sKNum: sK.num, sKDen: sK.den };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans1001.html', queriesObject);
};
