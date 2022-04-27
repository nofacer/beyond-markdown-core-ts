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
})
