class LRUCache {
    constructor(capacity) {
        this.cache = new Map()
        this.capacity = capacity
    }

    getVal(key) {
        if (!this.cache.has(key)) {
            console.error('key not found bruh')
            return -1
        } 
        
        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, val)
        return val    
    }

    setVal(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        }
        if (this.cache.size === this.capacity) {
            const lruKey = this.cache.keys().next().value
            this.cache.delete(lruKey)
        }

        this.cache.set(key, value)
    }
}