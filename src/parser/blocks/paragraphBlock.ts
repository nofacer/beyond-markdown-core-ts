import Block from "./block";
import {BlockType} from "./blockType";

export default class ParagraphBlock extends Block {

    constructor(
        public blockType: BlockType,
        public isOpen: boolean,
        public children: Block[],
        public parent?: Block,
        public text?: string
    ) {
        super(blockType, isOpen, children, parent, text)
    }

    findValidParent(curBlock: Block, previousBlock: Block): Block {
        if (curBlock.blockType >= previousBlock.blockType && previousBlock.isOpen) {
            return previousBlock
        }
        return this.findValidParent(curBlock, previousBlock.parent as Block)
    }


    mergeIntoTree(validParent: Block): Block {
        if (validParent.blockType === BlockType.Paragraph) {
            validParent.text += this.text as string
            return validParent
        }
        validParent.children.push(this)
        this.parent = validParent
        return this
    }
}
