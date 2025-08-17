class MyPromise {
    constructor(executor) {
        this.state = 'pending'
        this.value = undefined
        this.handlers = [] // handler = {onFulfilled, onRejected, resolve, reject}

        const resolve = (val) => {
            if (this.state !== 'pending') return // a promise that is not pending cannot change state
            this.state = 'fulfilled'
            this.value = val
            this.handlers.forEach(handler => this.runHandler(handler))
        }

        const reject = (reason) => {
            if (this.state !== 'pending') return // a promise that is not pending cannot change state
            this.value = reason
            this.state = 'rejected'
            this.handlers.forEach(handler => this.runHandler(handler))
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    runHandler(handler) {
        queueMicrotask(() => {
            const { onFulfilled, onRejected, resolve, reject } = handler
            try {
                if (this.state === 'fulfilled') {
                    if (onFulfilled) {
                        const result = onFulfilled(this.value);
                        resolve(result);
                    } else {
                        resolve(this.value);
                    } // we run the fulfilled function on resolve, or directly resolve with value
                } else {
                    if (onRejected) {
                        resolve(onRejected(this.value)) // we run the rejected function on resolve of the reject, or directly reject with value
                    } else {
                        reject(this.value)
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handler = { onFulfilled, onRejected, resolve, reject }
            if (this.state === 'pending') {
                this.handlers.push(handler)
            } else {
                this.handlers.forEach(handler => this.runHandler(handler))
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    static resolve(value) {
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}