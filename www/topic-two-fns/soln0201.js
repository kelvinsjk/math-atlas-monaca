// This is a JavaScript file

//Get HTML Query
var queriesObject = parseQuery( window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), c = Number(queriesObject.c), d=Number(queriesObject.d), 
	e = Number(queriesObject.e),  h = Number(queriesObject.h), 	p=Number(queriesObject.p), sign = Number(queriesObject.sign);
var aiExist = Number(queriesObject.aiExist), aiReason = Number(queriesObject.aiReason);
 	aiiSign = queriesObject.aiiSign, aiiNum = Number(queriesObject.aiiNum), aiiDen = Number(queriesObject.aiiDen); //aiiSign is a string
var sOne = queriesObject.sOne, sTwo = queriesObject.sTwo, sThree = queriesObject.sThree, sFour = queriesObject.sFour; // sOne-Four: 'true' or 'false' strings
var sA = Number(queriesObject.sA), sB = Number(queriesObject.sB), sC = Number(queriesObject.sC), sD = Number(queriesObject.sD);
var biSign = queriesObject.biSign, biNum =	 queriesObject.biNum, biDen =  queriesObject.biDen;
var tOne =  queriesObject.tOne, tTwo =  queriesObject.tTwo, tThree = queriesObject.tThree, tFour = queriesObject.tFour;
var tA = Number(queriesObject.tA), tB = Number(queriesObject.tB), tC = Number(queriesObject.tC), tD = Number(queriesObject.tD);
var runningMark = 0;

// Math calculations and building latex
const mcqPossibilities = [
	"00<span id='functionPlaceholder0'> </span> is a one-one function.", // 00: f one-one
	"01<span id='functionPlaceholder1'> </span> is a one-one function.", // 01: g one-one
	"02<span id='functionPlaceholder2'> </span> is not a  one-one function.", // 02: f not one-one
	"03<span id='functionPlaceholder3'> </span> is not a  one-one function.", // 03: g not one-one
	"10<span id='subsetPlaceholder10'> </span>", // 10: Rf subset Df
	"11<span id='subsetPlaceholder11'> </span>", // 11: Rf subset Dg
	"12<span id='subsetPlaceholder12'> </span>", // 12: Rg subset Dg
	"13<span id='subsetPlaceholder13'> </span>", // 13: Rg subset Df
	"20<span id='subsetPlaceholder20'> </span>", // 20: Rf not subset Df
	"21<span id='subsetPlaceholder21'> </span>", // 21: Rf not subset Dg
	"22<span id='subsetPlaceholder22'> </span>", // 22: Rg not subset Df
	"23<span id='subsetPlaceholder23'> </span>", // 23: Rg not subset Dg
	], functionStringArrayOne = ["f", "g", "f", "g"], functionStringArrayTwo = ["f", "f", "g", "g"];
// set up strings to build question
var fnExists = 'gf', fnDoesNotExist = 'fg', domainAdd = '';
var signArray = [' < ', ' \\leq ', ' > ', '\\geq ']; // f used to determine sign
if (b<0) {
	fnExists = 'fg'; 
	fnDoesNotExist = 'gf';
	domainAdd = ', x ' + signArray[sign] + e;
};
// Start to build question
var denomSign = '+'; // if b negative, denom is x+...
if (b>0) {denomSign = '-'}; // if b positive, denom is x- ...
const denominator = 'x' + denomSign + Math.abs(b);
if (a>0) {var fractionSign = "+", fraction = fractionBuilder(a,denominator)} else{var fractionSign = "-", fraction=fractionBuilder(-a,denominator)};
const fx = '&f: x \\mapsto ' +h+ fractionSign +fraction + '\\; &&\\textrm{for } x \\in \\mathbb{R}, x \\neq ' + b +', \\\\ ';
const gx = '&g:x \\mapsto x^' +p+ ' && \\textrm{for }  x \\in \\mathbb{R}' + domainAdd + '.';

