
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

var l0 = X;

console.log("l0"+ JSON.stringify(l0));
console.log("syn0"+ JSON.stringify(syn0));
var ld = matrixVectorInner(l0,syn0);

console.log("ld"+ JSON.stringify(ld));

var l1 = nonlinXA(ld);
console.log("l1"+ JSON.stringify(l1));

var l1_error = subA(y,l1);
console.log("l1_error"+ JSON.stringify(l1_error));

l1_nonlin = nonlinDA(l1);
console.log("l1_nonlin"+ JSON.stringify(l1_nonlin));

l1_delta = vectorOuter(l1_error,l1_nonlin);
console.log("l1_delta"+ JSON.stringify(l1_delta));

var l0t = transpose(l0);
console.log("l0t"+ JSON.stringify(l0t));

syn0_update = matrixVectorInner(l0t,l1_delta)
console.log("syn0_update"+ JSON.stringify(syn0_update));

syn0 = addA(syn0,syn0_update);
console.log("syn0"+ JSON.stringify(syn0));
