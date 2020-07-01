// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 10: question 1001
// question tab initialization
let onPageLoad = function () {
    // Randomly generated elements.
    let queriesObject = parseQueryY(window.location.search);
    let a = Number(queriesObject.a);
    let b = Number(queriesObject.b);
    let c = Number(queriesObject.c);
    let d = Number(queriesObject.d);
    let sASign = queriesObject.sASign;
    let sANum = queriesObject.sANum;
    let sADen = queriesObject.sADen;
    let sBSign = queriesObject.sBSign;
    let sBNum = queriesObject.sBNum;
    let sBDen = queriesObject.sBDen;
    let sCSign = queriesObject.sCSign;
    let sCNum = queriesObject.sCNum;
    let sCDen = queriesObject.sCDen;
    let sKSign = queriesObject.sKSign;
    let sKNum = queriesObject.sKNum;
    let sKDen = queriesObject.sKDen;
    let sA = queryTripleToFraction(sASign, sANum, sADen);
    let sB = queryTripleToFraction(sBSign, sBNum, sBDen);
    let sK = queryTripleToFraction(sKSign, sKNum, sKDen);
    let sC = queryTripleToFraction(sCSign, sCNum, sCDen);
    // generate question
    let DE = polyBuilderY([a, 0], fractionBuilderY("\\mathrm{d}m", "\\mathrm{d}t"));
    DE += "=" + polyBuilderY([-c, b], "m");
    // typeset question
    katex.render("m,", document.getElementById('m'), { throwOnError: false });
    katex.render("m", document.getElementById('m_two'), { throwOnError: false });
    katex.render("t", document.getElementById('t'), { throwOnError: false });
    katex.render("t,", document.getElementById('t_two'), { throwOnError: false });
    katex.render("t.", document.getElementById('t_three'), { throwOnError: false });
    katex.render(DE + ".", document.getElementById('DE'), { throwOnError: false, displayMode: true });
    katex.render("m=" + d, document.getElementById('m_initial'), { throwOnError: false });
    katex.render("t=0", document.getElementById('t_equals_zero'), { throwOnError: false });
    // switch to solution tab
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1).then(function () {
        // part (a)
        let partAMark = 0;
        // a: -d/c
        let actualA = new Fraction((c * d - b).toString() + "/" + c);
        actualA.simplify();
        let aMark = new MarkFraction(actualA, sA);
        if (aMark.correct) {
            partAMark += 2;
        }
        else if (aMark.partial) {
            partAMark += 1;
        }
        // b: b/c
        let actualB = new Fraction(b + "/" + c);
        actualB.simplify();
        let bMark = new MarkFraction(actualB, sB);
        if (bMark.correct) {
            partAMark += 2;
        }
        else if (bMark.partial) {
            partAMark += 1;
        }
        // k: -c/a
        let actualK = new Fraction(-c + "/" + a);
        actualK.simplify();
        let kMark = new MarkFraction(actualK, sK);
        if (kMark.correct) {
            partAMark += 2;
        }
        else if (kMark.partial) {
            partAMark += 1;
        }
        // typeset answer
        let exponent = polyBuilderY([sK.typeset, 0], 't');
        let sType = polyBuilderY([sA.typeset, sB.typeset], "\\mathrm{e}^{" + exponent + "}");
        katex.render("m="+sType, document.getElementById('student_a'), { throwOnError: false });
        exponent = polyBuilderY([actualK.typeset, 0], 't');
        sType = polyBuilderY([actualA.typeset, actualB.typeset], "\\mathrm{e}^{" + exponent + "}");
        katex.render("m="+sType, document.getElementById('actual_a'), { throwOnError: false });
        // check marks
        if (partAMark > 0) {
            document.getElementById('check_mark_one').style.color = "#0076ff";
            document.getElementById('check_mark_one').style.opacity = "1.0";
            if (partAMark > 1) {
                document.getElementById('check_mark_two').style.color = "#0076ff";
                document.getElementById('check_mark_two').style.opacity = "1.0";
                if (partAMark > 2) {
                    document.getElementById('check_mark_three').style.color = "#0076ff";
                    document.getElementById('check_mark_three').style.opacity = "1.0";
                    if (partAMark > 3) {
                        document.getElementById('check_mark_four').style.color = "#0076ff";
                        document.getElementById('check_mark_four').style.opacity = "1.0";
                        if (partAMark > 4) {
                            document.getElementById('check_mark_five').style.color = "#0076ff";
                            document.getElementById('check_mark_five').style.opacity = "1.0";
                            if (partAMark == 6) {
                                document.getElementById('check_mark_six').style.color = "#0076ff";
                                document.getElementById('check_mark_six').style.opacity = "1.0";
                            }
                        }
                    }
                }
            }
        } // end of check marks
        // part (b): actual C is equals to b
        let DMarkOne = new MarkFraction(actualB, sC); // actual answer
        let DMarkTwo = new MarkFraction(sB, sC); // ecf possibility
        let partBMark = 0;
        if (DMarkOne.correct || DMarkTwo.correct) {
            document.getElementById('check_mark_seven').style.color = "#0076ff";
            document.getElementById('check_mark_seven').style.opacity = "1.0";
            partBMark++;
            if (DMarkTwo.correct && !DMarkOne.correct) {
                document.getElementById('ecf').style.display = 'inline';
            }
            ;
        }
        // typeset (b)
        katex.render(actualB.typeset, document.getElementById('actual_b'), { throwOnError: false });
        katex.render(sC.typeset, document.getElementById('student_b'), { throwOnError: false });
        katex.render("m", document.getElementById('m_actual'), { throwOnError: false });
        katex.render("m", document.getElementById('m_student'), { throwOnError: false });
        let runningMark = partAMark + partBMark;
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 7); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/7';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 7) {
            comments += "7/7 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 2) {
            comments += runningMark + "/7 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/7 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    });
};
