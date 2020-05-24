// This is a JavaScript file

// Our question will be of the form : y = \frac{ax + b}{x+c} = A + \frac{B}{x+c}
// a=A, c are non-zero, B is positive, b=B+ac

// global variables
var proceedToBiiText = 'Proceed to next part';
var biAnswerArrayOne, biAnswerArrayTwo, biiAnswerArrayOne, biiAnswerArrayTwo;
var biFlag = true, biiFlag = true, partICheck = false, partIiCheck = false;

//  Query: Add only if needed
var queriesObject = parseQuery(window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), c = Number(queriesObject.c);

// Building latex
var numerator = polyBuilder([a,b]), denominator = polyBuilder([1,c]);
var improperFraction = katexifyDstyle("y=" +fractionBuilder(numerator,denominator));

// things that need id
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
		katex.render("x", document.getElementById('x'), {throwOnError:false});
		katex.render("y", document.getElementById('y'), {throwOnError:false});
		katex.render(improperFraction,document.getElementById('qntext1'), {throwOnError: false});
	}
},false); // End of window.onload

// start answering: make tabs visible
var startAnswering = function(){
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	// change button to say "go to Question" instead
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	// typeset (bi) 
	katex.render(improperFraction,document.getElementById('showQuestion'),{throwOnError:false});
	katex.render("x=c",document.getElementById('vertical'),{throwOnError:false});
	katex.render("y=d",document.getElementById('horizontal'),{throwOnError:false});
	katex.render("c=",document.getElementById('biC'),{throwOnError:false});
	katex.render("d=",document.getElementById('biD'),{throwOnError:false});
	katex.render("-\\frac{22}{7}",document.getElementById('fractionExample'), {throwOnError: false});
	katex.render("-22 / 7", document.getElementById('decimalExample'),{throwOnError: false});
	// Input box for (bi) vertical asymptote
	var input_field = document.querySelector('#inputk'); // class type: fraction
	var input_field_two = document.querySelector('#inputkTwo'); // class type: fraction
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
	// only show next part once input valid
	input_field.addEventListener('input', function(e) { 
		if (biFlag) { //first time
			if (input_field.validity.valid && input_field.value) {document.getElementById('horiDiv').style.display = 'block'; biFlag = false;}
		} else { //subsequent attempt: check for validity for proceed button
			if (input_field_two.validity.valid && input_field.validity.valid && input_field_two.value && input_field.value) {
				document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToBii' onclick='biiProceed()'>" +proceedToBiiText+ "</ons-button>";
				partICheck = true;
				if (partICheck && partIiCheck) {
					document.getElementById('solnButton').style.display='block';
				} else{
					document.getElementById('solnButton').style.display='none';
				};
			} else {
				document.getElementById('submitButton').innerHTML = '';
				partICheck = false;
				document.getElementById('solnButton').style.display='none';
			};
		};
	});
	// Input box for (bi) horizontal asymptote
	// prevents spaces
	input_field_two.addEventListener('textInput', function(e) { 
		var char = e.data; 
		var keyCode = char.charCodeAt(0); 
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true;
	}); // end of spacebar prevention
	// only show next part if input valid
	input_field_two.addEventListener('input', function(e) { 
		if (input_field_two.validity.valid && input_field.validity.valid && input_field_two.value && input_field.value) {
			document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToBii' onclick='biiProceed()'>" +proceedToBiiText+ "</ons-button>";
			partICheck = true;
			if (partICheck && partIiCheck) {
				document.getElementById('solnButton').style.display='block';
			} else{
				document.getElementById('solnButton').style.display='none';
			};
		} else {
			partICheck = false;
			document.getElementById('submitButton').innerHTML = '';
			document.getElementById('solnButton').style.display='none';
		};
	});
	// change button on tab 1
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
};

// Allow changes to (bi)
var changeBi = function() {
	document.getElementById('biSubmitted').style.display = 'none';
	document.getElementById('biSubmitter').style.display = 'block';
	document.getElementById('proceedToBii').innerHTML = 'Confirm';
	document.getElementById('biInstructions').style.display = 'block';
	proceedToBiiText = 'Confirm';
};

