require('../objects/Train/scene.bin');

//Put your textures here
require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Figure, Train } from 'objects';
import { BasicLights } from 'lights';
import { Scene, Color } from 'three'
import * as Dat from 'dat.gui';

class TrainScene extends Scene {
    constructor() {
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        

        // const train1 = new Train(9, 0, 20, 0, Math.PI/2, 0);
        // const train2 = new Train(0, 0, 20, 0, Math.PI/2, 0);
        // const train3 = new Train(-9, 0, 20,0, Math.PI/2, 0);
        const basicLights = new BasicLights();
        // this.add(train1, train2, train3);
        this.add(basicLights);

        const player = new Figure();
        this.add(player);
    }
}

export default TrainScene;
