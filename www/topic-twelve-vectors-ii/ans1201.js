// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: questions 1001
// global variables
let studentInputAngle, sAngle;
let studentInputDistance, sDistance;
let queriesObject;
let aOrB;
let pointBii;
let qnVariant;
let onPageLoad = function () {
    queriesObject = parseQueryY(window.location.search);
    // construct required items from queriesObject
    const qnVariant = Number(queriesObject.qnVariant);
    const qnVariableArray = [
        Number(queriesObject.aOne), Number(queriesObject.aTwo), Number(queriesObject.aThree),
        Number(queriesObject.bOne), Number(queriesObject.bTwo), Number(queriesObject.bThree),
        Number(queriesObject.nOne), Number(queriesObject.nTwo), Number(queriesObject.nThree),
        Number(queriesObject.k),
        Number(queriesObject.cOne), Number(queriesObject.cTwo), Number(queriesObject.cThree)
    ];
    pointBii = 'C';
    // typeset question
    if (qnVariant == 1) {
        // question typeset
        katex.render("l", document.getElementById('l_one'), { throwOnError: false });
        katex.render("p", document.getElementById('p_one'), { throwOnError: false });
        katex.render("A", document.getElementById('A'), { throwOnError: false });
        katex.render("B", document.getElementById('B'), { throwOnError: false });
        // coordinates of A and B
        katex.render("(" + qnVariableArray[0] + "," + qnVariableArray[1] + "," + qnVariableArray[2] + ")", document.getElementById('A_coordinates'), { throwOnError: false });
        katex.render("(" + qnVariableArray[3] + "," + qnVariableArray[4] + "," + qnVariableArray[5] + ")", document.getElementById('B_coordinates'), { throwOnError: false });
        // form equation of plane
        katex.render(ijk(qnVariableArray[6], qnVariableArray[7], qnVariableArray[8], 'x', 'y', 'z') + "=" + qnVariableArray[9] + ".", document.getElementById('plane_equation'), { throwOnError: false, displayMode: true });
        // show
        katex.render("l", document.getElementById('line_or_plane_two'), { throwOnError: false });
        // actual equation of line l
        let abOne = qnVariableArray[3] - qnVariableArray[0];
        let abTwo = qnVariableArray[4] - qnVariableArray[1];
        let abThree = qnVariableArray[5] - qnVariableArray[2];
        const divisor = gcdY(gcdY(abOne, abTwo), abThree);
        abOne /= divisor;
        abTwo /= divisor;
        abThree /= divisor;
        let lineAiForm = "l: \\mathbf{r} = \\begin{pmatrix}" + qnVariableArray[0] + "\\\\" + qnVariableArray[1] + "\\\\" + qnVariableArray[2] + "\\end{pmatrix}";
        lineAiForm += "+ \\lambda \\begin{pmatrix}" + abOne + "\\\\" + abTwo + "\\\\" + abThree + "\\end{pmatrix}, \\lambda \\in \\mathbb{R}.";
        katex.render(lineAiForm, document.getElementById('line_plane_show'), { throwOnError: false, displayMode: true });
        // choose whether (bii) will ask about A or B
        aOrB = getRandomIntY(1, 2); // 1: A, 2: B
        if (aOrB == 1) {
            pointBii = 'A';
        }
        else {
            pointBii = 'B';
        }
        // qn (bii)
        katex.render("p", document.getElementById('p_or_l'), { throwOnError: false });
    }
    else { // question variant 2
        aOrB = 3; // point C
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
        let lineAiForm = "p: \\mathbf{r} \\cdot" + cVec(qnVariableArray[6], qnVariableArray[7], qnVariableArray[8]) + "=" + qnVariableArray[9] + ".";
        katex.render(lineAiForm, document.getElementById('line_plane_show'), { throwOnError: false, displayMode: true });
        // qn (bii)
        katex.render("l", document.getElementById('p_or_l'), { throwOnError: false });
    }
    // typeset question (b)
    katex.render("l", document.getElementById('l_three'), { throwOnError: false });
    katex.render("p", document.getElementById('p_three'), { throwOnError: false });
    katex.render(pointBii, document.getElementById('A_or_B'), { throwOnError: false });
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
        katex.render(pointBii, document.getElementById('A_or_B_two'), { throwOnError: false });
        if (qnVariant == 1) {
            katex.render("p.", document.getElementById('p_or_l_two'), { throwOnError: false });
        }
        else {
            katex.render("l.", document.getElementById('p_or_l_two'), { throwOnError: false });
        }
        // student inputs
        studentInputAngle = new StudentInput('iP', 'angleInputDiv', '\\textrm{Angle}', 'submitButton');
        studentInputDistance = new StudentInput('iP', 'distanceInputDiv', '\\textrm{Distance}', 'submitButton');
        studentInputAngle.linkInput = studentInputDistance;
        studentInputAngle.addToDOM();
        studentInputDistance.addToDOM();
        let angleInput = document.getElementById('input\\TEXTRM{ANGLE}');
        angleInput.step = '0.1';
        let distanceInput = document.getElementById('input\\TEXTRM{DISTANCE}');
        distanceInput.step = '0.1';
        let angleAppend = document.createElement("span");
        angleAppend.id = "degrees";
        let distanceAppend = document.createElement("span");
        distanceAppend.innerHTML = " units";
        document.getElementById('angleInputDiv').appendChild(angleAppend);
        document.getElementById('distanceInputDiv').appendChild(distanceAppend);
        katex.render("^\\circ", document.getElementById('degrees'), { throwOnError: false });
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
        sAngle = studentInputAngle.value;
        sDistance = studentInputDistance.value;
        katex.render("=" + sAngle.toFixed(1) + "^\\circ .", document.getElementById('student_bi'), { throwOnError: false });
        katex.render("=" + sDistance.toFixed(1), document.getElementById('student_bii'), { throwOnError: false });
        // shows dialog
        dialog.show();
    } // end of if/else (dialog)		
}; // end of b confirmation dialog
// passes Option selected to answer page
let proceedToB = function () {
    queriesObject.sAngle = sAngle;
    queriesObject.sDistance = sDistance;
    queriesObject.aOrB = aOrB;
    window.location = htmlQueryConstructor('soln1201.html', queriesObject);
};
