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
// B3) GCD
function gcd(a,b) {
	a = Math.abs(a);
	b = Math.abs(b);
	if (b > a) {var temp = a; a = b; b = temp;}
	while (true) {
		if (b == 0) return a;
		a %= b;
		if (a == 0) return b;
		b %= a;
	}
}
// B4) fraction simplifier: returns an array with simplified numerator and denominator. 
// two negatives are cancelled and one negative is always hoisted to the numerator
function simplifyFraction(num, den) {
	var gcD = gcd(num,den)
	if (myXOR(num > 0, den>0)) {return [-Math.abs(num)/gcD, Math.abs(den/gcD)]} else{return [Math.abs(num)/gcD, Math.abs(den/gcD)]};
}
// B5) Add two fractions
function addFractions(fOne, fTwo) { //fOne and fTwo are both two-element arrays: they should be parsed through simplifyFraction if necessary
	var a = fOne[0], b = fOne[1], c = fTwo[0], d = fTwo[1];
	return simplifyFraction(a*d+b*c,b*d)
}


// Section C -- Relevant Website Scripts
// C1) Handle decimal inputs: in particular, convert .5 and -.5 to 0.5 and -0.5
function handleDecimal(b) {
	if (b[0]=='.') {return '0'+b;}  
		else if (b.substring(0,2)=='-.') {return '-0.' + b.substring(2);}
			else {return b}
}
// C2) Handle fractions: return an array with 4 elements:
// 1st (str): '-' if answer negative, '' if positive
// 2nd (str): numerator (absolute value)
// 3rd (str): denominator (='1' for integers and decimals) (absolute value)
// 4th (float): actual number
function handleFractions(f) {
	var fracIndex = f.indexOf('/');
	if (fracIndex > 0) { // we disallow inputs to start from / in our input box, so only need to check from index 1
		if (f[0] == '-') {var num = f.slice(1,fracIndex), negStr = '-', negNum = -1;} else {var num=f.slice(0,fracIndex), negStr='', negNum = 1;};
		var den = f.slice(fracIndex+1), ansFloat = negNum * Number(num) / Number(den);
		return [negStr, num, den, ansFloat];
	} else { // not a fraction
		answer = handleDecimal(f);
		if (answer[0]=='-') {return ['-', answer.slice(1), '1', Number(answer)];} else {return ['', answer, '1', Number(answer)];};
	};
}

// C3) Check student's input
// WARNING: To be used only with "alert-dialog.html" template
// WARNING: student's input will always be ID-ed 'inputk'
var checkStudentInput = function(varName) {
	k = document.getElementById('inputk').value; // Remarks: must be global
	if (!k) {
		var showText =  'It appears that the input is blank or invalid (not a number). Try again!', titleText = 'Error', visiText = 'hidden';
	} else {
		if (document.getElementById('negativeK').checked) {k = -k};
		var showText = "You have keyed in <span id='kConfirm'> </span>. Submit this answer?", titleText = 'Confirmation', visiText = 'visible';
	};
  var dialog = document.getElementById('my-alert-dialog');
  if (dialog) { // it's already present
		document.getElementById('confirmationK').innerHTML = showText;
		document.getElementById('alertTitle').innerHTML = titleText;
		document.getElementById('okButton').style.visibility = visiText;
		dialog.show();
		if (k) { katex.render(varName+"="+k,document.getElementById('kConfirm'),{throwOnError: false});};
	} else {
    ons.createElement('alert-dialog.html', { append: true })
      .then(function(dialog) {
		document.getElementById('confirmationK').innerHTML = showText;
		document.getElementById('alertTitle').innerHTML = titleText;
		document.getElementById('okButton').style.visibility = visiText;
        dialog.show();
		if (k) { katex.render(varName+"="+k,document.getElementById('kConfirm'),{throwOnError: false});};
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
// D1) Displaystyle 
function katexifyDstyle(str) {return '\\displaystyle ' +str;}
// D2) Aligned
function katexAlign(str) {return '\\begin{aligned}' + str + '\\end{aligned}'}
// D3) Boxed
function katexBoxed(str) {return '\\boxed{' +str+ '}'}
// D4) Add parenthesis
function addParenthesis(str) {return '('+str+')'}
// SquareX: takes a string. If string of length 1, append ^2. Else add parenthesis around it and append ^2
function squareX(str) { if (str.length == 1) { return str + '^2';} else { return '(' + str + ')^2'} };
// parenthesisX: if string of length 1, return string, else add parenthesis to it
function parenthesisX(str) { if (str.length == 1) { return str;} else {	return addParenthesis(str) } };

//D5) Polynomial builder: Given coefficientArray [a_n, a_(n-1), ... a_0], form a_n x^n + a_(n-1) x^(n-1) + ... + a_0
// second argument allows for variables other than x
function polyBuilder(coefficientArray, x = 'x') { // WARNING: coefficientArray Must have at least 1 element
	if (coefficientArray.length == 1) { return coefficientArray[0].toString(); }; // 
	if (coefficientArray[0] == 0) { return polyBuilder(coefficientArray.slice(1),x) };
	var n = coefficientArray.length - 1;
	var firstCoefficient = coefficientArray.shift();
	if (firstCoefficient == 1) {
		var latexPolynomial = ''
	} else {
		if (firstCoefficient == -1) {
			var latexPolynomial = '-'
		} else { // Neither 0 nor 1 nor -1
			var latexPolynomial = firstCoefficient
		}
	}; //testing of first coefficient
	latexPolynomial += x; // Assume at least 2 elements
	if (n > 1) { latexPolynomial += '^{' + n + '}' }; // powers needed if bigger than 1
	coefficientArray.forEach(a => {
		n -= 1;
		if (a == 0) { // don't do anything: skip iteration
		} else {
			if (typeof a === 'string') { // coefficient is a string
				latexPolynomial += a;
			} else { // coefficient is a number
				if (a > 0) { // positive a
					if (a == 1 && n != 0) {
						latexPolynomial += '+'; // special case for coefficient of 1
					} else {
						latexPolynomial += '+' + a; // need a + sign 
					};
				} else {// a < 0
					if (a == -1 && n != 0) {
						latexPolynomial += '-' // special case for coefficient of -1
					} else {
						latexPolynomial += a // the negative sign is already in the coefficient
					} // end of normal (not -1) negative coefficient	
				}; // end of negative coefficient
			}; // end of typesetting coefficient
			if (n > 0) {
				latexPolynomial += x; // add x 
				if (n > 1) {
					latexPolynomial += '^{' + n + '}' // add power of x
				}
			}
		}
	});
	return latexPolynomial
};

//D5_OLD) Polynomial builder: Given coefficientArray [a_n, a_(n-1), ... a_0], form a_n x^n + a_(n-1) x^(n-1) + ... + a_0
function polyBuilderLegacy(coefficientArray,x='x') { // WARNING: coefficientArray Must have at least 2 elements!
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
	latexPolynomial += x; // Assume at least 2 elements
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
				latexPolynomial += x; // add x 
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
// D7) (Negative) Fraction Typeset: Take a array with two elements and return latex string
function fractionTypeset(fractionArray) {
	var num = fractionArray[0], den = fractionArray[1];
	var fractionString = ''
	if (myXOR(num > 0, den>0)) {var fractionString='-';}
	return fractionString + fractionBuilder(Math.abs(num), Math.abs(den));
}