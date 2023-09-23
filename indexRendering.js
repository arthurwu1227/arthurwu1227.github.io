let scene, camera, renderer;
const cubes = [];
const cubeSizes = [];
const cubePositions = [];

function isOverlapping(x, y, z, size) {
    for (let i = 0; i < cubePositions.length; i++) {
        const dx = x - cubePositions[i].x;
        const dy = y - cubePositions[i].y;
        const dz = z - cubePositions[i].z;

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < size + cubeSizes[i]) {
            return true;
        }
    }
    return false;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const MIN_CUBE_SIZE = 5;
    const MAX_CUBE_SIZE = 7; // Maximum cube size
    const MAX_POSITION = 40; // Maximum absolute position for x, y, and z

    for (let i = 0; i < 15; i++) {
        let size = Math.max(Math.random() * MAX_CUBE_SIZE, MIN_CUBE_SIZE); // Assign a random size up to MAX_CUBE_SIZE
        let geometry = new THREE.BoxGeometry(size, size, size);
        let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, opacity: 0.6, transparent: true });
        let cube = new THREE.Mesh(geometry, material);

        let xPos, yPos, zPos;
        do {
            xPos = (Math.random() - 0.5) * 2 * MAX_POSITION;
            yPos = (Math.random() - 0.5) * 2 * MAX_POSITION;
            zPos = (Math.random() - 0.5) * 2 * MAX_POSITION;
        } while (isOverlapping(xPos, yPos, zPos, size)); // Make sure the cubes don't overlap

        cubePositions.push({ x: xPos, y: yPos, z: zPos });
        cubeSizes.push(size);

        cube.position.set(xPos, yPos, zPos);
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        cubes.push(cube);
        scene.add(cube);
    }

    camera.position.z = 50;

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
    });

    renderer.render(scene, camera);
}

init();
animate();

