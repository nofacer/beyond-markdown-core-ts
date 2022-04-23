import Block from "./block";
import {BlockType} from "./blockType";
import BlockFactory from "./blockFactory";
import BlockOption from "./BlockOption";
import DocumentBlock from "./blocks/documentBlock";

class Parser {
    parse(input: string): Block {
        const document = new DocumentBlock(new BlockOption(BlockType.Document, true, []))
        let previousBlock = document

        const lines = input.split('\n')
        for (const line of lines) {
            let curLine = line.trim()
            if (curLine === '' && previousBlock.blockType === BlockType.Paragraph && previousBlock.isOpen) {
                previousBlock.isOpen = false
                continue
            }
            if (curLine === '' && previousBlock.blockType != BlockType.Paragraph) {
                continue
            }
            const curBlock = BlockFactory.generateFromLine(curLine)
            const validParent: Block = curBlock.findValidParent(curBlock, previousBlock)
            previousBlock = curBlock.mergeIntoTree(validParent)
        }
        return document;
    }
}

export default Parser
