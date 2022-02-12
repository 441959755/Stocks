
export default class PopupList {

    dataSouce = [];
    listSize = 0;
    pos = 0;

    backcall = null;

    constructor() {

    }

    append(el) {
        this.dataSouce[this.listSize++] = el;
    }

    insert(el) {
        this.dataSouce.push(el);
        this.listSize++;
    }

    remove(el) {

        const index = this.dataSouce.indexOf(el);

        if (index >= 0) {

            this.dataSouce.splice(index, 1);
            this.listSize--;
            this.autoPop();

            return true;
        }

        return false;
    }

    contains(el) {
        return this.dataSouce.indexOf(el) > -1;
    }

    front() {
        this.pos = 0;
    }

    end() {
        this.pos = this.listSize - 1;
    }

    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos;
        }
    }

    currPos() {
        return this.pos;
    }

    moveTo(position) {
        this.pos = position;
    }

    getElement() {
        return this.dataSouce[this.pos];
    }

    clear() {
        delete this.dataSouce;
        this.dataSouce = [];
        this.listSize = 0;
        this.pos = 0;
    }

    length() {
        return this.listSize;
    }

    toString() {
        return this.dataSouce;
    }

    pop() {

        if (this.listSize > 0) {
            this.dataSouce.pop();
            this.listSize--;

            this.autoPop();
        }

    }

    autoPop(call?) {

        if (call) {
            this.backcall = call;
        }

        this.backcall && (this.backcall());
    }

}