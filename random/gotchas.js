console.log([] + []); // empty string -> both arrays converted to strings and concatenated
console.log([] + {}); // [object Object] -> both array and obj converted to strings and concatenated
console.log({} + []); // [object Object] -> block + array would give 0, object + array would give object Object

// shallow vs deep copy

const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };

shallow.a = 10;
shallow.b.c = 20;

console.log(original.a); // 1  → top-level property is separate
console.log(original.b.c); // 20 → nested object was mutated

const deep = JSON.parse(JSON.stringify(original));

deep.b.c = 30;

console.log(original.b.c); // 20 → original is unchanged

console.log(1 / 0); //Infinity
console.log(-1 / 0); //-Infinity
console.log(Infinity > 9999999999999999); //true




