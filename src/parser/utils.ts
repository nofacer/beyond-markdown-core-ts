import Block from "./block";
import {BlockType} from "./blockType";
import BlockFactory from "./blockFactory";
import BlockOption from "./BlockOption";

interface BLockMetadata {
    id: string,
    parentId: string,
    type: string,
    isOpen: boolean,
    children: BLockMetadata[],
    text: string
}

export default class Utils {
    static serializeDocument(document: Block): BLockMetadata {
        const j = {
            "id": document.id,
            "parentId": document.parent.id,
            "type": BlockType[document.blockType],
            "isOpen": document.isOpen,
            "text": document.text,
            "children": []
        } as BLockMetadata
        if (document.children.length < 1) {
            return j
        } else {
            const children = []
            for (const child of document.children) {
                children.push(this.serializeDocument(child))
            }
            j.children = children
            return j
        }
    }

    static deserializeDocument(serializedDocument: BLockMetadata, cache: { [x: string]: Block }): Block {
        const blockType = BlockType[serializedDocument.type as keyof typeof BlockType]
        const curBlock = BlockFactory.getTypedBlock(blockType, new BlockOption(
            blockType,
            serializedDocument.isOpen,
            [],
            cache[serializedDocument.parentId],
            serializedDocument.text,
            serializedDocument.id))
        if (serializedDocument.children.length < 1) {
            return curBlock
        } else {
            const children = []
            cache[serializedDocument.id] = curBlock
            for (const child of serializedDocument.children) {
                children.push(this.deserializeDocument(child, cache))
            }
            curBlock.children = children
            return curBlock
        }

    }

    static getBlockById(document: Block, id: string): Block | undefined {
        if (document.id === id) {
            return document
        }
        for (const child of document.children) {
            const result = this.getBlockById(child, id)
            if (result) return result
        }
    }
}

export {
    BLockMetadata
}
