require('../objects/Train/scene.bin');

//Put your textures here
require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Figure, Train} from 'objects';
import { BasicLights } from 'lights';
import { Scene, Color } from 'three'
import * as Dat from 'dat.gui';
import { Obstacle } from '../objects/Obstacle';
import * as THREE from 'three';
import { BackgroundMusic, GameOverSound } from '../sounds';
import { Track, Grass, Princeton, Stars } from '../images';

class TrainScene extends Scene {
    constructor(camera) {
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            paused: false,
            volume: 0,
            updateList: [],
        };

        this.started = false;


        // set up audio
        // citation: https://threejs.org/docs/#api/en/audio/Audio
        // create an AudioListener and add it to the camera
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);

        // load a sound and set it as the Audio object's buffer
        this.audioLoader = new THREE.AudioLoader();

        // create a global audio source
        this.sound = new THREE.Audio( this.listener );

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        

        // const train1 = new Train(1);
        // const train2 = new Train(2);
        // const train3 = new Train(3);
        const basicLights = new BasicLights();
        // this.add(train1,train2,train3);
        this.add(basicLights);
        this.trains = [];
        // this.trains.push(train1,train2,train3);
        // this.add(train1);
        // this.trains.push(train1)

        const player = new Figure(this);
        this.add(player);
        this.player = player;

        const obstacle1 = new Obstacle(1);
        // const obstacle2 = new Obstacle(2);
        // const obstacle3 = new Obstacle(3);
        this.add( obstacle1);
        this.obstacles =[];
        this.obstacles.push(obstacle1);
        // this.obstacles.push(train1,train2,train3);

        const loader = new THREE.TextureLoader();
        const planeGeometry = new THREE.PlaneGeometry( 3, 3, 1, 1 );
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: loader.load(Track),
            });

        const material2 = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: loader.load(Grass),
            });
        for (let j=-1;j<=1;j++){
            for(let i=-5;i<10;i+=0.6){
                const ground = new THREE.Mesh( planeGeometry, material );
                ground.rotation.x = - Math.PI / 2;
                ground.scale.multiplyScalar( 1.2 );
                ground.position.set(j*3.6,0,i*6)
                this.add( ground );
            }
        }

        for (let j=-20;j<=20;j++){
            if(j>=-1&&j<=1){
                continue;
            }
            for(let i=-5;i<10;i+=0.6){
                const ground = new THREE.Mesh( planeGeometry, material2 );
                ground.rotation.x = - Math.PI / 2;
                ground.scale.multiplyScalar( 1.2 );
                ground.position.set(j*3.6,0,i*6)
                this.add( ground );
            }
        }

        const planeGeometry2 = new THREE.PlaneGeometry( 12, 5 );
        const material3 = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: loader.load(Stars),
            });
        
        const side1 = new THREE.Mesh( planeGeometry2, material3 );
        side1.rotation.x = Math.PI;
        side1.rotation.y = Math.PI/2;
        side1.rotation.z = Math.PI;
        side1.scale.multiplyScalar( 10);
        side1.position.set(-40,25,0)
        this.add( side1 );

        const side2 = new THREE.Mesh( planeGeometry2, material3 );
        side2.rotation.x = Math.PI;
        side2.rotation.y = -Math.PI/2;
        side2.rotation.z = Math.PI;
        side2.scale.multiplyScalar( 10);
        side2.position.set(40,25,0)
        this.add( side2 );

        const planeGeometry4 = new THREE.PlaneGeometry( 8, 5 );
        const material4 = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: loader.load(Princeton),
            });

        const side3 = new THREE.Mesh( planeGeometry4, material4 );
        side3.rotation.x = -Math.PI;
        // side3.rotation.y = Math.PI/4;
        side3.rotation.z = Math.PI;
        side3.scale.multiplyScalar( 10);
        side3.position.set(0,25,60)
        this.add( side3 );


        // Populate GUI
        this.state.gui.add(this.state, 'volume', 0, 10);
        this.state.gui.add(this.state, 'paused').onChange(this.togglePause);
    }
    
    togglePause() {
        this.paused = !this.paused;
        console.log(this.paused);
    }

    move_fig(key) {
        this.player.move_fig(key, this.obstacles);
    }

    stopJump() {
        this.player.stopJump();
    }

    update() {
        // apply gravity and update position
        this.player.applyGravity();
        //console.log(timeStamp);
        this.player.integrate(18/1000);

        if (!this.player.gameState) {
            console.log("here");
            location.reload();
        }
        let r = Math.random();
        if(r<0.003){
            let track = Math.floor(Math.random() * 3) + 1;
            let new_obs = new Obstacle(track);
            this.add(new_obs);
            this.obstacles.push(new_obs);
        }
        let r2 = Math.random();
        // if(r2<0.005){
        //     let track = Math.floor(Math.random() * 3) + 1;
        //     let train = this.trains[track-1];
        //     if(!train.visible){
        //         train.position.z = 30
        //     }
        // }
        // Call update for each object obstacles
        for (const obj of this.obstacles) {
            if(obj.visible){
                obj.update(this.player);
            }
        }

        
    }

    // Spacebar to start game
    startGame(){
        console.log("startGame");
        let sound = this.sound;
        this.audioLoader.load( BackgroundMusic, function( buffer) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.5 );
            sound.play();
        });
        this.started = true;
    }

    // q to end game
    endGame(){
        console.log("endGame")
        this.sound.stop();
        this.started = false;
    }

    // call this when player dies
    gameOver(){
        console.log("gameOver")
        this.sound.stop();
        let sound = this.sound;
        this.audioLoader.load( GameOverSound, function( buffer) {
            sound.setBuffer( buffer );
            sound.setVolume( 0.5 );
            sound.play();
            sound.setLoop( false );
            });
    }
}

export default TrainScene;
