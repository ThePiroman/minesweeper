import './style.css'

export default class gameTimer {
    constructor(parent) {
        this.parent = parent;
        this.start = 0;
    }

    
    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameTimer';

        setInterval(() => {
            let timerDate = new Date(Math.floor(this.start / 1000));
            comp.textContent = `${timerDate.getMinutes()}:${timerDate.getSeconds()}`;

        }, 1000);

        return comp;
    }

    

    render() {
        return this.parent.append(this.component());
    }
}