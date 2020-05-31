// This is a JavaScript file

// Our question will be of the form : f(x) = h + \frac{a}{x-b} and g(x) = x^p where p is 2 or 3
// if b > 0, then fg does not exist but gf does
// if b < 0, we will modify the domain of g and let p = 2 so that gf does not exist but fg does (the end pt of the domain will be e)
// we will compute fg(c)/gf(c)
// Nerdy facts: more than 5000 unique questions

// Hides and shows radio options for (ai)
var radioFlag = false, radioProceed = false, proceedToAiiiText = 'Proceed to next part';
const radioIds = ['radioZero' , 'radioOne', 'radioTwo', 'radioThree', 'radioFour', 'radioFive'];
const reasonIds = ['reasonZero', 'reasonOne', 'reasonTwo', 'reasonThree', 'reasonFour', 'reasonFive'];
const caretIds = ['caretZero' , 'caretOne', 'caretTwo', 'caretThree', 'caretFour', 'caretFive']; 
var n, aiiAnswerArray, studentAnswer, optionString, switchStatusArray;
var answerQueryArray = ['', '', '', ''];

// Set up MCQ choices
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

// Generate random Integers
var a =  getRandomNonZero(1,9), b = getRandomNonZero(1,9), c = getRandomInt(-9,9), e ='', h = getRandomNonZero(1,9), p = getRandomInt(2,3);
var fnExists = 'gf', fnDoesNotExist = 'fg', domainAdd = '';
var signArray = [' < ', ' \\leq ', ' > ', '\\geq '], sign = ''; // f used to determine sign
if (b<0) {
	fnExists = 'fg'; 
	fnDoesNotExist = 'gf';
	p = 2;
	sign = getRandomInt(0,3); // determines sign for new domain 
	e = getRandomInt(-8,8);
	domainAdd = ', x ' + signArray[sign] + e;
	if (sign < 2) {c = getRandomInt(-9,e-1)} else{ c = getRandomInt(e+1,9)}; // make sure c is in new domain of g
	var mcqArrayPlusAnswer = mcqPicker(mcqPossibilities, 6, 9);
} else{
	while (c == b) {c = getRandomInt(-9,9)}; // c cannot be b if b>0
	var mcqArrayPlusAnswer = mcqPicker(mcqPossibilities, 6, 10);
};

// Start to build question
var denomSign = '+'; // if b negative, denom is x+...
if (b>0) {denomSign = '-'}; // if b positive, denom is x- ...
const denominator = 'x' + denomSign + Math.abs(b);
if (a>0) {var fractionSign = "+", fraction = fractionBuilder(a,denominator)} else{var fractionSign = "-", fraction=fractionBuilder(-a,denominator)};
const fx = '&f: x \\mapsto ' +h+ fractionSign +fraction + '\\; &&\\textrm{for } x \\in \\mathbb{R}, x \\neq ' + b +', \\\\ ';
const gx = '&g:x \\mapsto x^' +p+ ' && \\textrm{for }  x \\in \\mathbb{R}' + domainAdd + '.';

// onload insert math
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
	katex.render(katexAlign(fx+gx), document.getElementById('qntext1'), {throwOnError: false,displayMode:true });
	katex.render("f", document.getElementById('functionF'), {throwOnError: false});
	katex.render("g", document.getElementById('functionG'), {throwOnError: false});
	katex.render(fnDoesNotExist, document.getElementById('qntext2'), {throwOnError: false});
	katex.render(fnExists +'('+c+')', document.getElementById('qntext3'), {throwOnError: false});
	katex.render(fnExists, document.getElementById('qntext4'), {throwOnError: false});
	}
}, false);

