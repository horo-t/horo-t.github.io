import * as THREE from 'https://three.js/src/Three.js';

export function run(container) {
  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
  camera.position.z = 1000;

  let geometry = new THREE.BoxGeometry(200, 200, 200);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);

  container.appendChild(renderer.domElement);

  let animate = () => {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
  }
  animate();
}
