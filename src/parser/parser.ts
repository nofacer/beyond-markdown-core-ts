import Block from "./blocks/block";
import ParagraphBlock from "./blocks/paragraphBlock";
import {BlockType} from "./blocks/blockType";

class Parser {
    parse(input: string): Block {
        const document = new Block(BlockType.Document)
        const paragraph = new ParagraphBlock(BlockType.Paragraph, input)
        document.addChild(paragraph)
        return document;
    }
}

export default Parser
