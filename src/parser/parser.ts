import Block from "./blocks/block";
import ParagraphBlock from "./blocks/paragraphBlock";
import {BlockType} from "./blocks/blockType";

class Parser {
    parse(input: string): Block {
        const document = new Block(BlockType.Document)
        const lines = input.split('\n')
        let previousBlock = null
        for (const line of lines) {
            if (!previousBlock) {
                const paragraph = new ParagraphBlock(BlockType.Paragraph, line)
                previousBlock = paragraph
                document.addChild(paragraph)
            } else {
                previousBlock.content += `${line}`
            }
        }
        return document;
    }
}

export default Parser
