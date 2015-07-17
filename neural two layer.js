
function vectorInner(x,y){ return x.reduce(function(p,c,i,a){ return p + c*y[i]; },0); }
function vectorOuter(x,y){ return x.map(function(v,i,a){ return v*y[i]; }); }

function matrixVectorInner(A,x){ return A.map(function(v){ return vectorInner(v,x); }); }

function nonlinX(x){ return 1/(1+Math.exp(-x)); }
function nonlinD(x){ return x*(1-x); }
function nonlinXA(x){ return x.map(nonlinX); }
function nonlinDA(x){ return x.map(nonlinD); }
function subA(x,y){ return x.map(function(v,i){ return v - y[i] }); }
function addA(x,y){ return x.map(function(v,i){ return v + y[i] }); }

function transpose(A){
	var outerLength = A.length;
	var innerLength = A[0].length;
	var At = [];
	for(var i=0; i<innerLength; i++){
		At[i] = [];
		for(var j=0; j<outerLength; j++){
			At[i][j] = A[j][i];
		}
	}
	return At;
}

function generateSynapse(sizeIn, sizeOut){
	var syn = [];
	for(var i=0; i<sizeIn; i++){
		syn[i] = [];
		for(var j=0; j<sizeOut; j++){
			syn[i][j] = 2*Math.random() - 1;
		}
	}
	return syn;
}

var X = [ [0,0,1], [0,1,1], [1,0,1], [1,1,1] ];
var y = [0,0,1,1];

var syn0 = generateSynapse(3,4);
var syn1 = generateSynapse(4,1);

console.log("syn0"+ JSON.stringify(syn0));
console.log("syn1"+ JSON.stringify(syn1));

// var iterations = 10000;
// while(iterations--){
// 	var l0 = X;

// 	var l1 = nonlinXA(matrixVectorInner(l0,syn0));

// 	var l1_error = subA(y,l1);

// 	var l1_delta = vectorOuter(l1_error,nonlinDA(l1));

// 	syn0 = addA(syn0,matrixVectorInner(transpose(l0),l1_delta));
// }

// console.log("syn0"+ JSON.stringify(syn0));
// console.log("Input"+ JSON.stringify(y));
// console.log("Train"+ JSON.stringify(l1));
