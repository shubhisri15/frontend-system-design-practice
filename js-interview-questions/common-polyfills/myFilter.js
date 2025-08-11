Array.prototype.myFilter = function (callback) {
    if (this === null) throw new Error('cannot call myFilter on null / undefined')
    if (typeof callback !== 'function') throw new Error('callback not a function')
        
    const arr = Object(this)
    const result = []

    for (let i = 0; i < arr.length; i++) {
        if(i in arr && callback(arr[i], i, arr)) {
            result.push(arr[i])
        }
    }

    return result
}

const arr = [1, 2, 3, 4]

const evenNumFilter = (num) => num % 2 === 0

const newArr = arr.myFilter((item) => evenNumFilter(item))
console.log(newArr)