// start answering: make tabs visible
var startAnswering = function(){
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	katex.render(fnDoesNotExist,document.getElementById('notCompositeOne'),{throwOnError:false});
	katex.render(fnDoesNotExist,document.getElementById('notCompositeTwo'),{throwOnError:false});
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	reasonIds.forEach( function(radioString, i){
		optionString = mcqArrayPlusAnswer[0][i];
		document.getElementById(radioString).innerHTML = optionString.slice(2);
		if (optionString[0] == '0') { // just need to render function name
			katex.render(functionStringArrayOne[Number(optionString[1])],document.getElementById("functionPlaceholder"+optionString[1]), {throwOnError:false});
		} else { // Rf subset or not Df
			if (optionString[0] == '1') {var subsetString = ''} else{ var subsetString = '\\not '} // whether a subset or not
			var subsetEquation = 'R_' + functionStringArrayTwo[Number(optionString[1])] + subsetString + ' \\subseteq D_' + functionStringArrayOne[Number(optionString[1])];
			katex.render(subsetEquation, document.getElementById("subsetPlaceholder"+optionString.slice(0,2)),{throwOnError: false});
		}
	});
};

// radio button control. Shows part (aii) first time an option is chosen
var radioClick = function(indexStr) {
	n = Number(indexStr);
	if (radioFlag){ // radio buttons hidden: show all. Hide caret
		radioIds.forEach( function(radioString,i) {
			document.getElementById(radioString).style.display = 'block';
		});
		document.getElementById(caretIds[n]).style.display = 'none'
		radioFlag = false;
	} else { // radio buttons shown: hide all but actual answer. Show caret
		radioIds.forEach( function(radioString, i) {
			if (i != n) {document.getElementById(radioString).style.display = 'none'};
		});
		document.getElementById(caretIds[n]).style.display = 'inline';
		radioFlag = true;
	};
	if (!radioProceed) {
		katex.render("-\\frac{22}{7}", document.getElementById('fractionExample'), {throwOnError:false});
		katex.render("-22 / 7", document.getElementById('decimalExample'), {throwOnError:false});
		document.getElementById('aii').style.display = 'block';
		radioProceed = true;
	};
	//Typeset (aii) answer box
	katex.render(fnExists + "(" + c + ")", document.getElementById('compositeEval'), {throwOnError:false});
	katex.render(fnExists + "(" + c + ")= ", document.getElementById('compositeEvalTwo'), {throwOnError:false});
	// Input answer box for (aii)
	var input_field = document.querySelector('.fraction'); // class type: fraction
	// prevents spaces
	input_field.addEventListener('textInput', function(e) { 
		var char = e.data; 
		var keyCode = char.charCodeAt(0); 
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true;
	}); // end of spacebar prevention
	// only show button to proceed if input is valid
	input_field.addEventListener('input', function(e) { 
		if (input_field.validity.valid && input_field.value) {
			document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToAiii' onclick='aiiiProceed()'>" +proceedToAiiiText+ "</ons-button>";
		} else {
			document.getElementById('submitButton').innerHTML = '';
		};
	});
};

var changeAii = function() {
	document.getElementById('aiiSubmitted').style.display = 'none';
	document.getElementById('aiiSubmitter').style.display = 'block';
	document.getElementById('proceedToAiii').innerHTML = 'Confirm';
	proceedToAiiiText = 'Confirm';
};

