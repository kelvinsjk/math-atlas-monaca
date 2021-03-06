// This is a Typescript file
// handleDecimal: adds a leading zero for decimal numbers of the type .5 and -.5
function handleDecimal(b) {
    if (b[0] == '.') {
        return '0' + b;
    }
    else if (b.substring(0, 2) == '-.') {
        return '-0.' + b.substring(2);
    }
    else {
        return b;
    }
}
// fraction object class
class Fraction {
    constructor(f) {
        let fracIndex = f.indexOf('/'), decIndex = f.indexOf('.');
        if (fracIndex > 0) { // we disallow inputs to start from / in our input box, so only need to check from index 1
            let negNum;
            if (f[0] == '-') {
                this.sign = '-';
                this.num = Number(f.slice(1, fracIndex));
                negNum = -1;
            }
            else {
                this.sign = '';
                this.num = Number(f.slice(0, fracIndex));
                negNum = 1;
            }
            this.den = Number(f.slice(fracIndex + 1));
            this.float = negNum * this.num / this.den;
            this.typeOf = 'f';
        }
        else { // not a fraction
            let answer = handleDecimal(f);
            if (decIndex >= 0) {
                this.typeOf = 'd';
            }
            else {
                this.typeOf = 'i';
            }
            if (answer[0] == '-') {
                this.sign = '-';
                this.num = Number(answer.slice(1));
                this.den = 1;
                this.float = Number(answer);
            }
            else {
                this.sign = '';
                this.num = Number(answer);
                this.den = 1;
                this.float = Number(answer);
            }
        }
        ;
        if (this.typeOf == 'f') {
            this.typeset = this.sign + '\\frac{' + this.num + '}{' + this.den + '}';
        }
        else {
            this.typeset = this.sign + this.num;
        }
    }
    // methods
    simplify() {
        if (this.typeOf == 'f') { // only simplify fraction types
            let gcd = gcdY(this.num, this.den);
            if (gcd != 1 || this.den == 1) { // we can further simplify
                this.num = this.num / gcd;
                this.den = this.den / gcd;
                if (this.den == 1) { // no longer a fraction
                    this.typeOf = 'i';
                    this.typeset = this.sign + this.num.toString();
                }
                else { //typeset new fraction
                    this.typeset = this.sign + '\\frac{' + this.num + '}{' + this.den + '}';
                }
            }
        }
    }
}
// B1) get Random Int
function getRandomIntY(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// B2) get non-zero Random Int
function getRandomNonZeroY(min, max) {
    var b = 0;
    while (b == 0) {
        b = getRandomIntY(min, max);
    }
    if (Math.random() > .5) {
        return b;
    }
    else {
        return -b;
    }
}
// Section F ---  Change query to Object
var parseQueryY = function (queryString) {
    let query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};
// A1) XOR
function myXORY(a, b) {
    return (a || b) && !(a && b);
}
// B3) GCD
function gcdY(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
        var temp = a;
        a = b;
        b = temp;
    }
    while (true) {
        if (b == 0)
            return a;
        a %= b;
        if (a == 0)
            return b;
        b %= a;
    }
}
// B4) fraction simplifier: returns an array with simplified numerator and denominator. 
// two negatives are cancelled and one negative is always hoisted to the numerator
function simplifyFractionY(num, den) {
    var gcD = gcdY(num, den);
    if (myXORY(num > 0, den > 0)) {
        return [-Math.abs(num) / gcD, Math.abs(den / gcD)];
    }
    else {
        return [Math.abs(num) / gcD, Math.abs(den / gcD)];
    }
    ;
}
// B5) Add two fractions: fOne and fTwo are 2-element arrays consisting of their numerators and denominators
function addFractionsY(fOne, fTwo) {
    var a = fOne[0], b = fOne[1], c = fTwo[0], d = fTwo[1];
    return simplifyFractionY(a * d + b * c, b * d);
}
// Student input class
class StudentInput {
    constructor(typeOf, iD, varName = '', submitButton = '') {
        this.typeOf = typeOf;
        this.iD = iD;
        this.varName = varName;
        this.otherInput = [];
        this.otherRadio = [];
        this.submitButton = submitButton;
        this.inputID = 'input' + varName.toUpperCase();
        this.katexID = varName + 'Equals';
        this.validity = false; // initialized as false as input not received yet
        this.value = null; // initialized as false as input not received yet
        this.negativeID = ''; // only writes for 'i' case 
        this.samsungWarningText = ''; // only writes the warning if we have typeOf 'i'
        this.fractionInstructions = ''; // only writes the instruction if we have typeOf 'fX'
        this.fractionID = ''; // only writes the instruction if we have typeOf 'fX'
        this.decimalID = ''; // only writes the instruction if we have typeOf 'fX'
        let innerHTML = "<span id='" + this.katexID + "'></span>";
        if (typeOf[0] == 'i') {
            innerHTML += "<input id='" + this.inputID + "' type='number'></input>";
            if (typeOf == 'i') { // negative allowed
                let checkboxID = 'negative' + varName.toUpperCase();
                innerHTML += "<label class='left'><ons-checkbox input-id='" + checkboxID + "' id='" + checkboxID + "'></ons-checkbox></label><label for='" + checkboxID + "' class='center'>Make negative</label>";
                this.samsungWarningText = '<p> Some Samsung devices may be unable to key in negative values. A check box is provided to modify the sign of your input. </p> <p> You can ignore the checkbox if you are able to key in negative values </p>';
                this.negativeID = checkboxID;
            }
        }
        else { // fraction type
            this.fractionID = 'fractionExample' + varName.toUpperCase();
            this.decimalID = 'decimalExample' + varName.toUpperCase();
            this.fractionInstructions = "<ons-list-header>Instructions:<br>Key in your numerical answer(s).<br>For fractions like <span id='" + this.fractionID + "'></span>, key in <span id='" + this.decimalID + "'></span></ons-list-header>";
            if (typeOf == 'f') { // allow negative
                innerHTML += "<input id='" + this.inputID + "' pattern='(\\d+|(?=.+\\.)\\d+\\.\\d{1,5}|(?=\\.)\\.\\d+|(?=.+/)\\d+/\\d{1,5})|[\\-](\\d+|(?=.+\\.)\\d+\\.\\d{1,5}|(?=\\.)\\.\\d{1,5}|(?=.+/)\\d+/\\d+)' class='fraction'></input>";
            }
            else {
                innerHTML += "<input id='" + this.inputID + "' pattern='(\\d+|(?=.+\\.)\\d+\\.\\d{1,5}|(?=\\.)\\.\\d+|(?=.+/)\\d+/\\d{1,5})' class='fraction'></input>";
            }
        }
        ;
        this.innerHTML = innerHTML;
    } // end of constructor
    // methods
    addToDOM() {
        document.getElementById(this.iD).innerHTML = this.innerHTML;
        katex.render(this.varName + '=', document.getElementById(this.katexID), { throwOnError: false });
        let input_field = document.getElementById(this.inputID);
        if (this.typeOf[0] == 'f') { // prevents spaces
            input_field.addEventListener('textInput', function (e) {
                var char = e.data;
                var keyCode = char.charCodeAt(0);
                // Stop processing if spacebar is pressed
                if (keyCode == 32) {
                    e.preventDefault();
                    return false;
                }
                return true;
            }); // end of spacebar prevention
        } // end of fraction if/else
        if (this.submitButton) { // add event listener to show submit button
            let self = this;
            input_field.addEventListener('input', function () {
                let validityArray = [self.updateValidity()];
                self.otherInput.forEach(e => {
                    validityArray.push(e.validity);
                });
                self.otherRadio.forEach(e => {
                    validityArray.push(e.selected);
                });
                if (validityArray.every(e => e)) {
                    document.getElementById(self.submitButton).style.display = 'block';
                }
                else {
                    document.getElementById(self.submitButton).style.display = 'none';
                }
            });
        }
    }
    updateValidity() {
        let inputElement = document.getElementById(this.inputID);
        let validityCheck = true; // if integer, no need to check validity
        if (this.typeOf[0] == 'f') {
            validityCheck = inputElement.validity.valid;
        }
        ;
        if (inputElement.value && validityCheck) { // valid
            this.validity = true;
            if (this.typeOf[0] == 'f') { // fraction
                this.value = new Fraction(inputElement.value);
                return true;
            } // else integer 
            if (this.typeOf == 'i') { // potential negative
                let negativeCheckbox = document.getElementById(this.negativeID);
                if (negativeCheckbox.checked) {
                    this.value = Number(inputElement.value) * -1;
                    return true;
                }
            } // else positive integer
            this.value = Number(inputElement.value);
            return true;
        }
        else { // not valid
            this.validity = false;
            this.value = null;
            return false;
        }
    }
    insertFractionHeader(onsListID) {
        if (this.typeOf[0] == 'f') {
            let minusSign = '';
            if (this.typeOf == 'f') {
                minusSign = '-';
            }
            ;
            document.getElementById(onsListID).innerHTML += this.fractionInstructions;
            katex.render(minusSign + "\\frac{22}{7}", document.getElementById(this.fractionID), { throwOnError: false });
            katex.render(minusSign + "22/7", document.getElementById(this.decimalID), { throwOnError: false });
        }
    }
    set linkInput(s) {
        this.otherInput.push(s);
        s.otherInput.push(this);
    }
    set linkRadio(r) {
        this.otherRadio.push(r);
        r.otherInput.push(this);
    }
}
// lcm
function lcmY(a, b) {
    return (!a || !b) ? 0 : Math.abs((a * b) / gcdY(a, b));
}
// Student input class
class StudentRadio {
    constructor(optionsArray, iD, name = '', submitButton = '') {
        let innerHTML = "<ons-list>";
        let numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
        let index;
        for (index = 0; index < optionsArray.length; index++) {
            let divString = "<div id='radio" + name + numberWords[index] + "'>";
            divString += "<ons-list-item tappable style='background: rgb(0,0,0,0.07);'>";
            divString += "<label class='left'>";
            divString += "<ons-radio name='reason" + name + "' input-id='radio" + name + "-" + index + "' value='" + index + "' onclick='studentRadio" + name + ".click(this.value)'></ons-radio>";
            divString += "</label>";
            divString += "<label for='radio" + name + "-" + index + "' class='center'>";
            divString += "<span id='reason" + name + numberWords[index] + "'></span>";
            divString += "<span id='caret" + name + numberWords[index] + "' style='padding-left:10px; display:none'>";
            divString += "<ons-icon icon='fa-caret-down'></ons-icon>";
            divString += "</span></label></ons-list-item></div>";
            innerHTML += divString;
        }
        ;
        innerHTML += "</ons-list>";
        this.iD = iD;
        this.name = name;
        this.optionsArray = optionsArray;
        this.innerHTML = innerHTML;
        this.selected = false; // no options selected by default
        this.otherInput = [];
        this.otherRadio = [];
        this.submitButton = submitButton;
        this.option = -1;
    } // end of constructor
    // methods
    addToDOM() {
        document.getElementById(this.iD).innerHTML = this.innerHTML;
        let numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
        this.optionsArray.forEach((str, index) => {
            let reasonID = "reason" + this.name + numberWords[index];
            katex.render(str, document.getElementById(reasonID), { throwOnError: false });
        });
    }
    click(indexString) {
        let iD = Number(indexString);
        let numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'], index;
        let radioIds = [], caretIds = [];
        for (index = 0; index < this.optionsArray.length; index++) {
            radioIds.push("radio" + this.name + numberWords[index]);
            caretIds.push("caret" + this.name + numberWords[index]);
        }
        if (this.selected) { // option already selected: show all for reselection. Hide caret
            radioIds.forEach(function (radioString) {
                document.getElementById(radioString).style.display = 'block';
            });
            document.getElementById(caretIds[iD]).style.display = 'none';
            this.selected = false;
        }
        else { // hide all but selection. Show caret
            radioIds.forEach(function (radioString, i) {
                if (i != iD) {
                    document.getElementById(radioString).style.display = 'none';
                }
                ;
            });
            document.getElementById(caretIds[iD]).style.display = 'inline';
            this.selected = true;
        }
        ;
        this.option = iD;
        // check for display of submit button
        if (this.submitButton) {
            let validityArray = [this.selected];
            this.otherInput.forEach(e => {
                validityArray.push(e.validity);
            });
            this.otherRadio.forEach(e => {
                validityArray.push(e.selected);
            });
            if (validityArray.every(e => e)) {
                document.getElementById(this.submitButton).style.display = 'block';
            }
            else {
                document.getElementById(this.submitButton).style.display = 'none';
            }
        }
    }
    set linkInput(s) {
        this.otherInput.push(s);
        s.otherRadio.push(this);
    }
    set linkRadio(r) {
        this.otherRadio.push(r);
        r.otherRadio.push(this);
    }
}
// surdSimplifier: given n, we will return [a, b] such that sqrt{n} = a sqrt{b}
function surdSimplifier(n, a = 1) {
    if (n % 4 == 0) { // test if divisible by 2^2
        return surdSimplifier(n / 4, 2 * a);
    }
    let i;
    for (i = 1; i <= Math.floor((Math.floor(Math.sqrt(n)) - 1) / 2); i++) {
        let k = 2 * i + 1; // only need to test odd divisors afterwards
        if (n % (k * k) == 0) {
            return surdSimplifier(n / k / k, k * a);
        }
    }
    return [a, n];
}
// surdTypeset: given a \\sqrt{b} in the form [a,b] typeset an expression: "a" if b = 1, "sqrt(b)" if a = 1, "a sqrt(b)" otherwise
function surdTypeset(arr) {
    if (arr[0] == 1 || arr[1] == 1) { // special cases
        if (arr[0] == 1 && arr[1] == 1) { // 1 sqrt (1) = 1
            return "1";
        }
        else if (arr[0] == 1) { // 1 sqrt (b)
            return "\\sqrt{" + arr[1] + "}";
        }
        else { // a sqrt (1)
            return arr[0].toString();
        }
    }
    else { // a sqrt(b)
        return arr[0] + "\\sqrt{" + arr[1] + "}";
    }
}
function isSimplified(f) {
    if (f.den == 1) { // decimal or integer: simplified
        return true;
    }
    else if (gcdY(f.num, f.den) == 1) { // fraction: need to check num and den
        return true;
    }
    return false;
}
// queryTripleToFraction: given (Sign, Num, Den), convert to Fraction class
function queryTripleToFraction(sign, num, den) {
    if (den == '1') {
        return new Fraction(sign + num);
    }
    else {
        return new Fraction(sign + num + "/" + den);
    }
}
// MarkFraction: given two fractions, check if they are the same/off by signs/correct to 2sf
class MarkFraction {
    constructor(f1, f2) {
        this.correct = false;
        this.upToSimplified = false;
        this.upToSign = false;
        this.close = false;
        this.partial = false;
        // check if close
        if (f1.float.toPrecision(2) == f2.float.toPrecision(2)) {
            this.close = true;
        }
        if ((Math.abs(f1.float)).toPrecision(11) == (Math.abs(f2.float)).toPrecision(11)) { // check if accuracy is good (up to sign)
            this.upToSign = true;
            if (f1.float * f2.float >= 0) { // check if same sign (or 0)
                this.upToSimplified = true;
                if (isSimplified(f1) && isSimplified(f2)) {
                    this.correct = true;
                }
            }
        }
        this.partial = this.upToSign || this.upToSimplified || this.close;
    }
}
function simpson_step(f, a, b) {
    return (b - a) / 8 * (f(a) + 3 * f((2 * a + b) / 3) + 3 * f((a + 2 * b) / 3) + f(b));
}
function simpson(f, a, b, n) {
    let simpson_step = function (f, a, b) {
        return (b - a) / 8 * (f(a) + 3 * f((2 * a + b) / 3) + 3 * f((a + 2 * b) / 3) + f(b));
    };
    let result = 0, stepSize = (b - a) / n;
    let i;
    for (i = 0; i < n; i++) {
        result += simpson_step(f, a + i * stepSize, a + (i + 1) * stepSize);
    }
    return result;
}

