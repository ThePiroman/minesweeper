import { createElement } from '../funcs';
import './style.css';

export default class gameBlockRowContainer {
    constructor(parent) {
        this.parent = parent;
        this.rowDiv = null; // variable for storing the component's div, since we gotta reference it somehow
        this.rowInd = null; // position of the row in the global blocks array
    }

    component() {
        return createElement(this.parent, 'div', 'gameBlockRowContainer', (comp) => {
            this.rowDiv = comp;
        });
    }
   

    render() {
        return this.parent.append(this.component());
    }
}