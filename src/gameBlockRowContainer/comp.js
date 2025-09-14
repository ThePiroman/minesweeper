import './style.css';

export default class gameBlockRowContainer {
    constructor(parent) {
        this.parent = parent;
        this.rowDiv = null;
        this.rowInd = null;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameBlockRowContainer';

        this.rowDiv = comp;

        
        return comp;
    }
   

    render() {
        return this.parent.append(this.component());
    }
}