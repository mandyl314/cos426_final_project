import * as THREE from 'three';
import { Group } from 'three';

// Reference: https://tympanus.net/codrops/2021/10/04/creating-3d-characters-in-three-js/
class Figure extends Group{
    constructor() {
        super();
        // Create body as a box
        // Create a material with a white color
        const material = new THREE.MeshLambertMaterial({ color: 0xc29a97 });
        const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 1);
        const mesh = new THREE.Mesh(bodyGeometry, material);
        this.add(mesh);

        // Create head
        const headGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4)
        const head = new THREE.Mesh(headGeometry, material)
        this.add(head)
        
        // Position it above the body
        head.position.y = 1.65

        // Create arms
        for (let i = 0; i < 2; i++) {
            const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
            const arm = new THREE.Mesh(geometry, material)
            
            this.add(arm)
        }
    }
}

export default Figure;