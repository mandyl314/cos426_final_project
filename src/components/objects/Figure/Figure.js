class Figure {
    constructor() {
    }

    createBody() {
        this.body = new THREE.Group();
        // Create a material with a white color
        const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const geometry = new THREE.BoxGeometry(1, 1.5, 1);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }

    init() {
        this.createBody();
    }
}