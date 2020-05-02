// This is a JavaScript file

//  Query: Add only if needed
var queriesObject = parseQuery( window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), c=Number(queriesObject.c), d=Number(queriesObject.d), e = Number(queriesObject.e);
var G = Number(queriesObject.G), sign = queriesObject.sign;

// Global variables
var sOne, sTwo, sThree, sFour, aOne, bOne, cThree, dThree, eFour, fFour;

// Math calculations and building latex
var A = d+G, B=-c*d-e-G*a-G*b, C=G*a*b+e*c, d2 = e/d;
var rootsArray = [a, b, c, d2];
rootsArray.sort( function(a,b) {return a-b});
var root1 = rootsArray[0], root2 = rootsArray[1], root3 = rootsArray[2], root4 = rootsArray[3]; 
var denominator = polyBuilder([1, -a-b, a*b]);
var numerator = polyBuilder([d, -c*d-e, e*c]);
if (A == 0) {
	if (B==0) {
		var numerator2 = 'C'
	} else {
		var numerator2 = polyBuilder([B,C])
	}
} else {
	var numerator2 = polyBuilder([A,B,C])
}
var fraction = fractionBuilder( numerator2 , denominator);
if (sign == 1) {
	var signstr = '>', mathans1 = 'x < ' +root1, mathans2 = root2 + ' < x < ' + root3 , mathans3 = 'x > ' +root4;
} else {
	var signstr = '<', mathans1 = root1 + ' < x < ' +root2, mathans2 = root3 +'< x < ' +root4;
};
var mathqn1 = fraction  + '-' +G+ '=' + fractionBuilder(numerator, denominator) + '.';
var mathqn2 = fraction + signstr + G + '.';

// things that need id
window.onload = function() {
	// loading screen: show modal screen upon load // function showModal() {}
	document.querySelector('ons-modal').show(); 	//setTimeout(function() { modal.hide();}, 400);
	document.querySelector('ons-tabbar').setActiveTab(1) // Loads both pages
	.then( // After pages loaded
		function (){
			// Listen to switch changing
			document.getElementById('switch1').addEventListener('change', function(e) { 
				if(e.target.checked) {
						document.getElementById('spana').innerHTML = "$a$ = <ons-input id='inputa' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeA' id = 'negativeA'></ons-checkbox> 	 </label> \
							<label for='negativeA' class='center'> Make $a$ negative </label>";
						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				} else{
					document.getElementById('spana').innerHTML = '';
				};
			});
			document.getElementById('switch2').addEventListener('change', function(e) { 
				if(e.target.checked) {
						document.getElementById('spanb').innerHTML = "$b$ = <ons-input id='inputb' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeB' id = 'negativeB'></ons-checkbox> 	 </label> \
							<label for='negativeB' class='center'> Make $b$ negative </label>";
						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				} else{
					document.getElementById('spanb').innerHTML = '';
				};
			});
			document.getElementById('switch3').addEventListener('change', function(e) { 
				if(e.target.checked) {
						document.getElementById('spancd').innerHTML = "$c$ = <ons-input id='inputc' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeC' id = 'negativeC'></ons-checkbox> 	 </label> \
							<label for='negativeC' class='center'> Make $c$ negative </label> \
							 <br>  $d$ = <ons-input id='inputd'  type='number'> </ons-input>. \
							<label class='left'>   <ons-checkbox input-id='negativeD' id = 'negativeD'></ons-checkbox> 	 </label> \
							<label for='negativeD' class='center'> Make $d$ negative </label>";
						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				} else{
					document.getElementById('spancd').innerHTML = '';
				};
			});
			document.getElementById('switch4').addEventListener('change', function(e) { 
				if(e.target.checked) {
						document.getElementById('spanef').innerHTML = "$e$ = <ons-input id='inpute' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeE' id = 'negativeE'></ons-checkbox> 	 </label> \
							<label for='negativeE' class='center'> Make $e$ negative </label> \
							 <br>  $f$ = <ons-input id='inputf'  type='number'> </ons-input>. \
							<label class='left'>   <ons-checkbox input-id='negativeF' id = 'negativeF'></ons-checkbox> 	 </label> \
							<label for='negativeF' class='center'> Make $f$ negative </label>";
						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				} else{
					document.getElementById('spanef').innerHTML = '';
				};
			}); 
			// End of switch code
			// Insert Math
			 document.getElementById('qntext1').innerHTML = latexifyDstyle(mathqn1);
			document.getElementById('qntext2').innerHTML = latexifyDenv(mathqn2);
	})
	.then( // Typeset Math
			function() {
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	})
	.then( // Remove loading screen
		function(){
			MathJax.Hub.Register.StartupHook("End",function () {  document.querySelector('ons-modal').hide() });
	});	
}; // End of window.onload

