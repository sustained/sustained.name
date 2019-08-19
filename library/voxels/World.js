import { Vector3 } from "three";
import Chunk from "./Chunk.js";

export default class World {
  chunk;

  height = 1;
  radius = 0;

  chunks = {};

  constructor() {
    // this.chunk = new Chunk(new Vector3(0, 0, 0));
    // this.chunk.generateBlocks();
    // this.chunk.generateMesh();

    this.generateWorld();
  }

  getChunks() {
    return Object.values(this.chunks);
  }

  generateWorld() {
    console.time(
      `Generating world with chunk radius ${this.radius} and height ${
        this.height
      }`
    );

    for (let x = -this.radius; x < this.radius + 1; x++) {
      for (let y = this.height; y <= this.height; y++) {
        for (let z = -this.radius; z < this.radius + 1; z++) {
          const chunk = new Chunk(
            new Vector3(
              0, // x * Chunk.chunkSize.x,
              0, // y * Chunk.chunkSize.y,
              0 // z * Chunk.chunkSize.z
            )
          );
          chunk.generateBlocks();

          this.chunks[chunk.position.toString()] = chunk;
        }
      }
    }

    for (const chunk of this.getChunks()) {
      chunk.generateMesh();
    }

    console.timeEnd(
      `Generating world with chunk radius ${this.radius} and height ${
        this.height
      }`
    );
  }
}
