// this function returns a new promise which resolves when all promises in the array resolve (with the result), rejects if even one is rejected

function runParallelPromises(promises) {
    return new Promise((resolve, reject) => {
        let completed = 0
        let results = []

        promises.forEach((promise, i) => {
            promise.then((res) => {
                results[i] = res
                completed++

                if (completed === promises.length) {
                    resolve(results)
                }
            }).catch((err) => reject(err))
        })
    }) 
}

// why this works? forEach does not do anything, it just synchronously calls all promises from the array. 
// it will call one promise but not wait for it to resolve and move on to the next promise while the first one starts executing
// this way all the promises execute in parallel and results pushed in order

// Test cases

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        let randomNum = Math.random()
        randomNum > 0.5 ? resolve('Promise 1 resolved') : reject('Promise 1 rejected')
    }, 0)
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        let randomNum = Math.random()
        randomNum > 0.5 ? resolve('Promise 2 resolved') : reject('Promise 2 rejected')
    }, 1000)
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        let randomNum = Math.random()
        randomNum > 0.5 ? resolve('Promise 3 resolved') : reject('Promise 3 rejected')
    }, 200)
})

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        let randomNum = Math.random()
        randomNum > 0.5 ? resolve('Promise 4 resolved') : reject('Promise 4 rejected')
    }, 400)
})

const arrPromises = [promise1, promise2, promise3, promise4]

runParallelPromises(arrPromises).then(results => console.log('All resolved', results)).catch(err => console.log(err))