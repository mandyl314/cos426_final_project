import * as THREE from 'three';
import { Group } from 'three';

// Reference: https://tympanus.net/codrops/2021/10/04/creating-3d-characters-in-three-js/
class Figure extends Group{ 
    constructor(scene) {
        super();
        this.gameState = true;      // a variable used to determine game state

        this.previous = new THREE.Vector3();
        this.netForce = new THREE.Vector3();
        this.gravity = -9.8 * 20;
        this.mass = 70;

        this.isJumping = false;

        // Create body as a box
        // Create a material with a white color
        const material = new THREE.MeshLambertMaterial({ color: 0xc29a97 });
        const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
        const mesh = new THREE.Mesh(bodyGeometry, material);
        this.add(mesh);
        this.body_offset = 0.5; // front of body = this.pos.z - body_offset
        this.height_offset = (2+.5)/2;

        this.scene = scene;

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

        this.position.set(0, 0, -10);
    }
    move_fig(key, obstacles) {
        if (key === "ArrowLeft" && this.track != 1) {
            this.position.x += 3.0;
            this.track = this.track - 1;
        }
        if (key === "ArrowRight" && this.track != 3) {
            this.position.x -= 3.0;
            this.track = this.track + 1;
        }

        if (key === "ArrowUp") {
            //const force = new THREE.Vector3(0, 400000, 0);
            //this.netForce.addVectors(this.netForce, force);
            this.gravity *= -2.0;
        }
        
        for(let i=0;i<obstacles.length;i++){
            this.handleCollision(obstacles[i]);
        }
    }

    stopJump() {
        this.gravity /= -2.0;
    }

    applyGravity() {
        const force = new THREE.Vector3(0, this.gravity * this.mass, 0);
        this.netForce.addVectors(this.netForce, force);
    }

    integrate(deltaT) {

        const DAMPING = 0.0;
        const newPos = new THREE.Vector3();
        const vtdt = new THREE.Vector3();

        vtdt.subVectors(this.position, this.previous);
        this.previous = this.position;
        newPos.add(this.position);
        newPos.add(vtdt.multiplyScalar(1 - DAMPING));
        const at = this.netForce.divideScalar(this.mass);
        newPos.add(at.multiplyScalar(deltaT * deltaT));
        console.log(newPos);
        this.position.x = newPos.x;
        this.position.y = newPos.y;
        //this.position.z = newPos.z;
        //this.position = newPos;
        this.netForce = new THREE.Vector3();
        console.log(this.position);
        
        // floor
        if (this.position.y < 0) {
            this.position.y = 0;
        }
    }

    death(obstacle){
        let obs_pos = obstacle.position.clone()
        this.rotation.x = -Math.PI / 2;
        this.position.z = obs_pos.z - obstacle.width_offset - this.height_offset;

        // game over sound: need to fix
        this.scene.gameOver(this);

        this.gameState = false;
        console.log(this);
    }
      
    handleCollision(obstacle) {

          let pos = this.position.clone();
          let obs_pos = obstacle.position.clone();
          let width_offset = obstacle.width_offset;
          let height_offset = obstacle.height_offset;

          if(this.track == obstacle.track){
            if((obs_pos.z - width_offset<=pos.z && obs_pos.z + width_offset>=pos.z) && obs_pos.y + height_offset >= pos.y){
                this.death(obstacle);
            }
          }

        
    }
}

export default Figure;