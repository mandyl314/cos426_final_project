require('../objects/Train/scene.bin');

//Put your textures here
require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Figure, Train} from 'objects';
import { BasicLights } from 'lights';
import { Scene, Color } from 'three'
import * as Dat from 'dat.gui';
import { Obstacle } from '../objects/Obstacle';

class TrainScene extends Scene {
    constructor() {
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            volume: 0,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        

        const train1 = new Train(9, 0, 40, 0, Math.PI/2, 0);
        // const train2 = new Train(0, 0, 40, 0, Math.PI/2, 0);
        // const train3 = new Train(-9, 0, 40,0, Math.PI/2, 0);
        const basicLights = new BasicLights();
        this.add(train1);
        this.add(basicLights);

        const player = new Figure();
        this.add(player);

        const obstacle1 = new Obstacle();
        obstacle1.set_position(1)
        const obstacle2 = new Obstacle();
        obstacle2.set_position(2)
        const obstacle3 = new Obstacle();
        obstacle3.set_position(3)
        this.add(obstacle1, obstacle2, obstacle3);

        // Populate GUI
        this.state.gui.add(this.state, 'volume', 0, 10);
    }
}

export default TrainScene;
