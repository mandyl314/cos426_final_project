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
            paused: false,
            volume: 0,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        

        // const train1 = new Train(9, 0, 40, 0, Math.PI/2, 0);
        // const train2 = new Train(0, 0, 40, 0, Math.PI/2, 0);
        // const train3 = new Train(-9, 0, 40,0, Math.PI/2, 0);
        const basicLights = new BasicLights();
        // this.add(train1);
        this.add(basicLights);

        const player = new Figure();
        this.add(player);
        this.player = player;

        const obstacle1 = new Obstacle(1);
        const obstacle2 = new Obstacle(2);
        const obstacle3 = new Obstacle(3);
        this.add(obstacle1, obstacle2);
        this.obstacles =[];
        this.obstacles.push(obstacle1, obstacle2)

        // Populate GUI
        this.state.gui.add(this.state, 'volume', 0, 10);
        this.state.gui.add(this.state, 'paused').onChange(this.togglePause);
    }
    
    togglePause() {
        this.paused = !this.paused;
        console.log(this.paused);
    }

    move_fig(key) {
        this.player.move_fig(key, this.obstacles);
    }

    update() {
        if (!this.player.gameState) {
            console.log("here");
            location.reload();
        }
        // Call update for each object obstacles
        for (const obj of this.obstacles) {
            obj.update(this.player);
        }
    }
}

export default TrainScene;
