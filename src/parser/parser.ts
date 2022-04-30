import Block from "./block";
import {BlockType} from "./blockType";
import BlockFactory from "./blockFactory";
import BlockOption from "./BlockOption";
import DocumentBlock from "./blocks/documentBlock";
import Utils, {BLockMetadata} from "./utils";
import {uid} from "uid";

class Parser {
    private documentBackup: BLockMetadata | undefined
    private parentIdBackup: string | undefined
    private fencedCodeContent: string
    private waitForFencedCode: boolean

    constructor() {
        this.documentBackup = undefined
        this.parentIdBackup = undefined
        this.fencedCodeContent = ""
        this.waitForFencedCode = false
    }


    parse(input: string): Block {
        let document = new DocumentBlock(new BlockOption(BlockType.Document, true, []))
        let previousBlock = document
        const lines = input.split('\n')
        for (const line of lines) {
            let curLine = line.trim()
            const restoreData = this.specialStep(curLine, document, previousBlock)
            if (restoreData) {
                document = restoreData[0]
                previousBlock = restoreData[1]
            }else{
                const curBlock = BlockFactory.generateFromLine(curLine)
                const validParent: Block = curBlock.findValidParent(curBlock, previousBlock)
                previousBlock = curBlock.mergeIntoTree(validParent)
            }
        }
        return document;
    }

    private specialStep(line: string, document: Block, previousBlock: Block) {
        if (line === '```') {
            if (!this.waitForFencedCode) {
                this.documentBackup = Utils.serializeDocument(document)
                this.parentIdBackup = previousBlock.id
                this.waitForFencedCode = true
            } else {
                document = Utils.deserializeDocument(this.documentBackup as BLockMetadata, {})
                previousBlock = Utils.getBlockById(document, this.parentIdBackup as string) as Block
                const curBlock = BlockFactory.getTypedBlock(BlockType.FencedBlock, new BlockOption(BlockType.FencedBlock, false, [], undefined, this.fencedCodeContent.replace(/^```\n/, '').trim(), uid()))
                const validParent: Block = curBlock.findValidParent(curBlock, previousBlock)
                previousBlock = curBlock.mergeIntoTree(validParent)
                this.waitForFencedCode = false
                this.fencedCodeContent = ""
                return [document, previousBlock]
            }

        }
        if (this.waitForFencedCode) {
            this.fencedCodeContent += `${line}\n`
        }
    }
}

export default Parser