// Start (bii): build student answer: show locked in version. start showing (bii) questions
var biiProceed = function() {
	document.getElementById('biSubmitter').style.display = 'none';
	document.getElementById('biInstructions').style.display = 'none';
	biAnswerArrayOne = handleFractions(document.getElementById('inputk').value );
	if (biAnswerArrayOne[2]=='1') {var studentAnswer = biAnswerArrayOne[1]} else{var studentAnswer = fractionBuilder(biAnswerArrayOne[1],biAnswerArrayOne[2])};
	biAnswerArrayTwo = handleFractions(document.getElementById('inputkTwo').value );
	if (biAnswerArrayTwo[2]=='1') {var studentAnswerTwo = biAnswerArrayTwo[1]} else{var studentAnswerTwo = fractionBuilder(biAnswerArrayTwo[1],biAnswerArrayTwo[2])};
	var biString = "x="+biAnswerArrayOne[0]+studentAnswer+", \\; y="+biAnswerArrayTwo[0]+studentAnswerTwo;
	katex.render(biString, document.getElementById('biLockedin'), {throwOnError:false});
	document.getElementById('biSubmitted').style.display = 'block';
	document.getElementById('bii').style.display = 'block';
	katex.render("-\\frac{22}{7}",document.getElementById('fractionExampleTwo'), {throwOnError: false});
	katex.render("-22 / 7", document.getElementById('decimalExampleTwo'),{throwOnError: false});
	// typeset bii answer section
	katex.render("(e,0). \\; e=",document.getElementById('xIntE'),{throwOnError:false});
	katex.render("(0,f). \\; f=",document.getElementById('yIntF'),{throwOnError:false});
	katex.render("x",document.getElementById('xTwo'),{throwOnError:false});
	katex.render("y",document.getElementById('yTwo'),{throwOnError:false});
	
	// Input box for (bii) x-intercept
	var input_field_three = document.querySelector('#inputkThree'); // class type: fraction
	var input_field_four = document.querySelector('#inputkFour'); // class type: fraction
	// prevents spaces
	input_field_three.addEventListener('textInput', function(e) { 
		var char = e.data; 
		var keyCode = char.charCodeAt(0); 
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true;
	}); // end of spacebar prevention
	// only show next part once input valid
	input_field_three.addEventListener('input', function(e) { 
		if (biiFlag) { //first time
			if (input_field_three.validity.valid && input_field_three.value) {document.getElementById('yIntercept').style.display = 'block'; biiFlag = false;}
		} else { //subsequent attempt: check for validity for proceed button
			if (input_field_three.validity.valid && input_field_four.validity.valid && input_field_three.value && input_field_four.value) {
				document.getElementById('solnButton').style.display = 'block';
				partIiCheck = true;
				if (partICheck && partIiCheck) {
					document.getElementById('solnButton').style.display='block';
				} else{
					document.getElementById('solnButton').style.display='none';
				};
			} else {
				partIiCheck = false;
				document.getElementById('solnButton').style.display = 'none';
			};
		};
	});
	// prevents spaces for input 4
	input_field_four.addEventListener('textInput', function(e) { 
		var char = e.data; 
		var keyCode = char.charCodeAt(0); 
		// Stop processing if spacebar is pressed
		if (keyCode == 32) {
			e.preventDefault();
			return false;
		}
		return true;
	}); // end of spacebar prevention
	// only show next part if input valid
	input_field_four.addEventListener('input', function(e) { 
		if (input_field_three.validity.valid && input_field_four.validity.valid && input_field_three.value && input_field_four.value) {
			document.getElementById('solnButton').style.display = 'block';
			partIiCheck = true;
			if (partICheck && partIiCheck) {
				document.getElementById('solnButton').style.display='block';
			} else{
				document.getElementById('solnButton').style.display='none';
			};
		} else {
			partIiCheck = false;
			document.getElementById('solnButton').style.display = 'none';
		};
	});	
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
		biAnswerArrayOne = handleFractions(document.getElementById('inputk').value );
		if (biAnswerArrayOne[2]=='1') {var studentAnswer = biAnswerArrayOne[1]} else{var studentAnswer = fractionBuilder(biAnswerArrayOne[1],biAnswerArrayOne[2])};
		biAnswerArrayTwo = handleFractions(document.getElementById('inputkTwo').value );
		if (biAnswerArrayTwo[2]=='1') {var studentAnswerTwo = biAnswerArrayTwo[1]} else{var studentAnswerTwo = fractionBuilder(biAnswerArrayTwo[1],biAnswerArrayTwo[2])};
		var biString = "x="+biAnswerArrayOne[0]+studentAnswer+", \\; y="+biAnswerArrayTwo[0]+studentAnswerTwo;
		katex.render(biString, document.getElementById('asymptotesTypeset'),{throwOnError:false});
		//typesetting bii
		biiAnswerArrayOne = handleFractions(document.getElementById('inputkThree').value );
		if (biiAnswerArrayOne[2]=='1') {var studentAnswer = biiAnswerArrayOne[1]} else{var studentAnswer = fractionBuilder(biiAnswerArrayOne[1],biiAnswerArrayOne[2])};
		biiAnswerArrayTwo = handleFractions(document.getElementById('inputkFour').value );
		if (biiAnswerArrayTwo[2]=='1') {var studentAnswerTwo = biiAnswerArrayTwo[1]} else{var studentAnswerTwo = fractionBuilder(biiAnswerArrayTwo[1],biiAnswerArrayTwo[2])};
		var biiString = "\\left ("+biiAnswerArrayOne[0]+studentAnswer+",0\\right ), \\; \\left ( 0, "+biiAnswerArrayTwo[0]+studentAnswerTwo+"\\right )";
		katex.render(biiString, document.getElementById('interceptsTypeset'),{throwOnError:false});
		dialog.show();
	} // end of if/else (dialog)
};

// passesOptionselected to answer page
var proceedToSoln = function() {
	queriesObject.biXSign = biAnswerArrayOne[0];
	queriesObject.biXNum = biAnswerArrayOne[1];
	queriesObject.biXDen = biAnswerArrayOne[2];
	queriesObject.biYSign = biAnswerArrayTwo[0];
	queriesObject.biYNum = biAnswerArrayTwo[1];
	queriesObject.biYDen = biAnswerArrayTwo[2];
	queriesObject.biiXSign = biiAnswerArrayOne[0];
	queriesObject.biiXNum = biiAnswerArrayOne[1];
	queriesObject.biiXDen = biiAnswerArrayOne[2];
	queriesObject.biiYSign = biiAnswerArrayTwo[0];
	queriesObject.biiYNum = biiAnswerArrayTwo[1];
	queriesObject.biiYDen = biiAnswerArrayTwo[2];
	window.location = htmlQueryConstructor('soln0301.html',queriesObject);
};