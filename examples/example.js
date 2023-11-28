// multiply row by column corresponding to left of mul by right of mul
// example:
/*
[ // literally just a random matrix lmao
1 2
3 4
]

x

[ // multiplicative identity matrix 2x2
1 0
0 1
]

=

[
1*1+2*0 1*0+2*1
3*1+4*0 3*0+4*1
]

-

[
1 2
3 4
]

*/
// inbetween numbers r the dimensions of the new matrix
// if there's a row in left combine all multiplied by the rows of the other

/* activate
const mono_mat = Matrix.mono(1, [3, 3]);
console.log(mono_mat.disp_str());

const iden_mat = Matrix.identity(3);
console.log(iden_mat.disp_str());
*/

//let test = new Matrix([3, 3]);
let a_test = //Matrix.fromList([[-2,2,-3],[-1,1,3],[2,0,-1]]);
    
Matrix.fromList(
  [
    [0,2,3,4,1],
    [8,5,6,7,2],
    [9,12,10,11,3],
    [13,14,16,15,4],
    [10,8,6,4,2]
  ]
);
/*
Matrix.fromList([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]);
*/

const a_inv = 
  a_test.copy()
    .inv();
console.log("a_inv: ");
console.log(a_inv.disp_str());
console.log("a_test * a_inv: ");
// We round here so that we don't have to worry about the floating point error
console.log(a_test.copy().mulMat(a_inv).round().disp_str());

console.log(`determinant: ${ a_test.det() }`);

console.log(a_test.slice([1, 1], [3, 3]).disp_str());

a_test.transpose();
console.log(a_test.disp_str());

let b_test = Matrix.fromList([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

let test = Matrix.fromList([
  [1, 2],
  [3, 4],
]);
console.log(test.disp_str());
//console.log(test.getNum([0, 0]));
let toMul = Matrix.fromList([
  [1, 2],
  [3, 4],
]);
console.log(test.equ(toMul));
test.mulMat(toMul);
console.log(test.equ(toMul));
console.log(test.disp_str());
