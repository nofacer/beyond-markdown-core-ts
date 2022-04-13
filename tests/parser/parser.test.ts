import {Parser, Block} from "../../src/index";

let parser: Parser
beforeAll(() => {
    parser = new Parser()
})

test('should parse paragraph', () => {
    const input = "sample paragraph"
    const expectedResult = "> Document\n" +
        "-> Paragraph (sample paragraph)\n"
    const result: Block = parser.parse(input)
    expect(result.text()).toMatch(expectedResult)
})

test('should merge multi-line paragraph', () => {
    const input = "sample paragraph line1\nsample paragraph line2"
    const expectedResult = "> Document\n" +
        "-> Paragraph (sample paragraph line1sample paragraph line2)"
    const result: Block = parser.parse(input)
    expect(result.text()).toMatch(expectedResult)
})

test('should break paragraph when there is \\', () => {
    const input = "sample paragraph line1\\\nsample paragraph line2"
    const expectedResult = "> Document\n" +
        "-> Paragraph (sample paragraph line1)\n" +
        "-> Paragraph (sample paragraph line2)"
    const result: Block = parser.parse(input)
    expect(result.text()).toMatch(expectedResult)
})
