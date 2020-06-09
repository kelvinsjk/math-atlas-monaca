// This is a JavaScript file

// Our question will be of the form : First 3 terms of GP is equal to 1st, (m+1)th, (m+n+1)th term of AP.
// (ai) We will show the equation mr^2 - (m+n) r + c = 0 (students will be asked for second and third coefficient)
// (aii) We will find/show the common ratio r
// (aiii) We will ask for a reason for convergence
// (aiv) We will ask for the sum to infinity in the form ka. 
// (bi) We will ask for d in the form ja.
// (bii) We will ask for nMin and nMax such that S_n (AP) > ha

// global variables
const mcqPossibilities = [
	"00<span id='inBetween0'></span>.", // 00: -1<r<1
	"01<span id='inBetween1'></span>.", // 01: -1<d<1
	"02<span id='inBetween2'></span>.", // 02: -1<a<1
	"10<span id='moreThan0'></span>.", // 10: |r|>1
	"11<span id='moreThan1'></span>.", // 11: |d|>1
	"12<span id='moreThan2'></span>.", // 12: |a|>1
	"20as <span id='sN0'></span>.", // 20: as n --> infty, sN --> 0
	"21as <span id='sN1'></span>.", // 21: as n --> infty, sN --> infty
	"22as <span id='sN2'></span>.", // 22: as n --> 0, sN --> infty
], stringArrayOne = ['r', 'd', 'a'], stringArrayTwo = ['\\infty', '0', '\\infty', '\\infty', '0', '\\infty'];

//  Query: Add only if needed TODO: add back when moving to monaca
var queriesObject = parseQuery(window.location.search);
var m = Number(queriesObject.m), n = Number(queriesObject.n), h = Number(queriesObject.h), aiM = Number(queriesObject.aiM), aiiM = Number(queriesObject.aiiM), aiiiR = queriesObject.aiiiR;
var aivKSign = queriesObject.aivKSign, aivKNum = Number(queriesObject.aivKNum), aivKDen = Number(queriesObject.aivKDen);
var biJSign = queriesObject.biJSign, biJNum = Number(queriesObject.biJNum), biJDen = Number(queriesObject.biJDen);
var biiNMin = Number(queriesObject.biiNMin), biiNMax = Number(queriesObject.biiNMax);

// calculations needed
var runningMark = aiM + aiiM;
if (m == 2) { // typeset 3rd, 4th, etc
	var mPlusOneString = '3rd';
} else {
	var mPlusOneString = (m + 1) + 'th';
};
// get coefficients of show polynomial (simplify coefficients if necessary)
var a = m, b = -(m + n), c = n;
var divisor = gcd(m, gcd(n, m + n));
if (divisor != 1) { a = a / divisor, b = b / divisor, c = c / divisor };
divisor = gcd(m, n);
mSimplified = m / divisor;
nSimplified = n / divisor;
// calculation of D
var actualD = simplifyFraction(n - m, m * m);
var actualDArray = handleFractions(actualD[0] + '/' + actualD[1]);
var a1 = actualDArray[3], b1 = 2 - actualDArray[3], c1 = -2 * h;
var actualNMin = Math.ceil((-b1 + Math.sqrt(b1 * b1 - 4 * a1 * c1)) / (2 * a1));
var actualNMax = Math.floor((-b1 - Math.sqrt(b1 * b1 - 4 * a1 * c1)) / (2 * a1));

