import Block from "../block";
import {BlockType} from "../blockType";
import BlockOption from "../BlockOption";

export default class ParagraphBlock extends Block {

    constructor(blockOption: BlockOption) {
        super(blockOption);
    }

    findValidParent(curBlock: Block, previousBlock: Block): Block {
        if (curBlock.blockType >= previousBlock.blockType && previousBlock.isOpen) {
            return previousBlock
        }
        return this.findValidParent(curBlock, previousBlock.parent as Block)
    }


    mergeIntoTree(validParent: Block): Block {
        if (this.text === '') {
            if (validParent.blockType === BlockType.Paragraph && validParent.isOpen) {
                validParent.isOpen = false
                return validParent
            }
            if (validParent.blockType !== BlockType.Paragraph) {
                return validParent
            }
        }

        if (validParent.blockType === BlockType.Paragraph) {
            validParent.text += this.text as string
            return validParent
        }
        validParent.children.push(this)
        this.parent = validParent
        return this
    }
}
