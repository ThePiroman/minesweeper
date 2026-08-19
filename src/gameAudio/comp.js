import sndGameStart from "../../assets/sound/game_start.wav"
import sndWin from "../../assets/sound/win.wav"
import sndCant from "../../assets/sound/cant_click.wav"
import sndCantFlag from "../../assets/sound/flag_place_cant.wav"
import sndFlag from "../../assets/sound/flag_place.wav"
import sndOpen from "../../assets/sound/block_open.wav"
import sndBigOpen from "../../assets/sound/block_big_open.wav"
import sndBoom1 from "../../assets/sound/boom1.wav"
import sndBoom2 from "../../assets/sound/boom2.wav"
import sndFlagPickup from "../../assets/sound/flag_pickup.wav"

export default class gameAudio {
    constructor() {
        this.audioBank = [];
    }

    registerSound(id, path) {
        let snd = new Audio(path);
        snd.preload = 'auto';
        this.audioBank.push({
            id: id,
            sound: snd
        });
    }


    playSound(id) {
        let snd = this.audioBank.find((sound) => sound.id === id);
        if (!snd) {
            return;
        } else {
            const instance = snd.sound.cloneNode();
            instance.addEventListener('ended', () => { instance.remove(); });
            instance.play();
        }
    }

    initialize() {
        this.registerSound("gamestart", sndGameStart)
        this.registerSound("win", sndWin);
        this.registerSound("cant", sndCant);
        this.registerSound("cantflag", sndCantFlag);
        this.registerSound("flag", sndFlag);
        this.registerSound("open", sndOpen);
        this.registerSound("bigopen", sndBigOpen);
        this.registerSound("boom1", sndBoom1);
        this.registerSound("boom2", sndBoom2);
        this.registerSound("flagpickup", sndFlagPickup);
    }

}
