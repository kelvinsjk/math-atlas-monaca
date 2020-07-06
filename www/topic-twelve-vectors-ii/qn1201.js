// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 12: question 0201
// global variables
let studentAiArray, qnVariant;
let studentAi;
let qnVariableArray; // (a1, a2, a3, b1, b2, b3, n1, n2, n3, k, c1, c2, c3)
let studentInputAOne;
let studentInputATwo;
let studentInputAThree;
let studentInputDOne;
let studentInputDTwo;
let studentInputDThree;
let studentInputQOne;
let studentInputQTwo;
let studentInputQThree;
let sQOne;
let sQTwo;
let sQThree;
let partAiMark, lineAiForm;
// generate 3 variables at one go: limit to at most 1 '0'
function generateThree(mode = 1) {
    let threeArray, cArray;
    if (mode == 1) {
        threeArray = [getRandomIntY(-9, 9), getRandomIntY(-9, 9), getRandomIntY(-9, 9)];
        if (countZeroes(threeArray) > 1) {
            return generateThree();
        }
    }
    else {
        threeArray = [getRandomIntY(-9, 9), getRandomIntY(-9, 9)];
        cArray = [0, 0];
        if (countZeroes(threeArray) > 1) {
            return generateThree(2);
        }
        let spot = getRandomIntY(0, 2), pmOne = getRandomNonZeroY(1, 1);
        threeArray.splice(spot, 0, pmOne);
        const k = getRandomNonZeroY(1, 17);
        cArray.splice(spot, 0, pmOne * k);
        threeArray.push(k);
        threeArray = threeArray.concat(cArray);
    }
    return threeArray;
}
function generateThirteen() {
    const a = generateThree();
    const b = generateThree();
    const n = generateThree(2);
    const nine = a.concat(b, n);
    return nine;
}
// check for criteria: 
// (1) A, B non - parallel, 
// (2) n non-parallel, non-perpendicular to AB
// (3) A, B not on plane, C not on line
// if any one of these fail: regenerate an array and check again
function generateArr() {
    let qnArray = generateThirteen();
    let criteriaOne = isParallel(qnArray.slice(0, 3), qnArray.slice(3, 6));
    let AB = [qnArray[3] - qnArray[0], qnArray[4] - qnArray[1], qnArray[5] - qnArray[2]];
    let criteriaTwoA = isParallel(AB, qnArray.slice(6, 9));
    let criteriaTwoB = dotProduct(AB, qnArray.slice(6, 9)) == 0;
    let criteriaThreeA = dotProduct(qnArray.slice(0, 3), qnArray.slice(6, 9)) == qnArray[9];
    let criteriaThreeB = dotProduct(qnArray.slice(3, 6), qnArray.slice(6, 9)) == qnArray[9];
    let AC = [qnArray[12] - qnArray[0], qnArray[11] - qnArray[1], qnArray[10] - qnArray[2]];
    let criteriaThreeC = isParallel(AB, AC);
    if (criteriaOne || criteriaTwoA || criteriaTwoB || criteriaThreeA || criteriaThreeB || criteriaThreeC) {
        return generateArr();
    }
    else {
        return qnArray;
    }
}
// onPageLoad: initialize qn
let onPageLoad = function () {
    // Randomly generated elements
    qnVariableArray = generateArr();
    qnVariant = getRandomIntY(1, 2);
    // typeset question
    if (qnVariant == 1) {
        // question typeset
        katex.render("l", document.getElementById('l_one'), { throwOnError: false });
        katex.render("l", document.getElementById('l_four'), { throwOnError: false });
        katex.render("p", document.getElementById('p_one'), { throwOnError: false });
        katex.render("A", document.getElementById('A'), { throwOnError: false });
        katex.render("B", document.getElementById('B'), { throwOnError: false });
        // coordinates of A and B
        katex.render("(" + qnVariableArray[0] + "," + qnVariableArray[1] + "," + qnVariableArray[2] + ")", document.getElementById('A_coordinates'), { throwOnError: false });
        katex.render("(" + qnVariableArray[3] + "," + qnVariableArray[4] + "," + qnVariableArray[5] + ")", document.getElementById('B_coordinates'), { throwOnError: false });
        // form equation of plane
        katex.render(ijk(qnVariableArray[6], qnVariableArray[7], qnVariableArray[8], 'x', 'y', 'z') + "=" + qnVariableArray[9] + ".", document.getElementById('plane_equation'), { throwOnError: false, displayMode: true });
        const lineForm = "\\mathbf{r} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix} + \\lambda \\begin{pmatrix} d_1 \\\\ d_2 \\\\ d_3 \\end{pmatrix}, \\lambda \\in \\mathbb{R}.";
        katex.render(lineForm, document.getElementById('line_plane_form'), { throwOnError: false, displayMode: true });
        katex.render("a_1, a_2, a_3, d_1, d_2", document.getElementById('a_s'), { throwOnError: false });
        katex.render("d_3", document.getElementById('d_three'), { throwOnError: false });
        // student inputs
        studentInputAOne = new StudentInput('i', 'aOneInputDiv', 'a_1', 'submitButtonOne');
        studentInputAOne.addToDOM();
        studentInputATwo = new StudentInput('i', 'aTwoInputDiv', 'a_2', 'submitButtonOne');
        studentInputATwo.addToDOM();
        studentInputAThree = new StudentInput('i', 'aThreeInputDiv', 'a_3', 'submitButtonOne');
        studentInputAThree.addToDOM();
        studentInputDOne = new StudentInput('i', 'dOneInputDiv', 'd_1', 'submitButtonOne');
        studentInputDOne.addToDOM();
        studentInputDTwo = new StudentInput('i', 'dTwoInputDiv', 'd_2', 'submitButtonOne');
        studentInputDTwo.addToDOM();
        studentInputDThree = new StudentInput('i', 'dThreeInputDiv', 'd_3', 'submitButtonOne');
        studentInputDThree.addToDOM();
        studentInputAOne.linkInput = studentInputATwo;
        studentInputAOne.linkInput = studentInputAThree;
        studentInputAOne.linkInput = studentInputDOne;
        studentInputAOne.linkInput = studentInputDTwo;
        studentInputAOne.linkInput = studentInputDThree;
        studentInputATwo.linkInput = studentInputAThree;
        studentInputATwo.linkInput = studentInputDOne;
        studentInputATwo.linkInput = studentInputDTwo;
        studentInputATwo.linkInput = studentInputDThree;
        studentInputAThree.linkInput = studentInputDOne;
        studentInputAThree.linkInput = studentInputDTwo;
        studentInputAThree.linkInput = studentInputDThree;
        studentInputDOne.linkInput = studentInputDTwo;
        studentInputDOne.linkInput = studentInputDThree;
        studentInputDTwo.linkInput = studentInputDThree;
    }
    else { // question variant 2
        // hide variant 1, show variant 2
        document.getElementById('variant_one').style.display = 'none';
        document.getElementById('variant_two').style.display = 'block';
        // typeset question
        katex.render("l", document.getElementById('l_two'), { throwOnError: false });
        katex.render("p", document.getElementById('p_two'), { throwOnError: false });
        // coordinates of C
        katex.render("C(" + qnVariableArray[10] + "," + qnVariableArray[11] + "," + qnVariableArray[12] + ")", document.getElementById('C'), { throwOnError: false });
        katex.render(ijk(-qnVariableArray[7], qnVariableArray[6], 0), document.getElementById('direction_one'), { throwOnError: false });
        // second direction vector: have to check if n1 = 0
        let directionComponentFraction;
        if (qnVariableArray[6] != 0) {
            directionComponentFraction = simplifyFractionY(-qnVariableArray[8], qnVariableArray[6]);
            let directionComponent = new Fraction(directionComponentFraction[0] + "/" + directionComponentFraction[1]);
            directionComponent.simplify();
            katex.render(ijk(directionComponent.typeset, 0, 1), document.getElementById('direction_two'), { throwOnError: false });
        }
        else {
            directionComponentFraction = simplifyFractionY(-qnVariableArray[8], qnVariableArray[7]);
            let directionComponent = new Fraction(directionComponentFraction[0] + "/" + directionComponentFraction[1]);
            directionComponent.simplify();
            katex.render(ijk(0, directionComponent.typeset, 1), document.getElementById('direction_two'), { throwOnError: false });
        }
        // equation of line l
        let abOne = qnVariableArray[3] - qnVariableArray[0];
        let abTwo = qnVariableArray[4] - qnVariableArray[1];
        let abThree = qnVariableArray[5] - qnVariableArray[2];
        const divisor = gcdY(gcdY(abOne, abTwo), abThree);
        abOne /= divisor;
        abTwo /= divisor;
        abThree /= divisor;
        let lineForm = "\\mathbf{r} = \\begin{pmatrix}" + qnVariableArray[0] + "\\\\" + qnVariableArray[1] + "\\\\" + qnVariableArray[2] + "\\end{pmatrix}";
        lineForm += "+ \\lambda \\begin{pmatrix}" + abOne + "\\\\" + abTwo + "\\\\" + abThree + "\\end{pmatrix}, \\lambda \\in \\mathbb{R}.";
        katex.render(lineForm, document.getElementById('line_equation'), { throwOnError: false, displayMode: true });
        // qn_ai
        document.getElementById('line_or_plane').innerHTML = "plane";
        katex.render("p", document.getElementById('l_four'), { throwOnError: false });
        lineForm = "\\mathbf{r} \\cdot \\begin{pmatrix} n_1 \\\\ n_2 \\\\ n_3 \\end{pmatrix} = k.";
        katex.render(lineForm, document.getElementById('line_plane_form'), { throwOnError: false, displayMode: true });
        katex.render("n_1, n_2, n_3", document.getElementById('a_s'), { throwOnError: false });
        katex.render("k", document.getElementById('d_three'), { throwOnError: false });
        // student inputs: we use aOne, aTwo , aThree for n1, n2, n3 and dOne for k.
        studentInputAOne = new StudentInput('i', 'aOneInputDiv', 'n_1', 'submitButtonOne');
        studentInputAOne.addToDOM();
        studentInputATwo = new StudentInput('i', 'aTwoInputDiv', 'n_2', 'submitButtonOne');
        studentInputATwo.addToDOM();
        studentInputAThree = new StudentInput('i', 'aThreeInputDiv', 'n_3', 'submitButtonOne');
        studentInputAThree.addToDOM();
        studentInputDOne = new StudentInput('i', 'dOneInputDiv', 'k', 'submitButtonOne');
        studentInputDOne.addToDOM();
        studentInputAOne.linkInput = studentInputATwo;
        studentInputAOne.linkInput = studentInputAThree;
        studentInputAOne.linkInput = studentInputDOne;
        studentInputATwo.linkInput = studentInputAThree;
        studentInputATwo.linkInput = studentInputDOne;
        studentInputAThree.linkInput = studentInputDOne;
    }
    document.getElementById('samsungWarning').innerHTML = studentInputAOne.samsungWarningText;
};
// checkAi: (ai) asks for student confirmation
let checkAi = function () {
    // show confirmation dialog: create one if it's not present
    let dialog = document.getElementById('my-dialog-ai');
    if (!dialog) {
        let modal = document.querySelector('ons-modal');
        modal.show();
        // @ts-ignore
        ons.createElement('dialog-ai.html', { append: true }).then(function () {
            modal.hide();
            checkAi();
        });
    }
    else {
        // typesetting student answer
        studentInputAOne.updateValidity();
        studentInputATwo.updateValidity();
        studentInputAThree.updateValidity();
        studentInputDOne.updateValidity();
        if (qnVariant == 1) {
            studentInputDTwo.updateValidity();
            studentInputDThree.updateValidity();
            //@ts-ignore
            studentAi = "l: \\mathbf{r} =" + cVec(studentInputAOne.value, studentInputATwo.value, studentInputAThree.value) + "+\\lambda" + cVec(studentInputDOne.value, studentInputDTwo.value, studentInputDThree.value) + ", \\lambda \\in \\mathbb{R}.";
        }
        else {
            //@ts-ignore
            studentAi = "p: \\mathbf{r} \\cdot " + cVec(studentInputAOne.value, studentInputATwo.value, studentInputAThree.value) + "=" + studentInputDOne.value + ".";
        }
        katex.render(studentAi, document.getElementById('student_part_ai'), { throwOnError: false, displayMode: true });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of ai confirmation dialog
// show (ai) answer: give answer comments and show actual answer
let showAiAnswer = function () {
    // @ts-ignore
    hideDialog('my-dialog-ai');
    // show new Dialog to comment on answer
    // @ts-ignore
    ons.createElement('dialog-ans-ai.html', { append: true }).then(function (dialog) {
        dialog.show();
        // mark student's answer
        const studentAOne = studentInputAOne.value;
        const studentATwo = studentInputATwo.value;
        const studentAThree = studentInputAThree.value;
        const studentDOne = studentInputDOne.value;
        if (qnVariant == 1) {
            const studentDTwo = studentInputDTwo.value;
            const studentDThree = studentInputDThree.value;
            // subtract OA from student's point. Correct if we end up with 0, or if the final answer is parallel to D
            const studentCheckAOne = studentAOne - qnVariableArray[0], studentCheckATwo = studentATwo - qnVariableArray[1], studentCheckAThree = studentAThree - qnVariableArray[2];
            // actual equation of line l
            let abOne = qnVariableArray[3] - qnVariableArray[0];
            let abTwo = qnVariableArray[4] - qnVariableArray[1];
            let abThree = qnVariableArray[5] - qnVariableArray[2];
            const divisor = gcdY(gcdY(abOne, abTwo), abThree);
            abOne /= divisor;
            abTwo /= divisor;
            abThree /= divisor;
            lineAiForm = "l: \\mathbf{r} = \\begin{pmatrix}" + qnVariableArray[0] + "\\\\" + qnVariableArray[1] + "\\\\" + qnVariableArray[2] + "\\end{pmatrix}";
            lineAiForm += "+ \\lambda \\begin{pmatrix}" + abOne + "\\\\" + abTwo + "\\\\" + abThree + "\\end{pmatrix}, \\lambda \\in \\mathbb{R}.";
            let actualAB = [abOne, abTwo, abThree];
            // check student's point
            partAiMark = 0;
            if (studentCheckAOne == 0 && studentCheckATwo == 0 && studentCheckAThree == 0) {
                partAiMark++;
            }
            else if (isParallel([studentCheckAOne, studentCheckATwo, studentCheckAThree], actualAB)) {
                partAiMark++;
            }
            // check student's direction vector
            if (isParallel([studentDOne, studentDTwo, studentDThree], actualAB)) {
                partAiMark++;
            }
            // save student's answer
            studentAiArray = [studentAOne, studentATwo, studentAThree, studentDOne, studentDTwo, studentDThree];
            // typeset actual answer
        }
        else { // qnVariant 2
            const studentNVec = [studentAOne, studentATwo, studentAThree];
            partAiMark = 0;
            if (isParallel(studentNVec, qnVariableArray.slice(6, 9))) { // normal correct
                partAiMark++;
            }
            if (dotProduct(studentNVec, qnVariableArray.slice(10, 13)) == studentDOne) { // C lies in 
                partAiMark++;
            }
            // actual answer typeset
            lineAiForm = "p: \\mathbf{r} \\cdot" + cVec(qnVariableArray[6], qnVariableArray[7], qnVariableArray[8]) + "=" + qnVariableArray[9] + ".";
            // save student's answer
            studentAiArray = [studentAOne, studentATwo, studentAThree, studentDOne, '', ''];
        }
        // display marks
        if (partAiMark == 2) { // full marks (2)
            partAiMark = 2;
            document.getElementById('right_or_wrong').innerHTML = "Well done!";
            document.getElementById('alternative_answer').innerHTML = "One possible answer is";
            document.getElementById('alternative_answer_comments').style.display = "inline";
            document.getElementById('answer_ai_comments').style.display = 'none';
            document.getElementById('ai_marks_span').innerHTML = '2 marks';
        }
        else if (partAiMark == 1) { // 1 mark
            katex.render(studentAi, document.getElementById('student_ai'), { throwOnError: false, displayMode: true });
            document.getElementById('ai_marks_span').innerHTML = '1 mark';
        }
        else { // no marks
            katex.render(studentAi, document.getElementById('student_ai'), { throwOnError: false, displayMode: true });
            document.getElementById('ai_marks_received').style.display = 'none';
        }
        ;
        katex.render(lineAiForm, document.getElementById('ai_answer'), { throwOnError: false, displayMode: true });
    });
};
let proceedToAii = function () {
    // @ts-ignore
    hideDialog('my-dialog-ans-ai');
    // update value of (ai)
    document.getElementById('answer_ai').style.display = "none";
    document.getElementById('qn_ai').style.display = "none";
    document.getElementById('show_ai').style.display = "block";
    document.getElementById('qn_aii').style.display = "block";
    if (qnVariant == 1) {
        katex.render("l", document.getElementById('line_or_plane_two'), { throwOnError: false });
    }
    else {
        katex.render("p", document.getElementById('line_or_plane_two'), { throwOnError: false });
    }
    katex.render(lineAiForm, document.getElementById('line_plane_show'), { throwOnError: false, displayMode: true });
    // typeset qn (aii)
    katex.render("p", document.getElementById('p_three'), { throwOnError: false });
    katex.render("l", document.getElementById('l_three'), { throwOnError: false });
    // update marks
    document.getElementById('qn_part').innerHTML = "(aii)";
    document.getElementById('marks').innerHTML = "3";
    document.getElementById('answer_button').style.display = 'block';
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
        studentInputQOne = new StudentInput('f', 'mOneInputDiv', 'q_1', 'submitButton');
        studentInputQTwo = new StudentInput('f', 'mTwoInputDiv', 'q_2', 'submitButton');
        studentInputQThree = new StudentInput('f', 'mThreeInputDiv', 'q_3', 'submitButton');
        // typeset
        katex.render("(q_1,q_2,q_3)", document.getElementById('answer_form'), { throwOnError: false });
        katex.render("q_1, q_2 \\textrm{ and } q_3?", document.getElementById('m_s'), { throwOnError: false });
        katex.render("-" + fractionBuilderY(22, 7), document.getElementById('fraction_example'), { throwOnError: false });
        katex.render("-22/7", document.getElementById('decimal_example'), { throwOnError: false });
        studentInputQOne.addToDOM();
        studentInputQTwo.addToDOM();
        studentInputQThree.addToDOM();
        studentInputQOne.linkInput = studentInputQTwo;
        studentInputQOne.linkInput = studentInputQThree;
        studentInputQTwo.linkInput = studentInputQThree;
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
        sQOne = studentInputQOne.value;
        sQTwo = studentInputQTwo.value;
        sQThree = studentInputQThree.value;
        let sType = "(" + sQOne.typeset + "," + sQTwo.typeset + "," + sQThree.typeset + ")";
        katex.render(sType, document.getElementById('student_part_aii'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = {
        sAOne: studentAiArray[0], sATwo: studentAiArray[1], sAThree: studentAiArray[2], sDOne: studentAiArray[3], sDTwo: studentAiArray[4], sDThree: studentAiArray[5],
        aOne: qnVariableArray[0], aTwo: qnVariableArray[1], aThree: qnVariableArray[2],
        bOne: qnVariableArray[3], bTwo: qnVariableArray[4], bThree: qnVariableArray[5],
        nOne: qnVariableArray[6], nTwo: qnVariableArray[7], nThree: qnVariableArray[8],
        k: qnVariableArray[9],
        cOne: qnVariableArray[10], cTwo: qnVariableArray[11], cThree: qnVariableArray[12],
        aiM: partAiMark,
        sQOneSign: sQOne.sign, sQOneNum: sQOne.num, sQOneDen: sQOne.den,
        sQTwoSign: sQTwo.sign, sQTwoNum: sQTwo.num, sQTwoDen: sQTwo.den,
        sQThreeSign: sQThree.sign, sQThreeNum: sQThree.num, sQThreeDen: sQThree.den,
        qnVariant: qnVariant
    };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans1201.html', queriesObject);
};
