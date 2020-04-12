'use strict';

class MyList {

    constructor() {
        this.items = [];
    }

    addItem(element) {
        //console.log("Add item " + element + " to " + this.items);
        this.items.push(element);
        //console.log("return items: " + this.items);
    }

    removeItem(element) {
        this.items.splice(element,1);
    }
}