class EventEmitter {
    constructor() {
        this.events = {}
    }
    
    // if event name does not exist, add it to array, and push listener to the result array
    on(eventName, listener) {
        if(this.events[eventName]) {
            this.events[eventName].push(listener) 
        } else {
            this.events[eventName] = [listener]
        }
    }

    off(eventName, listener) {
        if (!this.events[eventName]) return
        this.events[eventName] = this.events[eventName].filter(l => l !== listener) //remove the listener from eventName's listener list 
    }

    emit(eventName, ...args) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(...args)) // call all listeners attached to the event
            return true
        } else {
            return false
        }
    }
}

// test

const myEmitter = new EventEmitter()

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}

console.log('------- Emit Phase 1 -------')
myEmitter.on('foo', addTwoNumbers);
myEmitter.emit('foo', 2, 5);

console.log('------ Emit Phase 2 ------')
myEmitter.on('foo', (a, b) => console.log(`The product is ${a * b}`));
myEmitter.emit('foo', 4, 5);

console.log('------ Emit Phase 3 ------')
myEmitter.off('foo', addTwoNumbers);
myEmitter.emit('foo', -3, 9);