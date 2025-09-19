
class HashMap {
    entries = 0;
    load_factor = 0.8;
    crnt_size = 16;
    array = Array(this.crnt_size).fill(null).map(() => []);
    hash(string) {
        let murmurhash = require('murmurhash');
        return murmurhash.v3(string);
    }

    get_entries() {
        let ret = []
        for (let i = 0; i < this.crnt_size; i++) {
            for (let e of this.array[i]) {
                ret.push(e);
            }
        }
        return ret;
    }
    get entries() {
        return this.entries;
    }

    clear() {
        for (let i = 0; i < this.crnt_size; i++) {
            this.array[i] = [];
        }
        this.entries = 0;
    }

    extend() {
        return this.entries >= this.crnt_size * this.load_factor
    }
    double() {

        let all = this.get_entries();
        this.crnt_size *= 2;
        this.array = new Array(this.crnt_size).fill(null).map(() => []);
        for (let e of all) {
            let at = this.hash(e.key) % this.crnt_size;
            this.array[at].push(e);
        }

    }
    set(key, value) {
        let index = this.hash(key) % this.crnt_size;
        for (let e of this.array[index]) {
            if (e.key == key) {
                e.value = value;
                return;
            }
        }
        this.array[index].push({ key, value });
        this.entries++;
        if (this.extend()) {
            this.double();
        }

    }

    get(key) {
        let index = this.hash(key) % this.crnt_size;
        for (let e of this.array[index]) {
            if (e.key == key) {
                return e.value;
            }
        }
        return null;
    }

    remove(key) {
        let index = this.hash(key) % this.crnt_size;
        for (let i = 0; i < this.array[index].length; i++) {
            let e = this.array[index][i];
            if (e.key == key) {
                this.array[index] = this.array[index].filter((v) => { v.key != key });
                this.entries--;
                return true;
            }
        }
        return false;
    }

}

let map = new HashMap();

