var aiiiProceed = function() {
	katex.render(fnExists, document.getElementById('fnAiii'),{throwOnError:false});
	document.getElementById('aiiSubmitter').style.display = 'none';
	aiiAnswerArray = handleFractions(document.getElementById('inputk').value );
	if (aiiAnswerArray[2]=='1') {studentAnswer = aiiAnswerArray[1]} else{studentAnswer = fractionBuilder(aiiAnswerArray[1],aiiAnswerArray[2])};
	katex.render(fnExists+addParenthesis(c)+"="+aiiAnswerArray[0]+studentAnswer, document.getElementById('aiiLockedin'), {throwOnError:false});
	document.getElementById('aiiSubmitted').style.display = 'block';
	document.getElementById('aiiInstructions').style.display = 'none';
	document.getElementById('aiii').style.display = 'block';
	document.getElementById('samsungWarning').style.display = 'block';
	katex.render("\\cup", document.getElementById("union"),{throwOnError:false});
	katex.render("(-\\infty, a)", document.getElementById('lessExclusive'),{throwOnError:false});
	katex.render("(-\\infty, b]", document.getElementById('lessInclusive'),{throwOnError:false});
	katex.render("(c, \\infty)", document.getElementById('moreExclusive'),{throwOnError:false});
	katex.render("[d, \\infty)", document.getElementById('moreInclusive'),{throwOnError:false});
	// Listen to switch changing
	document.getElementById('switch1').addEventListener('change', function(e) { 
		if(e.target.checked) {
				document.getElementById('spana').innerHTML = "<span id='aKatex'></span> <ons-input id='inputa' type='number'> </ons-input>, \
					<label class='left'>   <ons-checkbox input-id='negativeA' id = 'negativeA'></ons-checkbox> 	 </label> \
					<label for='negativeA' class='center'> Make <span id='aKatexTwo'></span> negative </label>";
				katex.render('a= ', document.getElementById('aKatex'),{throwOnError: false});
				katex.render('a ', document.getElementById('aKatexTwo'),{throwOnError: false});
		} else{
			document.getElementById('spana').innerHTML = '';
		};
	});
	document.getElementById('switch2').addEventListener('change', function(e) { 
		if(e.target.checked) {
				document.getElementById('spanb').innerHTML = "<span id='bKatex'></span> <ons-input id='inputb' type='number'> </ons-input>, \
					<label class='left'>   <ons-checkbox input-id='negativeB' id = 'negativeB'></ons-checkbox> 	 </label> \
					<label for='negativeB' class='center'> Make <span id='bKatexTwo'></span> negative </label>";
				katex.render('b= ', document.getElementById('bKatex'),{throwOnError: false});
				katex.render('b ', document.getElementById('bKatexTwo'),{throwOnError: false});
		} else{
			document.getElementById('spanb').innerHTML = '';
		};
	});
	document.getElementById('switch3').addEventListener('change', function(e) { 
		if(e.target.checked) {
				document.getElementById('spanc').innerHTML = "<span id='cKatex'></span> <ons-input id='inputc' type='number'> </ons-input>, \
					<label class='left'>   <ons-checkbox input-id='negativeC' id = 'negativeC'></ons-checkbox> 	 </label> \
					<label for='negativeC' class='center'> Make <span id='cKatexTwo'></span> negative </label>";
				katex.render('c= ', document.getElementById('cKatex'),{throwOnError: false});
				katex.render('c ', document.getElementById('cKatexTwo'),{throwOnError: false});
		} else{
			document.getElementById('spanc').innerHTML = '';
		};
	});
	document.getElementById('switch4').addEventListener('change', function(e) { 
		if(e.target.checked) {
				document.getElementById('spand').innerHTML = "<span id='dKatex'></span> <ons-input id='inputd' type='number'> </ons-input>, \
					<label class='left'>   <ons-checkbox input-id='negativeD' id = 'negativeD'></ons-checkbox> 	 </label> \
					<label for='negativeD' class='center'> Make <span id='dKatexTwo'></span> negative </label>";
				katex.render('d= ', document.getElementById('dKatex'),{throwOnError: false});
				katex.render('d ', document.getElementById('dKatexTwo'),{throwOnError: false});
		} else{
			document.getElementById('spand').innerHTML = '';
		};
	}); 
	// End of switch code
};

