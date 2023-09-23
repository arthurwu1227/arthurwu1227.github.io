let scene, camera, renderer;
const toruses = [];

    function getMinDistance(torus1, torus2) {
    // Assuming that the width of the torus is represented by the "radius" parameter of the TorusGeometry
    const radius1 = torus1.geometry.parameters.radius;
    const radius2 = torus2.geometry.parameters.radius;

    return (radius1 / 2) + (radius2 / 2);
}

    function biasedRandomHorizontally() {
    const r = Math.random();
    if (r < 0.5) {
        return (-1.0 - r * 0.5) * 50;
    } else {
        return (1.0 + (r - 0.5) * 0.5) * 50;
    }
}

function init() {



    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Set alpha for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = 'canvas';

    const numberOfTorus = Math.floor(Math.random() * 5) + 5; // Generate between 3 to 7 toruses
    const centerGeometry = new THREE.TorusGeometry(5, 2, 16, 100);
    const centerMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const centerTorus = new THREE.Mesh(centerGeometry, centerMaterial);
    toruses.push(centerTorus);
    scene.add(centerTorus);

    for (let i = 1; i < numberOfTorus; i++) { // Start from 1 since one torus is already added
        const geometry = new THREE.TorusGeometry(5, 2, 16, 100);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.5});
        const torus = new THREE.Mesh(geometry, material);

        torus.position.set(
            biasedRandomHorizontally(),
            (Math.random() - 0.5) * 50,  // Vertical position is random
            (Math.random() - 0.5) * 50   // Z position is random
        );

        toruses.push(torus);
        scene.add(torus);
    }

    camera.position.z = 70;  // Adjust camera position to fit bigger toruses

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('scroll', onScroll, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
    const delta = window.scrollY;
    toruses.forEach(torus => {
        torus.rotation.x += delta * 0.002;  // Spin faster
        torus.rotation.y += delta * 0.00175;
    });
}

function animate() {
    requestAnimationFrame(animate);
    toruses.forEach(torus => {
        torus.rotation.x += 0.01;  // Default spinning speed
        torus.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

init();
animate();