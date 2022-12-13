// require('../objects/Train/scene.bin');

// //Put your textures here
// require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './train.gltf';

class Train extends Group {
    constructor(posx, posy, posz, rotx, roty, rotz) {
        // Call parent Group() constructor
        super();

        // using GLTF file
        const loader = new GLTFLoader();
        this.name = 'train';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(1, 1, 1);
            // ex. (9, 0, 20)
            gltf.scene.position.set(posx, posy, posz);
            gltf.scene.rotation.set(rotx, roty, rotz);
            this.add(gltf.scene);
        });
    }
    update(figure){
        this.position.z -=0.1;
        figure.handleCollision(this);
    }
}

export default Train;