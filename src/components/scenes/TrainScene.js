require('../objects/Train/scene.bin');
require('../objects/Robot/scene.bin');

//Put your textures here
require('../objects/Train/baggagecar_Material_u1_v1_baseColor.png');

import { Figure, Robot, Train} from 'objects';
import { BasicLights } from 'lights';
import { Scene, Color } from 'three'
import * as Dat from 'dat.gui';
import { Obstacle } from '../objects/Obstacle';
import * as THREE from 'three';
import { BackgroundMusic, GameOverSound } from '../sounds';

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
        

        // const train1 = new Train(3, 0, 30, 0, Math.PI/2, 0);
        // const train2 = new Train(0, 0, 40, 0, Math.PI/2, 0);
        // const train3 = new Train(-9, 0, 40,0, Math.PI/2, 0);
        const basicLights = new BasicLights();
        // this.add(train1);
        this.add(basicLights);

        // const player = new Figure(this);
        // this.add(player);
        // this.player = player;

        const robot = new Robot(this);
        this.add(robot);
        this.player = robot;
        console.log("IN SCENE: ", this.player);

        const obstacle1 = new Obstacle(1);
        const obstacle2 = new Obstacle(2);
        const obstacle3 = new Obstacle(3);
        this.add(obstacle1, obstacle2);
        this.obstacles =[];
        this.obstacles.push(obstacle1, obstacle2)

        // Populate GUI
        this.state.gui.add(this.state, 'volume', 0, 10);
        this.state.gui.add(this.state, 'paused').onChange(this.togglePause);
    }
    
    togglePause() {
        this.paused = !this.paused;
        console.log(this.paused);
    }

    move_fig(key) {
        // this.player.move_fig(key, this.obstacles);
    }

    update() {
        console.log("scene updating");
        // if (!this.player.gameState) {
        //     location.reload();
        // }
        // this.player.update();

        let r = Math.random();
        if(r<0.005){
            let track = Math.floor(Math.random() * 3) + 1;
            let new_obs = new Obstacle(track);
            this.add(new_obs);
            this.obstacles.push(new_obs);
        }
        // Call update for each object obstacles
        for (const obj of this.obstacles) {
            obj.update(this.player);
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
        // this.player.animate();
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
