// Implement String.repeat(times) function . The repeat should get repeat str x times.

String.prototype.myRepeat = function (times) {
    let result = ``
    for (let i = 0; i < times; i++) {
        result += this
    }

    return result
}

// example

let str = 'string'
console.log(str.repeat(3))