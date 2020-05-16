// This is a JavaScript file

// Our question will be of the form : \frac{(x-c) (dx-e) } {(x-a)(x-b)} sign 0
// which will be converted to \frac{Ax^2 + Bx + C}{Dx^2 + Ex + F} - G
// Solve  \frac{Ax^2 + Bx + C}{Dx^2 + Ex + F} sign  G
// Nerdy fact: more than 90,000 unique questions

// Generate random Integers
var a =  getRandomInt(-9,9), b = getRandomInt(-5,5), c = getRandomInt(-7,7), d = getRandomInt(1,2), e = getRandomInt(-7,7), g = getRandomInt(-7,7), G = getRandomInt(1,3);
var sign = getRandomInt(1,2); // 1: >, 2: <
var partAMark = 1;
// Make sure integers work as expected
if (d == 2 && e%2 == 0) {e += 1}; // make sure simplest form
while (b == a) {var b = getRandomInt(-3,3)}; // ensure no duplicate b
while (c==a || c == b) {var c = getRandomInt(-5,5) }; // ensure no duplicate c
if (d == 1) { // Danger of repeating roots
	while ( e==a || e == b || e == c ) {
		var e = getRandomInt(-3,3);
	}; // ensure no duplicate e
};
// Start to build question
var A = d+G, B=-c*d-e-G*a-G*b, C=G*a*b+e*c;
var denominator = polyBuilder([1, -a-b, a*b]);
// var numerator = polyBuilder([d, -c*d-e, e*c]);
var numerator = polyBuilder([d, '+k', e*c]);
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
	var signstr = '>'
} else {
	var signstr = '<'
};
var mathqn1 = fraction  + '-' +G+ '=' + fractionBuilder(numerator, denominator) + '.';
var mathqn2 = fraction + signstr + G + '.';
//Initialize Math
document.addEventListener('init', function(event) {
	if (event.target.matches('#questionPage')) {
		katex.render(katexifyDstyle(mathqn1), document.getElementById('qntext1'), {throwOnError: false});
		katex.render("k? \\; k= ", document.getElementById('typeK'),{throwOnError:false,});
	}
}, false);
// check answer to part a
var checkK = function() {
	hideAlertDialog('my-alert-dialog');
	document.getElementById('samsungWarning').style.display = 'none';
	var actualK = -c*d-e;
	// show new Dialog
	ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
			dialog.show();
			if (k != actualK) {
				partAMark = 0;
				document.getElementById('rightOrWrong').innerHTML = "Unfortunately, <span id='studentK'> </span> is incorrect <br>";
				document.getElementById('marksReceived').innerHTML = 'Do check your answer to see if you can spot any mistakes.'
				katex.render("k="+k, document.getElementById('studentK'), {throwOnError:false});
			}
			katex.render("k="+actualK, document.getElementById('kAnswer'), {throwOnError: false});
      });
};
// proceeds to b
var proceedTob = function() {
	// hides Dialog and hides part a interaction
	hideDialog('my-dialog')
	document.getElementById('qna').style.display = 'none'; 
	// generate new Math
	var numerator = polyBuilder([d, -c*d-e, e*c]);
	var mathqn1 = fraction  + '-' +G+ '=' + fractionBuilder(numerator, denominator) + '.';
	// show and update items
	// document.getElementById('qntext1').innerHTML = latexifyDstyle(mathqn1);
	katex.render(katexifyDstyle(mathqn1), document.getElementById('qntext1'), {throwOnError: false});
	katex.render(mathqn2, document.getElementById('qntext2'), {throwOnError: false,	displayMode: true});
	document.getElementById('partb').style.display = 'block';
	document.getElementById('answerButton').style.display = 'block';
	document.getElementById('questionOrPart').innerHTML = 'question';
	document.getElementById('marksOnDisplay').innerHTML = '1+4';
};
// passesOptionselected to answer page
var answerQuestion = function() {
	var queryObject = {a: a, b: b, c : c, d:d, e:e, G:G, sign:sign, partAMark: partAMark}
	// var variableQueryString = '&a=' +a + '&b=' + b + '&c='+ c + '&d=' + d + '&e=' + e + '&G=' + G + '&sign=' + sign + '&';
	//window.location='tabbarpage.html?'+variableQueryString;
	window.location = htmlQueryConstructor('ans0101.html',queryObject);
};