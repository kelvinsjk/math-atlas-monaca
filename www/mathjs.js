// This is a JavaScript file

// Section A -- Relevant Logical Scripts
// A1) XOR
function myXOR(a,b) {
	return ( a || b ) && !( a && b );
}

// A2) Randomize array in-place using Durstenfeld shuffle algorithm 
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Section B -- Relevant Math Scripts
// B1) get Random Int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// B2) get non-zero Random Int
function getRandomNonZero(min,max){
	var b = 0;
	while (b==0) {b = getRandomInt(min,max)};
	if (Math.random()>.5) {return b} else {return -b};
}

// Section C -- Relevant Website Scripts
// C1) Handle decimal inputs: in particular, convert .5 and -.5 to 0.5 and -0.5
function handleDecimal(b) {
	if (b[0]=='.') {return '0'+b;}  
		else if (b.substring(0,2)=='-.') {return '-0.' + b.substring(2);}
			else {return b}
}
// C2) Check student's input
// WARNING: To be used only with "alert-dialog.html" template
// WARNING: student's input will always be ID-ed 'inputk'
var checkStudentInput = function(varName) {
	k = document.getElementById('inputk').value;
	if (!k) {
		var showText =  'It appears that the  input is   blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
	} else {
		if (document.getElementById('negativeK').checked) {k = -k};
		var showText = 'You have keyed in $' +varName+ ' =' + k +' $. Submit this answer?', titleText = 'Confirmation', visiText = 'visible';
	};
  	var dialog = document.getElementById('my-alert-dialog');
  	if (dialog) { // it's already present
	  	document.getElementById('confirmationK').innerHTML = showText;
		document.getElementById('alertTitle').innerHTML = titleText;
		document.getElementById('okButton').style.visibility = visiText;
    	dialog.show();
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  	} else {
    ons.createElement('alert-dialog.html', { append: true })
      .then(function(dialog) {
		document.getElementById('confirmationK').innerHTML = showText;
		document.getElementById('alertTitle').innerHTML = titleText;
		document.getElementById('okButton').style.visibility = visiText;
        dialog.show();
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      });
  };	
};
// C3) MCQ Randomizer: given an array of possible options and the index of the correct answer, 
// return an array: 
// first element is a randomly shuffled array with requiredOptions number of options (including the correct answer)
// second element is the Index of the correct answer
// WARNING: requiredOptions should be less than array length
var mcqPicker = function(array, requiredOptions, correctIndex) {
	const correctOption = array.splice(correctIndex, 1)[0];
	shuffleArray(array);
	newArray = array.slice(0,requiredOptions-1);
	const a = getRandomInt(0,requiredOptions-1);
	newArray.splice(a,0,correctOption);
	return [newArray,a];
}

//Section D --  Relevant Latex Scripts
// D1) Inline Latex
function latexifyInline(str) {return '$'+str+'$';}
// D2) Inline Latex (displaystyle)
function latexifyDstyle(str) {return '$\\displaystyle '+str+'$';}
// D3) Displayed Latex
function latexifyDenv(str) {return '$$'+str+'$$';}
// D4) Align
function latexAlign(str) {return '\\begin{align}' + str + '\\end{align}'}
//D5) Polynomial builder: Given coefficientArray [a_n, a_(n-1), ... a_0], form a_n x^n + a_(n-1) x^(n-1) + ... + a_0
function polyBuilder(coefficientArray) { // WARNING: Must have at least 2 elements!
	if (coefficientArray[0] == 0) {return 'ERROR: Leading coefficient cannot be 0'};
	var n = coefficientArray.length - 1;
	var firstCoefficient = coefficientArray.shift();
	if (firstCoefficient == 1) {
		var latexPolynomial = ''
	} else {
		if (firstCoefficient == -1) {
			var latexPolynomial = '-'
		} else{ // Neither 0 nor 1 nor -1
			var latexPolynomial = firstCoefficient
		}
	}; //testing of first coefficient
	latexPolynomial  += 'x' // Assume at least 2 elements
	if (n>1) {latexPolynomial += '^{' + n+ '}'}; // powers needed if bigger than 1
	coefficientArray.forEach( a => {
		n -= 1;
		if (a==0) { // don't do anything: skip iteration
		} else {
			if (typeof a === 'string'){ // coefficient is a string
				latexPolynomial += a;
			} else{ // coefficient is a number
				if (a>0) { // positive a
					if (a==1 && n != 0) {
						latexPolynomial += '+'; // special case for coefficient of 1
						} else{
							latexPolynomial += '+'+ a; // need a + sign 
						};
				} else {// a < 0
					if (a==-1 && n != 0) {
						latexPolynomial += '-' // special case for coefficient of -1
					} else{
						latexPolynomial += a // the negative sign is already in the coefficient
					} // end of normal (not -1) negative coefficient	
				}; // end of negative coefficient
			}; // end of typesetting coefficient
			if (n>0) {
				latexPolynomial += 'x' // add x 
				if (n>1) {
					latexPolynomial += '^{' +n+ '}' // add power of x
				}
			}
		}
	});
	return latexPolynomial
};
// D6) Fraction builder: Given numerator and denominator, form \frac{num}{den}
function fractionBuilder(num, den) {
	return '\\frac{' +num + '}{' +den + '}';
}