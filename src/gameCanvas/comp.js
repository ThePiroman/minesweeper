import './style.css'

export default class gameCanvas {
    constructor(parent, size) {
        this.parent = parent;
        this.size = size;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameCanvas';

        comp.style.width = this.size + 'px';
        comp.style.height = this.size + 'px';

        return comp;
    }

    render() {
        return this.parent.append(this.component());
    }
}