import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
// PerspectiveCamera is most like seeing from human eyes
const camera = new THREE.PerspectiveCamera(
  // field of view (ammount of world visible) out 360 degrees
  75,
  // aspect ratio
  window.innerWidth / window.innerHeight,
  // view frustum
  // frustum -the portion of a cone or pyramid which remains
  // after its upper part has been cut off by a plane parallel
  // to its base, or which is intercepted between two such planes.
  0.1,
  // distance away objects can be seen
  1000
);

// renders the 3D objects onto a DOM element
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// an object has geometry that must be defined
const geometry = new THREE.IcosahedronGeometry();
// material is the wrapping paper
// custom shaders can be created using WebGL
const material = new THREE.MeshBasicMaterial({
  color: 0x9966d8,
  wireframe: true,
});
// Meshing creates the defined material wrapped geometry
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

camera.position.z = 5;

export function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.x += 0.001;
  icosahedron.rotation.y += 0.001;
  icosahedron.rotation.z += 0.001;

  renderer.render(scene, camera);
}
