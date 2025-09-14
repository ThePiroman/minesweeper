import './style.css'

export default class gameTimer {
    constructor(parent) {
        this.parent = parent;
        this.start = Date.now();
    }

    
    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameTimer';

        setInterval(() => {
            let timerDate = new Date(Date.now() - Math.floor(this.start / 1000));
            comp.textContent = `${timerDate.getMinutes()}:${timerDate.getSeconds()}`;

        }, 1000);

        return comp;
    }

    

    render() {
        return this.parent.append(this.component());
    }
}