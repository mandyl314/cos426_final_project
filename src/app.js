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

const camera = new PerspectiveCamera();
// Initialize core ThreeJS components
const scene = new TrainScene(camera);
const axes = new AxesHelper(50);
scene.add(axes);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 20, -90);
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


const frustrum_check = (element,camera) => {
    const offset =40;
    if(element.position.z < camera.position.z-offset){
        return false;
    }
    return true;
}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    scene.traverse(function(element){
        element.visible = frustrum_check(element,camera);
    });
    if (!scene.state.paused && scene.started) {
        renderer.render(scene, camera);
        scene.update && scene.update(timeStamp);
    }else if(!scene.started){
        renderer.render(scene, camera);
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
};
const args= {camera: camera}
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
        scene.startGame();
    }
    if (key === 'q'){
        scene.endGame();
    }
    if (key === 't'){
        scene.gameOver();
    }

    if (key === 'ArrowUp') {
        scene.stopJump();
    }
});

// move
window.addEventListener("keydown", (e) => {
    const key = e.key;
    scene.move_fig(key);
});