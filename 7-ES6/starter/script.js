function iqTest(numbers){
    // ...
    let numsArr = Array.prototype.slice.call(numbers);
    console.log(numsArr);
    let parityArray = numsArr.map(n => n%2);
    console.log(parityArray);
  }
  iqTest("2 4 7 8 10");