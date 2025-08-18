import { Node } from "./linkedListNode.js";

export function LinkedList(){
    let head = null;
    let tail = null;

    const getHead = () => head;
    const getTail = () => tail;

    const setHead = (newHead) => {
        let node = newHead;

        if ((typeof newHead) === "string"){
            node = new Node(newHead);
        }
            
        
        if (head != node){
            head = node
        }else{
            console.log("already head")
        }
        
    };
    const setTail = (newTail) => {
        let node = newTail;

        if ((typeof newTail) === "string"){
            node = new Node(newTail);
        }   

        if (tail != node){
            tail = node;
        }else{
            console.log("already tail")
        }

    };

    //Append data
    const append = (value) => {
        let node = new Node(value);
        
        if (head === null){
            setHead(node);
            setTail(node);
        }else{
            tail.next = node;
            setTail(node);
        }
    }

    //Prepend Data
    const prepend = (value) => {
        let node = new Node(value);

        if (head === null){
            console.log("hello")
            setHead(node);
            setTail(node);
            console.log(head)
        } else{
            node.next = head;
            setHead(node);
        }
    }

    //Size of list
    const size = (item = head, sizeCount = 0) => {
        if (getHead() === null && getTail() === null){
            return false;
        };
        if (item === getTail()){
            sizeCount++;
            return sizeCount;
        }

        sizeCount++;
        return sizeCount += size(item.next);
    }

    //find item at
    const at = (index, item = head) => {
        if (index === 0){
            return item;
        } else if (item === getTail()){
            return "Index out of range"
        }
        index = index - 1;
        return at(index, item.next)
    }

    //pop from end of list
    const pop = (item = head) => {
        if ( item.next === getTail()){
            item.next = null;
            setTail(item);
            return
        }

        return pop(item.next);
    }

    //see if the list contains the value
    const contains = (value, item = head) => {
        if (value === item.data){
            return true
        }else if (item === getTail()){
            return false
        }

        return contains(value, item.next);
    }

    //find the index of the value
    const find = (value, item = head, index = 0) => {
        if (value === item.data){
            return index;
        } else if (item === getTail()){
            return "This is not in the list"
        }
        index++;

        return find(value, item.next, index);

    }

    const toString = (item = head) => {
        console.log(getHead().data);
        console.log(getTail().data);
        let stringForm = "";

        if (item === getTail()){
            return ` -> ${item.data}`
        }else if (item === getHead()){
            stringForm = `${item.data}`;
        }else{
            stringForm = ` -> ${item.data}`;
        }

        return stringForm.concat(toString(item.next));
    }

    const insertAt = (value, index, item = head) => {
            if (index === 1){
                let newNode = new Node(value);
                if (item.next === tail){
                    item.next = newNode;
                    setTail(newNode);
                }
                newNode.next = item.next.next;
                item.next.next = null;
                item.next = newNode;
                return
            }
            else if (index === 0){
                let newNode = new Node(value);
                newNode.next = head.next;
                setHead(newNode);
                return
            }else if (item === getTail()){
                return "Index out of range"
            }

            index = index - 1;
            return insertAt(value, index, item.next)
    }

    const removeAt = (index, item = head) => {
        if (index === 1){
            if(item.next === tail){
                item.next = null;
                setTail(item);
                return;
            }
            item.next = item.next.next;
            return;
        }else if (index === 0){
            setHead(head.next);
            return;
        }
        else if (item === getTail()){
                return "Index out of range"
        }
        index--;
        return removeAt(index, item.next)
    }


    return {getHead, getTail, setHead, setTail, append, prepend, size, at, pop, contains, find, toString, insertAt, removeAt}
}