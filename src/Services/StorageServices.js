const NodeCache = require('node-cache');

class StorageServices {
    static cache = new NodeCache();

    static setStorageVar(key, value) {
        if (typeof key !== 'string') throw new Error('Key must be a string');
        this.cache.set(key, value);
    }

    static getStorageVar(key) {
        if (typeof key !== 'string') throw new Error('Key must be a string');
        return this.cache.get(key);
    }

    static removeStorageVar(key) {
        if (typeof key !== 'string') throw new Error('Key must be a string');
        this.cache.del(key);
    }

    static hasStorageVar(key) {
        if (typeof key !== 'string') throw new Error('Key must be a string');
        return this.cache.has(key);
    }
}

module.exports = StorageServices;
