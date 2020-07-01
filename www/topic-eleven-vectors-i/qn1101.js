// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
// global variables
let abArr, unknownPos, m, n, mbVsAb;
let studentInputA, studentInputMOne, studentInputMTwo, studentInputMThree;
let sA, actualA, sMOne, sMTwo, sMThree;
let partAiMark;
// onPageLoad: initialize qn
let onPageLoad = function () {
    // Randomly generated elements
    unknownPos = getRandomIntY(0, 5); // 0: a_1, 1: b_1, 2: a_2 etc. Decide where our unknown will be
    // Generate 4 components
    let aOne = getRandomIntY(-9, 9), aTwo = getRandomIntY(-9, 9), bOne = getRandomIntY(-9, 9), bTwo = getRandomIntY(-9, 9);
    let abArray = [aOne, aTwo, bOne, bTwo];
    while (countZeroes(abArray) > 1) { // approx 7% chance of triggering more than 1 zero. generate new numbers
        abArray[0] = getRandomIntY(-9, 9);
        abArray[1] = getRandomIntY(-9, 9);
        abArray[2] = getRandomIntY(-9, 9);
        abArray[3] = getRandomIntY(-9, 9);
    }
    // generate remaining pair of components
    const dotProduct = abArray[0] * abArray[1] + abArray[2] * abArray[3];
    let aThree, bThree;
    if (dotProduct == 0) { // unknown will be 0, we can put any other non-zero number as the other pair
        actualA = 0;
        if ((unknownPos % 2) == 0) { // unknown is in vector a
            aThree = 'a';
            bThree = getRandomNonZeroY(1, 9);
        }
        else { // unknown is in b
            bThree = 'a';
            aThree = getRandomNonZeroY(1, 9);
        }
    }
    else {
        let factorList = factors(dotProduct);
        let remainingPair = factorList[getRandomIntY(0, factorList.length - 1)];
        if (getRandomIntY(1, 2) == 1) { // swap things around
            aThree = remainingPair[0];
            bThree = remainingPair[1];
        }
        else {
            aThree = remainingPair[1];
            bThree = remainingPair[0];
        }
        if (dotProduct > 0) { // product of remaining pair must be negative
            if (getRandomIntY(1, 2) == 1) { // randomly assign negative sign
                aThree *= -1;
            }
            else {
                bThree *= -1;
            }
        }
        else { // product of remaining pair must be negative
            if (getRandomIntY(1, 2) == 1) { // randomly assign negative sign
                aThree *= -1;
                bThree *= -1;
            }
        }
        // assign unknown
        if ((unknownPos % 2) == 0) { // unknown is in vector a
            actualA = aThree;
            aThree = 'a';
        }
        else { // unknown is in b
            actualA = bThree;
            bThree = 'a';
        }
    }
    // insert remaining components into abArray
    abArr = abArray;
    abArr.splice(Math.floor(unknownPos / 2) * 2, 0, aThree, bThree);
    // typeset position vectors
    const aVector = ijk(abArr[0], abArr[2], abArr[4]);
    const bVector = ijk(abArr[1], abArr[3], abArr[5]);
    const vectorString = "\\begin{aligned} & " + aVector + "\\quad \\textrm{and} \\\\ & " + bVector + "\\end{aligned}";
    katex.render(vectorString, document.getElementById('position_vectors'), { throwOnError: false, displayMode: true });
    // typeset rest of questions
    katex.render("O", document.getElementById('O'), { throwOnError: false });
    katex.render("A", document.getElementById('A'), { throwOnError: false });
    katex.render("B", document.getElementById('B'), { throwOnError: false });
    katex.render("OA", document.getElementById('OA'), { throwOnError: false });
    katex.render("OB", document.getElementById('OB'), { throwOnError: false });
    katex.render("a", document.getElementById('a'), { throwOnError: false });
    // student input fields
    studentInputA = new StudentInput('i', 'aInputDiv', 'a', 'submitButtonOne');
    studentInputA.addToDOM();
    document.getElementById('samsungWarning').innerHTML = studentInputA.samsungWarningText;
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
        studentInputA.updateValidity();
        sA = studentInputA.value;
        katex.render("a=" + sA, document.getElementById('student_part_ai'), { throwOnError: false });
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
        if (sA == actualA) { // full marks (2)
            partAiMark = 2;
            document.getElementById('right_or_wrong').innerHTML = "Well done!";
            document.getElementById('answer_ai_comments').style.display = 'none';
            document.getElementById('ai_marks_span').innerHTML = '2 marks';
        }
        else if (actualA == -sA) { // 1 mark
            katex.render("a=" + sA, document.getElementById('student_ai'), { throwOnError: false });
            partAiMark = 1;
            document.getElementById('ai_marks_span').innerHTML = '1 mark';
        }
        else { // no marks
            partAiMark = 0;
            katex.render("a=" + sA, document.getElementById('student_ai'), { throwOnError: false });
            document.getElementById('ai_marks_received').style.display = 'none';
        }
        ;
        katex.render("a=" + actualA, document.getElementById('ai_answer'), { throwOnError: false });
    });
};
let proceedToAii = function () {
    // @ts-ignore
    hideDialog('my-dialog-ans-ai');
    // update value of a
    document.getElementById('ai_update').innerHTML = "show that <span id='actual_a'></span>";
    katex.render("a=" + actualA, document.getElementById('actual_a'), { throwOnError: false });
    document.getElementById('answer_ai').style.display = "none";
    document.getElementById('qn_aii').style.display = "block";
    // update marks
    document.getElementById('qn_part').innerHTML = "(aii)";
    document.getElementById('marks').innerHTML = "3";
    // generate ratio
    m = getRandomIntY(1, 5);
    n = getRandomIntY(1, 5);
    const mnArr = simplifyFractionY(m, n);
    m = mnArr[0];
    n = mnArr[1];
    // typeset (aii) qn and show answer tab button
    katex.render("M", document.getElementById('M'), { throwOnError: false });
    katex.render("AB", document.getElementById('AB'), { throwOnError: false });
    mbVsAb = getRandomIntY(1, 2);
    if (mbVsAb == 1) { // AM:MB
        katex.render("AM:MB=" + m + ":" + n, document.getElementById('ratio'), { throwOnError: false });
    }
    else { // AM: AB
        katex.render("AM:AB=" + m + ":" + (m + n).toString(), document.getElementById('ratio'), { throwOnError: false });
    }
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
        studentInputMOne = new StudentInput('f', 'mOneInputDiv', 'm_1', 'submitButton');
        studentInputMTwo = new StudentInput('f', 'mTwoInputDiv', 'm_2', 'submitButton');
        studentInputMThree = new StudentInput('f', 'mThreeInputDiv', 'm_3', 'submitButton');
        // typeset
        katex.render("\\textrm{Find the position vector of } M.", document.getElementById('find_m'), { throwOnError: false });
        katex.render(ijk('m_1', 'm_2', 'm_3') + '.', document.getElementById('answer_form'), { throwOnError: false });
        katex.render("m_1, m_2 \\textrm{ and } m_3?", document.getElementById('m_s'), { throwOnError: false });
        katex.render("-" + fractionBuilderY(22, 7), document.getElementById('fraction_example'), { throwOnError: false });
        katex.render("-22/7", document.getElementById('decimal_example'), { throwOnError: false });
        studentInputMOne.addToDOM();
        studentInputMTwo.addToDOM();
        studentInputMThree.addToDOM();
        studentInputMOne.linkInput = studentInputMTwo;
        studentInputMOne.linkInput = studentInputMThree;
        studentInputMTwo.linkInput = studentInputMThree;
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
        sMOne = studentInputMOne.value;
        sMTwo = studentInputMTwo.value;
        sMThree = studentInputMThree.value;
        let sMOneType, sMTwoType, sMThreeType;
        if (sMOne.typeOf == "i") {
            sMOneType = sMOne.float;
        }
        else {
            sMOneType = sMOne.typeset;
        }
        ;
        if (sMTwo.typeOf == "i") {
            sMTwoType = sMTwo.float;
        }
        else {
            sMTwoType = sMTwo.typeset;
        }
        ;
        if (sMThree.typeOf == "i") {
            sMThreeType = sMThree.float;
        }
        else {
            sMThreeType = sMThree.typeset;
        }
        ;
        let sType = "\\overrightarrow{OM}=" + ijk(sMOneType, sMTwoType, sMThreeType);
        katex.render(sType, document.getElementById('student_part_aii'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of aii confirmation dialog
// passes Option selected to answer page
let proceedTob = function () {
    let queriesObject = {
        a1: abArr[0], a2: abArr[2], a3: abArr[4], b1: abArr[1], b2: abArr[3], b3: abArr[5], actualA: actualA, aiMark: partAiMark, m: m, n: n, mbVsAb: mbVsAb,
        sMOneSign: sMOne.sign,
        sMOneNum: sMOne.num,
        sMOneDen: sMOne.den,
        sMTwoSign: sMTwo.sign,
        sMTwoNum: sMTwo.num,
        sMTwoDen: sMTwo.den,
        sMThreeSign: sMThree.sign,
        sMThreeNum: sMThree.num,
        sMThreeDen: sMThree.den,
    };
    // @ts-ignore
    window.location = htmlQueryConstructor('ans1101.html', queriesObject);
};
