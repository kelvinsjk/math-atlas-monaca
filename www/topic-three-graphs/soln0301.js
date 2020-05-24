// This is a JavaScript file

// Our question will be of the form : y = \frac{ax + b}{x+c} = A + \frac{B}{x+c}
// a=A, c are non-zero, B is positive, b=B+ac

// global variables
var numberWordsArray = ['One', 'Two', 'Three', 'Four'];
var transformArray = [' Translate ',' Scale',' Reflect'];
var transformWordsArray = [' units in the ',' by a factor of ',' parallel to the ',' in the '];
var transformDirectionArray = ['positive x-axis direction.','negative x-axis direction.','positive y-axis direction.','negative y-axis direction.','x-axis.','y-axis.','x-axis.','y-axis.'];
var runningMark = 0, componentsArray = [0, 0, 0];
var fractionFlag = false;

// Query
var queriesObject = parseQuery(window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), c = Number(queriesObject.c), sA = Number(queriesObject.sA), sB = Number(queriesObject.sB), order = Number(queriesObject.order);
var tString = queriesObject.t;
var tOneN = Number(queriesObject.tOneN), tTwoN = Number(queriesObject.tTwoN), tThreeN = Number(queriesObject.tThreeN), tFourN = Number(queriesObject.tFourN);
var tOneD = Number(queriesObject.tOneD), tTwoD = Number(queriesObject.tTwoD), tThreeD = Number(queriesObject.tThreeD), tFourD = Number(queriesObject.tFourD);
var biXSign = queriesObject.biXSign, biXNum = queriesObject.biXNum, biXDen = queriesObject.biXDen, biYSign = queriesObject.biYSign, biYNum = queriesObject.biYNum, biYDen = queriesObject.biYDen;
var biiXSign = queriesObject.biiXSign, biiXNum = queriesObject.biiXNum, biiXDen = queriesObject.biiXDen, biiYSign = queriesObject.biiYSign, biiYNum = queriesObject.biiYNum, biiYDen = queriesObject.biiYDen;

// // placeholder. TODO: remove when adding to monaca
// var a=2,b=10,c=4,order=2;
// var sA=2,sB=2;
// var tString = '111422',tOneN=4, tOneD=1, tTwoN=2, tTwoD=1, tThreeN=1, tThreeD=2, tFourN='', tFourD=1;
// var biXSign = '-', biXNum = 4, biXDen = 1, biYSign = '', biYNum = 2, biYDen = 1, biiXSign = '-', biiXNum = 5, biiXDen = 1, biiYSign = '', biiYNum = 5, biiYDen = 2;

// calculations needed
var B = b - a*c;
var xTry=1,yTry=1,xReverse=0,yReverse=b/c;
var studentTNumbersArray = [tOneN, tOneD, tTwoN, tTwoD, tThreeN, tThreeD, tFourN, tFourD];
// Math calculations and building latex
var numerator = polyBuilder([a,b]), denominator = polyBuilder([1,c]);
var improperFraction = katexifyDstyle("y=" +fractionBuilder(numerator,denominator)), properFraction = katexifyDstyle("y=A+" +fractionBuilder("B",denominator));

