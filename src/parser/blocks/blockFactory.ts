import Block from "./block";
import BlockOption from "./blockOption";
import {BlockType} from "./blockType";
import ParagraphBlock from "./paragraphBlock";

export default class BlockFactory {
    static generate(blockOption: BlockOption): Block {
        if (blockOption.blockType === BlockType.Paragraph) {
            return new ParagraphBlock(blockOption)
        }
        return new Block(blockOption)
    }
}
