// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: question 1001
// question tab initialization
let onPageLoad = function () {
    const queriesObject = parseQueryY(window.location.search);
    const partAiMark = Number(queriesObject.aiM), qnVariant = Number(queriesObject.qnVariant);
    const qnVariableArray = [
        Number(queriesObject.aOne), Number(queriesObject.aTwo), Number(queriesObject.aThree),
        Number(queriesObject.bOne), Number(queriesObject.bTwo), Number(queriesObject.bThree),
        Number(queriesObject.nOne), Number(queriesObject.nTwo), Number(queriesObject.nThree),
        Number(queriesObject.k),
        Number(queriesObject.cOne), Number(queriesObject.cTwo), Number(queriesObject.cThree)
    ];
    const sQOneSign = queriesObject.sQOneSign, sQOneNum = queriesObject.sQOneNum, sQOneDen = queriesObject.sQOneDen;
    const sQTwoSign = queriesObject.sQTwoSign, sQTwoNum = queriesObject.sQTwoNum, sQTwoDen = queriesObject.sQTwoDen;
    const sQThreeSign = queriesObject.sQThreeSign, sQThreeNum = queriesObject.sQThreeNum, sQThreeDen = queriesObject.sQThreeDen;
    const sAOne = Number(queriesObject.sAOne), sATwo = Number(queriesObject.sATwo), sAThree = Number(queriesObject.sAThree);
    const sDOne = Number(queriesObject.sDOne), sDTwo = Number(queriesObject.sDTwo), sDThree = Number(queriesObject.sDThree);
    const aOrB = Number(queriesObject.aOrB), sAngle = Number(queriesObject.sAngle), sDistance = Number(queriesObject.sDistance);
    let pointBii = 'C';
    let lineAiForm;
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
        lineAiForm = "l: \\mathbf{r} = \\begin{pmatrix}" + qnVariableArray[0] + "\\\\" + qnVariableArray[1] + "\\\\" + qnVariableArray[2] + "\\end{pmatrix}";
        lineAiForm += "+ \\lambda \\begin{pmatrix}" + abOne + "\\\\" + abTwo + "\\\\" + abThree + "\\end{pmatrix}, \\lambda \\in \\mathbb{R}.";
        katex.render(lineAiForm, document.getElementById('line_plane_show'), { throwOnError: false, displayMode: true });
        // choose whether (bii) will ask about A or B
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
        lineAiForm = "p: \\mathbf{r} \\cdot" + cVec(qnVariableArray[6], qnVariableArray[7], qnVariableArray[8]) + "=" + qnVariableArray[9] + ".";
        katex.render(lineAiForm, document.getElementById('line_plane_show'), { throwOnError: false, displayMode: true });
        // qn (bii)
        katex.render("l", document.getElementById('p_or_l'), { throwOnError: false });
    }
    // typeset question (b)
    katex.render("l", document.getElementById('l_three'), { throwOnError: false });
    katex.render("l", document.getElementById('l_five'), { throwOnError: false });
    katex.render("p", document.getElementById('p_three'), { throwOnError: false });
    katex.render("p", document.getElementById('p_five'), { throwOnError: false });
    katex.render(pointBii, document.getElementById('A_or_B'), { throwOnError: false });
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1).then(function () {
        // (aii) and (bi) done first. (ai) and (bii) next based on qnVariant
        // (aii) typeset student's answer
        const sQOne = queryTripleToFraction(sQOneSign, sQOneNum, sQOneDen);
        const sQTwo = queryTripleToFraction(sQTwoSign, sQTwoNum, sQTwoDen);
        const sQThree = queryTripleToFraction(sQThreeSign, sQThreeNum, sQThreeDen);
        katex.render("\\left (" + sQOne.typeset + "," + sQTwo.typeset + "," + sQThree.typeset + "\\right )", document.getElementById('student_aii'), { throwOnError: false });
        // (aii) actual answer
        let aVec = [qnVariableArray[0], qnVariableArray[1], qnVariableArray[2]], bVec = [qnVariableArray[3], qnVariableArray[4], qnVariableArray[5]];
        let nVec = [qnVariableArray[6], qnVariableArray[7], qnVariableArray[8]], k = qnVariableArray[9];
        let abVec = [qnVariableArray[3] - qnVariableArray[0], qnVariableArray[4] - qnVariableArray[1], qnVariableArray[5] - qnVariableArray[2]];
        let lambdaNum = k - dotProduct(aVec, nVec), lambdaDen = dotProduct(abVec, nVec);
        let lambdaArr = simplifyFractionY(lambdaNum, lambdaDen);
        let lambdaFrac = new Fraction(lambdaArr[0] + "/" + lambdaArr[1]);
        let aOneFrac = new Fraction(qnVariableArray[0].toString()), aTwoFrac = new Fraction(qnVariableArray[1].toString()), aThreeFrac = new Fraction(qnVariableArray[2].toString());
        let dOneFrac = new Fraction(abVec[0].toString()), dTwoFrac = new Fraction(abVec[1].toString()), dThreeFrac = new Fraction(abVec[2].toString());
        let actualQOne = addFractions(aOneFrac, multiplyFractions(dOneFrac, lambdaFrac)), actualQTwo = addFractions(aTwoFrac, multiplyFractions(dTwoFrac, lambdaFrac));
        let actualQThree = addFractions(aThreeFrac, multiplyFractions(dThreeFrac, lambdaFrac));
        actualQOne.simplify();
        actualQTwo.simplify();
        actualQThree.simplify();
        katex.render("\\left (" + actualQOne.typeset + "," + actualQTwo.typeset + "," + actualQThree.typeset + "\\right )", document.getElementById('actual_aii'), { throwOnError: false });
        // (aii) marking
        let aiiMarkOne = new MarkFraction(sQOne, actualQOne);
        let aiiMarkTwo = new MarkFraction(sQTwo, actualQTwo);
        let aiiMarkThree = new MarkFraction(sQThree, actualQThree);
        let partAiiMark = 0, partialCount = 0;
        if (aiiMarkOne.correct) {
            partAiiMark++;
        }
        ;
        if (aiiMarkTwo.correct) {
            partAiiMark++;
        }
        ;
        if (aiiMarkThree.correct) {
            partAiiMark++;
        }
        ;
        // partial marks 
        if (aiiMarkOne.partial) {
            partialCount++;
        }
        ;
        if (aiiMarkTwo.partial) {
            partialCount++;
        }
        ;
        if (aiiMarkThree.partial) {
            partialCount++;
        }
        ;
        if (partAiiMark == 0) { // potential for 2 bonus marks
            if (partialCount > 0) {
                partAiiMark++;
                if (partialCount > 1) {
                    partAiiMark++;
                }
            }
        }
        else if (partAiiMark == 1) { // potential for 1 bonus marks
            if (partialCount > 0) {
                partAiiMark++;
            }
        }
        // (aii) check marks
        if (partAiiMark > 0) {
            document.getElementById('check_mark_three').style.color = "#0076ff";
            document.getElementById('check_mark_three').style.opacity = "1.0";
            if (partAiiMark > 1) {
                document.getElementById('check_mark_four').style.color = "#0076ff";
                document.getElementById('check_mark_four').style.opacity = "1.0";
                if (partAiiMark > 2) {
                    document.getElementById('check_mark_five').style.color = "#0076ff";
                    document.getElementById('check_mark_five').style.opacity = "1.0";
                }
            }
        } // end of (aii) check marks	
        // (b) typeset student
        katex.render(sAngle.toFixed(1) + "^\\circ", document.getElementById('student_bi'), { throwOnError: false });
        katex.render(sDistance.toFixed(1) + "\\textrm{ units}", document.getElementById('student_bii'), { throwOnError: false });
        // (bi) actual answer
        let angleNum = Math.abs(dotProduct(abVec, nVec)), angleDen = Math.sqrt(dotProduct(abVec, abVec) * dotProduct(nVec, nVec));
        let actualAngle = Math.asin(angleNum / angleDen) / Math.PI * 180;
        katex.render(actualAngle.toFixed(1) + "^\\circ", document.getElementById('actual_bi'), { throwOnError: false });
        // (bi) marking
        let partBiMark = 0;
        if (sAngle.toFixed(1) == actualAngle.toFixed(1)) { // full marks
            partBiMark = 3;
        }
        else if (sAngle.toFixed(0) == actualAngle.toFixed(0) || (180 - sAngle).toFixed(0) == actualAngle.toFixed(0)) { // close or obtuse angle: 2 marks
            partBiMark = 2;
        }
        else if ((90 - sAngle).toFixed(0) == actualAngle.toFixed(0)) { // off by 90 degrees: 1 mark
            partBiMark = 1;
        }
        // (bi) check marks
        if (partBiMark > 0) {
            document.getElementById('check_mark_six').style.color = "#0076ff";
            document.getElementById('check_mark_six').style.opacity = "1.0";
            if (partBiMark > 1) {
                document.getElementById('check_mark_seven').style.color = "#0076ff";
                document.getElementById('check_mark_seven').style.opacity = "1.0";
                if (partBiMark > 2) {
                    document.getElementById('check_mark_eight').style.color = "#0076ff";
                    document.getElementById('check_mark_eight').style.opacity = "1.0";
                }
            }
        } // end of (bi) check marks
        // (ai) typeset answer
        katex.render(lineAiForm, document.getElementById('actual_ai'), { throwOnError: false });
        // (ai) check marks
        if (partAiMark > 0) {
            document.getElementById('check_mark_one').style.color = "#0076ff";
            document.getElementById('check_mark_one').style.opacity = "1.0";
            if (partAiMark > 1) {
                document.getElementById('check_mark_two').style.color = "#0076ff";
                document.getElementById('check_mark_two').style.opacity = "1.0";
            }
        } // end of (ai) check marks	
        let partBiiMark = 0;
        // question variant cases to typeset student (ai) and mark (bii)
        if (qnVariant == 1) {
            // typeset student (ai)
            let studentLine = "l: \\mathbf{r} =" + cVec(sAOne, sATwo, sAThree) + "+\\lambda" + cVec(sDOne, sDTwo, sDThree) + ", \\lambda \\in \\mathbb{R}";
            katex.render(studentLine, document.getElementById('student_ai'), { throwOnError: false });
            // (bii)
            let acVec = [qnVariableArray[10] - qnVariableArray[0], qnVariableArray[11] - qnVariableArray[1], qnVariableArray[12] - qnVariableArray[2]];
            if (aOrB == 2) { // should use bc instead of ac
                acVec = [qnVariableArray[10] - qnVariableArray[3], qnVariableArray[11] - qnVariableArray[4], qnVariableArray[12] - qnVariableArray[5]];
            }
            let actualBii = Math.abs(dotProduct(acVec, nVec)) / Math.sqrt(dotProduct(nVec, nVec));
            katex.render(actualBii.toFixed(1) + "\\textrm{ units}", document.getElementById('actual_bii'), { throwOnError: false });
            // marking
            if (sDistance.toFixed(1) == actualBii.toFixed(1)) { // full marks
                partBiiMark = 3;
            }
            else if (sDistance.toFixed(0) == actualBii.toFixed(0)) { // close: 2 marks
                partBiiMark = 2;
            }
            else if (sDistance.toFixed(0) == Math.abs(dotProduct(acVec, nVec)).toFixed(0)) { // forgot the hat: 1 mark
                partBiiMark = 1;
            }
        }
        else {
            // typeset student (ai)
            let studentPlane = "p: \\mathbf{r} \\cdot" + cVec(sAOne, sATwo, sAThree) + "=" + sDOne;
            katex.render(studentPlane, document.getElementById('student_ai'), { throwOnError: false });
            // (bii)
            let acVec = [qnVariableArray[10] - qnVariableArray[0], qnVariableArray[11] - qnVariableArray[1], qnVariableArray[12] - qnVariableArray[2]];
            let acCrossAb = crossProduct(acVec, abVec);
            let actualBii = Math.sqrt(dotProduct(acCrossAb, acCrossAb)) / Math.sqrt(dotProduct(abVec, abVec));
            katex.render(actualBii.toFixed(1) + "\\textrm{ units}", document.getElementById('actual_bii'), { throwOnError: false });
            // marking
            if (sDistance.toFixed(1) == actualBii.toFixed(1)) { // full marks
                partBiiMark = 3;
            }
            else if (sDistance.toFixed(0) == actualBii.toFixed(0)) { // close: 2 marks
                partBiiMark = 2;
            }
            else if (sDistance.toFixed(0) == Math.sqrt(dotProduct(acCrossAb, acCrossAb)).toFixed(0)) { // forgot the hat: 1 mark
                partBiiMark = 1;
            }
        }
        // (bii) check marks
        if (partBiiMark > 0) {
            document.getElementById('check_mark_nine').style.color = "#0076ff";
            document.getElementById('check_mark_nine').style.opacity = "1.0";
            if (partBiiMark > 1) {
                document.getElementById('check_mark_ten').style.color = "#0076ff";
                document.getElementById('check_mark_ten').style.opacity = "1.0";
                if (partBiiMark > 2) {
                    document.getElementById('check_mark_eleven').style.color = "#0076ff";
                    document.getElementById('check_mark_eleven').style.opacity = "1.0";
                }
            }
        } // end of (bii) check marks
        let runningMark = partAiMark + partAiiMark + partBiMark + partBiiMark;
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 11); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/11';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 11) {
            comments += "11/11 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 4) {
            comments += runningMark + "/11 for this question. Just a bit more fine-tuning to get the full marks. \
			Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/11 for this question. Let's try to figure out how we can get the answer and try again! \
		Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    }); // end of tabbar page 2
}; // end of pageLoad