// things that need id
document.addEventListener('init', function(event) {if (event.target.matches('#qn001atab')) {
	// loading screen: show modal screen upon load // function showModal() {}
	var modal = document.querySelector('ons-modal');
	modal.show(); 
	setTimeout(function() { modal.hide();}, 1000);
	document.querySelector('ons-tabbar').setActiveTab(1) // Loads both pages
	.then( // After pages loaded
		function (){
			// Insert Math: questions
			katex.render(katexAlign(fx+gx), document.getElementById('qntext1'), {throwOnError: false,displayMode:true });
			katex.render("f", document.getElementById('functionF'), {throwOnError: false});
			katex.render("g", document.getElementById('functionG'), {throwOnError: false});
			katex.render(fnDoesNotExist, document.getElementById('qntext2'), {throwOnError: false});
			katex.render(fnExists +'('+c+')', document.getElementById('qntext3'), {throwOnError: false});
			katex.render(katexAlign(fnExists), document.getElementById('qntext4'), {throwOnError: false});
			katex.render("f^{-1}"+addParenthesis(d),document.getElementById('qntext5'), {throwOnError: false});
			katex.render("f^{-1}", document.getElementById('qntext6'),{throwOnError:false});
			// typesetting ai
			katex.render(fnDoesNotExist, document.getElementById('notCompositeThree'), {throwOnError: false});
			if (aiExist == 1) {var existReason = 'exists'} else {var existReason = 'does not exist'}
			document.getElementById('existsOrNot').innerHTML = existReason;
			// typeset reason
			var optionString = mcqPossibilities[aiReason];
			document.getElementById('reasonGiven').innerHTML = optionString.slice(2);
			if (optionString[0] == '0') { // just need to render function name
				katex.render(functionStringArrayOne[Number(optionString[1])],document.getElementById("functionPlaceholder"+optionString[1]), {throwOnError:false});
			} else { // Rf subset or not Df
				if (optionString[0] == '1') {var subsetString = ''} else{ var subsetString = '\\not '} // whether a subset or not
				var subsetEquation = 'R_' + functionStringArrayTwo[Number(optionString[1])] + subsetString + ' \\subseteq D_' + functionStringArrayOne[Number(optionString[1])];
				katex.render(subsetEquation, document.getElementById("subsetPlaceholder"+optionString.slice(0,2)),{throwOnError: false});
			}
			// aii Student typeset
			var aiiAnswerArray = [aiiSign, aiiNum, aiiDen, aiiNum/aiiDen];
			if (aiiAnswerArray[2]=='1') {studentAnswer = aiiAnswerArray[1]} else{studentAnswer = fractionBuilder(aiiAnswerArray[1],aiiAnswerArray[2])};	
			katex.render(fnExists+addParenthesis(c)+"="+aiiAnswerArray[0]+studentAnswer, document.getElementById('studentAii'), {throwOnError:false});
			// switch manipulation
			switchStatusArray = [sOne=="true", sTwo=="true", sThree=="true", sFour=="true"];
			var answerArray = [], inputNamesArray = [sA, sB,sC,sD]; 
			var previewSpace = document.getElementById('domainSwitchPreview'), answerPreviewArray = [];
			// iterates switches, get input values
			switchStatusArray.forEach(function(switchStatus, i) {
				if (switchStatus) {
					var b = inputNamesArray[i];
					answerArray.push(b);
					if (i < 2) { // < sets
						var setString = '(-\\infty, ' +b;
						if (i == 0) {setString += ')'} else {setString += ']'};
					} else { // > sets
						if (i == 2) {var setString = '(';} else{ var setString = '[';};
						setString += b + ', \\infty )';
					}; 
					answerPreviewArray.push(setString );
				} // end of if/else
			}); // end of switch iteration
			// preview answer
			if (answerPreviewArray.length == 1) { // 1 answer
				var answerPreviewFinal = answerPreviewArray[0];
			} else {
				if (answerPreviewArray.length == 2) { // 2 answers
					var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup \\; ' + answerPreviewArray[1];
				} else { 
					if (answerPreviewArray.length == 3) { // 3 answers
					var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup  \\; ' + answerPreviewArray[1] + ' \\; \\cup \\; ' + answerPreviewArray[2];
					} else { // 4 answers
						var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup \\; ' + answerPreviewArray[1] + ' \\; \\cup \\; ' + answerPreviewArray[2];
						answerPreviewFinal +=  ' \\; \\cup \\; ' + answerPreviewArray[3];
					};
				};
			};
			// show answer preview
			answerPreviewFinal = 'D_{' + fnExists + '} = ' + answerPreviewFinal;
			katex.render(answerPreviewFinal, previewSpace, {throwOnError:false});
			previewSpace.style.display = 'inline';
			// typesetting bi
			var biAnswerArray = [biSign, biNum, biDen, biNum/biDen];
			if (biAnswerArray[2]=='1') {studentAnswer = biAnswerArray[1]} else{studentAnswer = fractionBuilder(biAnswerArray[1],biAnswerArray[2])};	
			katex.render("f^{-1}"+addParenthesis(d)+"="+biAnswerArray[0]+studentAnswer, document.getElementById('fInverseDStudent'), {throwOnError: false});
			// bii domain switches
			switchStatusArray =  [tOne=="true", tTwo=="true", tThree=="true", tFour=="true"];
			// set up necessary arrays
			var answerArray = [], inputNamesArray = [tA, tB, tC, tD]; 
			var previewSpace = document.getElementById('domainSwitchPreviewTwo'), answerPreviewArray = [];
			// iterates switches, get student values
			switchStatusArray.forEach(function(switchStatus, i) {
				if (switchStatus) {
					var b = inputNamesArray[i];
					answerArray.push(b);
					if (i < 2) { // < sets
						var setString = '(-\\infty, ' +b;
						if (i == 0) {setString += ')'} else {setString += ']'};
					} else { // > sets
						if (i == 2) {var setString = '(';} else{ var setString = '[';};
						setString += b + ', \\infty )';
					}; 
					answerPreviewArray.push(setString );
				} // end of if/else
			}); // end of switch iteration
			// preview answer
			if (answerPreviewArray.length == 1) { // 1 answer
				var answerPreviewFinal = answerPreviewArray[0];
			} else {
				if (answerPreviewArray.length == 2) { // 2 answers
					var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup \\; ' + answerPreviewArray[1];
				} else { 
					if (answerPreviewArray.length == 3) { // 3 answers
					var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup  \\; ' + answerPreviewArray[1] + ' \\; \\cup \\; ' + answerPreviewArray[2];
					} else { // 4 answers
						var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\cup \\; ' + answerPreviewArray[1] + ' \\; \\cup \\; ' + answerPreviewArray[2];
						answerPreviewFinal +=  ' \\; \\cup \\; ' + answerPreviewArray[3];
					};
				};
			};
			// show answer preview
			answerPreviewFinal = 'D_{f^{-1}}=' + answerPreviewFinal;
			katex.render(answerPreviewFinal, previewSpace, {throwOnError:false});
			previewSpace.style.display = 'inline';
		// Typesetting True answer + assign marks
			katex.render(fnDoesNotExist, document.getElementById('notCompositeFour'), {throwOnError:false});
			if (b>0) { // fg does not exist, gf does, find gf(c)
				// ai
				var reasonString = 'R_g \\not \\subseteq D_f'
				// aii
				var aiiFraction = simplifyFraction(a,c-b); // aiiFraction is an array [num, den]. den is always positive
				// Prepare to mark aii
				var studentAiiAnswer = aiiNum / aiiDen;
				if (aiiSign == '-') {studentAiiAnswer *= -1};
				// typeset aii, mark aii
				if (aiiFraction[1] == 1) { // not a fraction
					var aiiAnswer = Math.pow(h+aiiFraction[0],p);
					if (studentAiiAnswer == aiiAnswer) {runningMark += 1; document.getElementById("checkMarkTwo").style.display = 'inline'}
				} else{ // a fraction
					var newFraction = addFractions([h,1],aiiFraction)
					if (newFraction[1] == 1) {
						var aiiAnswer = Math.pow(newFraction[0],p);
						if (studentAiiAnswer.toFixed(11) == aiiAnswer.toFixed(11)) {runningMark += 1; document.getElementById("checkMarkTwo").style.display = 'inline'}
					} else{
						var aiiAnswer = fractionTypeset([Math.pow(newFraction[0],p),Math.pow(newFraction[1],p)]);
						console.log(studentAiiAnswer);
						console.log(Math.pow(newFraction[0]/newFraction[1],p))
						if (studentAiiAnswer.toFixed(11) == Math.pow(newFraction[0]/newFraction[1],p).toFixed(11)) {runningMark += 1; document.getElementById("checkMarkTwo").style.display = 'inline'};
					}
				};
				// aiii
				var domainComposite = "(-\\infty,"+b+")\\cup ("+b+",\\infty)";
				// Marking ai, aiii
				if (aiReason==10 && aiExist == 0) {runningMark += 1; document.getElementById("checkMarkOne").style.display = 'inline'};
				if (sOne=='true' && sTwo=='false' && sThree=='true'&& sFour=='false' && sA==b && sC==b) {
					runningMark += 1; document.getElementById("checkMarkThree").style.display = 'inline';
				};
			} else { // b<0, gf does not exist, fg does, find fg(c)
				// ai
				var reasonString = 'R_f \\not \\subseteq D_g'
				// aii: typeset + marking
				var studentAii = aiiNum / aiiDen; if (aiiSign=="-") {studentAii *= -1;};
				var aiiFraction = addFractions([h,1],[a,Math.pow(c,p)-b]);
				if (aiiFraction[1] == 1) { // not a fraction
					var aiiAnswer = aiiFraction[0];
				} else{
					var aiiAnswer = fractionTypeset(aiiFraction);
				}
				if (studentAii == aiiFraction[0] /aiiFraction[1]) {runningMark += 1; document.getElementById("checkMarkTwo").style.display = 'inline';}
				// aiii typeset + marking
				if (sign < 2) {
					var domainComposite = "(-\\infty,"+e;
					if (sign==0) { // (-infty,a)
						domainComposite += ')';
						if (sOne=='true' && sTwo=='false' && sThree=='false' && sFour=='false' && sA == e) {
							runningMark += 1; document.getElementById("checkMarkThree").style.display = 'inline';}
					} else{ // sign == 1, (-infty,b]
						domainComposite += ']'
						if (sOne=='false' && sTwo=='true' && sThree=='false' && sFour=='false' && sB == e) {
							runningMark += 1; document.getElementById("checkMarkThree").style.display = 'inline';}
					};
				} else{
					if (sign==2) { // (c,infty)
						var domainComposite = '(';
						if (sOne=='false' && sTwo=='false' && sThree=='true' && sFour=='false' && sC == e) {
							runningMark += 1; document.getElementById("checkMarkThree").style.display = 'inline';}
					} else{ // sign == 3, [d,infty)
						var domainComposite = '[';
						if (sOne=='false' && sTwo=='false' && sThree=='false' && sFour=='true' && sD == e) {
							runningMark += 1; document.getElementById("checkMarkThree").style.display = 'inline';}
					};
					domainComposite += e + ",\\infty)"
				}
				// Marking ai
				if (aiReason==9 && aiExist == 0) {runningMark += 1; document.getElementById("checkMarkOne").style.display = 'inline'};
			}
			// bi
			var biFraction = addFractions([b,1],[a,d-h]);
			var studentBi = biNum /biDen;
			if (biSign == '-') {studentBi *= -1};
			if (biFraction[1] == 1) { //answer an integer
				var biAnswer = biFraction[0];
				if (biFraction[0] == studentBi) {
					runningMark += 2;
					document.getElementById("checkMarkFour").style.display = 'inline'; document.getElementById("checkMarkFive").style.display = 'inline';
				}
			} else{ // answer a fraction
				biAnswer=fractionTypeset(biFraction);
				var actualAnswer = biFraction[0]/biFraction[1];
				if (actualAnswer.toFixed(2) == studentBi.toFixed(2)) { // answer correct "sloppily"
					runningMark +=1; document.getElementById("checkMarkFour").style.display = 'inline';
					var decimalCheck = biDen == 1 && actualAnswer.toFixed(11) == studentBi.toFixed(11);
					var fractionCheck = biDen == biFraction[1] && Math.abs(biNum) == Math.abs(biFraction[0]);
					if (decimalCheck || fractionCheck) { // answer is exact decimal or simplest form
						runningMark +=1; document.getElementById("checkMarkFive").style.display = 'inline';
			}}}
			// typeset actual answer
			katex.render(reasonString, document.getElementById('trueReason'), {throwOnError:false}); 
			katex.render(fnExists+addParenthesis(c)+'='+aiiAnswer, document.getElementById('trueAii'), {throwOnError:false}); // TODO
			katex.render("D_{"+fnExists+"}="+domainComposite, document.getElementById('trueDomainOne'), {throwOnError:false});
			katex.render('f^{-1}'+addParenthesis(d)+'='+biAnswer, document.getElementById('trueBi'), {throwOnError:false});
			katex.render("D_{f^{-1}} = (-\\infty,"+h+")\\cup ("+h+",\\infty)", document.getElementById('trueDomainTwo'), {throwOnError:false});
			// mark bii
			if (tOne == 'true' && tTwo =='false' && tThree =='true' && tFour=='false' && tA==h && tC==h) {
				runningMark +=1; document.getElementById("checkMarkSix").style.display = 'inline';
			}
			// progress bar
			var progressBar =
				new ProgressBar.Circle('#progress', {
					color:'#0076ff',
					strokeWidth: 10,
					duration: 1000, // milliseconds
					easing: 'easeInOut'
				});
 			setTimeout(function() {progressBar.animate(runningMark/6);}, 1000);
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
	})
}},false); // End of window.onload