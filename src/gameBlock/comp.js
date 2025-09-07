import './style.css'

export default class gameBlock {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameBlock';

        let compWidth = Number.parseInt(document.getElementsByClassName("gameCanvas")[0].style.width, 10)
        let compHeight = Number.parseInt(document.getElementsByClassName("gameCanvas")[0].style.height, 10)

        // comp.style.width = compWidth / 4 + 'px';

        // comp.style.height = compHeight / 4 + 'px';

        comp.style.height = 32 + 'px';

        comp.style.borderWidth = 2 + 'px';

        comp.style.width = 32 - (Number.parseInt(comp.style.borderWidth, 10) * 2) + 'px';

        comp.addEventListener("click", function(event) {
            console.log("kruto")
        });

        return comp;
    }

    

    render() {
        return this.parent.append(this.component());
    }
}