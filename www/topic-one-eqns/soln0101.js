// This is a JavaScript file

//  Query: Add only if needed
var queriesObject = parseQuery( window.location.search);
var a = Number(queriesObject.a), b = Number(queriesObject.b), c=Number(queriesObject.c), d=Number(queriesObject.d), e = Number(queriesObject.e),
	G = Number(queriesObject.G), sign = queriesObject.sign, aOne = queriesObject.aone, 	bTwo = queriesObject.btwo, cThree = queriesObject.cthree,
	dThree = queriesObject.dthree, eFour = queriesObject.efour, fFour = queriesObject.ffour, sOne = queriesObject.sone == "true", 
	sTwo = 	queriesObject.stwo == "true", 	sThree = queriesObject.sthree == "true", sFour = 	queriesObject.sfour == "true", 
	partAMark = queriesObject.partAMark;
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
	var finalans = mathans1 +', \\; ' +mathans2 + ' \\; \\textrm{  or } \\;' + mathans3;
} else {
	var signstr = '<', mathans1 = root1 + ' < x < ' +root2, mathans2 = root3 +'< x < ' +root4;
	var finalans = mathans1 + ' \\; \\textrm{ or } \\; ' + mathans2;
};
var mathqn1 = fraction  + '-' +G+ '=' + fractionBuilder(numerator, denominator) + '.';
var mathqn2 = fraction + signstr + G + '.';
// build student's answer
// set up necessary arrays
var switchStatusArray = [sOne , sTwo, sThree, sFour];
var studentAnswerArray = [aOne, bTwo, dThree,fFour, cThree, eFour];
var xIneqArray = [' x  < ', ' x > ', ' < x < ', ' < x < '];
var answerPreviewArray = [], answerArray = [];
// iterates switches, create student's answer
switchStatusArray.forEach(function(switchStatus, i) {
	if (switchStatus) {
		var b = Number(studentAnswerArray[i]);
		studentAnswerArray[i] = b; 
		answerArray.push(b)
		if (i > 1 ) {
			var a = Number(studentAnswerArray[i+2]);
			studentAnswerArray[i+2] = a; 
			answerArray.push(a);
		} else { var a = ''};
		answerPreviewArray.push(a+xIneqArray[i]+b );
	} // end of if/else
}); // end of switch iteration
// check how many roots hit
var rootsHit = 0, rootsTotal = 0;
studentAnswerArray.forEach( function(root, i){
	if (root) {
		rootsTotal += 1;
		if (rootsArray.includes(root)) {rootsHit += 1;}
	}
}); // root iteration over
var rootsHitpercentage = rootsHit / rootsTotal;
// check how many components hit, give out marks
var componentAll = false, componentSome = false, componentsHit = 0;
if (sign==1){
	if (  sOne && sTwo && myXOR(sThree, sFour) ) {componentAll = true;};
	if ( sOne && studentAnswerArray[0] === rootsArray[0]) {componentsHit +=1 };
	if ( sTwo && studentAnswerArray[1] === rootsArray[3]) {componentsHit +=1 };
	if ( sThree && studentAnswerArray[4] === rootsArray[1] && studentAnswerArray[2] === rootsArray[2]) {componentsHit +=1};
	if ( sFour && studentAnswerArray[5] === rootsArray[1] && studentAnswerArray[3] === rootsArray[2]) {componentsHit += 1};
	// allocate marks
	if (componentAll && componentsHit == 3 ) { // full marks
		if (rootsHitpercentage == 1) {var partBMark = 4;} else{ var partBMark =3;};
	} else if (componentAll) { // all components structure
		if (rootsHit > 1 || componentsHit > 0) {var partBMark = 3;}  else {partBMark = 1; };
	} else if (componentsHit > 0) {
		if (rootsHit > 1) {var partBMark = 3; } else{var partBMark = 2; };
	} else{ // no components hit, no componentAll
		if (rootsHit > 0) {var partBMark = 1; } else{ var partBMark = 0; };
	};
} else{ // sign == 2
	if ( !sOne && !sTwo && sThree && sFour) {componentAll = true;};
	var avoidDuplicate = 0;
	if ( sThree && studentAnswerArray[4] === rootsArray[0] && studentAnswerArray[2] === rootsArray[1] ) {componentsHit += 1; avoidDuplicate += 1};
	if ( sThree && studentAnswerArray[4] === rootsArray[2] && studentAnswerArray[2] === rootsArray[3] ) {componentsHit += 1; avoidDuplicate += 2};
	if ( sFour && studentAnswerArray[5] === rootsArray[0] && studentAnswerArray[3] === rootsArray[1]) {componentsHit += 1; avoidDuplicate += 1};
	if ( sFour && studentAnswerArray[5] === rootsArray[2] && studentAnswerArray[3] === rootsArray[3]) {componentsHit += 1; avoidDuplicate += 2};
	// allocate marks
	if (componentAll && componentsHit == 2 && avoidDuplicate == 3 ) { // full marks
		if (rootsHitpercentage == 1) {var partBMark = 4;} else{ var partBMark =3;};
	} else if (componentAll) { // all components structure
		if (componentsHit > 0) {var partBMark = 3;} else if (rootsHit > 1) {var partBMark = 2;} else {partBMark = 1;};
	} else if (componentsHit > 0) {
		var partBMark = 3; 
	} else{ // no components hit, no componentAll
		if (rootsHit > 0) {var partBMark = 1;} else{ var partBMark = 0;};
	};	
};
// preview answer
if (answerPreviewArray.length == 1) { // 1 answer
	var answerPreviewFinal = answerPreviewArray[0];
} else {
	if (answerPreviewArray.length == 2) { // 2 answers
		var answerPreviewFinal = answerPreviewArray[0] + ' \\; \\textrm{ or } \\; ' + answerPreviewArray[1];
	} else { 
		if (answerPreviewArray.length == 3) { // 3 answers, could be correct answer, so shift them around
		var answerPreviewFinal = answerPreviewArray[0] + ' \\; , \\; ' + answerPreviewArray[2] + ' \\; \\textrm{ or } \\; ' + answerPreviewArray[1];
		} else { // 4 answers
			var answerPreviewFinal = answerPreviewArray[0] + ' \\; , \\; ' + answerPreviewArray[1] + ' \\; , \\; ' + answerPreviewArray[2];
			answerPreviewFinal +=  ' \\; \\textrm{ or } \\; ' + answerPreviewArray[3];
		};
	};
};
// final marks comment
 const finalMarks =  Number(partAMark)+partBMark;
