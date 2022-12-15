import * as THREE from 'three';
import { Group } from 'three';
import { BricksTexture } from '../../images';

// Reference: https://tympanus.net/codrops/2021/10/04/creating-3d-characters-in-three-js/
class Obstacle extends Group{
    constructor(track) {
        super();

        const loader = new THREE.TextureLoader();
 
        // texture mapping citation: https://threejs.org/manual/#en/textures
        const material = new THREE.MeshBasicMaterial({
        color: 0xFF8844,
        map: loader.load(BricksTexture),
        });
        
        this.front_offset = .25; // front of box = this.position.z - front_offset
        this.back_offset = .25;
        this.height_offset = 1.2; // top of box = this.position.y + height_offset
        this.track = track;

        const obstacleGeometry = new THREE.BoxGeometry(2, this.height_offset , .5);
        const mesh = new THREE.Mesh(obstacleGeometry, material);
        this.add(mesh);

        this.set_position(track);
    }

    set_position(track){
        if (track === 1) {
            this.position.x =3.6;
            this.position.y =this.height_offset/2;
            this.position.z =20;
        }
        if (track === 2) {
            this.position.x =0;
            this.position.y =this.height_offset/2;
            this.position.z =20;
        }
        if (track === 3) {
            this.position.x =-3.6;
            this.position.y =this.height_offset/2;
            this.position.z =20;
        }
    }
    update(figure){
        this.position.z -=0.1;
        figure.handleCollision(this, false, false);
    }
}

export default Obstacle;