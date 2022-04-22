import {Block, Utils} from "../../src/index";
import {BlockType} from "../../src/parser/blocks/blockType";

describe('util test', () => {
    test('should serialize document', () => {
        const document = new Block("123", BlockType.Document, true, [])
        const h1 = new Block("234", BlockType.H1, false, [], document, "h1")
        document.children.push(h1)
        const p1 = new Block("345", BlockType.Paragraph, false, [], h1, "p1")
        const p2 = new Block("789", BlockType.Paragraph, false, [], h1, "p2")
        h1.children.push(p1)
        h1.children.push(p2)
        const h2 = new Block("456", BlockType.H2, true, [], document, "h2")
        document.children.push(h2)

        const result = Utils.serializeDocument(document)
        const expectResult = `
            {
    "id":"123",
    "type":"Document",
    "isOpen":true,
    "children":[
        {
            "id":"234",
            "parentId":"123",
            "type":"H1",
            "isOpen":false,
            "text":"h1",
            "children":[
                {
                    "id":"345",
                    "parentId":"234",
                    "type":"Paragraph",
                    "isOpen":false,
                    "text":"p1",
                    "children":[

                    ]
                },
                {
                    "id":"789",
                    "parentId":"234",
                    "type":"Paragraph",
                    "isOpen":false,
                    "text":"p2",
                    "children":[

                    ]
                }
            ]
        },
        {
            "id":"456",
            "parentId":"123",
            "type":"H2",
            "isOpen":true,
            "text":"h2",
            "children":[

            ]
        }
    ]
}
        `
        console.info(JSON.stringify(result, null, 4))
        expect(result).toEqual(JSON.parse(expectResult))
    })
})
