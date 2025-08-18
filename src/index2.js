import { LinkedList } from "./linkedList.js";
import { Node } from "./linkedListNode.js";

class HashMap {
    constructor(loadFactor, capacity){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = Array.from({ length: capacity }, () => LinkedList());

    }

    set(key, value){
        let hashCode = this._hash(key)
        this.buckets[hashCode].append({[key]: value});
    }

    get(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.size();
        if (size === false){
            return null;
        }

        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj.at(i).data);
            if (nodeKey.includes(key)){
                return linkedListObj.at(i).data[key];
            }
        }

        return null;
        
    }

    has(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.size();
        if (size === false){
            return null;
        }
        
        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj.at(i).data);
            if (nodeKey.includes(key)){
                return true;
            }
        }

        return false;
        
    }

    remove(key){
        let hashCode = this._hash(key);
        let linkedListObj = this.buckets[hashCode];
        let size = linkedListObj.size();
        if (size === false){
            return null;
        }
        
        for (let i = 0; i < size ; i++){
            let nodeKey = Object.keys(linkedListObj.at(i).data);
            if (nodeKey.includes(key)){
                linkedListObj.removeAt(i);
                linkedListObj.toString();
            }
        }
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

let hashTest = new HashMap(0.8, 16);

hashTest.set("person100", "job100");

console.log(hashTest.get("person100"));
console.log(hashTest.has("person100"));
hashTest.remove("person100");
console.log("hello");
console.log(hashTest.get("person100"));
console.log(hashTest.has("person100"));

