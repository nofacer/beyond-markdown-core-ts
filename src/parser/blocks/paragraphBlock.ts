import Block from "./block";
import {BlockType} from "./blockType";
import BlockOption from "./blockOption";

export default class ParagraphBlock extends Block {

    constructor(blockOption: BlockOption) {
        super(blockOption);
    }

    text(level: number = 0, result: string = ""): string {
        return `${'-'.repeat(level)}> ${BlockType[this.option.blockType]} (${this.option.text?.replace('\n', '\\n')})\n`
    }

    findValidParent(curBlockOption: BlockOption, previousBlock: Block): Block {
        if (curBlockOption.blockType >= previousBlock.option.blockType && previousBlock.option.isOpen) {
            return previousBlock
        }
        if (previousBlock.option.parent === undefined) {
            throw new Error('error')
        }
        return this.findValidParent(curBlockOption, previousBlock.option.parent)
    }


    mergeIntoTree(validParent: Block): Block {
        if (validParent.option.blockType === BlockType.Paragraph) {
            validParent.option.text += (this.option.text ? this.option.text : '')
            return validParent
        }
        validParent.option.children.push(this)
        this.option.parent = validParent
        return this
    }
}
