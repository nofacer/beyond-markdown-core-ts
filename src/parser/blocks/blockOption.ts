import {BlockType} from "./blockType";
import Block from "./block";

export default class BlockOption {
    constructor(
        public blockType: BlockType,
        public isOpen: boolean,
        public children: Block[],
        public parent?: Block,
        public text?: string
    ) {
    }
}
