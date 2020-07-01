// This is a JavaScript file
// Refer to Math Bounty documentation math-bounty.readthedocs.io for the latest question commentary. Topic 8: question 0801
// global variables
let a, b, c, d;
let studentInputA, studentInputB, studentInputK;
let sA, sB, sK;
// onPageLoad: Algebra
let onPageLoad = function () {
    const binomialString = "(a+b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\binom{n}{3}a^{n-3}b^3 + \\ldots + b^n,";
    katex.render(binomialString, document.getElementById('binomial'), { throwOnError: false, displayMode: true });
    katex.render("n", document.getElementById('n'), { throwOnError: false });
    katex.render(" \\displaystyle \\binom{n}{r} = \\frac{n!}{r!(n-r)!}", document.getElementById('nCr'), { throwOnError: false });
    katex.render("f(x) = f(0) + xf'(0) + \\frac{x^2}{2!}f''(0)+\\ldots + \\frac{x^n}{n!}f^{(n)}(0) + \\ldots", document.getElementById('fx'), { throwOnError: false, displayMode: true });
    katex.render("(1+x)^n = 1 + nx + \\frac{n(n-1)}{x^2}+\\ldots + \\frac{n(n-1)\\ldots(n-r+1)}{r!}x^r + \\ldots", document.getElementById('binomial_m'), { throwOnError: false, displayMode: true });
    katex.render("\\mathrm{e}^x = 1 + x + \\frac{x^2}{2!}+ \\frac{x^3}{3!} + \\ldots + \\frac{x^{r} }{r!} + \\ldots", document.getElementById('exp'), { throwOnError: false, displayMode: true });
    katex.render("\\sin x = x - \\frac{x^3}{3!}+ \\frac{x^5}{5!} - \\ldots + \\frac{(-1)^r x^{2r+1} }{(2r+1)!} + \\ldots", document.getElementById('sin'), { throwOnError: false, displayMode: true });
    katex.render("\\cos x = 1 - \\frac{x^2}{2!}+ \\frac{x^4}{4!} - \\ldots + \\frac{(-1)^{r+1} x^{2r} }{(2r)!} + \\ldots", document.getElementById('cos'), { throwOnError: false, displayMode: true });
    katex.render("\\ln (1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\ldots + \\frac{(-1)^{r+1} x^{r} }{r} + \\ldots", document.getElementById('ln'), { throwOnError: false, displayMode: true });
    katex.render("\\Big ( |x| < 1 \\Big )", document.getElementById('domain_b'), { throwOnError: false, displayMode: true });
    katex.render("(\\textrm{all } x)", document.getElementById('domain_e'), { throwOnError: false, displayMode: true });
    katex.render("(\\textrm{all } x)", document.getElementById('domain_s'), { throwOnError: false, displayMode: true });
    katex.render("(\\textrm{all } x)", document.getElementById('domain_c'), { throwOnError: false, displayMode: true });
    katex.render("(-1 < x \\leq 1)", document.getElementById('domain_l'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{px+q}{(ax+b)(cx+d)} = \\frac{A}{(ax+b)} + \\frac{B}{(cx+d)}", document.getElementById('linear'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{px^2+qx+r}{(ax+b)(cx+d)^2} = \\frac{A}{(ax+b)} + \\frac{B}{(cx+d)} + \\frac{C}{(cx+d)^2}", document.getElementById('repeated'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{px^2+qx+r}{(ax+b)(x^2+c^2)} = \\frac{A}{(ax+b)} + \\frac{Bx+C}{(x^2+c^2)}", document.getElementById('quadratic'), { throwOnError: false, displayMode: true });
    // Start Trigo
    tryTrigo();
};
let tryTrigo = function () {
    try {
        setTimeout(function () { trigo() }, 500);
    }
    catch (err) {
        console.log(err.message);
        tryTrigo;
    }
};
let trigo = function () {
    katex.render("\\sin(A \\pm B) \\equiv \\sin A \\cos B \\pm \\cos A \\sin B", document.getElementById('sin_add'), { throwOnError: false, displayMode: true });
    katex.render("\\cos(A \\pm B) \\equiv \\cos A \\cos B \\mp \\sin A \\sin B", document.getElementById('cos_add'), { throwOnError: false, displayMode: true });
    katex.render("\\tan(A \\pm B) \\equiv \\frac{\\tan A  \\pm \\tan B}{1 \\mp \\tan A \\tan B}", document.getElementById('tan_add'), { throwOnError: false, displayMode: true });
    katex.render("\\sin 2A \\equiv 2 \\sin A \\cos A", document.getElementById('sin_double'), { throwOnError: false, displayMode: true });
    katex.render("\\cos 2A \\equiv \\cos^2 A - \\sin^2 A \\equiv 2 \\cos^2 A - 1 \\equiv 1 - 2 \\sin^2 A", document.getElementById('cos_double'), { throwOnError: false, displayMode: true });
    katex.render("\\tan 2A \\equiv \\frac{2 \\tan A}{1-\\tan^2 A}", document.getElementById('tan_double'), { throwOnError: false, displayMode: true });
    katex.render("\\sin P + \\sin Q \\equiv 2 \\sin {\\textstyle \\frac{1}{2}} (P+Q) \\cos {\\textstyle \\frac{1}{2}} (P-Q)", document.getElementById('factor_one'), { throwOnError: false, displayMode: true });
    katex.render("\\sin P - \\sin Q \\equiv 2 \\cos {\\textstyle \\frac{1}{2}} (P+Q) \\sin {\\textstyle \\frac{1}{2}} (P-Q)", document.getElementById('factor_two'), { throwOnError: false, displayMode: true });
    katex.render("\\cos P + \\cos Q \\equiv 2 \\cos {\\textstyle \\frac{1}{2}} (P+Q) \\cos {\\textstyle \\frac{1}{2}} (P-Q)", document.getElementById('factor_three'), { throwOnError: false, displayMode: true });
    katex.render("\\cos P - \\cos Q \\equiv -2 \\sin {\\textstyle \\frac{1}{2}} (P+Q) \\sin {\\textstyle \\frac{1}{2}} (P-Q)", document.getElementById('factor_four'), { throwOnError: false, displayMode: true });
    katex.render("{\\textstyle -\\frac{1}{2}} \\pi \\leq \\sin^{-1} x \\leq {\\textstyle \\frac{1}{2}}\\pi", document.getElementById('arc_sin'), { throwOnError: false, displayMode: true });
    katex.render("0 \\leq \\cos^{-1} x \\leq \\pi", document.getElementById('arc_cos'), { throwOnError: false, displayMode: true });
    katex.render("{\\textstyle -\\frac{1}{2}} \\pi < \\tan^{-1} x < {\\textstyle \\frac{1}{2}}\\pi", document.getElementById('arc_tan'), { throwOnError: false, displayMode: true });
    katex.render("( |x| \\leq 1 )", document.getElementById('domain_arc_sin'), { throwOnError: false, displayMode: true });
    katex.render("( |x| \\leq 1 )", document.getElementById('domain_arc_cos'), { throwOnError: false, displayMode: true });
    // Start Calculus
    tryCalculus();
};
let tryCalculus = function () {
    try {
        calculus();
    }
    catch (err) {
        console.log(err.message);
        setTimeout(function () { tryCalculus() }, 500);
    }
};
let calculus = function () {
    // differentiation
    katex.render("f(x)", document.getElementById('fx_d'), { throwOnError: false, displayMode: true });
    katex.render("f'(x)", document.getElementById('f_prime'), { throwOnError: false, displayMode: true });
    katex.render("\\sin^{-1} x", document.getElementById('arc_sin_d'), { throwOnError: false, displayMode: true });
    katex.render("\\cos^{-1} x", document.getElementById('arc_cos_d'), { throwOnError: false, displayMode: true });
    katex.render("\\tan^{-1} x", document.getElementById('arc_tan_d'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{\\sqrt{1-x^2}}", document.getElementById('f_prime_s'), { throwOnError: false, displayMode: true });
    katex.render("-\\frac{1}{\\sqrt{1-x^2}}", document.getElementById('f_prime_c'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{1+x^2}", document.getElementById('f_prime_t'), { throwOnError: false, displayMode: true });
    katex.render("-\\cosec x \\cot x", document.getElementById('f_prime_cosec'), { throwOnError: false, displayMode: true });
    katex.render("-\\sec x \\tan x", document.getElementById('f_prime_sec'), { throwOnError: false, displayMode: true });
    katex.render("\\sec x", document.getElementById('sec'), { throwOnError: false, displayMode: true });
    katex.render("\\cosec x", document.getElementById('cosec'), { throwOnError: false, displayMode: true });
    // integration
    katex.render("f(x)", document.getElementById('fx_i'), { throwOnError: false, displayMode: true });
    katex.render("\\int f(x) \\; \\mathrm{d}x", document.getElementById('int_fx'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{x^2+a^2}", document.getElementById('x2_plus'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{\\sqrt{a^2-x^2}}", document.getElementById('sqrt_a2'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{x^2-a^2}", document.getElementById('x2_minus'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{a^2-x^2}", document.getElementById('a2_minus'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{a} \\tan^{-1} \\left ( \\frac{x}{a} \\right)", document.getElementById('arc_tan_i'), { throwOnError: false, displayMode: true });
    katex.render("\\sin^{-1} \\left (\\frac{x}{a} \\right)", document.getElementById('arc_sin_i'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{2a} \\ln \\left (\\frac{x-a}{x+a} \\right)", document.getElementById('ln_x'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{2a} \\ln \\left (\\frac{a+x}{a-x} \\right)", document.getElementById('ln_a'), { throwOnError: false, displayMode: true });
    katex.render("(|x| < a )", document.getElementById('domain_arc_sin_i'), { throwOnError: false, displayMode: true });
    katex.render("(x > a )", document.getElementById('domain_x2_minus'), { throwOnError: false, displayMode: true });
    katex.render("(|x| < a )", document.getElementById('domain_a2_minus'), { throwOnError: false, displayMode: true });
    katex.render("\\tan x", document.getElementById('tan_i'), { throwOnError: false, displayMode: true });
    katex.render("\\cot x", document.getElementById('cot_i'), { throwOnError: false, displayMode: true });
    katex.render("\\cosec x", document.getElementById('cosec_i'), { throwOnError: false, displayMode: true });
    katex.render("\\sec x", document.getElementById('sec_i'), { throwOnError: false, displayMode: true });
    katex.render("\\ln (\\sec x)", document.getElementById('ln_sec'), { throwOnError: false, displayMode: true });
    katex.render("\\ln (\\sin x)", document.getElementById('ln_sin'), { throwOnError: false, displayMode: true });
    katex.render("-\\ln (\\cosec x+ \\cot x)", document.getElementById('ln_cosec'), { throwOnError: false, displayMode: true });
    katex.render("\\ln (\\sec x + \\tan x)", document.getElementById('ln_sec_tan'), { throwOnError: false, displayMode: true });
    katex.render("(|x| < {\\textstyle \\frac{1}{2}} \\pi )", document.getElementById('domain_tan_i'), { throwOnError: false, displayMode: true });
    katex.render("(0 < x < \\pi)", document.getElementById('domain_cot_i'), { throwOnError: false, displayMode: true });
    katex.render("(0 < x < \\pi)", document.getElementById('domain_cosec_i'), { throwOnError: false, displayMode: true });
    katex.render("(|x| < {\\textstyle \\frac{1}{2}} \\pi )", document.getElementById('domain_sec_i'), { throwOnError: false, displayMode: true });
    // Start Stats
    tryStats();
};
let tryStats = function () {
    try {
        stats();
    }
    catch (err) {
        console.log(err.message);
        setTimeout(function () { tryStats() }, 250);
    }
};
let stats = function () {
    katex.render("X", document.getElementById('X'), { throwOnError: false });
    katex.render("P(X=x)", document.getElementById('pdf'), { throwOnError: false, displayMode: true });
    katex.render("\\textrm{B}(n,p)", document.getElementById('binom_stats'), { throwOnError: false });
    katex.render("\\textrm{Po}(\\lambda)", document.getElementById('po_stats'), { throwOnError: false });
    katex.render("\\textrm{Geo}(p)", document.getElementById('geom_stats'), { throwOnError: false });
    katex.render("\\binom{n}{x} p^x (1-p)^{n-x}", document.getElementById('binom_pdf'), { throwOnError: false, displayMode: true });
    katex.render("\\mathrm{e}^{-\\lambda} \\frac{\\lambda^x}{x!}", document.getElementById('po_pdf'), { throwOnError: false, displayMode: true });
    katex.render("(1-p)^{x-1} p", document.getElementById('geom_pdf'), { throwOnError: false, displayMode: true });
    katex.render("np", document.getElementById('binom_mu'), { throwOnError: false, displayMode: true });
    katex.render("\\lambda", document.getElementById('po_mu'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{p}", document.getElementById('geom_mu'), { throwOnError: false, displayMode: true });
    katex.render("np(1-p)", document.getElementById('binom_var'), { throwOnError: false, displayMode: true });
    katex.render("\\lambda", document.getElementById('po_var'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1-p}{p^2}", document.getElementById('geom_var'), { throwOnError: false, displayMode: true });
    // continuous
    katex.render("X", document.getElementById('X_two'), { throwOnError: false });
    katex.render("\\lambda \\mathrm{e}^{-\\lambda x}", document.getElementById('exp_pdf'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{\\lambda}", document.getElementById('exp_mu'), { throwOnError: false, displayMode: true });
    katex.render("\\frac{1}{\\lambda^2}", document.getElementById('exp_var'), { throwOnError: false, displayMode: true });
    // sampling
    katex.render("s^2 = \\frac{n}{n-1} \\left ( \\frac{\\sum (x- \\overline{x})^2}{n} \\right ) = \\frac{1}{n-1} \\left ( \\sum x^2 - \\frac{ (\\sum x)^2}{n} \\right )", document.getElementById('s2'), { throwOnError: false, displayMode: true });
    katex.render("s^2 = \\frac{\\sum (x_1 - \\overline{x}_1)^2 + \\sum (x_2 - \\overline{x}_2)^2}{n_1 + n_2 - 2}", document.getElementById('s2_two'), { throwOnError: false, displayMode: true });
    // regression
    const num = "\\sum xy - \\frac{\\sum x \\sum y}{n}";
    let den = "\\left ( \\sum x^2 - \\frac{ (\\sum x)^2}{n} \\right )";
    den += "\\left ( \\sum y^2 - \\frac{ (\\sum y)^2}{n} \\right )";
    const r = "\\frac{" + num + "}{ \\sqrt{" + den + "}}";
    katex.render("r = \\frac{\\sum (x - \\overline{x})(y - \\overline{y})}{\\sqrt{ \{ \\sum (x - \\overline{x})^2 \} \{ \\sum (y - \\overline{y})^2 \} }}=" + r, document.getElementById('r'), { throwOnError: false, displayMode: true });
    katex.render("y", document.getElementById('y'), { throwOnError: false });
    katex.render("x", document.getElementById('x'), { throwOnError: false });
    katex.render("y-\\overline{y} = b(x-\\overline{x}), \\quad \\textrm{where } b = \\frac{\\sum (x-\\overline{x})(y-\\overline{y})}{\\sum (x-\\overline{x})^2}", document.getElementById('regression'), { throwOnError: false, displayMode: true });
    tryOthers();
};
let tryOthers = function () {
    try {
        others();
    }
    catch (err) {
        console.log(err.message);
        setTimeout(function () { tryOthers }, 250);
    }
};
let others = function () {
    katex.render("AB", document.getElementById('AB'), { throwOnError: false });
    katex.render("\\lambda : \\mu", document.getElementById('lambda'), { throwOnError: false });
    katex.render("\\displaystyle \\frac{\\mu \\mathbf{a} + \\lambda \\mathbf{b}}{\\lambda + \\mu}", document.getElementById('ratio_theorem'), { throwOnError: false });
    const crossProductOne = "\\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix} \\times \\begin{pmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{pmatrix} =";
    const crossProductTwo = "\\begin{pmatrix} a_2 b_3 - a_3 b_2 \\\\ a_3 b_1 - a_1 b_3 \\\\ a_1 b_2 - a_2 b_1 \\end{pmatrix}";
    katex.render("\\displaystyle \\mathbf{a} \\times \\mathbf{b} =" + crossProductOne + crossProductTwo, document.getElementById('a_cross_b'), { throwOnError: false, displayMode: true });
    katex.render("\\displaystyle \\int_a^b f(x) \\mathrm{d}x \\approx {\\textstyle \\frac{1}{2}}(b-a) \\Big [ f(a) + f(b) \\Big ]", document.getElementById('trap_rule'), { throwOnError: false, displayMode: true });
    katex.render("\\displaystyle \\int_a^b f(x) \\mathrm{d}x \\approx {\\textstyle \\frac{1}{6}}(b-a) \\left [ f(a) + 4f \\left ( \\frac{a+b}{2} \\right ) + f(b) \\right ]", document.getElementById('simpsons_rule'), { throwOnError: false, displayMode: true });
    katex.render("f(x)=0", document.getElementById('fx_equals_zero'), { throwOnError: false });
    katex.render("x_2 = x_1 - \\frac{f(x_1)}{f'(x_1)},", document.getElementById('x2_equals_x1'), { throwOnError: false, displayMode: true });
    katex.render("x_1", document.getElementById('x1'), { throwOnError: false });
    katex.render("h", document.getElementById('h'), { throwOnError: false });
    katex.render("y_2 = y_1 + hf(x_1, y_1)", document.getElementById('y2_equals_y1'), { throwOnError: false, displayMode: true });
    katex.render("h", document.getElementById('h_two'), { throwOnError: false });
    katex.render("u_2 = y_1 + hf(x_1, y_1)", document.getElementById('u2_equals_y1'), { throwOnError: false, displayMode: true });
    katex.render("y_2 = y_1 + \\frac{h}{2} \\big [ f(x_1, y_1) + f(x_2,u_2) \\big ]", document.getElementById('y2_equals_y1_two'), { throwOnError: false, displayMode: true });
};
