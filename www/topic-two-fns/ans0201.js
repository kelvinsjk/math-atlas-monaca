// This is a JavaScript file

// Our question will be of the form : f(x) = h + \frac{a}{x-b} and g(x) = x^p where p is 2 or 3
// if b > 0, then fg does not exist but gf does
// if b < 0, we will modify the domain of g and let p = 2 so that gf does not exist but fg does (the end pt of the domain will be e)
// we will compute f^{-1} (d)

// global variables
var proceedToBiiText = 'Proceed to next part';
var n, biAnswerArray, studentAnswer, optionString, switchStatusArray;
var answerQueryArray = ['', '', '', ''];

//  Query: Add only if needed
var queriesObject = parseQuery( window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), h = Number(queriesObject.h);
// Generate d
var d = h;
while (d==h) {d = getRandomInt(-9,9);} // Make sure d is in R_f
// Math calculations and building latex
var denomSign = '+'; // if b negative, denom is x+...
if (b>0) {denomSign = '-'}; // if b positive, denom is x- ...
const denominator = 'x' + denomSign + Math.abs(b);
if (a>0) {var fractionSign = "+", fraction = fractionBuilder(a,denominator)} else{var fractionSign = "-", fraction=fractionBuilder(-a,denominator)};
const fx = 'f: x \\mapsto ' +h+ fractionSign +fraction + '\\; \\textrm{for } x \\in \\mathbb{R}, x \\neq ' + b +'.';

// things that need id
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
		katex.render("f", document.getElementById('functionF'), {throwOnError:false});
		katex.render(fx,document.getElementById('qntext1'), {throwOnError: false, displayMode:true});
		katex.render("f^{-1}"+addParenthesis(d),document.getElementById('qntext2'), {throwOnError: false});
		katex.render("f^{-1}", document.getElementById('qntext3'),{throwOnError:false});
	}
},false); // End of window.onload

// start answering: make tabs visible
var startAnswering = function(){
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	var fInvDString = "f^{-1}"+addParenthesis(d);
	// Typeset (bi) answer input
	katex.render(fInvDString,document.getElementById('fInverseD'),{throwOnError:false});
	katex.render(fInvDString + "=",document.getElementById('fInverseDTwo'),{throwOnError:false}); 
	katex.render("-\\frac{22}{7}",document.getElementById('fractionExample'), {throwOnError: false});
	katex.render("-22 / 7", document.getElementById('decimalExample'),{throwOnError: false});
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	// Input box for (bi)
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
		if (input_field.validity.valid) {
			document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToBii' onclick='biiProceed()'>" +proceedToBiiText+ "</ons-button>";
		} else {
			document.getElementById('submitButton').innerHTML = '';
		};
	});
};

// Allow changes to (bi)
var changeBi = function() {
	document.getElementById('biSubmitted').style.display = 'none';
	document.getElementById('biSubmitter').style.display = 'block';
	document.getElementById('proceedToBii').innerHTML = 'Confirm';
	proceedToBiiText = 'Confirm';
};

// Start (bii): toggles for sets
var biiProceed = function() {
	document.getElementById('biSubmitter').style.display = 'none';
	biAnswerArray = handleFractions(document.getElementById('inputk').value );
	if (biAnswerArray[2]=='1') {studentAnswer = biAnswerArray[1]} else{studentAnswer = fractionBuilder(biAnswerArray[1],biAnswerArray[2])};
	katex.render("f^{-1}"+addParenthesis(d)+"="+biAnswerArray[0]+studentAnswer, document.getElementById('biLockedin'), {throwOnError:false});
	document.getElementById('biSubmitted').style.display = 'block';
	document.getElementById('biInstructions').style.display = 'none';
	document.getElementById('bii').style.display = 'block';
	document.getElementById('samsungWarning').style.display = 'block';
	katex.render("f^{-1}", document.getElementById("fInverse",),{throwOnError:false});
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
}; // End of bii

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
		// typesetting bi
		katex.render("f^{-1}"+addParenthesis(d)+"="+biAnswerArray[0]+studentAnswer, document.getElementById('fInverseDStudent'), {throwOnError: false});
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
			document.getElementById('biiConfirmationInstructions').style.display = 'none';
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
			document.getElementById('biiConfirmationInstructions').style.display = 'none';
			document.getElementById('moveOnButton').style.display = 'none';
		} else{ // valid input
			var proceedFlag = true;
			document.getElementById('invalidInput').style.display = 'none';
			document.getElementById('biiConfirmationInstructions').style.display = 'block';
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
		answerPreviewFinal = 'D_{f^{-1}}=' + answerPreviewFinal;
		katex.render(answerPreviewFinal, previewSpace, {throwOnError:false});
		previewSpace.style.display = 'inline';
	} // end of if/else (dialog)
};

// passesOptionselected to answer page
var proceedToSoln = function() {
	queriesObject.d = d;
	queriesObject.biSign = biAnswerArray[0];
	 queriesObject.biNum = biAnswerArray[1];
	 queriesObject.biDen = biAnswerArray[2];
	 queriesObject.tOne = switchStatusArray[0];
	 queriesObject.tTwo = switchStatusArray[1];
	 queriesObject.tThree = switchStatusArray[2];
	 queriesObject.tFour = switchStatusArray[3];
	queriesObject.tA = answerQueryArray[0];
	queriesObject.tB = answerQueryArray[1];
	queriesObject.tC = answerQueryArray[2];
	queriesObject.tD = answerQueryArray[3];
	window.location = htmlQueryConstructor('soln0201.html',queriesObject);
};