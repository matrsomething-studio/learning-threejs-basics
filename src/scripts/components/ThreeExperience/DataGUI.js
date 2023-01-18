// DAT GUI - https://github.com/dataarts/dat.gui
import * as dat from 'dat.gui';

// Class - ThreeGUI
export default class ThreeGUI {
    constructor(base) {
        this.base = base;
        this.GUI = new dat.GUI();
        const cords = ['x', 'y', 'z'];
    }
}
