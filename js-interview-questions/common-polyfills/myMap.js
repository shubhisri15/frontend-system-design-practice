Array.prototype.myMap = function(callback) {
    if (this === null) throw new Error('cannot call myMap on null / undefined')
    if (typeof callback !== 'function') throw new Error('callback not a function')
        
    const arr = Object(this)
    const result = new Array(arr.length)

    for (let i = 0; i < arr.length; i++) {
        if(i in arr) {
            result[i] = callback(arr[i], i, arr)
        }
    }

    return result
}

const myArr = [1, 2, 3]

const newArr1 = myArr.myMap((item, idx) => item + idx)

const newArr2 = myArr.map((item, idx) => item + idx) // takes a callback as arg, returns a transformed array

console.log(newArr2)