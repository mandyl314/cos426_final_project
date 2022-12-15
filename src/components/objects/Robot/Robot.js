import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './robot.gltf';

class Robot extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.clock = new THREE.Clock();

        // using GLTF file
        const loader = new GLTFLoader();
        this.name = 'robot';
        
        loader.load(MODEL, (gltf) => {
            this.model = gltf.scene;
            this.animations = gltf.animations;
            this.add(gltf.scene);
        });

        // setTimeout(() => {
        //     this.mixer = new THREE.AnimationMixer(this.model);
        //     console.log("set mixer: ", this.mixer);
        //     let mixer = new THREE.AnimationMixer(this.model);
        //     const running = THREE.AnimationClip.findByName(this.animations, 'Running');
        //     const action = mixer.clipAction(running);
        //     console.log("ACTION: ", action);
        //     action.play();
        //     action.loop = THREE.LoopRepeat;
        // }, 1000);
    }

    // animate() {
    //     console.log("robot update");
    //     console.log("Animation mixer: ", this.mixer);
    //     const dt = this.clock.getDelta();
    //     if (this.mixer) {
    //         this.mixer.update(dt);
    //         console.log("updated");
    //     }
    //     requestAnimationFrame(this.animate);
    // }

    // update(figure){
    //     this.position.z -=0.1;
    //     figure.handleCollision(this);
    // }
}

export default Robot;