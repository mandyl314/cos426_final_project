// require('../objects/Train/scene.bin');

// //Put your textures here
// require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './train.gltf';

class Train extends Group {
    constructor(track) {
        // Call parent Group() constructor
        super();
        let posx = 0;
        if (track == 1) posx = 3.6;
        else if (track == 3) posx = -3.6;


        // using GLTF file
        const loader = new GLTFLoader();
        this.name = 'train';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(1, .7, .8);
            // ex. (9, 0, 20)
            gltf.scene.position.set(0, 0, 0);
            gltf.scene.rotation.set(0, Math.PI/2, 0);
            this.add(gltf.scene);
        });
        this.position.x = posx;
        // this.position.z = 30*track*track;
        this.position.z = 30;
        if (track == 2) this.position.z = 90;
        else if (track == 3) this.position.z = 150;

        this.back_offset = 10; // back of box = this.position.z + back_offset
        this.front_offset = 13; // front of box = this.position.z - front_offset
        this.height_offset = 50 // can't jump of trains
        this.track = track;
    }
    update(figure){
        this.position.z -=0.1;
        // (this,false,false);
    }
}

export default Train;