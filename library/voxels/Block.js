import { toThreeColour } from "./Utilities.js";

export const BlockTypes = Object.freeze({
  AIR: 0x0000,
  GRASS: 0x0001,
  DIRT: 0x0002,
  STONE: 0x0003
});

export const BlockTypeMap = Object.keys(BlockTypes).reduce((flipped, key) => {
  flipped[BlockTypes[key]] = key;
  return flipped;
}, {});

export const BlockData = Object.freeze({
  AIR: {
    color: toThreeColour([255, 0, 0])
  },

  GRASS: {
    colour: toThreeColour([32, 161, 22])
  },

  DIRT: {
    colour: toThreeColour([94, 77, 64])
  },

  STONE: {
    colour: toThreeColour([142, 145, 141])
  }
});

export class BlockUtils {
  static isTransparent(block) {
    return block === BlockTypes.AIR;
  }

  static toBlockType(block) {
    return BlockTypeMap[block];
  }

  static toBlock(type) {
    return BlockTypes[type];
  }
}
