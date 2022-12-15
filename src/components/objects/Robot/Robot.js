import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './robot.gltf';

class Robot extends Group {
    constructor(scene) {
        // Call parent Group() constructor
        super();
        this.gameState = true;      // a variable used to determine game state
        this.scene = scene;
        this.clock = new THREE.Clock();

        // Set up dynamics
        this.previous = new THREE.Vector3();
        this.netForce = new THREE.Vector3();
        this.gravity = -9.8 * 50;
        this.mass = 70;

        this.isJumping = false;

        // using GLTF file
        const loader = new GLTFLoader();
        this.name = 'robot';
        
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(.7, .7, .7);
            this.model = gltf.scene;
            this.animations = gltf.animations;
            this.add(gltf.scene);
        });

        this.track = 2;     // start in the middle track
        this.position.set(0, 0, -8);

        this.body_offset = 2/1; // front of body = this.pos.z - body_offset
        this.height_offset = (5+.5)/2;
    }

    move_fig(key, obstacles) {
        let switchTracks = false;
        let moved_left = false;
        if (key === "ArrowLeft" && this.track != 1) {
            this.position.x += 3.6;
            this.track = this.track - 1;
            switchTracks = true;
            moved_left = true;
        }
        if (key === "ArrowRight" && this.track != 3) {
            this.position.x -= 3.6;
            this.track = this.track + 1;
            switchTracks = true;
        }

        if (key === "ArrowUp") {
            if (this.gravity > 9.8 * 50 - 1) {
                return;
            }
            this.gravity *= -1.5;
        }
        
        for(let i=0;i<obstacles.length;i++){
            this.handleCollision(obstacles[i],switchTracks,moved_left);
        }
    }

    handleCollision(obstacle, switchTracks, moved_left) {
        let pos = this.position.clone();
        let obs_pos = obstacle.position.clone();
        let front_offset = obstacle.front_offset;
        let back_offset = obstacle.back_offset;
        let height_offset = obstacle.height_offset;


        if (this.track == obstacle.track){
            if ((obs_pos.z - front_offset<=pos.z && obs_pos.z + back_offset>=pos.z) && obs_pos.y + height_offset >= pos.y){
                console.log("here");
                this.death(obstacle, switchTracks,moved_left);
            }
        }
    }

    stopJump() {
        this.gravity /= -1.5;
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
        // console.log(newPos);
        this.position.x = newPos.x;
        this.position.y = newPos.y;
        //this.position.z = newPos.z;
        //this.position = newPos;
        this.netForce = new THREE.Vector3();
        // console.log(this.position);
        
        // floor
        if (this.position.y < 0) {
            this.position.y = 0;
        }

        if (this.position.y >= 5.0) {
            this.stopJump();
        }
    }

    death(obstacle, switchTracks, moved_left){
        let obs_pos = obstacle.position.clone()
        const EPS = .5
        const half_track_width = 1.8+EPS;
        if (!switchTracks){
            this.rotation.x = -Math.PI / 2;
            this.position.z = obs_pos.z - obstacle.front_offset - this.height_offset;
        } else if(moved_left){
            this.position.x = this.position.x-half_track_width
        } else{
            this.position.x = this.position.x+half_track_width
        }

        // game over sound: need to fix
        this.scene.gameOver(this);

        this.gameState = false;
    }
}

export default Robot;