var previewAnswer = function() {
	// show dialog: create one if it's not present
	var dialog = document.getElementById('my-dialog');
	if (!dialog) { 
		var modal = document.querySelector('ons-modal');
		modal.show(); 
		ons.createElement('dialog.html', { append: true }).then( function() {
			modal.hide();
			previewAnswer();
		})
	} else{ 
		dialog = document.getElementById('my-dialog');
		// typesetting ai
		katex.render(fnDoesNotExist, document.getElementById('notCompositeThree'), {throwOnError: false});
		if (document.getElementById('chooseOne').value == '1') {var existReason = 'exists'} else { var existReason = 'does not exist'}
		document.getElementById('existsOrNot').innerHTML = existReason;
		// typeset reason
		var reasonArray = ['reasonZero','reasonOne','reasonTwo','reasonThree','reasonFour','reasonFive'];
		document.getElementById('reasonGiven').innerHTML = document.getElementById(reasonArray[n]).cloneNode(true).innerHTML+".";
		// aii 
		katex.render(fnExists+addParenthesis(c)+"="+aiiAnswerArray[0]+studentAnswer, document.getElementById('studentAii'), {throwOnError:false});
		// switch manipulation
		var sOne = document.getElementById('switch1').checked;
		var sTwo = document.getElementById('switch2').checked;
		var sThree = document.getElementById('switch3').checked;
		var sFour = document.getElementById('switch4').checked;
		switchStatusArray = [sOne, sTwo, sThree, sFour];
		// set up necessary arrays
		var answerArray = [];
		var inputNamesArray = ['inputa', 'inputb','inputc','inputd']; 
		var negativeNamesArray = ['negativeA', 'negativeB','negativeC','negativeD']; 
		// set up preview
		var previewSpace = document.getElementById('domainSwitchPreview'), answerPreviewArray = [];
		dialog.show();
		// check for no options. Return if nothing done
		if (!switchStatusArray.some(function(e) {return e})) {
			previewSpace.innerHTML = 'You have not selected any options. Try again.'; 
			previewSpace.style.display ='block'; 
			document.getElementById('invalidInput').style.display = 'none';
			document.getElementById('aiiiConfirmationInstructions').style.display = 'none';
			document.getElementById('moveOnButton').style.display = 'none';
			return 
		};
		// iterates switches, get input values
		switchStatusArray.forEach(function(switchStatus, i) {
			if (switchStatus) {
				var b = handleDecimal(document.getElementById(inputNamesArray[i]).value);
				if (document.getElementById(negativeNamesArray[i]).checked && !(b === '')) {b *= -1};
				answerArray.push(b);
				answerQueryArray[i] = b;
				if (i < 2) { // < sets
					var setString = '(-\\infty, ' +b;
					if (i == 0) {setString += ')'} else {setString += ']'};
				} else { // > sets
					if (i == 2) {var setString = '(';} else{ var setString = '[';};
					setString += b + ', \\infty )';
				}; 
				answerPreviewArray.push(setString );
				answerQueryArray[i] = b;
			} // end of if/else
		}); // end of switch iteration
		// detect if we have invalid input
		if (answerArray.some( e => e === '' ) ) { // invalid input
			document.getElementById('invalidInput').style.display = 'block';
			document.getElementById('aiiiConfirmationInstructions').style.display = 'none';
			document.getElementById('moveOnButton').style.display = 'none';
		} else{ // valid input
			var proceedFlag = true;
			document.getElementById('invalidInput').style.display = 'none';
			document.getElementById('aiiiConfirmationInstructions').style.display = 'block';
			document.getElementById('moveOnButton').style.display = 'block';
		};
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
	} // end of if/else (dialog)
};

// passesOptionselected to answer page
var proceedTob = function() {
	var aiiStudentAnswer = mcqArrayPlusAnswer[0][n];
	var aiReason = 4*Number(aiiStudentAnswer[0]) + Number(aiiStudentAnswer[1]);
	var queryObject = { 
		a: a, b: b, c: c, e:e,  h:h, p:p, sign:sign, aiExist: document.getElementById('chooseOne').value, aiReason: aiReason, 
		aiiSign: aiiAnswerArray[0], aiiNum: aiiAnswerArray[1], aiiDen: aiiAnswerArray[2],
		sOne: switchStatusArray[0], sTwo: switchStatusArray[1], sThree: switchStatusArray[2], sFour: switchStatusArray[3],
		sA: answerQueryArray[0], sB: answerQueryArray[1], sC: answerQueryArray[2], sD: answerQueryArray[3]
	};
	window.location = htmlQueryConstructor('ans0201.html',queryObject);
};