
class HashMap {
    constructor(capacity){
        this.originalCapacity = capacity;
        this.itemCount = 0;
        this.loadFactor = 0;
        this.capacity = capacity;
        this.buckets = Array.from({ length: capacity }, () => []);

    }

    set(key, value){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.length;

        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj[i]);
            if (nodeKey.includes(key)){
                linkedListObj[i][key] = value;
                return;
            }
        }
        linkedListObj.push({[key]: value});
        this.itemCount++;
        this._updateCapacity();
    }

    _updateCapacity(){
        this.loadFactor = this.itemCount/this.capacity;

        if (this.loadFactor > 0.75){
            let oldBuckets = this.buckets;
            this.capacity *= 2;
            this.buckets = Array.from({ length: this.capacity }, () => []);
            this.itemCount = 0;
            for (let bucket of oldBuckets){
                for (let entry of bucket){ 
                    let key = Object.keys(entry)[0];
                    let value = entry[key];
                    this.set(key, value); 
                }
            }
        }
    }

    keys(){
        let keyList = [];
        for(let bucket of this.buckets){
            for (let entry of bucket){
                keyList.push(Object.keys(entry)[0]);
            }
        }

        return keyList;
    }

    values(){
        let valueList = [];
        for(let bucket of this.buckets){
            for (let entry of bucket){
                let key = Object.keys(entry)[0]
                valueList.push(entry[key]);
            }
        }

        return valueList;
    }

    entries(){
        let keyValueList = [];
        for(let bucket of this.buckets){
            for (let entry of bucket){
                let key = Object.keys(entry)[0]
                keyValueList.push([key, entry[key]]);
            }
        }

        return keyValueList;
    }
    

    get(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.length;

        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj[i]);
            if (nodeKey.includes(key)){
                return linkedListObj[i][key];
            }
        }

        return null;
        
    }

    has(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.length;

        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj[i]);
            if (nodeKey.includes(key)){
                return true;
            }
        }

        return false;
        
    }

    remove(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.length;

        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj[i]);
            if (nodeKey.includes(key)){
                console.log("removing : " + key);
                this.buckets[hashCode].splice(i, 1)
                this.itemCount--;
                return "removed";
            }
        }

        return "couldnt find it";
    }

    length(){
        return this.itemCount;
    }

    clear(){
        this.itemCount = 0;
        this.loadFactor = 0;
        this.capacity = this.originalCapacity;
        this.buckets = Array.from({ length: this.capacity }, () => []);

        return "cleared"
    }




    _hash(key){
        return hash(key, this.capacity);
    }
}

 function hash(key, capacity){
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++){
        hashCode = ( primeNumber * hashCode + key.charCodeAt(i) ) % capacity;
    }
    return hashCode;
 }

let test = new HashMap(16);
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.loadFactor);
console.log(test.length());
test.set("apple", "yellow");
console.log(test.length());
 test.set('moon', 'silver')
console.log(test.length());
console.log(test.loadFactor);
