async function concurrentTaskRunner(payloads, fetcher, concurrency = 3) {
    const results = new Array(payloads.length)
    let currentIndex = 0

    async function worker() {
        while (currentIndex < payloads.length) {
            const index = currentIndex++
            try {
                results[index] = await fetcher(payloads[index])
            } catch (err) {
                results[index] = Promise.reject(err)
            }
        }
    }

    const allWorkers = []

    for (let i = 0; i < concurrency; i++) {
        // each worker takes up one task, executes it, then picks up the next task. 
        // current index is shared b/w the workers so no worker will be picking the same payload
        allWorkers.push(worker()) 
    }

    await Promise.all(allWorkers)
    
    return results
}

function myFetcher(payload) {
    return Promise.resolve().then(res => console.log(`Payload ${payload}`))
}

const myPayloads = [1, 2, 3, 4, 5, 6]

console.log(concurrentTaskRunner(myPayloads, myFetcher, 4))