// things that need id
document.addEventListener('init', function(event) {
	// switch pages
	if (event.target.matches('#qn001atab')) {document.querySelector('ons-tabbar').setActiveTab(1);};
	if (event.target.matches('#ans001tab')) {
		// typeset question
		katex.render("a", document.getElementById('a'), { throwOnError: false });
		katex.render("d", document.getElementById('d'), { throwOnError: false });
		katex.render("a", document.getElementById('aTwo'), { throwOnError: false });
		katex.render("a", document.getElementById('aThree'), { throwOnError: false });
		katex.render("a", document.getElementById('aFour'), { throwOnError: false });
		katex.render("d", document.getElementById('dTwo'), { throwOnError: false });
		katex.render("d", document.getElementById('dThree'), { throwOnError: false });
		katex.render("r", document.getElementById('r'), { throwOnError: false });
		document.getElementById('mPlusOne').innerHTML = mPlusOneString;
		document.getElementById('mPlusNPlusOne').innerHTML = (m + n + 1) + 'th';
		katex.render("n", document.getElementById('n'), { throwOnError: false });
		katex.render(h+"a", document.getElementById('hA'), { throwOnError: false });
		katex.render("S_n", document.getElementById('sN'), { throwOnError: false });
		katex.render("S_n", document.getElementById('sNTwo'), { throwOnError: false });
		katex.render("a > 0", document.getElementById('aMore'), { throwOnError: false });
		katex.render(polyBuilder([a, b, c], 'r') + "=0.", document.getElementById('show'), { throwOnError: false });
		katex.render("r=" + fractionBuilder(nSimplified, mSimplified), document.getElementById('rAnswer'), { throwOnError: false });
		// mark answers (ai)--(aiii)
		if (aiM >= 2) { // (ai) : only 2, 3 or 4 marks
			document.getElementById('checkMarkOne').style.display = 'inline';
			document.getElementById('checkMarkTwo').style.display = 'inline';
			if (aiM >= 3) {
				document.getElementById('checkMarkThree').style.display = 'inline';
				if (aiM == 4) {
					document.getElementById('checkMarkFour').style.display = 'inline';
				}
			}
		};
		if (aiiM >= 1) { // (aii) : up to 2 marks
			document.getElementById('checkMarkFive').style.display = 'inline';
			if (aiiM == 2) {
				document.getElementById('checkMarkSix').style.display = 'inline';
			}
		}
		if (aiiiR == '00') { // (aiii): 1 mark
			katex.render("-1 < r < 1.", document.getElementById('studentReason'), { throwOnError: false });
			document.getElementById('checkMarkSeven').style.display = 'inline';
			runningMark += 1;
		} else {
			optionString = mcqPossibilities[3*Number(aiiiR[0])+Number(aiiiR[1])];
			document.getElementById('studentReason').innerHTML = optionString.slice(2);
			if (optionString[0] == '0') { // in between
				katex.render("-1<" + stringArrayOne[Number(optionString[1])] + "<1", document.getElementById('inBetween' + optionString[1]), { throwOnError: false });
			} else if (optionString[0] == '1') { // more than
				katex.render("|" + stringArrayOne[Number(optionString[1])] + "|>1", document.getElementById('moreThan' + optionString[1]), { throwOnError: false });
			} else { // n tends to infinity/0
				katex.render("n \\to " + stringArrayTwo[Number(optionString[1]) * 2] + ", S_n \\to " + stringArrayTwo[Number(optionString[1]) * 2 + 1], document.getElementById('sN' + optionString[1]), { throwOnError: false });
			};
		}
		// typeset (ai),(aii),(aiii) actual answer
		katex.render(polyBuilder([a, b, c], 'r') + "=0.", document.getElementById('showTwo'), { throwOnError: false });
		katex.render("r=" + fractionBuilder(nSimplified, mSimplified), document.getElementById('rAnswerTwo'), { throwOnError: false });
		katex.render("-1 < r < 1", document.getElementById('rBetween'), { throwOnError: false });
		// (aiv) actual answer
		var actualK = simplifyFraction(m, m - n);
		if (actualK[1] == 1) {
			sInfTypeset = actualK[0];
		} else {
			sInfTypeset = fractionBuilder(actualK[0], actualK[1]);
		};
		katex.render("S_{\\infty}=" + sInfTypeset + "a", document.getElementById('sInf'), { throwOnError: false });
		// (aiv) marking
		if ( (aivKNum / aivKDen).toPrecision(3) == Math.abs((m / (m - n))).toPrecision(3)) { // answer accurate to \pm and 3sf
			document.getElementById('checkMarkEight').style.display = 'inline';
			runningMark += 1;
			if (aivKSign == '' && ( (aivKDen == 1 && (aivKNum / aivKDen).toFixed(7) == Math.abs( (m / (m - n)) ).toFixed(7)) || (aivKNum == actualK[0] && aivKDen == actualK[1]))) {
				// 1st part: answer is positive, 2nd part: decimal answer: we only allow 5 dp at most, 3rd part: simplified fraction
				document.getElementById('checkMarkNine').style.display = 'inline';
				runningMark += 1;
			};
		};
		// (aiv) student typeset
		if (aivKDen == 1) { // not a fraction
			if (Math.abs(aivKNum) == 1) { // don't typeset 1 or -1
				var typesetK = aivKSign;
			} else { 
				var typesetK = aivKSign + aivKNum;
			};
		} else {
			var typesetK = aivKSign + fractionBuilder(aivKNum,aivKDen);
		};
		katex.render("S_{\\infty}=" + typesetK + "a", document.getElementById('studentS'), { throwOnError: false });
		// (bi) actual answer
		katex.render("d=" + actualDArray[0] + fractionBuilder(actualDArray[1], actualDArray[2]) + "a", document.getElementById('dAnswer'), { throwOnError: false });
		// (bi) marking
		if ( (biJNum / biJDen).toPrecision(3) == Math.abs(actualDArray[3]).toPrecision(3)) { // answer accurate to \pm and 3sf
			document.getElementById('checkMarkTen').style.display = 'inline';
			runningMark += 1;
			if (biJSign == actualDArray[0] && ( (biJDen == 1 && ((biJNum / biJDen).toFixed(7) == Math.abs(actualDArray[3]).toFixed(7))) || (biJNum == actualDArray[1] && biJDen == actualDArray[2]))) {
				// 1st part: check sign, 2nd part: decimal answer: we only allow 5 dp at most, 3rd part: simplified fraction
				document.getElementById('checkMarkEleven').style.display = 'inline';
				runningMark += 1;
			};
		};
		// (bi) student typeset
		if (biJDen == 1) { // not a fraction
			if (Math.abs(biJNum) == 1) { // don't typeset 1 or -1
				var typesetK = biJSign;
			} else {
				var typesetK = biJSign + biJNum;
			};
		} else {
			var typesetK = biJSign + fractionBuilder(biJNum, biJDen);
		};
		katex.render("S_{\\infty}=" + typesetK + "a", document.getElementById('studentD'), { throwOnError: false });
		// (bii) typeset
		katex.render("n=" + actualNMin, document.getElementById('answerNMin'), { throwOnError: false });
		katex.render("n=" + actualNMax, document.getElementById('answerNMax'), { throwOnError: false });
		katex.render("n=" + biiNMin, document.getElementById('studentNMin'), { throwOnError: false });
		katex.render("n=" + biiNMax, document.getElementById('studentNMax'), { throwOnError: false });
		// (bii) marking
		var almost = 0, perfect = 0;
		if (biiNMin == actualNMin) {
			perfect += 1;
		};
		if (biiNMax == actualNMax) {
			perfect += 1;
		};
		if (biiNMin == actualNMin-1) {
			almost += 1;
		};
		if (biiNMax == actualNMax+1) {
			almost += 1;
		};
		console.log(perfect, biiNMin, biiNMax,);
		if (perfect == 2) { // full marks
			document.getElementById('checkMarkTwelve').style.display = 'inline';
			document.getElementById('checkMarkThirteen').style.display = 'inline';
			document.getElementById('checkMarkFourteen').style.display = 'inline';
			runningMark += 3;
		} else if (perfect == 1 || almost == 2 || (biiNMin == actualNMax && biiNMax == actualNMin)) { // 2 marks
			document.getElementById('checkMarkTwelve').style.display = 'inline';
			document.getElementById('checkMarkThirteen').style.display = 'inline';
			runningMark += 2;
		} else if (almost == 1) { // 1 mark
			document.getElementById('checkMarkTwelve').style.display = 'inline';
			runningMark += 1;
		};
		// progress bar
		var progressBar =
			new ProgressBar.Circle('#progress', {
				color:'#0076ff',
				strokeWidth: 10,
				duration: 1000, // milliseconds
				easing: 'easeInOut'
			});
			setTimeout(function() {progressBar.animate(runningMark/14);}, 500);
		document.getElementById('progressBarText').innerHTML = runningMark + '/14';
		// final marks comment
		var comments = "You have scored ";
		if (runningMark == 14) {
			comments += "14/14 for this question. Well done! Keep up the good work.";
		} else if (runningMark > 6) {
			comments += runningMark +"/14 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
		} else {
		comments += runningMark + "/14 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
		};
		document.getElementById('answerComments').innerHTML = comments;
		if (runningMark > 9) {
			document.getElementById('progressBarText').style.fontSize = 'x-small';
		};
	}; // End of listener: answer tab
},false); // End of window.onload