// things that need id
document.addEventListener('init', function(event) {
	// switch pages
	if (event.target.matches('#qn001atab')) {document.querySelector('ons-tabbar').setActiveTab(1);};
	if (event.target.matches('#ans001tab')) {
		// part (a)
		katex.render(properFraction, document.getElementById('properFractionOne'), {throwOnError:false});
		katex.render(improperFraction, document.getElementById('improperFractionOne'), {throwOnError:false});
		katex.render("A",document.getElementById('bigA'), {throwOnError: false});
		katex.render("B",document.getElementById('bigB'), {throwOnError: false});
		if (order == 1) { // transform from 1/x to graph
			katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('oneOverX'), {throwOnError: false});
			katex.render(improperFraction, document.getElementById('improperFractionTwo'), {throwOnError:false});
		}else { // transform from graph to 1/x
			katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('improperFractionTwo'), {throwOnError: false});
			katex.render(improperFraction, document.getElementById('oneOverX'), {throwOnError:false});
		}
		// part (b)
		katex.render("x", document.getElementById('x'), {throwOnError:false});
		katex.render("y", document.getElementById('y'), {throwOnError:false});
		katex.render(improperFraction,document.getElementById('qntext1'), {throwOnError: false});
		// typeset (ai)
		katex.render("A=" + sA + ", \\; B=" + sB + ".", document.getElementById('studentAi'), { throwOnError: false });
		katex.render("A=" + a + ", \\; B=" + B + ".", document.getElementById('answerAi'), { throwOnError: false });
		// mark  (ai)
		if (sA==a && sB==B) {runningMark++; document.getElementById('checkMarkOne').style.display="inline";};
		// typeset student's solution: (aii)
		var numberOfTransformations = tString.length/2;
		var i;
		for (i=1; i<=numberOfTransformations; i++) { // iterates through transformation
			var numberWord = numberWordsArray[i-1];
			var studentTransformType = Number(tString[2*i-2]);
			var studentTransformDirection = Number(tString[2*i-1]);
			var transformString = transformArray[studentTransformType-1];
			if (studentTransformType==1) { // translate
				var studentInput = studentTNumbersArray[2*i-2];
				if (studentTNumbersArray[2*i-1]==1){ // not a fraction
					transformString += studentInput;
					var studentTest = studentInput;
				} else { //fraction
					transformString += "<span id='fraction" + numberWord + "'></span>";
					var studentTest = studentTNumbersArray[2 * i - 2] / studentTNumbersArray[2 * i - 1];
					fractionFlag = true;
				};
				switch(studentTransformDirection){ // move test point
					case 1: // positive x-axis
						xTry += studentTest; xReverse += studentTest;
						// test for tranformation type 1
						if ((order == 1 && studentTest == Math.abs(c) && c < 0) || (order == 2 && studentTest == Math.abs(c) && c > 0)) { componentsArray[0] = 1; };
						break;
					case 2: // negative x-axis
						xTry -= studentTest; xReverse -= studentTest;
						// test for tranformation type 1
						if ((order == 1 && studentTest == Math.abs(c) && c > 0) || (order == 2 && studentTest == Math.abs(c) && c < 0)) { componentsArray[0] = 1; };
						break;
					case 3: // positive y-axis
						yTry += studentTest; yReverse += studentTest;
						// test for tranformation type 2
						if ((order == 1 && studentTest == Math.abs(a) && a > 0) || (order == 2 && studentTest == Math.abs(a) && a < 0)) { componentsArray[1] = 1; };
						break;
					case 4: // negative y-axis
						yTry -= studentTest; yReverse -= studentTest;
						// test for tranformation type 2
						if ((order == 1 && studentTest == Math.abs(a) && a < 0) || (order == 2 && studentTest == Math.abs(a) && a > 0)) { componentsArray[1] = 1; };
						break;
				} // end of switch/case
				transformString += transformWordsArray[studentTransformType-1];
				transformString += transformDirectionArray[studentTransformDirection-1];
			} else if (studentTransformType==2) { // scale
				transformString += transformWordsArray[studentTransformType-1];
				var studentInput = studentTNumbersArray[2*i-2];
				if (studentTNumbersArray[2*i-1]==1){ // not a fraction
					transformString += studentInput;
					var studentTest = studentTNumbersArray[2 * i - 2] / studentTNumbersArray[2 * i - 1];
				} else { //fraction
					transformString += "<span id='fraction"+numberWord+"'></span>";
					var studentTest = studentTNumbersArray[2*i-2]/studentTNumbersArray[2*i-1];
					fractionFlag = true;
				};
				switch(studentTransformDirection){ // move test point
					case 1: // x-axis
						xTry *= studentTest; xReverse *= studentTest;
						// test for tranformation type 3
						if ((order == 1 && studentTest == B) || (order == 2 && studentTest.toFixed(4) == (1 / B).toFixed(4))) { componentsArray[2] = 1; };
						break;
					case 2: // y-axis
						if ((order == 1 && studentTest == B) || (order == 2 && studentTest.toFixed(4) == (1 / B).toFixed(4))) { componentsArray[2] = 1; };
						yTry *= studentTest; yReverse *= studentTest;
						break;
				} // end of switch/case
				transformString += transformWordsArray[studentTransformType];
				transformString += transformDirectionArray[studentTransformDirection+3];
			} else if (studentTransformType==3) {
				switch(studentTransformDirection){ // move test point
					case 2: // Reflect in y-axis, x moves
						xTry *= -1; xReverse *= -1;
						break;
					case 1: // Reflect in x-axis, y moves
						yTry *= -1; yReverse *= -1;
						break;
				} // end of switch/case
				transformString += transformWordsArray[studentTransformType];
				transformString += transformDirectionArray[studentTransformDirection+5];
			}; // end of string typeset
			document.getElementById('studentT' + numberWord).innerHTML = transformString;
			if ((studentTransformType==1 || studentTransformType==2) && fractionFlag) { // fractions detected
				katex.render(fractionBuilder(studentTNumbersArray[2*i-2],studentTNumbersArray[2*i-1]),document.getElementById('fraction'+numberWord),{throwOnError:false});
				fractionFlag = false;
			};			
			if (i>1) {document.getElementById('studentT'+numberWord+"Div").style.display='block'};
		}; // end of transformation iterate
		// mark (aii), typeset (aii) answer
		if (order == 1) { // 1/x to graph
			// typeset (aii) answer
			var transString = "Translate " + Math.abs(c) + " units in the ";
			if (c > 0) { transString += "negative " } else { transString += "positive " };
			document.getElementById('answerTOne').innerHTML = transString;
			katex.render("x", document.getElementById('answerDOne'), { throwOnError: false });
			transString = "Scale by a factor of " + B + " parallel to the ";
			document.getElementById('answerTTwo').innerHTML = transString;
			katex.render("y", document.getElementById('answerDTwo'), { throwOnError: false });
			transString = "Translate " + Math.abs(a) + " units in the ";
			if (a > 0) { transString += "positive " } else { transString += "negative " };
			document.getElementById('answerTThree').innerHTML = transString;
			katex.render("y", document.getElementById('answerDThree'), { throwOnError: false });
			// mark (aii)
			var yTest = (b + a * xTry) / (xTry + c);
			if (yTest.toFixed(4) == yTry.toFixed(4)) { // test point works
				if (numberOfTransformations == 3) { // full marks
					runningMark += 3;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';
					document.getElementById('checkMarkFour').style.display = 'inline';
				} else { // got to answer with fewer/more transformation
					runningMark += 2;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';					
					document.getElementById('aiiComments').innerHTML = 'Partial credit';
					document.getElementById('aiiComments').style.display = 'inline';
				};
			} else { // test point fails
				if (xReverse.toFixed(4) == (1/yReverse).toFixed(4)) { // student mixed up order
					document.getElementById('aiiComments').innerHTML = 'Remarks: transformations are given in reverse order of what is required.';
					document.getElementById('aiiComments').style.display = 'inline';
					runningMark += 2;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';
				} else { // partial marks
					var componentsSum = componentsArray.reduce(function (a, b) { return a + b; }, 0); // add up array
					if (componentsSum == 3) { // 2 marks: got all components but either order off or got too many extra parts
						document.getElementById('aiiComments').innerHTML = 'Remarks: Partial credit.';
						document.getElementById('aiiComments').style.display = 'inline';
						runningMark += 2;
						document.getElementById('checkMarkTwo').style.display = 'inline';
						document.getElementById('checkMarkThree').style.display = 'inline';
					} else if (componentsSum > 0) { // 1 mark: got at least 1 component
						document.getElementById('aiiComments').innerHTML = 'Partial credit';
						document.getElementById('aiiComments').style.display = 'inline';
						runningMark += 1;
						document.getElementById('checkMarkTwo').style.display = 'inline';						
					};
				};
			};
		} else { //reverse order
			// typeset (aii) answer
			var transString = "Translate " + Math.abs(c) + " units in the ";
			if (c > 0) { transString += "positive " } else { transString += "negative " };
			document.getElementById('answerTThree').innerHTML = transString;
			katex.render("x", document.getElementById('answerDThree'), { throwOnError: false });
			transString = "Scale by a factor of ";
			document.getElementById('answerTTwo').innerHTML = transString;
			katex.render(fractionBuilder(1, B), document.getElementById('answerFTwo'), { throwOnError: false });
			document.getElementById('answerTTwoContd').innerHTML = " parallel to the ";
			katex.render("y", document.getElementById('answerDTwo'), { throwOnError: false });
			transString = "Translate " + Math.abs(a) + " units in the ";
			if (a > 0) { transString += "negative " } else { transString += "positive " };
			document.getElementById('answerTOne').innerHTML = transString;
			katex.render("y", document.getElementById('answerDOne'), { throwOnError: false });
			// mark (aii)
			var yTest = (b + a * xTry) / (xTry + c);
			if (xReverse.toFixed(4) == (1/yReverse).toFixed(4)) { // test point works
				if (numberOfTransformations == 3) { // full marks
					runningMark += 3;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';
					document.getElementById('checkMarkFour').style.display = 'inline';
				} else { // got to answer with fewer/more transformation
					runningMark += 2;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';
					document.getElementById('aiiComments').innerHTML = 'Partial credit';
					document.getElementById('aiiComments').style.display = 'inline';
				};
			} else { // test point fails
				if (yTest.toFixed(4) == yTry.toFixed(4)) { // student mixed up order
					document.getElementById('aiiComments').innerHTML = 'Remarks: transformations are given in reverse order of what is required.';
					document.getElementById('aiiComments').style.display = 'inline';
					runningMark += 2;
					document.getElementById('checkMarkTwo').style.display = 'inline';
					document.getElementById('checkMarkThree').style.display = 'inline';
				} else { // partial marks
					var componentsSum = componentsArray.reduce(function (a, b) { return a + b; }, 0); // add up array
					if (componentsSum == 3) { // 2 marks: got all components but either order off or got too many extra parts
						document.getElementById('aiiComments').innerHTML = 'Remarks: transformations could have been given in wrong order.';
						document.getElementById('aiiComments').style.display = 'inline';
						runningMark += 2;
						document.getElementById('checkMarkTwo').style.display = 'inline';
						document.getElementById('checkMarkThree').style.display = 'inline';
					} else if (componentsSum > 0) { // 1 mark: got at least 1 component
						document.getElementById('aiiComments').innerHTML = 'Partial credit';
						document.getElementById('aiiComments').style.display = 'inline';
						runningMark += 1;
						document.getElementById('checkMarkTwo').style.display = 'inline';
					};
				};
			};
		}; // End of aii marking
		// bi typeset
		if (biXDen == 1) {
			var xAsymp = biXSign + biXNum;
		} else { // fraction
			var xAsymp = biXSign + fractionBuilder(biXNum, biXDen);
		};
		if (biYDen == 1) {
			var yAsymp = biYSign + biYNum;
		} else { // fraction
			var yAsymp = biYSign + fractionBuilder(biXNum, biYDen);
		};
		katex.render("x=" + xAsymp + ", \\; y=" + yAsymp, document.getElementById('studentAsymptotes'), { throwOnError: false });
		katex.render("x=" + (-c) + ", \\; y=" + a, document.getElementById('answerAsymptotes'), { throwOnError: false });
		// bi marking
		if (biXDen == 1 && biXNum == Math.abs(c) && biYDen == 1 && biYNum == Math.abs(a)) {
			if (((c > 0 && biXSign == '-') || (c < 0 && biXSign == '')) && ((a > 0 && biYSign == '') || (a < 0 && biYSign == '-'))) {
				runningMark++; document.getElementById('checkMarkFive').style.display = 'inline';
			}
		};
		// bii typeset
		if (biiXDen == 1) {
			var xInt = biiXSign + biiXNum;
		} else { // fraction
			var xInt = biiXSign + fractionBuilder(biiXNum, biiXDen);
		};
		if (biiYDen == 1) {
			var yInt = biiYSign + biiYNum;
		} else { // fraction
			var yInt = biiYSign + fractionBuilder(biiYNum, biiYDen);
		};
		katex.render("\\left ( " + xInt + ",0\\right ), \\; \\left(0, " + yInt + "\\right )", document.getElementById('studentIntercepts'), { throwOnError: false });
		// bii answer typeset and marking. x-coordinate first
		var ansXIntArray = simplifyFraction(-b, a);
		if (ansXIntArray[1] == 1) { // integer answer
			var ansXInt = ansXIntArray[0];
			if (biiXDen == 1 && Number(biiXSign + biiXNum) == ansXInt) { var xIntCheck = true; } else { var xIntCheck = false; };
		} else { // fraction
			if (ansXIntArray[0] > 1) { var ansXInt = fractionBuilder(ansXIntArray[0], ansXIntArray[1]); } else { var ansXInt = "-" + fractionBuilder(-1 * ansXIntArray[0], ansXIntArray[1]) };
			if ( (biiXDen == ansXIntArray[1] && Number(biiXSign + biiXNum) == ansXIntArray[0]) || (biiXDen == 1 && (Number(biiXSign+biiXNum)).toFixed(11)==(-b/a).toFixed(11)) ) { var xIntCheck = true; } else { var xIntCheck = false; };
		};
		// (aii) y-coordinate
		var ansYIntArray = simplifyFraction(b, c);
		if (ansYIntArray[1] == 1) { // integer answer
			var ansYInt = ansYIntArray[0];
			if (biiYDen == 1 && Number(biiYSign + biiYNum) == ansYInt) { var yIntCheck = true; } else { var yIntCheck = false; };
		} else { // fraction
			if (ansYIntArray[0] > 1) { var ansYInt = fractionBuilder(ansYIntArray[0], ansYIntArray[1]); } else { var ansYInt = "-" + fractionBuilder(-1 * ansYIntArray[0], ansYIntArray[1]) };
			if ( (biiYDen == ansYIntArray[1] && Number(biiYSign + biiYNum) == ansYIntArray[0]) || (biiYDen == 1 && (Number(biiYSign+biiYNum)).toFixed(11)==(b/c).toFixed(11))  ) { var yIntCheck = true; } else { var yIntCheck = false; };
		};
		var intString = "\\left (" + ansXInt + ",0 \\right ), \\; \\left ( 0," + ansYInt + "\\right )";
		katex.render(intString, document.getElementById('answerIntercepts'), { throwOnError: false });
		if (xIntCheck && yIntCheck) {
			runningMark++; document.getElementById('checkMarkSix').style.display = 'inline';
		};
		// progress bar
		var progressBar =
			new ProgressBar.Circle('#progress', {
				color:'#0076ff',
				strokeWidth: 10,
				duration: 1000, // milliseconds
				easing: 'easeInOut'
			});
			setTimeout(function() {progressBar.animate(runningMark/6);}, 500);
		document.getElementById('progressBarText').innerHTML = runningMark + '/6';
		// final marks comment
		var comments = "You have scored ";
		if (runningMark == 6) {
			comments += "6/6 for this question. Well done! Keep up the good work.";
		} else if (runningMark > 3) {
			comments += runningMark +"/6 for this question. Just a bit more fine-tuning to get the full marks. \
				Try to see how you can arrive at the actual answer and try again!";
		} else {
		comments += runningMark + "/6 for this question. Let's try to figure out how we can get the answer and try again! \
			Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time.";
		};
		document.getElementById('answerComments').innerHTML = comments;
	}; // End of listener: answer tab
},false); // End of window.onload