import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function App() {
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
  // BasicMaterial does not interact with lighting
  // StandardMaterial does interact with lighting
  const material = new THREE.MeshStandardMaterial({
    color: 0x9966bf,
  });
  // Meshing creates the defined material wrapped geometry
  const icosahedron = new THREE.Mesh(geometry, material);
  // adding the shape to the scene;
  scene.add(icosahedron);
  camera.position.z = 20;

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(lightHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff);

  scene.add(pointLight, ambientLight);

  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper);

  // listens to dom elements from the mouse, and updates the camera
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

  Array(333).fill().forEach(addStar);

  function animate() {
    requestAnimationFrame(animate);

    icosahedron.rotation.x += 0.001;
    icosahedron.rotation.y += 0.005;
    icosahedron.rotation.z += 0.001;

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
  return <></>;
}
