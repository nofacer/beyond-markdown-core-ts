import Block from "./block";
import {BlockType} from "./blockType";

export default class HeaderBlock extends Block {
    constructor(
        public blockType: BlockType,
        public isOpen: boolean,
        public children: Block[],
        public parent?: Block,
        public text?: string
    ) {
        super(blockType, isOpen, children, parent, text)
    }

}