var comments = "You have scored ";
if (finalMarks == 5) {
	comments += "5/5 for this question. Well done! Keep up the good work."
} else if (finalMarks > 2) {
	comments += finalMarks +"/5 for this question. Just a bit more fine-tuning to get the full marks. \
		 Try to see how you can arrive at the actual answer and try again!"
} else {
	comments += finalMarks + "/5 for this question. Let's try to figure out how we can get the answer and try again! \
		 Consult your teachers and friends if necessary and I'm sure you'd be able to master the techniques in no time."
};
// things that need id
document.addEventListener('init', function(event) {if (event.target.matches('#qn001atab')) {
	// loading screen: show modal screen upon load // function showModal() {}
	var modal = document.querySelector('ons-modal');
	modal.show(); 
	setTimeout(function() { modal.hide();}, 1000);
	document.querySelector('ons-tabbar').setActiveTab(1) // Loads both pages
	.then( // After pages loaded
		function (){
			  var progressBar = 
				new ProgressBar.Circle('#progress', {
					color:'#0076ff',
					strokeWidth: 10,
					duration: 1000, // milliseconds
					easing: 'easeInOut'
				});
  setTimeout(function() {progressBar.animate(finalMarks/5);}, 1000);
  document.getElementById('progressBarText').innerHTML = finalMarks + '/5';
			// Insert Math
			katex.render("\\displaystyle "+mathqn1, document.getElementById('qntext1'), {throwOnError: false});
			katex.render(mathqn2, document.getElementById('qntext2'), {throwOnError: false, displayMode:true});
			katex.render("\\boxed{ " + finalans + "}", document.getElementById('mathans'), {throwOnError: false, displayMode:true});
			katex.render("\\displaystyle "+ answerPreviewFinal, document.getElementById('studentSolution'), {throwOnError:false, displayMode:true});
			document.getElementById('answerComments').innerHTML = comments;
	})
}},false); // End of window.onload