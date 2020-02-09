import React from 'react';
import * as THREE from 'three';

class Earth extends React.Component {
  state = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    renderer: null,
    scene: new THREE.Scene(),
    camera: null,
    light: null,
    mesh: null,
  };

  componentDidMount() {
    this.createRender();
    this.createScene();
    this.createCamera();
    this.createLight();
    this.createMesh();

    const loop = () => {
      const {mesh, renderer, scene, camera} = this.state;

      mesh.rotation.y += Math.PI / 500;

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };

    loop();
  };

  createRender() {
    const {WIDTH, HEIGHT} = this.state;
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000);

    document.querySelector('#root').appendChild(renderer.domElement);

    this.setState({
      renderer
    })
  }

  createScene() {
    this.setState({
      scene: new THREE.Scene(),
    });
  }

  createCamera() {
    const {WIDTH, HEIGHT} = this.state;
    const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 5000);

    camera.position.set(0, 0, 1000);

    this.setState({
      camera
    });
  }

  createLight() {
    const {scene} = this.state;
    const light = new THREE.AmbientLight(0xffffff);

    scene.add(light);

    this.setState({
      scene,
      light
    });
  }

  createMesh() {
    const {scene} = this.state;
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(250, 12, 12);
    const material = new THREE.MeshBasicMaterial({
      map: textureLoader.load('https://i.imgur.com/Plwfx92.jpg'),
    });
    //map: textureLoader.load('./images/real world map.jpg'),
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    this.setState({
      mesh,
      scene
    });
  }

  render() {
    const {renderer} = this.state;
    const canvas = renderer && renderer.domElement;
    console.log(canvas);

    return (
      <h1>Hello world!</h1>
    );
  }
}

export default Earth;
