import * as THREE from 'three';
import { Group } from 'three';
import { BricksTexture } from '../../images';

// Reference: https://tympanus.net/codrops/2021/10/04/creating-3d-characters-in-three-js/
class Obstacle extends Group{
    constructor() {
        super();

        const loader = new THREE.TextureLoader();
 
        // texture mapping citation: https://threejs.org/manual/#en/textures
        const material = new THREE.MeshBasicMaterial({
        color: 0xFF8844,
        map: loader.load(BricksTexture),
        });

        const obstacleGeometry = new THREE.BoxGeometry(2, 2, .5);
        const mesh = new THREE.Mesh(obstacleGeometry, material);
        this.add(mesh);
    
    }

    // temp
    set_position(track){
        if (track === 1) {
            this.position.x =-9;
            this.position.y =0;
            this.position.z =10;
        }
        if (track === 2) {
            this.position.x =0;
            this.position.y =0;
            this.position.z =10;
        }
        if (track === 3) {
            this.position.x =9;
            this.position.y =0;
            this.position.z =10;
        }
    }
}

export default Obstacle;