// factors: given a non-zero integer n, return an array [[a1,b1], [a2,b2], ...] such that a_k*b_k = n
function factors(n1) {
    const n = Math.abs(n1);
    let i = 2, factorList = [[1, n]];
    for (i; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % i == 0) {
            factorList.push([i, n / i]);
        }
    }
    return factorList;
}
// ijk: given three numbers/strings a,b,c, typeset ai+bj+ck, where we handle the potential problems of 0s,1s and negative/positive numbers
function ijk(a, b, c, i = "\\mathbf{i}", j = "\\mathbf{j}", k = "\\mathbf{k}") {
    let leadingCoefficient = true, ijkString = '';
    if (a != 0) { // leading coefficient is a: typeset ai
        leadingCoefficient = false; // be careful when typesetting j and k
        if (a == 1) { // typeset just i
            ijkString = i;
        }
        else if (a == -1) { // typeset just -i
            ijkString = '-'+i;
        }
        else {
            ijkString = a + i;
        }
    }
    if (b != 0) { // need to typeset b
        if (leadingCoefficient || b < 0 || b.toString()[0] === '-') { // can just typeset bj
            if (b == 1) { // typeset just j
                ijkString += j;
            }
            else if (b == -1) { // typeset just -j
                ijkString += '-'+j;
            }
            else {
                ijkString += b + j;
            }
        }
        else {
            ijkString += "+";
            if (b == 1) { // typeset just j
                ijkString += j;
            }
            else {
                ijkString += b + j;
            }
        }
        leadingCoefficient = false; // be careful when typesetting j and k
    }
    if (c != 0) { // need to typeset c
        if (leadingCoefficient || c < 0 || c.toString()[0] === '-') { // can just typeset ck
            if (c == 1) { // typeset just k
                ijkString += k;
            }
            else if (c == -1) { // typeset just -k
                ijkString += '-' + k;
            }
            else {
                ijkString += c + k;
            }
        }
        else {
            ijkString += "+";
            if (c == 1) { // typeset just k
                ijkString += k;
            }
            else {
                ijkString += c + k;
            }
        }
    }
    return ijkString;
}
// count zeroes: given an array of numbers, count how many zeroes there are
function countZeroes(arr) {
    let count = 0;
    arr.forEach(e => {
        if (e === 0) {
            count++;
        }
    });
    return count;
}
// check parallel: given two arrays arr1 = [a1,a2,a3], arr2 = [b1,b2,b3] and a number k, check if arr1 = k arr2 for some k \neq 0
function isParallel(arr1, arr2) {
    let k;
    const a1 = arr1[0], a2 = arr1[1], a3 = arr1[2];
    const b1 = arr2[0], b2 = arr2[1], b3 = arr2[2];
    // find a multiple k by locating ai,bi both non-zero.
    if (a1 != 0 && b1 != 0) {
        k = b1 / a1;
    }
    else if (a2 != 0 && b2 != 0) {
        k = b2 / a2;
    }
    else if (a3 != 0 && b3 != 0) {
        k = b3 / a3;
    }
    else {
        return false;
    }
    // check if k works for all 3 components
    if ((a1 * k).toFixed(11) == b1.toFixed(11) && (a2 * k).toFixed(11) == b2.toFixed(11) && (a3 * k).toFixed(11) == b3.toFixed(11)) {
        return true;
    }
    else {
        return false;
    }
}
// dot product
function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
// cross product
function crossProduct(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
// column vector
function cVec(a, b, c) {
    return "\\begin{pmatrix}" + a + "\\\\" + b + "\\\\" + c + "\\end{pmatrix}";
}
// multiply fractions
function multiplyFractions(a, b) {
    // determine new sign
    let sign = '';
    if (a.float * b.float < 0) {
        sign = '-';
    }
    let num = a.num * b.num, den = a.den * b.den;
    let newFrac = new Fraction(sign + num + "/" + den);
    newFrac.simplify();
    return newFrac;
}
// add fractions
function addFractions(a, b) {
    let den = a.den * b.den;
    let signedNum = Number(a.sign + a.num) * b.den + a.den * Number(b.sign + b.num);
    let sign = '';
    if (signedNum < 0) {
        sign = '-';
    }
    ;
    let num = Math.abs(signedNum);
    let newFrac = new Fraction(sign + num + "/" + den);
    newFrac.simplify();
    return newFrac;
}

// String methods:
// parenthesisAdd
function parenthesisAdd(str) { return '(' + str + ')'; }

// SquareY: takes a string. If string of length 1, append ^2. Else add parenthesis around it and append ^2
function squareY(str) {
    if (str.length == 1) {
        return str + '^2';
    }
    else {
        return '(' + str + ')^2';
    }
}
// parenthesisY: if string of length 1, return string, else add parenthesis to it
function parenthesisY(str) {
    if (str.length == 1) {
        return str;
    }
    else {
        return parenthesisAdd(str);
    }
}
// Fraction builder: Given numerator and denominator, form \frac{num}{den}
function fractionBuilderY(num, den) {
    return '\\frac{' + num + '}{' + den + '}';
}
//D5) Polynomial builder: Given coefficientArray [a_n, a_(n-1), ... a_0], form a_n x^n + a_(n-1) x^(n-1) + ... + a_0
// second argument allows for variables other than x
function polyBuilderY(coefficientArray, x = 'x') {
    if (coefficientArray.length == 1) {
        return coefficientArray[0].toString();
    }
    ; // 
    if (coefficientArray[0] == 0) {
        return polyBuilderY(coefficientArray.slice(1), x);
    }
    ;
    let n = coefficientArray.length - 1;
    let firstCoefficient = coefficientArray.shift();
    let latexPolynomial;
    if (firstCoefficient == 1) {
        latexPolynomial = '';
    }
    else {
        if (firstCoefficient == -1) {
            latexPolynomial = '-';
        }
        else { // Neither 0 nor 1 nor -1
            latexPolynomial = firstCoefficient;
        }
    }
    ; //testing of first coefficient
    latexPolynomial += x; // Assume at least 2 elements
    if (n > 1) {
        latexPolynomial += '^{' + n + '}';
    }
    ; // powers needed if bigger than 1
    coefficientArray.forEach(function (a) {
        n -= 1;
        if (a == 0) { // don't do anything: skip iteration
        }
        else {
            if (typeof a === 'string') { // coefficient is a string
                if (a[0] == '-') {
                    latexPolynomial += a;
                }
                else {
                    latexPolynomial += '+' + a;
                }
            }
            else { // coefficient is a number
                if (a > 0) { // positive a
                    if (a == 1 && n != 0) {
                        latexPolynomial += '+'; // special case for coefficient of 1
                    }
                    else {
                        latexPolynomial += '+' + a; // need a + sign 
                    }
                    ;
                }
                else { // a < 0
                    if (a == -1 && n != 0) {
                        latexPolynomial += '-'; // special case for coefficient of -1
                    }
                    else {
                        latexPolynomial += a.toString(); // the negative sign is already in the coefficient
                    } // end of normal (not -1) negative coefficient	
                }
                ; // end of negative coefficient
            }
            ; // end of typesetting coefficient
            if (n > 0) {
                latexPolynomial += x; // add x 
                if (n > 1) {
                    latexPolynomial += '^{' + n + '}'; // add power of x
                }
            }
        }
    });
    return latexPolynomial;
}