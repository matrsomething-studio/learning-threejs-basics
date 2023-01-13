// DAT GUI - https://github.com/dataarts/dat.gui
import * as dat from 'dat.gui';

// Class - ThreeGUI
export default class ThreeGUI  {
    constructor(base) {
        this.base = base;
        this.GUI = new dat.GUI();
        const cords = ['x', 'y', 'z'];

        // Meshes
        this.base.meshes.forEach((mesh, indx) => {
            let folder = this.GUI.addFolder(`${mesh.geometry.type} 00${++indx}`);

            cords.forEach(cord => {
                folder.add(mesh.position, cord, -1, 1, 0.01).name( `Translate ${cord}`); 
                folder.add(mesh.rotation, cord, 0, Math.PI * 2, 0.01).name( `Rotate ${cord}`); 
                folder.add(mesh.scale, cord, 0, 1, 0.01).name( `Scale ${cord}`); 
            });

            folder.add(mesh, 'visible', 0, 1, 0.01); 

            if (indx === 1) {
                folder.open();
            }
        });
        
        // Lights
        this.base.lights.forEach((light, indx) => {
            let folder = this.GUI.addFolder(`${light.type} 00${++indx}`);

            cords.forEach(cord => {
                folder.add(light.position, cord, -1, 1, 0.01).name( `Translate ${cord}`); 
            });

            folder.add(light, 'intensity', 0, 1, 0.1);
            folder.add(light, 'visible', 0, 1, 0.01); 
        });
    }
}