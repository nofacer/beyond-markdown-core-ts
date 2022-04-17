import Block from "./blocks/block";
import {BlockType} from "./blocks/blockType";
import BlockFactory from "./blocks/blockFactory";

class Parser {
    parse(input: string): Block {
        const document = new Block(BlockType.Document, true, [], undefined, undefined)
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
