// This is a JavaScript file

// Our question will be of the form : y = \frac{ax + b}{x+c} = A + \frac{B}{x+c}
// a=A, c are non-zero, B is positive, b=B+ac
// If order == 1: we will transform from y=1/x to our graph. If order == 2: we will do the reverse.

// global variables
var proceedToAiiText = 'Proceed to next part', transformFirst = true;
var numberWordsArray = ['One', 'Two', 'Three', 'Four'];
var directionArray = {'One':false,'Two':false,'Three':false,'Four':false};
var directionFlag = false, fractionFlag = false;
var transformArray = [' Translate ',' Scale',' Reflect'];
var transformWordsArray = [' units in the ',' by a factor of ',' parallel to the ',' in the '];
var transformDirectionArray = ['positive x-axis direction.','negative x-axis direction.','positive y-axis direction.','negative y-axis direction.','x-axis.','y-axis.','x-axis.','y-axis.'];

// Generate numbers
var a = getRandomNonZero(1,9), c = getRandomNonZero(1,9), B = getRandomInt(2,9), order = getRandomInt(1,2);
var b = B + a*c;
// Math calculations and building latex
var numerator = polyBuilder([a,b]), denominator = polyBuilder([1,c]);
var improperFraction = katexifyDstyle("y=" +fractionBuilder(numerator,denominator)), properFraction = katexifyDstyle("y=A+" +fractionBuilder("B",denominator));
var answerFraction = katexifyDstyle(fractionBuilder(numerator,denominator)+"=A+" +fractionBuilder("B",denominator));

// things that need id
document.addEventListener('init', function(event) {
	if (event.target.matches('#qn001atab')) {
		katex.render(properFraction, document.getElementById('properFractionOne'), {throwOnError:false});
		katex.render(improperFraction, document.getElementById('improperFractionOne'), {throwOnError:false});
		katex.render("A",document.getElementById('bigA'), {throwOnError: false});
		katex.render("B",document.getElementById('bigB'), {throwOnError: false});
		if (order == 1) { // transform from 1/x to graph
		katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('oneOverX'), {throwOnError: false});
		katex.render(improperFraction, document.getElementById('improperFractionTwo'), {throwOnError:false});
		} else { // transform from graph to 1/x
			katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('improperFractionTwo'), {throwOnError: false});
			katex.render(improperFraction, document.getElementById('oneOverX'), {throwOnError:false});
		}
	};
},false); // End of window.onload

// start answering: make tabs visible
var startAnswering = function(){
	// show tabBar and go to answer tab
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	// change button to say "go to Question" instead
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	// typeset (ai)
	katex.render(answerFraction, document.getElementById('properFractionTwo'), {throwOnError:false});
	katex.render("A",document.getElementById('bigATwo'), {throwOnError: false});
	katex.render("B",document.getElementById('bigBTwo'), {throwOnError: false});
	katex.render("A=",document.getElementById('aiA'), {throwOnError: false});
	katex.render("A",document.getElementById('aiATwo'), {throwOnError: false});
	katex.render("B=",document.getElementById('aiB'), {throwOnError: false});
	// (ai) student input
	var input_field_one = document.querySelector('#inputk');
	var input_field_two = document.querySelector('#inputkTwo');
	// only show button to proceed if input is valid
	input_field_one.addEventListener('input', function(e) { 
		if (input_field_one.value && input_field_two.value) {
			document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToAii' onclick='aiiProceed()'>" +proceedToAiiText+ "</ons-button>";
		} else {
			document.getElementById('submitButton').innerHTML = '';
		};
	});
	input_field_two.addEventListener('input', function(e) { 
		if (input_field_one.value && input_field_two.value) {
			document.getElementById('submitButton').innerHTML = "<ons-button id='proceedToAii' onclick='aiiProceed()'>" +proceedToAiiText+ "</ons-button>";
		} else {
			document.getElementById('submitButton').innerHTML = '';
		};
	});
};

// Allow changes to (ai)
var changeAi = function() {
	document.getElementById('aiSubmitted').style.display = 'none';
	document.getElementById('aiSubmitter').style.display = 'block';
	document.getElementById('proceedToAii').innerHTML = 'Confirm';
	proceedToAiiText = 'Confirm';
};

// Start (aii): transformations choice
var aiiProceed = function() {
	// hides aiSubmitter and previews answer
	document.getElementById('aiSubmitter').style.display = 'none';
	var aiStudentA = document.getElementById('inputk').value;
	if (document.getElementById('negativeA').checked) {aiStudentA *= -1;};
	var aiStudentB = document.getElementById('inputkTwo').value;
	// shows locked in version of (ai)
	katex.render("A="+aiStudentA+",B="+aiStudentB, document.getElementById('aiLockedin'), {throwOnError:false});
	document.getElementById('aiSubmitted').style.display = 'block';
	document.getElementById('aiiQuestion').style.display = 'block'; 
	// start typesetting (aii)
	if (order == 1) { // 1/x to graph
		katex.render(improperFraction, document.getElementById('improperFractionThree'), {throwOnError:false});		
		katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('oneOverXTwo'), {throwOnError: false});
	} else {
		katex.render(improperFraction, document.getElementById('oneOverXTwo'), {throwOnError:false});		
		katex.render(katexifyDstyle("y="+fractionBuilder("1","x")),document.getElementById('improperFractionThree'), {throwOnError: false});
	}
}; // End of aiiProceed

