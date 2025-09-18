import './style.css'

export default class gameCanvas {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameCanvas';

        comp.style.height = 'auto';

        return comp;
    }

    render() {
        return this.parent.append(this.component());
    }
}