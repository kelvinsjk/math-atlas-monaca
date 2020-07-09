// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 13: question 1301
let qnVariant, qnVariableArray, sX, sY;
// question tab initialization
let onPageLoad = function () {
    const queriesObject = parseQueryY(window.location.search);
    const qnVariant = Number(queriesObject.qnVariant), a = Number(queriesObject.a), y = Number(queriesObject.y), sX = Number(queriesObject.sX), sY = Number(queriesObject.sY);
    // TODO: change this
    /* 	qnVariant = getRandomIntY(1, 3); // 1: az, 2: aiz, 3: az^*
        const a = 2 * getRandomNonZeroY(1, 9), y = getRandomNonZeroY(1, 9);
        sX = -a/2; sY = y; */
    // TODO: change this
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
    // solution page: tabbar load
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1).then(function () {
        // actual answer
        let actualX = -qnVariableArray[0] / 2, actualY = qnVariableArray[3]; // variant 1 answer
        if (qnVariant == 2) {
            actualY = -actualX;
            actualX = qnVariableArray[3];
        }
        else if (qnVariant == 3) {
            actualY *= -1;
        }
        // typeset student's answer
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
        // typeset actual answer
        complexString = '';
        if (actualX) {
            complexString = actualX.toString();
        }
        if (actualY) {
            if (actualY > 0) {
                if (actualX) {
                    complexString += "+";
                }
                if (actualY == 1) {
                    complexString += "i";
                }
                else {
                    complexString += actualY + "i";
                }
            }
            else {
                if (actualY == -1) {
                    complexString += "-i";
                }
                else {
                    complexString += actualY + "i";
                }
            }
        }
        let actualType = "z=" + complexString;
        katex.render(actualType, document.getElementById('actual_answer'), { throwOnError: false });
        // marking
        let runningMark = 0;
        if (actualX == sX) { // full marks
            runningMark += 2;
        }
        else if (actualX == -sX) { // off by sign
            runningMark++;
        }
        if (actualY == sY) { // full marks
            runningMark += 2;
        }
        else if (actualY == -sY) { // off by sign
            runningMark++;
        }
        if ((runningMark <= 1) && (sX * sX + sY * sY + qnVariableArray[0] * sX == qnVariableArray[1] || sX * sX + sY * sY - qnVariableArray[0] * sY == qnVariableArray[1])) { // ecf
            runningMark += 2;
        }
        // (aii) check marks
        if (runningMark > 0) {
            document.getElementById('check_mark_one').style.color = "#0076ff";
            document.getElementById('check_mark_one').style.opacity = "1.0";
            if (runningMark > 1) {
                document.getElementById('check_mark_two').style.color = "#0076ff";
                document.getElementById('check_mark_two').style.opacity = "1.0";
                if (runningMark > 2) {
                    document.getElementById('check_mark_three').style.color = "#0076ff";
                    document.getElementById('check_mark_three').style.opacity = "1.0";
                    if (runningMark > 3) {
                        document.getElementById('check_mark_four').style.color = "#0076ff";
                        document.getElementById('check_mark_four').style.opacity = "1.0";
                    }
                }
            }
        } // end of check marks	
        // progress bar
        // @ts-ignore
        var progressBar = new ProgressBar.Circle('#progress', {
            color: '#0076ff',
            strokeWidth: 10,
            duration: 1000,
            easing: 'easeInOut'
        });
        setTimeout(function () { progressBar.animate(runningMark / 4); }, 500);
        document.getElementById('progressBarText').innerHTML = runningMark + '/4';
        // final marks comment
        var comments = "You have scored ";
        if (runningMark == 4) {
            comments += "4/4 for this question. Well done! Keep up the good work.";
        }
        else if (runningMark > 1) {
            comments += runningMark + "/4 for this question. Just a bit more fine-tuning to get the full marks. \
			Try to see how you can arrive at the actual answer and try again!";
        }
        else {
            comments += runningMark + "/4 for this question. Let's try to figure out how we can get the answer and try again! \
		Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
        }
        ;
        document.getElementById('answerComments').innerHTML = comments;
    }); // end of tabbar page 2
}; // end of pageLoad
