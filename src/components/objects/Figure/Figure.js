import * as THREE from 'three';
import { Group } from 'three';

// Reference: https://tympanus.net/codrops/2021/10/04/creating-3d-characters-in-three-js/
class Figure extends Group{
    constructor() {
        super();
        // Create body as a box
        // Create a material with a white color
        const material = new THREE.MeshLambertMaterial({ color: 0xc29a97 });
        const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
        const mesh = new THREE.Mesh(bodyGeometry, material);
        this.add(mesh);
        this.body_offset = 0.5; // front of body = this.pos.z - body_offset
        this.height_offset = (2+.5)/2;

        // Create head
        const headGeometry = new THREE.BoxGeometry(.5, .5, .5)
        const head = new THREE.Mesh(headGeometry, material)
        this.add(head)
        
        // Position it above the body
        head.position.y = 1 + .25;

        // Create arms
        for (let i = 0; i < 2; i++) {
            const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
            const arm = new THREE.Mesh(geometry, material)
            
            this.add(arm)
        }

        this.track = 2;
    }
    move_fig(key, obstacles) {
        if (key === "ArrowLeft") {
            this.position.x += 10.0;
            this.track = this.track - 1;
        }
        if (key === "ArrowRight" ) {
            this.position.x -= 10.0;
            this.track = this.track + 1;
        }

        // TODO: need to handle jump
        if (key === "ArrowUp") {
            this.position.z += 2.0;
        }
        if (key === "ArrowDown") {
            this.position.z -= 2.0;
        }
        for(let i=0;i<obstacles.length;i++){
            this.handleCollision(obstacles[i])
        }
    }

    death(obstacle){
        let obs_pos = obstacle.position.clone()
        this.rotation.x = -Math.PI / 2;
        this.position.z = obs_pos.z - obstacle.width_offset - this.height_offset;
        console.log(this);
    }
      
    handleCollision(obstacle) {

          let pos = this.position.clone();
          let obs_pos = obstacle.position.clone();
          let width_offset = obstacle.width_offset;
          let height_offset =obstacle.height_offset;

          if(this.track == obstacle.track){
            if(obs_pos.z - width_offset<=pos.z && obs_pos.z + width_offset>=pos.z){
                this.death(obstacle);
              }
          }

        
    }
}

export default Figure;