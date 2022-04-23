import {BlockType} from "./blockType";
import BlockOption from "./BlockOption";
import {Blocks} from "./blocks";

export default class BlockFactory {
    public static generateFromLine(line: string) {
        let blockType = this.getBlockType(line)
        let isOpen = this.getIsOpen(line, blockType)
        let text = this.getText(line, blockType)
        const blockOption = new BlockOption(blockType, isOpen, [], undefined, text)
        return this.getTypedBlock(blockType, blockOption)
    }

    public static getTypedBlock(blockType: BlockType, blockOption: BlockOption) {
        const blockClassName: string = BlockType[blockType]
        console.info(blockClassName)
        console.info(Blocks[blockClassName])
        return new Blocks[blockClassName](blockOption)
    }

    private static getBlockType(line: string): BlockType {
        if (line.startsWith('# ')) return BlockType.H1
        if (line.startsWith('## ')) return BlockType.H2
        if (line.startsWith('### ')) return BlockType.H3
        if (line.startsWith('#### ')) return BlockType.H4
        if (line.startsWith('##### ')) return BlockType.H5
        if (line.startsWith('###### ')) return BlockType.H6
        return BlockType.Paragraph
    }

    private static getIsOpen(line: string, blockType: BlockType) {
        if (blockType === BlockType.Paragraph) {
            if (line.endsWith('\\')) {
                return false
            }
        }
        return true
    }

    private static getText(line: string, blockType: BlockType) {
        if (blockType === BlockType.Paragraph) {
            if (line.endsWith('\\')) {
                return line.replace(/\\/, '')
            }
        }
        if (blockType === BlockType.H1) {
            return line.replace(/^# /, '')
        }
        if (blockType === BlockType.H2) {
            return line.replace(/^## /, '')
        }
        if (blockType === BlockType.H3) {
            return line.replace(/^### /, '')
        }
        if (blockType === BlockType.H4) {
            return line.replace(/^#### /, '')
        }
        if (blockType === BlockType.H5) {
            return line.replace(/^##### /, '')
        }
        if (blockType === BlockType.H6) {
            return line.replace(/^###### /, '')
        }
        return line
    }
}
