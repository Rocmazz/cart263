import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Planet class for Team A
export class PlanetA {
  constructor(scene, orbitRadius, orbitSpeed) {
    this.scene = scene;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.angle = Math.random() * Math.PI * 2;

    this.group = new THREE.Group();

    // planet rubber duck
    const planetGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({ color: 0xff8fd1 });
    this.planet = new THREE.Mesh(planetGeo, planetMat);
    this.planet.castShadow = true;
    this.planet.receiveShadow = true;
    this.group.add(this.planet);

    // ring
    const ringGeo = new THREE.TorusGeometry(2.5, 0.15, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xaee7ff });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = Math.PI / 2.4;
    this.ring.castShadow = true;
    this.ring.receiveShadow = true;
    this.group.add(this.ring);

    // moon
    this.moonGroup = new THREE.Group();

    const moonGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const moonMat = new THREE.MeshStandardMaterial({ color: 0xffeb69 });
    this.moon = new THREE.Mesh(moonGeo, moonMat);
    this.moon.position.x = 3.2;
    this.moon.castShadow = true;
    this.moon.receiveShadow = true;

    this.moonGroup.add(this.moon);
    this.group.add(this.moonGroup);

    // duck
    this.duck = null;
    const loader = new GLTFLoader();

    loader.load("models/DUCK.glb", (gltf) => {
      this.duck = gltf.scene;

      this.duck.scale.set(0.35, 0.35, 0.35);
      this.duck.position.set(0, 1.8, 0);
      this.duck.rotation.x = 0.2;

      this.duck.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.group.add(this.duck);
    });

    // click animation
    this.isClicked = false;
    this.currentScale = 1;

    this.scene.add(this.group);
  }

  update(delta) {
    // orbit around sun
    this.angle += this.orbitSpeed * delta * 30;
    this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
    this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

    // rotate planet a bit
    this.planet.rotation.y += delta * 0.6;
    this.ring.rotation.z += delta * 0.3;

    // moon orbit
    this.moonGroup.rotation.y += delta * 1.5;

    // duck rotate a little
    if (this.duck) {
      this.duck.rotation.y += delta * 0.8;
    }

    // click pulse
    if (this.isClicked) {
      this.currentScale += delta * 2;

      if (this.currentScale >= 1.25) {
        this.isClicked = false;
      }
    } else {
      if (this.currentScale > 1) {
        this.currentScale -= delta * 2;
      }

      if (this.currentScale < 1) {
        this.currentScale = 1;
      }
    }

    this.group.scale.set(
      this.currentScale,
      this.currentScale,
      this.currentScale
    );
  }

  click(mouse, scene, camera) {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(this.planet);

    if (intersects.length > 0) {
      this.isClicked = true;
    }
  }
}
