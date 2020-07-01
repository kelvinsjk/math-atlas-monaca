// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: questions 1001
// global variables
let abArr, unknownPos, OACvsOAB, cArr, actualA;
let studentInputB, studentInputC;
let sB, sC;
let queriesObject;
let triangleString;
let onPageLoad = function () {
    queriesObject = parseQueryY(window.location.search);
    // construct required items from queriesObject
    let actualA = Number(queriesObject.actualA);
    let abArr = [queriesObject.a1, queriesObject.a2, queriesObject.a3, queriesObject.b1, queriesObject.b2, queriesObject.b3];
    // typeset position vectors
    const aVector = ijk(abArr[0], abArr[1], abArr[2]);
    const bVector = ijk(abArr[3], abArr[4], abArr[5]);
    const vectorString = "\\begin{aligned} & " + aVector + "\\quad \\textrm{and} \\\\ & " + bVector + "\\end{aligned}";
    // replace 'a' with actual number in abArr
    abArr.forEach((e, i) => {
        if (e == 'a') {
            abArr[i] = queriesObject.actualA;
        }
    });
    //generate new variables
    let cOne = getRandomIntY(-9, 9), cTwo = getRandomIntY(-9, 9), cThree = getRandomIntY(-9, 9);
    while (countZeroes([cOne, cTwo, cThree]) > 1) { // maximum 1 zero in c: less than 1% chance
        cOne = getRandomIntY(-9, 9);
        cTwo = getRandomIntY(-9, 9);
        cThree = getRandomIntY(-9, 9);
    }
    cArr = [cOne, cTwo, cThree];
    OACvsOAB = getRandomIntY(1, 2);
    let bArr = [Number(abArr[3]), Number(abArr[4]), Number(abArr[5])];
    // @ts-ignore
    if (OACvsOAB == 1 || isParallel(cArr, bArr)) { // we will calculate area of OAC
        OACvsOAB = 1;
        triangleString = "OAC";
    }
    else { // we will calculate area of OBC
        OACvsOAB = 2;
        triangleString = "OBC";
    }
    const cVector = ijk(cArr[0], cArr[1], cArr[2]);
    // typeset question
    katex.render(vectorString, document.getElementById('position_vectors'), { throwOnError: false, displayMode: true });
    katex.render("O", document.getElementById('O'), { throwOnError: false });
    katex.render("A", document.getElementById('A'), { throwOnError: false });
    katex.render("B", document.getElementById('B'), { throwOnError: false });
    katex.render("OA", document.getElementById('OA'), { throwOnError: false });
    katex.render("OB", document.getElementById('OB'), { throwOnError: false });
    katex.render("a=" + actualA, document.getElementById('a'), { throwOnError: false });
    katex.render("C", document.getElementById('C'), { throwOnError: false });
    katex.render(cVector, document.getElementById('c'), { throwOnError: false });
    katex.render(triangleString, document.getElementById('OAC'), { throwOnError: false });
    // student input fields
    studentInputB = new StudentInput('fP', 'bInputDiv', 'b', 'submitButton');
    studentInputC = new StudentInput('iP', 'cInputDiv', 'c', 'submitButton');
    studentInputB.linkInput = studentInputC;
};
// answer tab: start answering (b)
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
        // typeset
        katex.render(triangleString + "?", document.getElementById('qn_part_b'), { throwOnError: false });
        katex.render("b\\sqrt{c},", document.getElementById('answer_form'), { throwOnError: false });
        katex.render("b \\textrm{ and } c?", document.getElementById('what_is'), { throwOnError: false });
        katex.render("c", document.getElementById('c_two'), { throwOnError: false });
        katex.render("c=1", document.getElementById('c_three'), { throwOnError: false });
        katex.render(fractionBuilderY(22, 7), document.getElementById('fraction_example'), { throwOnError: false });
        katex.render("22/7", document.getElementById('decimal_example'), { throwOnError: false });
        studentInputB.addToDOM();
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
        sB = studentInputB.value;
        sC = studentInputC.value;
        let studentString = polyBuilderY([sB.typeset, 0], '\\sqrt{' + sC + '}');
        if (sC == 1) {
            studentString = sB.typeset;
        }
        katex.render("\\textrm{Area }=" + studentString + "\\textrm{ units}^2.", document.getElementById('student_b'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    queriesObject.cOne = cArr[0];
    queriesObject.cTwo = cArr[1];
    queriesObject.cThree = cArr[2];
    queriesObject.OAC = OACvsOAB;
    queriesObject.sBSign = sB.sign;
    queriesObject.sBNum = sB.num;
    queriesObject.sBDen = sB.den;
    queriesObject.sC = sC;
    window.location = htmlQueryConstructor('soln1101.html', queriesObject);
};
