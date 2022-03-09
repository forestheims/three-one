import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function App() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0x9966bf,
  });
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);

  function addStar() {
    const starGeometry = new THREE.SphereGeometry(0.33, 24, 24);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
  }

  Array(123).fill().forEach(addStar);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(pointLight, ambientLight);

  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function hoverThing() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      intersects[i].object.material.opacity = 0.5;
    }
  }

  function resetMaterials() {
    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].material) {
        scene.children[i].material.opacity = 1.0;
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    icosahedron.rotation.x += 0.005;
    icosahedron.rotation.y += 0.01;
    icosahedron.rotation.z += 0.005;

    controls.update();
    resetMaterials();
    hoverThing();
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onPointerMove, false);

  animate();
  console.log();

  return <></>;
}
