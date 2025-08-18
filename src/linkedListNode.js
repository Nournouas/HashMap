export class Node {
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }

    set setNext(newNext){
        this.next = newNext;
    }
};