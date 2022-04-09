import {BlockType} from "./blockType";

export default class Block {
    public blockType: BlockType
    private readonly children: Block[]

    constructor(blockType: BlockType) {
        this.blockType = blockType
        this.children = []
    }

    public addChild(child: Block) {
        this.children.push(child)
    }

    text(level = 0, result = "") {
        result += `${'-'.repeat(level)}> ${this.blockType}\n`
        for (const block of this.children) {
            result += block.text(level + 1, result)
        }
        return result
    }
}
