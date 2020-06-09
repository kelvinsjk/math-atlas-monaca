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
var Fraction = /** @class */ (function () {
    function Fraction(f) {
        var fracIndex = f.indexOf('/'), decIndex = f.indexOf('.');
        if (fracIndex > 0) { // we disallow inputs to start from / in our input box, so only need to check from index 1
            var negNum = void 0;
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
            var answer = handleDecimal(f);
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
    return Fraction;
}());
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
function polyBuilderY(coefficientArray, x) {
    if (x === void 0) {
        x = 'x';
    }
    if (coefficientArray.length == 1) {
        return coefficientArray[0].toString();
    }
    ; // 
    if (coefficientArray[0] == 0) {
        return polyBuilderY(coefficientArray.slice(1), x);
    }
    ;
    var n = coefficientArray.length - 1;
    var firstCoefficient = coefficientArray.shift();
    var latexPolynomial;
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
                latexPolynomial += a;
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

// Section F ---  Change query to Object
var parseQueryY = function (queryString) {
    var query = {};
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