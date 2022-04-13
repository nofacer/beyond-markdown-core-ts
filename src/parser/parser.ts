import Block from "./blocks/block";
import {BlockType} from "./blocks/blockType";
import BlockOption from "./blocks/blockOption";
import BlockFactory from "./blocks/blockFactory";

class Parser {
    parse(input: string): Block {
        const document = new Block(new BlockOption(BlockType.Document, true, [], undefined, undefined))
        let previousBlock = document

        const lines = input.split('\n')
        for (const line of lines) {
            const curBlockOption = this.getCurBlockOption(line)
            const curBlock = BlockFactory.generate(curBlockOption)
            const validParent: Block = curBlock.findValidParent(curBlockOption, previousBlock)
            previousBlock = curBlock.mergeIntoTree(validParent)
        }
        return document;
    }

    private getCurBlockOption(line: string): BlockOption {
        let isOpen = true
        let text = line
        if (line.endsWith('\\')) {
            isOpen = false
            text = text.replace(/\\/, '')
        }
        return new BlockOption(BlockType.Paragraph, isOpen, [], undefined, text)
    }
}

export default Parser
