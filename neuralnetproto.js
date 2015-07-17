
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

var X = [ [0,0,1], [0,1,1], [1,0,1], [1,1,1] ];
var y = [0,0,1,1];
var syn0 = [-0.16595599, 0.44064899, -0.99977125];

var iterations = 10000;
while(iterations--){
	var l0 = X;

	var ld = matrixVectorInner(l0,syn0);

	var l1 = nonlinXA(ld);

	var l1_error = subA(y,l1);

	l1_nonlin = nonlinDA(l1);

	l1_delta = vectorOuter(l1_error,l1_nonlin);

	var l0t = transpose(l0);

	syn0_update = matrixVectorInner(l0t,l1_delta)

	syn0 = addA(syn0,syn0_update);	
}

console.log("Input"+ JSON.stringify(y));
console.log("Train"+ JSON.stringify(l1));