// input how many transformations required
var transformGuide = function(number) { //number: number student selected
	if (transformFirst) { // new attempt
		document.getElementById('transformList').style.display = 'block';
		katex.render(fractionBuilder(1,3),document.getElementById('fractionExample'),{throwOnError:false});
		katex.render("1/3",document.getElementById('decimalExample'),{throwOnError:false});
		var i; 
		for (i=2; i <= Number(number); i++) {
			document.getElementById('transform'+numberWordsArray[i-1]).style.display = 'block';
		}
		transformFirst = false; 
		document.getElementById('submitPartA').style.display='block';
	} else { // already started question
		var i; 
		for (i=2; i<5; i++) {
			if (i > Number(number)) { // number too big: need to remove
				document.getElementById('transform'+numberWordsArray[i-1]).style.display = 'none';
			}
			else { // acceptable: show
				document.getElementById('transform'+numberWordsArray[i-1]).style.display = 'block';
			}
		}
	}; // end of if/else
}; // end of transformGuide

// after selecting transformation, show next input option to student:
var transformTypeHandler = function(transformObject) {
	var numberWord = transformObject.id.slice(13);
	if (transformObject.value == 1) { // translation
		var transformNumberElement = document.getElementById('transformNumber'+numberWord);
		transformNumberElement.innerHTML = "<input id='inputT"+numberWord+"' pattern='\\d+|(?=.+\\.)\\d+\\.\\d{1,5}|(?=\\.)\\.\\d+|(?=.+/)\\d+/\\d{1,5}' class='fraction'></input> units in the";
		// prevents spaces
		var input_field = document.querySelector('#inputT'+numberWord); // class type: fraction
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
		transformNumberElement.style.display = 'block'; 
		var transformDirectionElement = document.getElementById('transformDirection'+numberWord);
		document.getElementById('studentDirection'+numberWord).innerHTML = 
		"<option value='none' selected disabled hidden>Select direction</option> <option value='1'>positive x-axis</option> <option value='2'>negative x-axis</option> \
		<option value='3'>positive y-axis</option> <option value='4'>negative y-axis</option>";
		transformDirectionElement.innerHTML += '';
		transformDirectionElement.style.display = 'block';
		document.getElementById('directionText'+numberWord).innerHTML = ' direction.';
	} else if (transformObject.value == 2) { // scaling
		var transformNumberElement = document.getElementById('transformNumber'+numberWord);
		transformNumberElement.innerHTML = "by a factor of <input id='inputT"+numberWord+"' pattern='\\d+|(?=.+\\.)\\d+\\.\\d{1,5}|(?=\\.)\\.\\d+|(?=.+/)\\d+/\\d{1,5}' class='fraction'></input> parallel to the";
		// prevents spaces
		var input_field = document.querySelector('#inputT'+numberWord); // class type: fraction
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
		transformNumberElement.style.display = 'block'; 
		var transformDirectionElement = document.getElementById('transformDirection'+numberWord);
		document.getElementById('studentDirection'+numberWord).innerHTML = 
		"<option value='none' selected disabled hidden>Select direction</option> <option value='1'>x-axis</option> <option value='2'>y-axis</option>";
		transformDirectionElement.innerHTML += '';
		transformDirectionElement.style.display = 'block';
		document.getElementById('directionText'+numberWord).innerHTML = '.';
	} else { //reflection
		var transformNumberElement = document.getElementById('transformNumber'+numberWord);
		transformNumberElement.innerHTML = "in the";
		transformNumberElement.style.display = 'block'; 
		var transformDirectionElement = document.getElementById('transformDirection'+numberWord);
		document.getElementById('studentDirection'+numberWord).innerHTML = 
		"<option value='none' selected disabled hidden>Select direction</option> <option value='1'>x-axis</option> <option value='2'>y-axis</option>";
		transformDirectionElement.innerHTML += '';
		transformDirectionElement.style.display = 'block';
		document.getElementById('directionText'+numberWord).innerHTML = '.';
	};
}; // end of transformHandler


