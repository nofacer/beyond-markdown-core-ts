import {BlockType} from "./blockType";
import BlockOption from "./BlockOption";
import {uid} from "uid";

export default class Block implements IBlock {
    public id: string
    public blockType: BlockType
    public isOpen: boolean
    public children: Block[]
    public parent: Block
    public text: string

    constructor(blockOption: BlockOption) {

        this.id = blockOption.uid ? blockOption.uid : uid()
        this.blockType = blockOption.blockType
        this.isOpen = blockOption.isOpen
        this.children = blockOption.children
        this.parent = blockOption.parent ? blockOption.parent : this
        this.text = blockOption.text ? blockOption.text : ''
    }


    toText(level = 0, result = "") {
        result += this.curText(level)
        for (const block of this.children) {
            result += block.toText(level + 1)
        }
        return result
    }

    private curText(level: number) {
        let text = `${'-'.repeat(level)}> ${BlockType[this.blockType]}`
        if (this.text) {
            text += ` (${this.text.replace('\n', '\\n')})\n`
        } else {
            text += '\n'
        }
        return text
    }

    findValidParent(curBlock: Block, previousBlock: Block): Block {
        if (curBlock.blockType > previousBlock.blockType && previousBlock.isOpen) {
            return previousBlock
        }
        if (previousBlock.isOpen) {
            previousBlock.isOpen = false
        }
        if (previousBlock.parent === undefined) {
            throw new Error('error')
        }
        return this.findValidParent(curBlock, previousBlock.parent)
    }

    mergeIntoTree(validParent: Block): Block {
        this.parent = validParent
        validParent.children.push(this)
        return this
    }
}
