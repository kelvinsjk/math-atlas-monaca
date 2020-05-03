// This is a JavaScript file

// Our question will be of the form : f(x) = \frac{a}{x-b} and g(x) = x^2
// if b > 0, then fg does not exist but gf does
// if b < 0, we will modify the domain of g so that gf does not exist but fg does (the end pt of the domain will be e)
// we will compute fg(c)/gf(c)
// Nerdy facts: more than 5000 unique questions

// Hides and shows radio options for (ai)
var radioFlag = false, radioProceed = false;
const radioIds = ['radioZero' , 'radioOne', 'radioTwo', 'radioThree', 'radioFour', 'radioFive'];
const caretIds = ['caretZero' , 'caretOne', 'caretTwo', 'caretThree', 'caretFour', 'caretFive']; 
// Generate random Integers
var a =  getRandomNonZero(1,9), b = getRandomNonZero(1,9), c = getRandomInt(-9,9), e ='';
var fnExists = 'gf', fnDoesNotExist = 'fg', domainAdd = '';
var signArray = [' < ', ' \\leq ', ' > ', '\\geq '], sign = ''; // f used to determine sign
if (b<0) {
	fnExists = 'fg'; 
	fnDoesNotExist = 'gf';
	sign = getRandomInt(0,3); // determines sign for new domain 
	e = getRandomInt(-8,8);
	domainAdd = ', x ' + signArray[sign] + e;
	if (sign < 2) {c = getRandomInt(-9,e-1)} else{ c = getRandomInt(e+1,9)} // make sure c is in new domain of g
} else{
	while (c == b) {c = getRandomInt(-9,9)}; // c cannot be b if b>0
};

// Start to build question
var denomSign = '+'; // if b negative, denom is x+...
if (b>0) {denomSign = '-'}; // if b positive, denom is x- ...
const denominator = 'x' + denomSign + Math.abs(b);
const fraction = fractionBuilder(a, denominator);
const fx = '&f: x \\mapsto ' + fraction + '\\; &&\\textrm{for } x \\in \\mathbb{R}, x \\neq ' + b +', \\\\ ';
const gx = '&g:x \\mapsto x^2 && \\textrm{for }  x \\in \\mathbb{R}' + domainAdd + '.';

// onload insert math
window.onload = function() {
	document.querySelector('ons-modal').show();
	document.getElementById('qntext1').innerHTML = latexAlign(fx+gx);
	document.getElementById('qntext2').innerHTML =  latexifyInline(fnDoesNotExist);
	document.getElementById('qntext3').innerHTML =  latexifyInline(fnExists+'(' + c + ')');
	document.getElementById('qntext4').innerHTML =  latexifyInline(fnExists);
	// Load Math
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	MathJax.Hub.Register.MessageHook("End Math",function () {  document.querySelector('ons-modal').hide() });
};

// start answering: make tabs visible
var startAnswering = function(){
	var tabBar = document.querySelector('ons-tabbar');
	tabBar.setAttribute('hide-tabs', 'false');
	tabBar.setAttribute('position', 'top');
	tabBar.setAttribute('swipeable', 'true');
	tabBar.setActiveTab(1);
	document.getElementById('notCompositeOne').innerHTML = latexifyInline(fnDoesNotExist);
	document.getElementById('notCompositeTwo').innerHTML = latexifyInline(fnDoesNotExist);
	document.getElementById('answerButton').style.display = 'none';
	document.getElementById('goToAnswerButton').style.display = 'block';
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
};

// radio button control. Shows part (aii) first time an option is chosen
var radioClick = function(indexStr) {
	var n = Number(indexStr);
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
		document.getElementById('aii').style.display = 'block';
		radioProceed = true;
	};
	document.getElementById('compositeEval').innerHTML = latexifyInline(fnExists+'(' + c + ')');
	document.getElementById('compositeEvalTwo').innerHTML = latexifyInline(fnExists+'(' + c + ')= ');
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


// passesOptionselected to answer page
var answerQuestion = function() {
	var queryObject = {a: a, b: b, c : c, d:d, e:e, G:G, sign:sign, partAMark: partAMark}
	// var variableQueryString = '&a=' +a + '&b=' + b + '&c='+ c + '&d=' + d + '&e=' + e + '&G=' + G + '&sign=' + sign + '&';
	//window.location='tabbarpage.html?'+variableQueryString;
	window.location = htmlQueryConstructor('ans0101.html',queryObject);
};