var moveOn = function() {
	// show dialog: create one if it's not present
	var dialog = document.getElementById('my-dialog');
	if (!dialog) { 
		var modal = document.querySelector('ons-modal');
		modal.show(); 
		ons.createElement('dialog.html', { append: true }).then( function() {
			modal.hide();
			moveOn();
		})
	} else{ 
		dialog = document.getElementById('my-dialog');
		// typesetting ai
		document.getElementById('aiSubmitter').style.display = 'none';
		var aiStudentA = document.getElementById('inputk').value;
		if (document.getElementById('negativeA').checked) {aiStudentA *= -1;};
		var aiStudentB = document.getElementById('inputkTwo').value;
		katex.render("A="+aiStudentA+",B="+aiStudentB, document.getElementById('answerAi'), {throwOnError:false});
		// typesetting aii
		var numberOfTransformations = Number(document.getElementById('transformNumber').value);
		var proceedFlag = true;
		var i;
		for (i=1; i<=numberOfTransformations; i++) { // iterates through transformation
			var numberWord = numberWordsArray[i-1];
			var studentTransformType = Number(document.getElementById('transformType'+numberWord).value);
			var studentTransformDirection = Number(document.getElementById('studentDirection'+numberWord).value);
			var transformString = transformArray[studentTransformType-1];
			if (studentTransformType==1) { // translate
				var studentInput = document.getElementById('inputT'+numberWord).value;
				var studentInputValid = document.getElementById('inputT'+numberWord).validity.valid;
				if (studentInputValid){
					var studentFraction = handleFractions(studentInput);
					if (studentFraction[2]==1){ // not a fraction
					transformString += studentInput;
					} else { //fraction
						transformString += "<span id='fraction"+numberWord+"'></span>";
						fractionFlag = true;
					}
				} else{
					transformString += ' (invalid input) ';
				}
				transformString += transformWordsArray[studentTransformType-1];
				transformString += transformDirectionArray[studentTransformDirection-1];
				if (!studentTransformDirection || !studentInput || !studentInputValid) {proceedFlag = false};
			} else if (studentTransformType==2) { // scale
				transformString += transformWordsArray[studentTransformType-1];
				var studentInput = document.getElementById('inputT'+numberWord).value;
				var studentInputValid = document.getElementById('inputT'+numberWord).validity.valid;
				if (studentInputValid){
					var studentFraction = handleFractions(studentInput);
					if (studentFraction[2]==1){ // not a fraction
					transformString += studentInput;
					} else { //fraction
						transformString += "<span id='fraction"+numberWord+"'></span>";
						fractionFlag = true;
					}
				} else{
					transformString += ' (invalid input) ';
				}; // end of integer/fraction strings
				transformString += transformWordsArray[studentTransformType];
				transformString += transformDirectionArray[studentTransformDirection+3];
				if (!studentTransformDirection || !studentInput) {proceedFlag = false};
			} else if (studentTransformType==3) {
				transformString += transformWordsArray[studentTransformType];
				transformString += transformDirectionArray[studentTransformDirection+5];
				if (!studentTransformDirection) {proceedFlag = false};
			} else {
				proceedFlag = false;
			} // end of string typeset
			document.getElementById('studentTransform'+numberWord).innerHTML = "Transformation "+i+":"+transformString;
			if ((studentTransformType==1 || studentTransformType==2) && fractionFlag) { // fractions detected
				katex.render(fractionBuilder(studentFraction[1],studentFraction[2]),document.getElementById('fraction'+numberWord),{throwOnError:false});
				fractionFlag = false;
			};
			if (i>1) {document.getElementById('studentTransform'+numberWord).style.display='block'};
		}; // end of loops
		// invalid input vs valid input text
		if (proceedFlag) {
			document.getElementById('aConfirmationInstructions').style.display = 'block';
			document.getElementById('invalidInput').style.display = 'none';
			document.getElementById('moveOnButton').style.display = 'block';
		} else {
			document.getElementById('aConfirmationInstructions').style.display = 'none';
			document.getElementById('invalidInput').style.display = 'block';
			document.getElementById('moveOnButton').style.display = 'none';
		};		
		// shows dialog
		dialog.show();
	} // end of if/else (dialog)
};

// passesOptionselected to answer page
var proceedTob = function() {
	var t = document.getElementById('transformNumber').value;
	var tArray = ['','1','','1','','1','','1'], tString = '';
	var i;
	var aiStudentA = document.getElementById('inputk').value;
	if (document.getElementById('negativeA').checked) {aiStudentA *= -1;};
	var aiStudentB = document.getElementById('inputkTwo').value;
	for (i=1; i<=t; i++) {
		var numberWord = numberWordsArray[i-1];
		var studentTransformType = document.getElementById('transformType'+numberWord).value;
		var studentTransformDirection = document.getElementById('studentDirection'+numberWord).value;
		tString += studentTransformType + studentTransformDirection;
		if (studentTransformType==1 || studentTransformType==2) {
			var studentInput = document.getElementById('inputT'+numberWord).value;
			var fractionArray = handleFractions(studentInput);
			if (fractionArray[2]==1) { // not a fraction
				tArray[2*i-2] = studentInput
			} else{ // a fraction
				tArray[2*i-2] = fractionArray[1];
				tArray[2*i-1] = fractionArray[2];
			};			
		};
	}
	var queriesObject = {a:a, b:b, c:c, order:order, sA:aiStudentA, sB:aiStudentB, t:tString, tOneN:tArray[0], tOneD:tArray[1], tTwoN: tArray[2], tTwoD:tArray[3], tThreeN:tArray[4], tThreeD:tArray[5], tFourN:tArray[6], tFourD:tArray[7]};
	window.location = htmlQueryConstructor('ans0301.html',queriesObject);
};