// preview Answer
var previewAnswer = function () {
	// switches
	sOne = document.getElementById('switch1').checked;
	sTwo = document.getElementById('switch2').checked;
	sThree = document.getElementById('switch3').checked;
	sFour = document.getElementById('switch4').checked;
	var switchStatusArray = [sOne, sTwo, sThree, sFour];
	// set up necessary arrays
	var answerQueryArray = ['', '', '', '', '', ''], answerArray = [];
	var inputNamesArray = ['inputa', 'inputb','inputd','inputf', 'inputc', 'inpute']; // Modified order since loop later  will access end element first, then first element
	var negativeNamesArray = ['negativeA', 'negativeB','negativeD','negativeF', 'negativeC', 'negativeE']; // Modified order since loop later  will access end element first, then first element
	var xIneqArray = [' x  < ', ' x > ', ' < x < ', ' < x < '];
	// set up preview
	var previewSpace = document.getElementById('mathans2'), answerPreviewArray = [];
	// check for no options. Return if nothing done
	if (!switchStatusArray.some(function(e) {return e})) {previewSpace.innerHTML = 'You have not selected any options. Try again.'; previewSpace.style.display ='block'; return };
	// iterates switches, get input values
	switchStatusArray.forEach(function(switchStatus, i) {
		if (switchStatus) {
			var b = handleDecimal(document.getElementById(inputNamesArray[i]).value);
			if (document.getElementById(negativeNamesArray[i]).checked && !(b === '')) {b *= -1};
			answerArray.push(b);
			answerQueryArray[i] = b;
			if (i > 1 ) {
				var a = handleDecimal(document.getElementById(inputNamesArray[i+2]).value);
				if (document.getElementById(negativeNamesArray[i+2]).checked && !(a === '')) {a *= -1};
				answerArray.push(a);
			} else { var a = ''};
			answerPreviewArray.push(a+xIneqArray[i]+b );
			answerQueryArray[i+2] = a;
		} // end of if/else
	}); // end of switch iteration
	// detect if we have invalid input
	if (answerArray.some( e => e === '' ) ) { // invalid input
		var errorText =  'It appears that some inputs are either  blank or invalid (not a number). \
			Check what you have keyed in and remove any unwanted inequalities using the toggle on the right.';
		var proceedFlag = false;
		document.getElementById('mathans3').style.display = 'block';
		document.getElementById('mathans3').innerHTML = errorText;
		} else{ // valid input
			var proceedFlag = true;
			document.getElementById('mathans3').style.display = 'none';
		}
	// preview answer
	if (answerPreviewArray.length == 1) { // 1 answer
		var answerPreviewFinal = answerPreviewArray[0];
	} else {
		if (answerPreviewArray.length == 2) { // 2 answers
			var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\textrm{ or } \\; ' + answerPreviewArray[1];
		} else { 
			if (answerPreviewArray.length == 3) { // 3 answers
			var answerPreviewFinal = answerPreviewArray[0] + ' \\; , \\; ' + answerPreviewArray[1] + ' \\; \\textrm{ or } \\; ' + answerPreviewArray[2];
			} else { // 4 answers
				var answerPreviewFinal = answerPreviewArray[0] + ' \\; , \\; ' + answerPreviewArray[1] + ' \\; , \\; ' + answerPreviewArray[2];
				answerPreviewFinal +=  ' \\; \\textrm{ or } \\; ' + answerPreviewArray[3];
			};
		};
	};
	// show answer preview + submit button if valid
	previewSpace.innerHTML = 'Your answer:' + latexifyDenv('\\boxed{ ' + answerPreviewFinal + ' } ');
	previewSpace.style.display = 'block';
	if (proceedFlag) {document.getElementById('finalSubmission').style.display = 'block' 
	} else {document.getElementById('finalSubmission').style.display = 'none'};
	// typeset math
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
};

