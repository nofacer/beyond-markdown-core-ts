import Block from "./block";
import {BlockType} from "./blockType";

export default class ParagraphBlock extends Block {
    content: string

    constructor(blockType: BlockType, content: string) {
        super(blockType);
        this.content = content
    }

    text(level: number = 0, result: string = ""): string {
        return `${'-'.repeat(level)}> ${this.blockType} (${this.content})\n`
    }
}
