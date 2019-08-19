/* eslint-disable */

/*
  NOTE: We can probably use .groups/.addGroup to have a different colour for each block type.

  NOTE: Seems that we may not be able to do face colours when using indexed geometry however
        geometry.toNonIndexed() exists so that's a thing, of course we are using indexed
        geometry for a reason but I digress.
*/

import {
  Vector3,
  Math as Math3,
  Mesh,
  BufferGeometry,
  MeshLambertMaterial,
  MeshPhongMaterial,
  BufferAttribute,
  VertexColors
} from "three";

import { BlockData, BlockTypes, BlockUtils } from "./Block.js";
// import MeshGenerator from "./MeshGenerator.js";

export const FACES = [
  {
    // WEST
    dir: [-1, 0, 0],
    corners: [[0, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 1]]
  },
  {
    // EAST
    dir: [1, 0, 0],
    corners: [[1, 1, 1], [1, 0, 1], [1, 1, 0], [1, 0, 0]]
  },
  {
    // DOWN
    dir: [0, -1, 0],
    corners: [[1, 0, 1], [0, 0, 1], [1, 0, 0], [0, 0, 0]]
  },
  {
    // UP
    dir: [0, 1, 0],
    corners: [[0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0]]
  },
  {
    // SOUTH
    dir: [0, 0, -1],
    corners: [[1, 0, 0], [0, 0, 0], [1, 1, 0], [0, 1, 0]]
  },
  {
    // NORTH
    dir: [0, 0, 1],
    corners: [[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]
  }
];

export default class Chunk {
  static chunkSize = new Vector3(32, 32, 32);
  static sliceSize = Chunk.chunkSize.x * Chunk.chunkSize.z;

  mesh;
  geometry;
  material;

  ready = false;
  blocks;
  position;

  constructor(position) {
    this.position = position;
  }

  findBlockOffset(x, y, z) {
    const blockX = Math3.euclideanModulo(x, Chunk.chunkSize.x) | 0;
    const blockY = Math3.euclideanModulo(y, Chunk.chunkSize.y) | 0;
    const blockZ = Math3.euclideanModulo(z, Chunk.chunkSize.z) | 0;

    return blockY * Chunk.sliceSize + blockZ * Chunk.chunkSize.z + blockX;
  }

  getBlock(x, y, z) {
    const chunk = this.getChunkForBlock(x, y, z);

    if (!chunk) {
      return 0;
    }

    const index = this.findBlockOffset(x, y, z);
    return this.blocks[index];
  }

  getChunkForBlock(x, y, z) {
    const chunkX = Math.floor(x / Chunk.chunkSize.x);
    const chunkY = Math.floor(y / Chunk.chunkSize.y);
    const chunkZ = Math.floor(z / Chunk.chunkSize.z);

    if (chunkX !== 0 || chunkY !== 0 || chunkZ !== 0) {
      return null;
    }

    return this.blocks;
  }

  setBlock(x, y, z, value) {
    const index = this.findBlockOffset(x, y, z);
    this.blocks[index] = value;
  }

  generateBlocks() {
    console.time(
      "Generate blocks for chunk " + this.position.toArray().join(",")
    );

    this.blocks = new Uint8Array(
      new ArrayBuffer(Chunk.chunkSize.x * Chunk.chunkSize.y * Chunk.chunkSize.z)
    );

    for (let x = 0; x < Chunk.chunkSize.x; x++) {
      for (let y = 0; y < Chunk.chunkSize.y; y++) {
        for (let z = 0; z < Chunk.chunkSize.z; z++) {
          const height =
            (Math.sin((x / 32) * Math.PI * 2) +
              Math.sin((z / 32) * Math.PI * 3)) *
              (32 / 6) +
            32 / 2;

          if (y <= height) {
            const diff = height - y;

            if (diff <= 2) {
              this.setBlock(x, y, z, BlockTypes.GRASS);
            } else if (diff <= 7) {
              this.setBlock(x, y, z, BlockTypes.DIRT);
            } else {
              this.setBlock(x, y, z, BlockTypes.STONE);
            }
          }
        }
      }
    }

    console.timeEnd(
      "Generate blocks for chunk " + this.position.toArray().join(",")
    );
  }

  generateMesh() {
    console.time(
      "Generate mesh for chunk " + this.position.toArray().join(",")
    );

    const cellX = 0;
    const cellY = 0;
    const cellZ = 0;

    const colours = [];
    const positions = [];
    const normals = [];
    const indices = [];

    const startX = cellX * Chunk.chunkSize.x;
    const startY = cellY * Chunk.chunkSize.y;
    const startZ = cellZ * Chunk.chunkSize.z;

    for (let y = 0; y < Chunk.chunkSize.y; ++y) {
      const voxelY = startY + y;
      for (let z = 0; z < Chunk.chunkSize.z; ++z) {
        const voxelZ = startZ + z;
        for (let x = 0; x < Chunk.chunkSize.x; ++x) {
          const voxelX = startX + x;
          const voxel = this.getBlock(voxelX, voxelY, voxelZ);
          if (voxel) {
            for (const { dir, corners } of FACES) {
              const neighbor = this.getBlock(
                voxelX + dir[0],
                voxelY + dir[1],
                voxelZ + dir[2]
              );

              if (!neighbor) {
                const index = positions.length / 3;

                for (const pos of corners) {
                  const blockType = BlockUtils.toBlockType(voxel);
                  const blockColour = BlockData[blockType].colour;

                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                  normals.push(...dir);
                  colours.push(...blockColour);
                }
                indices.push(
                  index,
                  index + 1,
                  index + 2,
                  index + 2,
                  index + 1,
                  index + 3
                );
              }
            }
          }
        }
      }
    }

    this.geometry = new BufferGeometry();
    // const material = new MeshLambertMaterial({ color: "purple" });
    this.material = new MeshLambertMaterial({ vertexColors: VertexColors });
    // const material = new MeshPhongMaterial({
    //   vertexColors: VertexColors
    // });

    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const colorNumComponents = 3;

    this.geometry.addAttribute(
      "position",
      new BufferAttribute(new Float32Array(positions), positionNumComponents)
    );

    this.geometry.addAttribute(
      "normal",
      new BufferAttribute(new Float32Array(normals), normalNumComponents)
    );

    this.geometry.addAttribute(
      "color",
      new BufferAttribute(new Float32Array(colours), colorNumComponents)
    );

    this.geometry.setIndex(indices);

    this.mesh = new Mesh(this.geometry, this.material);

    console.timeEnd(
      "Generate mesh for chunk " + this.position.toArray().join(",")
    );

    return this.mesh;

    // const generator = new MeshGenerator(this.position, this.blocks);
    // generator.generateMesh();
    // this.mesh = generator.getMesh();
    // this.ready = true;
  }
}
