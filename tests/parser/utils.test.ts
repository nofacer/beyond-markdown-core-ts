import {Block, Utils} from "../../src/index";
import BlockOption from "../../src/parser/BlockOption";
import {BlockType} from "../../src/parser/blockType";
import {BLockMetadata} from "../../src/parser/utils";

describe('util test', () => {
    test('should serialize document', () => {
        const document = new Block(new BlockOption(BlockType.Document, true, [], undefined, undefined, "123"))
        const h1 = new Block(new BlockOption(BlockType.H1, false, [], document, "h1", "234"))
        document.children.push(h1)
        const p1 = new Block(new BlockOption(BlockType.Paragraph, false, [], h1, "p1", "345"))
        const p2 = new Block(new BlockOption(BlockType.Paragraph, false, [], h1, "p2", "456"))
        h1.children.push(p1)
        h1.children.push(p2)
        const h2 = new Block(new BlockOption(BlockType.H2, true, [], document, "h2", "567"))
        document.children.push(h2)

        const result = Utils.serializeDocument(document)
        const expectResult = {
            "id": "123",
            "parentId": "123",
            "type": "Document",
            "isOpen": true,
            "text": "",
            "children": [
                {
                    "id": "234",
                    "parentId": "123",
                    "type": "H1",
                    "isOpen": false,
                    "text": "h1",
                    "children": [
                        {
                            "id": "345",
                            "parentId": "234",
                            "type": "Paragraph",
                            "isOpen": false,
                            "text": "p1",
                            "children": []
                        },
                        {
                            "id": "456",
                            "parentId": "234",
                            "type": "Paragraph",
                            "isOpen": false,
                            "text": "p2",
                            "children": []
                        }
                    ]
                },
                {
                    "id": "567",
                    "parentId": "123",
                    "type": "H2",
                    "isOpen": true,
                    "text": "h2",
                    "children": []
                }
            ]
        }

        expect(result).toEqual(expectResult)
    })

    test('should deserialize document', () => {
        const blockMetadata = {
            "id": "123",
            "parentId": "123",
            "type": "Document",
            "isOpen": true,
            "text": "",
            "children": [
                {
                    "id": "234",
                    "parentId": "123",
                    "type": "H1",
                    "isOpen": false,
                    "text": "h1",
                    "children": [
                        {
                            "id": "345",
                            "parentId": "234",
                            "type": "Paragraph",
                            "isOpen": false,
                            "text": "p1",
                            "children": []
                        },
                        {
                            "id": "456",
                            "parentId": "234",
                            "type": "Paragraph",
                            "isOpen": false,
                            "text": "p2",
                            "children": []
                        }
                    ]
                },
                {
                    "id": "567",
                    "parentId": "123",
                    "type": "H2",
                    "isOpen": true,
                    "text": "h2",
                    "children": []
                }
            ]
        } as BLockMetadata
        expect(Utils.serializeDocument(Utils.deserializeDocument(blockMetadata, {}))).toEqual(blockMetadata)
    })

    test('should get block by id', () => {
        const document = new Block(new BlockOption(BlockType.Document, true, [], undefined, undefined, "1"))
        const child11 = new Block(new BlockOption(BlockType.H1, true, [], document, undefined, "21"))
        const child12 = new Block(new BlockOption(BlockType.H1, true, [], document, undefined, "22"))
        document.children.push(child11)
        document.children.push(child12)
        const child21 = new Block(new BlockOption(BlockType.H2, false, [], child12, undefined, "31"))
        child12.children.push(child21)
        expect(Utils.getBlockById(document,"31")!.id).toEqual("31")
    })
})
