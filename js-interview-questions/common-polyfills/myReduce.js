Array.prototype.myReduce = function (callback, initialValue) {
    if (this === null) throw new Error('cannot call myReduce on null / undefined')
    if (typeof callback !== 'function') throw new Error('callback not a function')
        
    const arr = Object(this)
    let accumulator = initialValue
    let startIndex = 0

    if (accumulator === undefined) {
        let found = false;
        while (startIndex < arr.length && !found) {
            if (startIndex in arr) {
                accumulator = arr[startIndex];
                found = true;
            }
            startIndex++;
        }
        if (!found) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
    }

    for (let i = startIndex; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr)
    }

    return accumulator
}

const arr = [1, 2, 3, 4]

const val = arr.myReduce((accumulator, current) => accumulator + current) // takes a callback, and an optional initial value as params
console.log(val)