class Matrix {
  constructor(dims) {
    this.list = new Array(dims[1]);
    for (const i in this.list)
        this.list[i] = new Vec(dims[0]);
  }
  
  static fromList(list) {
    let toReturn = Matrix.fromVList(list);
    for (const i in toReturn.list)
      toReturn.list[i] = Vec.fromList(toReturn.list[i]);
    return toReturn;
  }
  
  static fromVList(list) {
    let toReturn = new Matrix([0, 0]);
    toReturn.list = list;
    return toReturn;
  }
  
  static mono(num, dims) {
     let list = new Array(dims[1]);
     for (let i = 0; i < list.length; i++)
        list[i] = Vec.mono(num, dims[0]);
    return Matrix.fromVList(list);
  }
  
  static identity(size) {
    let list = new Array(size);
    for (let i = 0; i < list.length; i++) {
      let row = new Vec(size);
      row.setInd(i, 1);
      list[i] = row;
    }
    return Matrix.fromVList(list);
  }
  
  getRow(y) {
    return this.list[y];
  }
  
  setRow(y, row) {
    this.list[y] = row;
    return this;
  }
  
  getNum(coord) {
    return this.list[coord[1]].ind(coord[0]);
  }
  
  setNum(coord, num) {
    this.list[coord[1]].setInd(coord[0], num);
    return this;
  }
  
  dims() {
    return [this.list[0].length(), this.list.length];
  }
  
  forEach(func) {
    const dims = this.dims();
    for (let i = 0; i < dims[0]; i++)
      for (let j = 0; j < dims[1]; j++)
        this.setNum([i, j], func(this.list, this.getNum([i, j]), [i, j]));
    return this;
  }
  
  abs() {
    return this.forEach((l, v, i) => Math.abs(v));
  }
  
  floor() {
    return this.forEach((l, v, i) => Math.floor(v));
  }
  
  ceil() {
    return this.forEach((l, v, i) => Math.ceil(v));
  }
  
  round() {
    return this.forEach((l, v, i) => Math.round(v));
  }
  
  recip() {
    return this.forEach((l, v, i) => 1 / v);
  }

  det() {
    const dims = this.dims();
    if (dims[0] != dims[1])
      return;
      
    const numRows = dims[1];
    let calcMat = this.copy();

    let odd_swaps = false;
    for (let fd = 0; fd < numRows; fd++) {
      if (calcMat.getNum([fd, fd]) == 0) {
        let found = false;
        for (let i = fd + 1; i < numRows; i++)
          if (calcMat.getNum([fd, i]) != 0) {
            const temp = calcMat.getRow(fd);
            calcMat.setRow(fd, calcMat.getRow(i));
            calcMat.setRow(i, temp);
            found = true;
            odd_swaps = !odd_swaps;
            break
          }
        if (!found)
          return 0;
      }
      for (let i = fd + 1; i < numRows; i++) {
        const scaler = calcMat.getNum([fd, i]) / calcMat.getNum([fd, fd]);
        const subRow = 
          calcMat.getRow(fd).copy()
            .mulNum(scaler)
        
        calcMat.getRow(i)
          .subVec(subRow);
      }
    }

    let product = 1;
    for (let i = 0; i < numRows; i++)
      product *= calcMat.getNum([i, i]);
    if (odd_swaps)
      product *= -1;
    return product;
  }
  
  inv() {
    const dims = this.dims();
    if (dims[0] != dims[1])
      return;
      
    const numRows = dims[1];
    let inv = Matrix.identity(numRows);

    for (let fd = 0; fd < numRows; fd++) {
      if (this.getNum([fd, fd]) == 0) {
        let found = false;
        for (let i = fd + 1; i < numRows; i++)
          if (this.getNum([fd, i]) != 0) {
            const cTemp = this.getRow(fd);
            this.setRow(fd, this.getRow(i));
            this.setRow(i, cTemp);
            
            const iTemp = inv.getRow(fd);
            inv.setRow(fd, inv.getRow(i));
            inv.setRow(i, iTemp);
            
            found = true;
            break
          }
        if (!found)
          return;
      }
      const pivot = this.getNum([fd, fd]);
        
      inv.getRow(fd)
        .divNum(pivot);
        
      this.getRow(fd)
        .divNum(pivot);
      for (let i = fd + 1; i < numRows; i++) {
        const scaler = this.getNum([fd, i]);
        
        const cSubRow = 
          this.getRow(fd).copy()
            .mulNum(scaler)
        
        this.getRow(i)
          .subVec(cSubRow);
        
        const iSubRow =
          inv.getRow(fd).copy()
            .mulNum(scaler);
        
        inv.getRow(i)
          .subVec(iSubRow);
      }
    }
    
    for (let fd = 0; fd < numRows; fd++) {
      for (let i = 0; i < fd; i++) {
        const pivot = this.getNum([fd, i]);
        
        const cSubRow =
          this.getRow(fd).copy()
            .mulNum(pivot);
        this.getRow(i)
          .subVec(cSubRow);
        
        const iSubRow =
          inv.getRow(fd).copy()
            .mulNum(pivot);
        inv.getRow(i)
          .subVec(iSubRow);
      }
    }
      
    this.list = inv.list;
    return this;
  }
  
  transpose() {
    this.list = 
      this.list[0].list.map(
        (col, i) => 
          Vec.fromList(this.list.map(
            row => row.ind(i)
          ))
    );
    return this;
  }
  
  addMonoMat(num) {
    return this.forEach((l, v, i) => v + num);
  }
  
  subMonoMat(num) {
    return this.forEach((l, v, i) => v - num);
  }
  
  monoMatSub(num) {
    return this.forEach((l, v, i) => num - v);
  }
  
  mulNum(num) {
    return this.forEach((l, v, i) => v * num);
  }
  
  divNum(num) {
    return this.forEach((l, v, i) => v / num);
  }
  
  numDiv(num) {
    return this.forEach((l, v, i) => num / v);
  }
  
  addMat(matrix) {
    return this.forEach((l, v, i) => v + matrix.getNum(i));
  }
  
  subMat(matrix) {
    return this.forEach((l, v, i) => v - matrix.getNum(i));
  }
  
  mulMat(matrix) {
    if (this.dims()[1] != matrix.dims()[0])
      return null;
    
    const dims = this.dims();
    const cacheList = this.copy();
    
    for (let i = 0; i < dims[0]; i++) {
        for (let j = 0; j < dims[1]; j++) {
            let num = 0;
          
            for (let k = 0; k < dims[1]; k++)
              num += cacheList.getNum([k, j]) * matrix.getNum([i, k]);
          
            this.setNum([i, j], num);
        }
    }
    
    return this;
  }
  
  equ(matrix) {
    const thisDim = this.dims();
    const matDim = matrix.dims();
    for (const i in thisDim)
      if (thisDim[i] != matDim[i])
        return false;
    
    for (const i in this.list)
      if (!this.list[i].equ(matrix.list[i]))
        return false;
    
    return true;
  }
  
  disp_str() {
    let toReturn = "";
    for (const row of this.list)
      toReturn += `${ row.list }\n`;
    return toReturn;
  }
  
  copy() {
    let newList = [...this.list];
    for (const i in newList)
      newList[i] = newList[i].copy();
    return Matrix.fromVList(newList);
  }
  
  slice(topLeft, bottomRight) {
    let miniMat = this.list.slice(topLeft[1], bottomRight[1]);
    for (let i = 0; i < miniMat.length; i++)
      miniMat[i] = miniMat[i].slice(topLeft[0], bottomRight[0]);
    return Matrix.fromVList(miniMat);
  }
}
