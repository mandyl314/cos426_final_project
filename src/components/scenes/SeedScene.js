import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();
        this.add(land, flower, lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    move(key) {
        if (key === "ArrowLeft") {
            console.log('hi');
            this.position.x += 2.0;
        }
        if (key === "ArrowRight") {
            this.position.x -= 2.0;
        }
        if (key === "ArrowUp") {
            this.position.y += 2.0;
        }
        if (key === "ArrowDown") {
            this.position.y -= 2.0;
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        //this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // added
        this.position.z = (rotationSpeed * timeStamp) / 1000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
