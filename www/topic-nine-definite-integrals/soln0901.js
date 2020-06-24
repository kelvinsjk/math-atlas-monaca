// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
let queriesObject;
let n, qnCase;
let sASign, sANum, sADen;
let sCSign, sCNum, sCDen;
let sB, sV;
let runningMark;
let upperLimitFloat;
// question tab initialization
let onPageLoad = function () {
    // Randomly generated elements. TODO: change to take from queriesObject
    queriesObject = parseQueryY(window.location.search);
    n = Number(queriesObject.n);
    qnCase = Number(queriesObject.qnCase);
    runningMark = 0;
    // generate question
    let curve = "y=x^2", nx = polyBuilderY([n, 0]);
    let upperLimit = '';
    switch (qnCase) {
        case 0:
            curve += "\\sin " + nx;
            upperLimit = "\\frac{\\pi}{" + (2 * n).toString() + "}";
            upperLimitFloat = Math.PI / 2 / n;
            break;
        case 1:
            curve += "\\sin " + nx;
            if (n == 1) {
                upperLimit = "\\pi";
            }
            else {
                upperLimit = "\\frac{\\pi}{" + (n).toString() + "}";
            }
            ;
            upperLimitFloat = Math.PI / n;
            break;
        case 2:
            curve += "\\cos " + nx;
            upperLimit = "\\frac{\\pi}{" + (2 * n).toString() + "}";
            upperLimitFloat = Math.PI / 2 / n;
            break;
        case 3:
            curve += "\\mathrm{e}^{" + nx + "}";
            let upperLimitFraction = new Fraction("2/" + n);
            upperLimitFraction.simplify();
            upperLimit = upperLimitFraction.typeset;
            upperLimitFloat = 2 / n;
            break;
    }
    // typeset question
    katex.render("R", document.getElementById('R'), { throwOnError: false });
    katex.render("R" + '.', document.getElementById('R_two'), { throwOnError: false });
    katex.render("R", document.getElementById('R_three'), { throwOnError: false });
    katex.render(curve, document.getElementById('curve'), { throwOnError: false });
    katex.render("x=" + upperLimit, document.getElementById('line'), { throwOnError: false });
    katex.render("x", document.getElementById('x'), { throwOnError: false });
    katex.render("x", document.getElementById('x_two'), { throwOnError: false });
    katex.render(upperLimit + '.', document.getElementById('upper_limit'), { throwOnError: false });
    // switch to solution tab
    let tabBar = document.querySelector('ons-tabbar');
    tabBar.setActiveTab(1).then(function () {
			// answer tab initialization
			sASign = queriesObject.sASign;
			sANum = queriesObject.sANum;
			sADen = queriesObject.sADen;
			sCSign = queriesObject.sCSign;
			sCNum = queriesObject.sCNum;
			sCDen = queriesObject.sCDen;
			sB = Number(queriesObject.sB);
			sV = Number(queriesObject.sV);
			// (a) typesetting student answer
			const sA = queryTripleToFraction(sASign, sANum, sADen);
			const sC = queryTripleToFraction(sCSign, sCNum, sCDen);
			let sType = sA.typeset;
			let bTerm = "\\pi";
			if (qnCase == 3) {
					bTerm = "\\mathrm{e}";
			}
			;
			let studentBTerm = bTerm;
			if (sB != 1) {
					studentBTerm += "^" + sB;
			}
			;
			sType += studentBTerm;
			if (sC.sign != "-") {
					sType += "+";
			}
			;
			sType += sC.typeset;
			katex.render(sType, document.getElementById('student_a'), { throwOnError: false });
			// (a) typesetting actual answer
			// case 0: pi/n^3 - 2/n^3; case 1: pi^2/n^3 - 4/n^3; case 2: pi^2/4n^3 - 2/n^3; case 3: 2/n^3 e^2 - 2/n^3
			let actualA = new Fraction("1/" + (n * n * n).toString()); // answer for cases 0 and 1: sine
			if (qnCase == 2) { // case 2: cosine
					actualA = new Fraction("1/" + (4 * n * n * n).toString());
			}
			else if (qnCase == 3) { // case 3: exp
					actualA = new Fraction("2/" + (n * n * n).toString());
			}
			let actualBTerm = bTerm;
			if (qnCase != 0) {
					actualBTerm += "^2";
			}
			;
			let actualC = new Fraction("-2/" + (n * n * n).toString()); // answer for cases 0, 2, 3
			if (qnCase == 1) {
					actualC = new Fraction("-4/" + (n * n * n).toString());
			}
			;
			actualA.simplify();
			actualC.simplify();
			let signType = "";
			if (actualC.sign != "-") {
					signType = "+";
			}
			;
			const actualAType = actualA.typeset + actualBTerm + signType + actualC.typeset;
			katex.render(actualAType, document.getElementById('actual_a'), { throwOnError: false });
			// (a) marking: fractions a,c are worth 2 marks (with partial marking), b is worth 1 mark
			let partAMark = 0;
			let aMark = new MarkFraction(sA, actualA);
			if (aMark.correct) {
					partAMark += 2;
			}
			else if (aMark.partial) {
					partAMark++;
			}
			let cMark = new MarkFraction(sC, actualC);
			if (cMark.correct) {
					partAMark += 2;
			}
			else if (cMark.partial) {
					partAMark++;
			}
			if ((sB == 1 && qnCase == 0) || (sB == 2 && qnCase != 0)) {
					partAMark++;
			}
			// check marks
			if (partAMark > 0) {
					document.getElementById('checkMarkOne').style.color = "#0076ff";
					document.getElementById('checkMarkOne').style.opacity = "1.0";
					if (partAMark > 1) {
							document.getElementById('checkMarkTwo').style.color = "#0076ff";
							document.getElementById('checkMarkTwo').style.opacity = "1.0";
							if (partAMark > 2) {
									document.getElementById('checkMarkThree').style.color = "#0076ff";
									document.getElementById('checkMarkThree').style.opacity = "1.0";
									if (partAMark > 3) {
											document.getElementById('checkMarkFour').style.color = "#0076ff";
											document.getElementById('checkMarkFour').style.opacity = "1.0";
											if (partAMark == 5) {
													document.getElementById('checkMarkFive').style.color = "#0076ff";
													document.getElementById('checkMarkFive').style.opacity = "1.0";
											}
									}
							}
					}
			} // end of check marks
			runningMark += partAMark;
			// (b) typesetting student answer
			katex.render(sV.toFixed(3), document.getElementById('student_b'), { throwOnError: false });
			// (b) typesetting actual answer
			let f;
			if (qnCase < 2) { // cases 0,1: sine
					f = function (x) { return Math.pow(x * x * Math.sin(n * x), 2); };
			}
			else if (qnCase == 2) { // cosine 
					f = function (x) { return Math.pow(x * x * Math.cos(n * x), 2); };
			}
			else { // exp 
					f = function (x) { return Math.pow(x * x * Math.exp(n * x), 2); };
			}
			;
			let integral = simpson(f, 0, upperLimitFloat, 100) * Math.PI;
			console.log(upperLimitFloat);
			katex.render(integral.toFixed(3), document.getElementById('actual_b'), { throwOnError: false });
			// (b) marking
			let partBMark = 0;
			if (sV.toFixed(3) == integral.toFixed(3)) { // full marks
					partBMark = 2;
			}
			else if ((sV.toPrecision(2) == integral.toPrecision(2)) || (sV.toPrecision(2) == (integral / Math.PI).toPrecision(2))) { // partial marks: close or forgot to multiply pi
					partBMark = 1;
			}
			if (partBMark > 0) {
					document.getElementById('checkMarkSix').style.color = "#0076ff";
					document.getElementById('checkMarkSix').style.opacity = "1.0";
					if (partBMark > 1) {
							document.getElementById('checkMarkSeven').style.color = "#0076ff";
							document.getElementById('checkMarkSeven').style.opacity = "1.0";
					}
			}
			runningMark += partBMark;
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
