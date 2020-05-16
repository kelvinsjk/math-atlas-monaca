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
document.addEventListener('init', function(event) {if (event.target.matches('#qn001atab')) {
	// loading screen: show modal screen upon load // function showModal() {}
	var modal = document.querySelector('ons-modal');
	modal.show(); 
	setTimeout(function() { modal.hide();}, 500);
	document.querySelector('ons-tabbar').setActiveTab(1) // Loads both pages
	.then( // After pages loaded
		function (){
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
						document.getElementById('spancd').innerHTML = "<span id='cKatex'></span> <ons-input id='inputc' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeC' id = 'negativeC'></ons-checkbox> 	 </label> \
							<label for='negativeC' class='center'> Make <span id='cKatexTwo'></span> negative </label> \
							 <br>  <span id='dKatex'></span> <ons-input id='inputd'  type='number'> </ons-input>. \
							<label class='left'>   <ons-checkbox input-id='negativeD' id = 'negativeD'></ons-checkbox> 	 </label> \
							<label for='negativeD' class='center'> Make <span id='dKatexTwo'> </span> negative </label>";
						katex.render('c= ', document.getElementById('cKatex'),{throwOnError: false});
						katex.render('c ', document.getElementById('cKatexTwo'),{throwOnError: false});
						katex.render('d= ', document.getElementById('dKatex'),{throwOnError: false});
						katex.render('d ', document.getElementById('dKatexTwo'),{throwOnError: false});
				} else{
					document.getElementById('spancd').innerHTML = '';
				};
			});
			document.getElementById('switch4').addEventListener('change', function(e) { 
				if(e.target.checked) {
						document.getElementById('spanef').innerHTML = "<span id='eKatex'></span> <ons-input id='inpute' type='number'> </ons-input>, \
							<label class='left'>   <ons-checkbox input-id='negativeE' id = 'negativeE'></ons-checkbox> 	 </label> \
							<label for='negativeE' class='center'> Make <span id='eKatexTwo'></span> negative </label> \
							 <br>  <span id='fKatex'></span> = <ons-input id='inputf'  type='number'> </ons-input>. \
							<label class='left'>   <ons-checkbox input-id='negativeF' id = 'negativeF'></ons-checkbox> 	 </label> \
							<label for='negativeF' class='center'> Make <span id='fKatexTwo'></span> negative </label>";
						katex.render('e= ', document.getElementById('eKatex'),{throwOnError: false});
						katex.render('e ', document.getElementById('eKatexTwo'),{throwOnError: false});
						katex.render('f= ', document.getElementById('fKatex'),{throwOnError: false});
						katex.render('f ', document.getElementById('fKatexTwo'),{throwOnError: false});
				} else{
					document.getElementById('spanef').innerHTML = '';
				};
			}); 
			// End of switch code
			// Insert Math
			katex.render(katexifyDstyle(mathqn1),document.getElementById('qntext1'), {throwOnError: false});
			katex.render(mathqn2,document.getElementById('qntext2'), {throwOnError: false,displayMode:true});
			katex.render("-\\frac{5}{2}",document.getElementById('fractionExample'), {throwOnError: false});
			katex.render("-2.5", document.getElementById('decimalExample'),{throwOnError: false});
			katex.render("x < a", document.getElementById('xLess'),{throwOnError: false});
			katex.render("x > b", document.getElementById('xMore'),{throwOnError: false});
			katex.render("c < x < d", document.getElementById('betweenOne'),{throwOnError: false});
			katex.render("e < x < f", document.getElementById('betweenTwo'),{throwOnError: false});
	})
}},false); // End of window.onload
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
	previewSpace.innerHTML = "Your answer: <div id='answerPreviewKatex'> </div>";
	katex.render('\\boxed{ ' +answerPreviewFinal + '}', answerPreviewKatex, {throwOnError:false, displayMode:true});
	previewSpace.style.display = 'block';
	if (proceedFlag) {document.getElementById('finalSubmission').style.display = 'block' 
	} else {document.getElementById('finalSubmission').style.display = 'none'};
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
};