// submit answer: pass our required options to soln page
var submitAnswer = function() {
	// switches
	sOne = document.getElementById('switch1').checked;
	sTwo = document.getElementById('switch2').checked;
	sThree = document.getElementById('switch3').checked;
	sFour = document.getElementById('switch4').checked;
	var switchStatusArray = [sOne, sTwo, sThree, sFour];
	// set up necessary arrays
	var answerQueryArray = ['', '', '', '', '', ''], answerArray = [];
	var inputNamesArray = ['inputa', 'inputb','inputd','inputf', 'inputc', 'inpute']; // Modified order since loop later  will access end element first, then first element
	var negativeNamesArray = ['negativeA', 'negativeB','negativeD','negativeF', 'negativeC', 'negativeE']; // Modified order since loop later  will access end element first, then first element
	var xIneqArray = [' x  < ', ' x > ', ' < x < ', ' < x < '];
	// set up preview
	var previewSpace = document.getElementById('mathans2'), answerPreviewArray = [];
	// check for no options. Return if nothing done
	if (!switchStatusArray.some(function(e) {return e})) {previewSpace.innerHTML = 'You have not selected any options. Try again.'; return };
	// iterates switches, get input values
	switchStatusArray.forEach(function(switchStatus, i) {
		if (switchStatus) {
			var b = handleDecimal(document.getElementById(inputNamesArray[i]).value); 
			if (document.getElementById(negativeNamesArray[i]).checked && !(b === '')) {b *= -1};
			answerArray.push(b)
			answerQueryArray[i] = b;
			if (i > 1 ) {
				var a = handleDecimal(document.getElementById(inputNamesArray[i+2]).value); 
				if (document.getElementById(negativeNamesArray[i+2]).checked && !(a === '')) {a *= -1};
				answerArray.push(a);
			} else { var a = ''};
			answerPreviewArray.push(a+xIneqArray[i]+b );
			answerQueryArray[i+2] = a;
		} // end of if/else
	}); // end of switch iteration
	// detect if we have invalid input
	if (answerArray.some( e => e === '' ) ) { // invalid input
		var errorText =  'It appears that some inputs are either  blank or invalid (not a number). \
			Check what you have keyed in and remove any unwanted inequalities using the toggle on the right.';
		var proceedFlag = false;
		document.getElementById('mathans3').style.display = 'block';
		document.getElementById('mathans3').innerHTML = errorText;
	} else{ // valid input
		var proceedFlag = true;
		document.getElementById('mathans3').style.display = 'none';
	}
	if (proceedFlag) {	
		aOne = answerQueryArray[0];
		bTwo = answerQueryArray[1];
		dThree = answerQueryArray[2];
		fFour = answerQueryArray[3];
		cThree = answerQueryArray[4];
		eFour = answerQueryArray[5];
		queriesObject.aone = aOne;
		queriesObject.btwo = bTwo;
		queriesObject.cthree = cThree;
		queriesObject.dthree = dThree;
		queriesObject.efour = eFour;
		queriesObject.ffour = fFour;
		queriesObject.sone = sOne;
		queriesObject.stwo = sTwo;
		queriesObject.sthree = sThree;
		queriesObject.sfour = sFour;
		window.location = htmlQueryConstructor('soln0101.html',queriesObject);
	}
	else {return }
}

