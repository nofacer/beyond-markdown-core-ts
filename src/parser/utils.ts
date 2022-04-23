import Block from "./block";
import {BlockType} from "./blockType";

interface BLockMetadata {
    id: string,
    parentId: string,
    type: string,
    isOpen: boolean,
    children: ArrayLike<BLockMetadata>,
    text: string
}

export default class Utils {
    static serializeDocument(document: Block): BLockMetadata {
        const j = {
            "id": document.id,
            "parentId": document.parent?.id,
            "type": BlockType[document.blockType],
            "isOpen": document.isOpen,
            "text": document.text,
            "children": []
        } as BLockMetadata
        if (document.children.length < 1) {
            j["children"] = []
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
}
