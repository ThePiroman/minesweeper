import { createElement } from '../funcs';
import './style.css'

export default class gameCanvas {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        return createElement(this.parent, 'div', 'gameCanvas');
    }

    render() {
        return this.parent.append(this.component());
    }
}