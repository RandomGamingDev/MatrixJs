const test = new UnitTester("Matrix Initialization", "",
  () => {
    // Test the regular constructor
    const matrix = new Matrix([3, 3]);
    const vec = new Vec(3);
    UnitTester.assert_deep_equal(matrix, { "list": [vec, vec, vec] });
    
    // Test the mono matrix initializer
    const mono_matrix = Matrix.mono(1, [3, 3]);
    const mono_vec = Vec.mono(1, 3);
    UnitTester.assert_deep_equal(mono_matrix, { "list": [mono_vec, mono_vec, mono_vec] });
  
    // Test the from list initializer
    const from_list_matrix = Matrix.fromList([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);
    UnitTester.assert_deep_equal(from_list_matrix, { "list": [
      Vec.fromList([1, 2, 3]),
      Vec.fromList([4, 5, 6]),
      Vec.fromList([7, 8, 9])
    ] });
  
    // Test the Vec List initializer
    const vlist = [
      Vec.mono(1, 2),
      Vec.mono(2, 2),
    ];
    const from_vlist_matrix = Matrix.fromVList(vlist);
    UnitTester.assert_deep_equal(from_vlist_matrix, { "list": vlist });

    // Test the identity matrix initializer
    const identity_matrix = Matrix.identity(2);
    const list_identity_matrix = Matrix.fromList([
      [1, 0],
      [0, 1]
    ]);
    UnitTester.assert_deep_equal(identity_matrix, list_identity_matrix);
  },
  [
    new UnitTester("Single Matrix Operations", "",
      () => {
        const matrix = Matrix.fromList([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12]
        ]);
        
        const copied_matrix = matrix.copy();
      
        // Check getRow & setRow
        UnitTester.assert_deep_equal(matrix.getRow(0), Vec.fromList([1, 2, 3, 4]));
        matrix.setRow(0, Vec.fromList([2, 3, 4, 5]));
        UnitTester.assert_deep_equal(matrix.getRow(0), Vec.fromList([2, 3, 4, 5]));
      
        // Check copy to make sure that the copied matrix wasn't changed and is different
        UnitTester.assert(!UnitTester.deep_equal(matrix, copied_matrix));
        UnitTester.assert(copied_matrix, Matrix.fromList([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]));
      
        // Check getNum & setNum
        UnitTester.assert_strict_equal(matrix.getNum([0, 0]), 2);
        matrix.setNum([0, 0], 1);
        UnitTester.assert_strict_equal(matrix.getNum([0, 0]), 1);
        
        // Check dims (width x height/nxm instead of height x width/mxn so that it's easier to deal with external libraries and generally)
        UnitTester.assert_deep_equal(matrix.dims(), [4, 3]);
      
        // Check forEach
        const mono_matrix = Matrix.mono(-1.2, [4, 3]);
        matrix.forEach((l, v, i) => -1.2);
        UnitTester.assert_deep_equal(matrix, mono_matrix);
      
        // Check abs, floor, ceil, and round
        UnitTester.assert_deep_equal(matrix.copy().abs(), Matrix.mono(1.2, [4, 3]));
        UnitTester.assert_deep_equal(matrix.copy().floor(), Matrix.mono(-2, [4, 3]));
        UnitTester.assert_deep_equal(matrix.copy().ceil(), Matrix.mono(-1, [4, 3]));
        UnitTester.assert_deep_equal(matrix.copy().round(), Matrix.mono(-1, [4, 3]));
      
        // Check recip
        UnitTester.assert_deep_equal(matrix.copy().recip(), Matrix.mono(-1 / 1.2, [4, 3]));
      
        const square_matrix = Matrix.fromList([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]);
        const square_matrix_copy = square_matrix.copy();
        const square_matrix2 = Matrix.fromList([
          [2, -3, 1],
          [2, 0, -1],
          [1, 4, 5]
        ]);
        const square_matrix2_copy = square_matrix2.copy();
      
        // Check det
        UnitTester.assert_strict_equal(matrix.det(), undefined);
        UnitTester.assert_strict_equal(square_matrix.det(), 0);
        UnitTester.assert_strict_equal(square_matrix2.det(), 49);
        // Make sure that the matrices don't get modified by det
        UnitTester.assert_deep_equal(square_matrix, square_matrix_copy);
        UnitTester.assert_deep_equal(square_matrix2, square_matrix2_copy);
      
        // Check inv
        const recopied_matrix = matrix.copy();
        UnitTester.assert_deep_equal(matrix.inv(), undefined);
        UnitTester.assert_deep_equal(square_matrix.inv(), undefined);
        square_matrix2
          .inv()
          .mulNum(49)
          .round();
        UnitTester.assert_deep_equal(square_matrix2, Matrix.fromList([[4, 19, 3], [-11, 9, 4], [8, -11, 6]])); // This line uses .mulNum which is a Matrix Scalar operation
        // Make sure that invalid calls because of size don't change the value
        UnitTester.assert_deep_equal(matrix, recopied_matrix);
        // Make sure that invalid calls not because of size do change the value
        UnitTester.assert(!UnitTester.deep_equal(square_matrix, square_matrix_copy));
      
        // Check transpose
        UnitTester.assert_deep_equal(square_matrix_copy.copy().transpose(), Matrix.fromList([[1, 4, 7], [2, 5, 8], [3, 6, 9]]));
        UnitTester.assert_deep_equal(square_matrix_copy.copy().transpose().transpose(), square_matrix_copy);
        const rect_mat = Matrix.fromList([
          [1, 2, 3],
          [4, 5, 6]
        ]);
        UnitTester.assert_deep_equal(rect_mat.copy().transpose(), Matrix.fromList([[1, 4], [2, 5], [3, 6]]));
      
        // Check disp_str
        UnitTester.assert_deep_equal(square_matrix_copy.disp_str(), "1,2,3\n4,5,6\n7,8,9\n")
        
        // Check slice
        UnitTester.assert_deep_equal(square_matrix_copy.slice([1, 1], [3, 2]), Matrix.fromList([[5, 6]]));
      }
    ),
    new UnitTester("Matrix Scalar Operations", "",
      () => {
        const square_matrix = Matrix.fromList([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]);
      
        // Check addMonoMat, subMonoMat, monoMatSub, mulNum, divNum, and numDiv (some are named *monoMat because adding or subtract numbers to matrices is undefined in math which I'd say is a much bigger issue compared to height and width having their order swapped)
        UnitTester.assert_deep_equal(square_matrix.copy().addMonoMat(1), Matrix.fromList([[2, 3, 4], [5, 6, 7], [8, 9, 10]]));
        UnitTester.assert_deep_equal(square_matrix.copy().subMonoMat(1), Matrix.fromList([[0, 1, 2], [3, 4, 5], [6, 7, 8]]));
        UnitTester.assert_deep_equal(square_matrix.copy().monoMatSub(1), Matrix.fromList([[0, -1, -2], [-3, -4, -5], [-6, -7, -8]]));
        UnitTester.assert_deep_equal(square_matrix.copy().mulNum(2), Matrix.fromList([[2, 4, 6], [8, 10, 12], [14, 16, 18]]));
        UnitTester.assert_deep_equal(square_matrix.copy().divNum(2), Matrix.fromList([[1 / 2, 1, 3 / 2], [2, 5 / 2, 3], [7 / 2, 4, 9 / 2]]));
        UnitTester.assert_deep_equal(square_matrix.copy().numDiv(1), square_matrix.copy().recip());
    }),
    new UnitTester("Matrix Matrix Operations", "",
      () => {
        const square_matrix = Matrix.fromList([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]);
        const square_matrix2 = square_matrix.copy();
      
        // Check addMat, subMat
        UnitTester.assert_deep_equal(square_matrix.copy().addMat(square_matrix, square_matrix2), square_matrix.copy().mulNum(2));
        UnitTester.assert_deep_equal(square_matrix.copy().subMat(square_matrix, square_matrix2), Matrix.mono(0, [3, 3]));
        
        // Check mulMat  
        console.log(square_matrix.copy().mulMat(square_matrix2).disp_str());
        UnitTester.assert_deep_equal(square_matrix.copy().mulMat(square_matrix2), Matrix.fromList([[30, 36, 42], [66, 81, 96], [102, 126, 150]]));
        
        const mat1 = Matrix.fromList([
          [1, 2, 3],
          [4, 5, 6]
        ]);
        const mat2 = Matrix.fromList([
          [1, 2],
          [3, 4],
          [5, 6]
        ]);      
        UnitTester.assert_deep_equal(mat1.copy().mulMat(mat2), Matrix.fromList([[22, 28], [49, 64]]));
        UnitTester.assert_deep_equal(mat2.copy().mulMat(mat1), Matrix.fromList([[9, 12, 15], [19, 26, 33], [29, 40, 51]]));
      
        // Check equ
        UnitTester.assert_deep_equal(square_matrix, square_matrix2);
        UnitTester.assert(square_matrix.equ(square_matrix2));
        UnitTester.assert(!square_matrix.equ(mat1));
      }
    )
  ]
).test();

console.log(test.failed_sub_tests);