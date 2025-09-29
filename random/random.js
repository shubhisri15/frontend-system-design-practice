// deepEqual

function deepEqual(obj1, obj2) {
    
    for (const key in obj1) {
        if (typeof obj1[key] === 'object') {
            return deepEqual(obj1[key], obj2[key])
        } else {
            if (obj1[key] !== obj2[key]) {
                return false
            }
        }
    }

    return true
}

console.log(deepEqual({a:1, b:[2, {c: '99'}]}, {a:1, b:[2, {c: '99'}]}))

// flattenObject

function flattenObject(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result)
        } else {
            result[newKey] = value
        }
    }

    return result
}

const nested = {
  a: { b: { c: 1 } },
  d: 2,
  e: { f: 3, g: { h: 4 } }
};

console.log(flattenObject(nested));

// deepMerge

function deepMerge(obj1, obj2) {
    const result = { ...obj1 }
    for (const [key, value] of Object.entries(obj2)) {

        if (value && typeof value === "object" && !Array.isArray(value) && obj1[key] && typeof obj1[key] === 'object' && !Array.isArray(obj1[key])) {
            result[key] = deepMerge(obj1[key], value)
        } else {
            result[key] = value
        }
    }

    return result
}

const blah = { a: 1, b: { c: 2, d: 3 } };
const blu = { b: { d: 4, e: 5 }, f: 6 };

const merged = deepMerge(blah, blu);
console.log(merged);



