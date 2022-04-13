import {BlockType} from "./blockType";
import BlockOption from "./blockOption";

export default class Block {
    constructor(public option: BlockOption) {
    }


    text(level = 0, result = "") {
        result += this.curText(level)
        for (const block of this.option.children) {
            result += block.curText(level + 1)
        }
        return result
    }

    private curText(level: number) {
        if (this.option.blockType === BlockType.Paragraph) {
            return `${'-'.repeat(level)}> ${BlockType[this.option.blockType]} (${this.option.text?.replace('\n', '\\n')})\n`
        }
        return `${'-'.repeat(level)}> ${BlockType[this.option.blockType]}\n`
    }

    findValidParent(curBlockOption: BlockOption, previousBlock: Block): Block {
        if (curBlockOption.blockType > previousBlock.option.blockType && previousBlock.option.isOpen) {
            return previousBlock
        }
        if (previousBlock.option.isOpen) {
            previousBlock.option.isOpen = false
        }
        if (previousBlock.option.parent === undefined) {
            throw new Error('error')
        }
        return this.findValidParent(curBlockOption, previousBlock.option.parent)
    }

    mergeIntoTree(validParent: Block): Block {
        validParent.option.children.push(this)
        this.option.parent = validParent
        return validParent
    }
}
