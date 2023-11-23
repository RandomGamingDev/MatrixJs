# MatrixJs
A basic javascript library for dynamic and powerful matrices based on lists wrapped around with a powerful class.

This library interally deals with a matrix as a 2d list which can be obtained from `Matrix.list`. This is nice for dealing with libraries that use list vectors (including mine :D) without having to do any annoying casting, with u instead being able simply do `Matrix.list` to get the internal list. Not only that, but the fact that lists are used interally means that operations can be done on directly and that the class can be a lot more flexible. This library also prioritizes speed over accuracy.

Note: Adding `inv()` & Strassen Matrixx Multiplication aren't done yet. The library was actually supposed to be released last year, but I had other stuff to do and couldn't find enough time to work on those (altho tbh a large part was just procrastination). However, the library is still highly usable in its current form and these & other features are things that I do plan on adding to the library.

To use the library simply create a new instance of the Vec class which you can create by specifying a specific size to instantiate a `Matrix` instance with `new Matrix([3, 3])` (this creates a mat3 which has the dimensions of 3x3), of a certain number repeating with `Vec.monoNum(3, [2, 2])` (this creates a mat2 which has the dimensions of 2x2 and that's filled with the number 3), or from a list like this:
```js
let demo_mat = Matrix.fromList([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]);
```
. Other than that there are a multitude of functions for dealing with operations like, addition, subtraction, multiplication, division, whether with a single number or with another vector, and for the copying and slicing of these vectors.

An example is available here: https://github.com/RandomGamingDev/MatrixJs/blob/main/matrix.js

Dependencies:
- https://github.com/RandomGamingDev/VecJs/tree/main: This is a vector library used for managing the rows of the matrix, allowing for easy and dynamic row operations. It can be included from this cdn https://cdn.jsdelivr.net/gh/RandomGamingDev/VecJs/vec.js (again I recommend using version control), or imported manually.

To use it you can simply include https://cdn.jsdelivr.net/gh/RandomGamingDev/MatrixJs/matrix.js and its dependencies (they're listed above) in your HTML file! If you want to you can also just download the file and include it in your HTML file that way.

btw stuff updates so remember to specify a version/commit for your library if you want to use a link and don't want your code to automatically update to the newest version of the library
