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
// Student input class
var StudentInput = /** @class */ (function () {
    function StudentInput(typeOf, iD, varName, submitButton) {
        if (varName === void 0) { varName = ''; }
        if (submitButton === void 0) { submitButton = ''; }
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
        var innerHTML = "<span id='" + this.katexID + "'></span>";
        if (typeOf[0] == 'i') {
            innerHTML += "<input id='" + this.inputID + "' type='number'></input>";
            if (typeOf == 'i') { // negative allowed
                var checkboxID = 'negative' + varName.toUpperCase();
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
    StudentInput.prototype.addToDOM = function () {
        document.getElementById(this.iD).innerHTML = this.innerHTML;
        katex.render(this.varName + '=', document.getElementById(this.katexID), { throwOnError: false });
        var input_field = document.getElementById(this.inputID);
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
            var self_1 = this;
            input_field.addEventListener('input', function () {
                var validityArray = [self_1.updateValidity()];
                self_1.otherInput.forEach(function (e) {
                    validityArray.push(e.validity);
                });
                self_1.otherRadio.forEach(function (e) {
                    validityArray.push(e.selected);
                });
                if (validityArray.every(function (e) { return e; })) {
                    document.getElementById(self_1.submitButton).style.display = 'block';
                }
                else {
                    document.getElementById(self_1.submitButton).style.display = 'none';
                }
            });
        }
    };
    StudentInput.prototype.updateValidity = function () {
        var inputElement = document.getElementById(this.inputID);
        var validityCheck = true; // if integer, no need to check validity
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
                var negativeCheckbox = document.getElementById(this.negativeID);
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
    };
    StudentInput.prototype.insertFractionHeader = function (onsListID) {
        if (this.typeOf[0] == 'f') {
            var minusSign = '';
            if (this.typeOf == 'f') {
                minusSign = '-';
            }
            ;
            document.getElementById(onsListID).innerHTML += this.fractionInstructions;
            katex.render(minusSign + "\\frac{22}{7}", document.getElementById(this.fractionID), { throwOnError: false });
            katex.render(minusSign + "22/7", document.getElementById(this.decimalID), { throwOnError: false });
        }
    };
    Object.defineProperty(StudentInput.prototype, "linkInput", {
        set: function (s) {
            this.otherInput.push(s);
            s.otherInput.push(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentInput.prototype, "linkRadio", {
        set: function (r) {
            this.otherRadio.push(r);
            r.otherInput.push(this);
        },
        enumerable: true,
        configurable: true
    });
    return StudentInput;
}());
// lcm
function lcmY(a, b) {
    return (!a || !b) ? 0 : Math.abs((a * b) / gcdY(a, b));
}
// Student input class
var StudentRadio = /** @class */ (function () {
    function StudentRadio(optionsArray, iD, name, submitButton) {
        if (name === void 0) { name = ''; }
        if (submitButton === void 0) { submitButton = ''; }
        var innerHTML = "<ons-list>";
        var numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
        var index;
        for (index = 0; index < optionsArray.length; index++) {
            var divString = "<div id='radio" + name + numberWords[index] + "'>";
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
    StudentRadio.prototype.addToDOM = function () {
        var _this = this;
        document.getElementById(this.iD).innerHTML = this.innerHTML;
        var numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
        this.optionsArray.forEach(function (str, index) {
            var reasonID = "reason" + _this.name + numberWords[index];
            katex.render(str, document.getElementById(reasonID), { throwOnError: false });
        });
    };
    StudentRadio.prototype.click = function (indexString) {
        var iD = Number(indexString);
        var numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'], index;
        var radioIds = [], caretIds = [];
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
            var validityArray_1 = [this.selected];
            this.otherInput.forEach(function (e) {
                validityArray_1.push(e.validity);
            });
            this.otherRadio.forEach(function (e) {
                validityArray_1.push(e.selected);
            });
            if (validityArray_1.every(function (e) { return e; })) {
                document.getElementById(this.submitButton).style.display = 'block';
            }
            else {
                document.getElementById(this.submitButton).style.display = 'none';
            }
        }
    };
    Object.defineProperty(StudentRadio.prototype, "linkInput", {
        set: function (s) {
            this.otherInput.push(s);
            s.otherRadio.push(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentRadio.prototype, "linkRadio", {
        set: function (r) {
            this.otherRadio.push(r);
            r.otherRadio.push(this);
        },
        enumerable: true,
        configurable: true
    });
    return StudentRadio;
}());