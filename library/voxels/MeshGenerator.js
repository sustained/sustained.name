import { BufferAttribute, BufferGeometry, Vector3 } from "three";
import Chunk from "./Chunk.js";
import Directions from "./Directions.js";

export default class MeshGenerator {
  uvs = [];
  vertices = [];
  triangles = []; // NOTE: Called "faces" in Three.js.

  faces = new Uint8Array(
    new ArrayBuffer(Chunk.size.x * Chunk.size.y * Chunk.size.z)
  );

  blocks = [];
  position;

  mesh;

  vertexIndex = 0;
  triangleIndex = 0;

  isVisible = false;

  constructor(position, blocks) {
    this.position = position;
    this.blocks = blocks;
  }

  generate() {
    let index = 0;

    for (let x = 0; x < Chunk.size.x; x++) {
      for (let y = 0; y < Chunk.size.y; y++) {
        for (let z = 0; z < Chunk.size.z; z++) {
          if (this.blocks[index].isTransparent()) {
            this.faces[index] = 0;
            index++;
            continue;
          }

          if (z === 0) {
            this.faces[index] |= Directions.SOUTH;
          } else if (z === Chunk.size.z - 1) {
            this.faces[index] |= Directions.NORTH;
          }

          if (y === 0) {
            this.faces[index] |= Directions.DOWN;
          } else if (y === Chunk.size.y - 1) {
            this.faces[index] |= Directions.UP;
          }

          if (x === 0) {
            this.faces[index] |= Directions.WEST;
          } else if (x === Chunk.size.x - 1) {
            this.faces[index] |= Directions.EAST;
          }

          index++;
        }
      }
    }

    index = 0;
    // const uvs = [];
    // const vertices = [];
    // const triangles = [];

    for (let x = 0; x < Chunk.size.x; x++) {
      for (let y = 0; y < Chunk.size.y; y++) {
        for (let z = 0; z < Chunk.size.z; z++) {
          const face = this.faces[index];

          if (face === 0) {
            index++;
            continue;
          }

          if ((face & Directions.NORTH) !== 0) {
            this.vertices[this.vertexIndex] = new Vector3(
              x + this.position.x,
              y + this.position.y,
              z + this.position.z + 1
            );
            this.vertices[this.vertexIndex + 1] = new Vector3(
              x + this.position.x + 1,
              y + this.position.y,
              z + this.position.z + 1
            );
            this.vertices[this.vertexIndex + 2] = new Vector3(
              x + this.position.x,
              y + this.position.y + 1,
              z + this.position.z + 1
            );
            this.vertices[this.vertexIndex + 3] = new Vector3(
              x + this.position.x + 1,
              y + this.position.y + 1,
              z + this.position.z + 1
            );

            this.triangles[this.triangleIndex] = this.vertexIndex + 1;
            this.triangles[this.triangleIndex + 1] = this.vertexIndex + 2;
            this.triangles[this.triangleIndex + 2] = this.vertexIndex;
            this.triangles[this.triangleIndex + 3] = this.vertexIndex + 1;
            this.triangles[this.triangleIndex + 4] = this.vertexIndex + 3;
            this.triangles[this.triangleIndex + 5] = this.vertexIndex + 2;

            this.vertexIndex += 4;
            this.triangleIndex += 6;
          }

          index++;
        }
      }
    }
  }

  getMesh(mesh) {
    if (mesh === null) {
      mesh = new BufferGeometry();
    } else {
      mesh.dispose();
    }

    if (this.isVisible === false || this.vertexIndex === 0) {
      return mesh;
    }

    mesh.addAttribute(
      "position",
      new BufferAttribute(new Float32Array(this.vertices))
    );
    mesh.addAttribute(
      "normal",
      new BufferAttribute(new Float32Array(this.normals))
    );
    mesh.addAttribute("uv", new BufferAttribute(new Float32Array(this.uvs)));

    // mesh.uvs = this.uvs;
    // mesh.vertices = this.vertices;
    // mesh.triangles = this.triangles;

    mesh.computeVertexNormals();

    return mesh;
  }
}
