import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './train.gltf';
import TEXTURE from './baggagecar_Material_u1_v1_baseColor.png';
// import SCENE from './scene.bin';

class Train extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        // using GLTF file
        const loader = new GLTFLoader();
        this.name = 'train';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // using GLB file
        // const loader = new GLTFLoader();
        // loader.load(MODEL, function ( gltf ) {
        //     this.add( gltf.scene );
        // }, undefined, function ( error ) {
        //     console.error( error );
        // } );
    }
}

export default Train;