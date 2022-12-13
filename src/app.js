/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrainScene } from 'scenes';
import * as THREE from 'three';
import { BackgroundMusic, GameOverSound } from './components/sounds';

// Initialize core ThreeJS components
const scene = new TrainScene();
const axes = new AxesHelper(50);
scene.add(axes);
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 10, -20);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();


// set up audio
// citation: https://threejs.org/docs/#api/en/audio/Audio
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener );

// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();


// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// start game
window.addEventListener("keyup", (e) => {
    const key = e.key;
    if (key === ' '){
        startGame();
    }
    if (key === 'q'){
        endGame();
    }
    if (key === 't'){
        gameOver();
    }
});

// Spacebar to start game
const startGame = () =>{
    console.log("startGame")
    audioLoader.load( BackgroundMusic, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });
}

// q to end game
const endGame = () =>{
    console.log("endGame")
    sound.stop();
}

// call this when player dies
const gameOver = () =>{
    console.log("gameOver")
    sound.stop();
    audioLoader.load( GameOverSound, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setVolume( 0.5 );
        sound.play();
        sound.setLoop( false );
    });
}
