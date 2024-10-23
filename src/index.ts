let a = 1 + 2;
let b = a + 3;
let c = {
  apple: a,
  banana: b
};

let d = c.apple * 4;
// let d:string = c.apple * 4; // Error: Type 'number' is not assignable to type 'string'.