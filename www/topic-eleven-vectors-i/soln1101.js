// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: question 1001
// question tab initialization
let onPageLoad = function () {
    const queriesObject = parseQueryY(window.location.search);
    const partAiMark = Number(queriesObject.aiMark);
    const m = Number(queriesObject.m), n = Number(queriesObject.n), mbVsAb = Number(queriesObject.mbVsAb);
    const OACvsOAB = Number(queriesObject.OAC);
    const sMOne = queryTripleToFraction(queriesObject.sMOneSign, queriesObject.sMOneNum, queriesObject.sMOneDen);
    const sMTwo = queryTripleToFraction(queriesObject.sMTwoSign, queriesObject.sMTwoNum, queriesObject.sMTwoDen);
    const sMThree = queryTripleToFraction(queriesObject.sMThreeSign, queriesObject.sMThreeNum, queriesObject.sMThreeDen);
    const sB = queryTripleToFraction(queriesObject.sBSign, queriesObject.sBNum, queriesObject.sBDen);
    const sC = Number(queriesObject.sC);
    const cArr = [Number(queriesObject.cOne), Number(queriesObject.cTwo), Number(queriesObject.cThree)];
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
    const triangleString = (OACvsOAB == 1) ? "OAC" : "OBC";
    const cVector = ijk(cArr[0], cArr[1], cArr[2]);
    const bArr = [Number(abArr[3]), Number(abArr[4]), Number(abArr[5])], aArr = [Number(abArr[0]), Number(abArr[1]), Number(abArr[2])];
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
    if (mbVsAb == 1) { // AM:MB
        katex.render("AM:MB=" + m + ":" + n, document.getElementById('ratio'), { throwOnError: false });
    }
    else { // AM: AB
        katex.render("AM:AB=" + m + ":" + (m + n).toString(), document.getElementById('ratio'), { throwOnError: false });
    }
    // switch to solution tab
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1).then(function () {
        // part (ai)
        katex.render("a=" + actualA, document.getElementById('actual_ai'), { throwOnError: false });
        // check marks
        if (partAiMark > 0) {
            document.getElementById('check_mark_one').style.color = "#0076ff";
            document.getElementById('check_mark_one').style.opacity = "1.0";
            if (partAiMark > 1) {
                document.getElementById('check_mark_two').style.color = "#0076ff";
                document.getElementById('check_mark_two').style.opacity = "1.0";
            }
        } // end of check marks
        // part(aii): typeset student
        katex.render("\\overrightarrow{OM}=" + ijk(sMOne.typeset, sMTwo.typeset, sMThree.typeset), document.getElementById('student_aii'), { throwOnError: false });
        // (aii): typeset actual
        //@ts-ignore
        let mOne = new Fraction((m * bArr[0] + n * aArr[0]) + "/" + (m + n)), mTwo = new Fraction((m * bArr[1] + n * aArr[1]) + "/" + (m + n)), mThree = new Fraction((m * bArr[2] + n * aArr[2]) + "/" + (m + n));
        mOne.simplify();
        mTwo.simplify();
        mThree.simplify();
        katex.render("\\overrightarrow{OM}=" + ijk(mOne.typeset, mTwo.typeset, mThree.typeset), document.getElementById('actual_aii'), { throwOnError: false });
        // (aii): marking
        let partAiiMark = 0;
        const mOneMark = new MarkFraction(mOne, sMOne);
        const mTwoMark = new MarkFraction(mTwo, sMTwo);
        const mThreeMark = new MarkFraction(mThree, sMThree);
        if (mOneMark.correct) {
            partAiiMark++;
        }
        ;
        if (mTwoMark.correct) {
            partAiiMark++;
        }
        ;
        if (mThreeMark.correct) {
            partAiiMark++;
        }
        ;
        // (aii): chance for partial marks: if partial mark for fractions or mixed up m and n order or used m:m+n
        let mOneAltOne = new Fraction((n * bArr[0] + m * aArr[0]) + "/" + (m + n));
        mOneAltOne.simplify();
        let mOneAltTwo = new Fraction((m * bArr[0] + (m + n) * aArr[0]) + "/" + (m + n + m));
        mOneAltTwo.simplify();
        const mOneMarkAltOne = new MarkFraction(mOneAltOne, sMOne);
        const mOneMarkAltTwo = new MarkFraction(mOneAltTwo, sMTwo);
        if (partAiiMark == 0 && (mOneMark.partial || mTwoMark.partial || mThreeMark.partial || mOneMarkAltOne.partial || mOneMarkAltTwo.partial)) {
            partAiiMark++;
            if (mOneMark.partial && mTwoMark.partial && mThreeMark.partial) {
                partAiiMark = 2;
            }
        }
        // check marks
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
        } // end of check marks	
        // part (b): typeset student
        let studentBString;
        if (sC == 1) {
            studentBString = sB.typeset;
        }
        else {
            studentBString = polyBuilderY([sB.typeset, 0], "\\sqrt{" + sC + "}");
        }
        katex.render("\\textrm{Area }=" + studentBString, document.getElementById('student_b'), { throwOnError: false });
        // (b): typeset actual
        let firstVector;
        if (OACvsOAB == 1) {
            firstVector = aArr;
        }
        else {
            firstVector = bArr;
        }
        let crossProductMagnitude = Math.pow((firstVector[1] * cArr[2] - firstVector[2] * cArr[1]), 2) + Math.pow((firstVector[0] * cArr[2] - firstVector[2] * cArr[0]), 2) + Math.pow((firstVector[0] * cArr[1] - firstVector[1] * cArr[0]), 2);
        let actualBArray = surdSimplifier(crossProductMagnitude);
        let actualBString;
        let actualB = new Fraction(actualBArray[0] + "/2");
        actualB.simplify();
        if (actualBArray[1] == 1) {
            actualBString = actualB.typeset;
        }
        else {
            actualBString = polyBuilderY([actualB.typeset, 0], "\\sqrt{" + actualBArray[1] + "}");
        }
        katex.render("\\textrm{Area }=" + actualBString, document.getElementById('actual_b'), { throwOnError: false });
        // (b): marking
        let partBMark = 0;
        const bMark = new MarkFraction(sB, actualB);
        if (bMark.correct) {
            partBMark += 2;
        }
        else if (bMark.partial || sB.float == actualB.float/2) { //partial marks, or forget 1/2 in formula
            partBMark += 1;
        }
        if (Math.abs(actualBArray[1]) == Math.abs(sC)) {
            partBMark++;
            if (actualBArray[1] == sC) {
                partBMark++;
            }
            ;
        }
        const actualFloat = actualB.float * Math.sqrt(actualBArray[1]), studentFloat = sB.float * Math.sqrt(sC);
        if (partBMark <= 2 && actualFloat.toPrecision(2) == studentFloat.toPrecision(2)) {
            partBMark++;
        }
        ;
        // check marks
        if (partBMark > 0) {
            document.getElementById('check_mark_six').style.color = "#0076ff";
            document.getElementById('check_mark_six').style.opacity = "1.0";
            if (partBMark > 1) {
                document.getElementById('check_mark_seven').style.color = "#0076ff";
                document.getElementById('check_mark_seven').style.opacity = "1.0";
                if (partBMark > 2) {
                    document.getElementById('check_mark_eight').style.color = "#0076ff";
                    document.getElementById('check_mark_eight').style.opacity = "1.0";
                    if (partBMark > 3) {
                        document.getElementById('check_mark_nine').style.color = "#0076ff";
                        document.getElementById('check_mark_nine').style.opacity = "1.0";
                    }
                }
            }
        } // end of check marks	
        let runningMark = partAiMark + partAiiMark + partBMark;
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 9); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/9';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 9) {
            comments += "9/9 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 3) {
            comments += runningMark + "/9 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/9 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    });
};
