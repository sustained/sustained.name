<template>
  <div id="voxels">
    <canvas id="three"></canvas>

    <!-- <canvas id="noise"></canvas> -->
  </div>
</template>

<script>
/* eslint-disable */

/*
  https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
*/

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  Vector3,
  Color,
  MeshBasicMaterial,
  DirectionalLight
} from "three";
import OrbitControls from "three-orbitcontrols";

import SimplexNoise from "simplex-noise";

import Chunk from "@/library/voxels/Chunk.js";
import World from "@/library/voxels/World.js";

export default {
  layout: "projects",

  data() {
    return {
      cube: null,
      scene: null,
      camera: null,
      renderer: null,

      simplex: new SimplexNoise("seed"),

      scale: 0.05,
      size: 8
    };
  },

  mounted() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight; // - 92;

    this.scene = new Scene();
    this.scene.background = new Color("lightblue");

    const canvas = document.querySelector("#three");
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(
      -Chunk.chunkSize.x * 0.5,
      Chunk.chunkSize.y * 1.0,
      -Chunk.chunkSize.z * 0.5
    );
    const controls = new OrbitControls(this.camera, canvas);
    controls.target.set(
      Chunk.chunkSize.x / 2,
      Chunk.chunkSize.y / 3,
      Chunk.chunkSize.z / 2
    );
    controls.update();

    const addLight = (x, y, z) => {
      const color = 0xffffff;
      const intensity = 1;
      const light = new DirectionalLight(color, intensity);
      light.position.set(x, y, z);
      this.scene.add(light);
    };
    addLight(-1, 2, 4);
    addLight(1, -1, -2);

    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshBasicMaterial({ color: 0x00ff00 });

    // this.cube = new Mesh(geometry, material);
    // this.scene.add(this.cube);

    // const world = new World();
    // world.generateWorld();
    // for (const chunk of world.getChunks()) {
    //   this.scene.add(chunk.mesh);
    // }

    const chunk = new Chunk(new Vector3(0, 0, 0));
    chunk.generateBlocks();
    const mesh = chunk.generateMesh();
    this.scene.add(mesh);

    // this.camera.position.z = 5;

    this.animate();
  },

  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    },

    renderNoise() {
      const canvas = document.getElementById("noise");
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < Math.ceil(canvas.width / this.size); x++) {
        for (let y = 0; y < Math.ceil(canvas.height / this.size); y++) {
          const noise =
            (this.simplex.noise2D(x * this.scale, y * this.scale) + 1) / 2;
          const rgb = Math.floor(noise * 255);
          console.log(rgb);

          context.fillStyle = `rgb(${rgb}, ${rgb}, ${rgb})`;
          context.fillRect(x * this.size, y * this.size, this.size, this.size);
        }
      }
    }
  },

  head() {
    return {
      title: "Voxels - Projects"
    };
  }
};
</script>

<style>
header.main {
  display: none;
}
</style>
