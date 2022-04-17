import {Parser, Block} from "../../src/index";
import * as fs from "fs";

let parser: Parser
beforeAll(() => {
    parser = new Parser()
})

describe('integrated test', () => {
    test('demo1', () => {
        const demo = fs.readFileSync('README.md').toString()
        const expectedResult = "> Document\n" +
            "-> H1 (Beyond markdown core)\n" +
            "--> Paragraph (Beyond markdown core is a library to parse markdown text into a designed structure.)\n"+
            "--> H2 (Support format)\n"+
            "---> H3 (Header)\n"+
            "----> Paragraph (TBD)\n"+
            "---> H3 (Paragraph)\n"+
            "----> Paragraph (TBD)\n"
        const result: Block = parser.parse(demo)
        expect(result.toText()).toEqual(expectedResult)
    })
})

describe('paragraph block', () => {
    test('should parse paragraph', () => {
        const input = "sample paragraph"
        const expectedResult = "> Document\n" +
            "-> Paragraph (sample paragraph)\n"
        const result: Block = parser.parse(input)
        expect(result.toText()).toEqual(expectedResult)
    })

    test('should merge multi-line paragraph', () => {
        const input = "sample paragraph line1\nsample paragraph line2"
        const expectedResult = "> Document\n" +
            "-> Paragraph (sample paragraph line1sample paragraph line2)\n"
        const result: Block = parser.parse(input)
        expect(result.toText()).toEqual(expectedResult)
    })

    test('should break paragraph when there is \\', () => {
        const input = "sample paragraph line1\\\nsample paragraph line2"
        const expectedResult = "> Document\n" +
            "-> Paragraph (sample paragraph line1)\n" +
            "-> Paragraph (sample paragraph line2)\n"
        const result: Block = parser.parse(input)
        expect(result.toText()).toEqual(expectedResult)
    })

    test('should break paragraph when there is continuous break line', () => {
        const input = "sample paragraph line1\n\nsample paragraph line2\n\n\nsample paragraph line3"
        const expectedResult = "> Document\n" +
            "-> Paragraph (sample paragraph line1)\n" +
            "-> Paragraph (sample paragraph line2)\n" +
            "-> Paragraph (sample paragraph line3)\n"
        const result: Block = parser.parse(input)
        expect(result.toText()).toEqual(expectedResult)
    })

    test('should ignore space in blank line', () => {
        const input = "   \n"
        const expectedResult = "> Document\n"
        const result: Block = parser.parse(input)
        console.info(result.toText())
        expect(result.toText()).toEqual(expectedResult)
    })
})

describe('header block', () => {
    test('should parse h1~h6', () => {
        const input = "" +
            "# H1\n" +
            "## H2\n" +
            "### H3\n" +
            "#### H4\n" +
            "##### H5\n" +
            "###### H6\n" +
            "####### not header"
        const expectedResult = "" +
            "> Document\n" +
            "-> H1 (H1)\n" +
            "--> H2 (H2)\n" +
            "---> H3 (H3)\n" +
            "----> H4 (H4)\n" +
            "-----> H5 (H5)\n" +
            "------> H6 (H6)\n" +
            "-------> Paragraph (####### not header)\n"
        const result: Block = parser.parse(input)
        expect(result.toText()).toEqual(expectedResult)
    })
})
