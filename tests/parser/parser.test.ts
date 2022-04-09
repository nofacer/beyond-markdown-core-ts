import {Parser, Block} from "../../src/index";

let parser: Parser
beforeAll(() => {
    parser = new Parser()
})

test('should parse paragraph', () => {
    const input = "sample paragraph"
    const expectedResult = "> document\n" +
        "-> paragraph (sample paragraph)\n"
    const result: Block = parser.parse(input)
    expect(result.text()).toMatch(expectedResult)
})

test('should merge multi-line paragraph', () => {
    const input = "sample paragraph line1\nsample paragraph line2"
    const expectedResult = "> document\n" +
        "-> paragraph (sample paragraph line1sample paragraph line2)"
    const result: Block = parser.parse(input)
    expect(result.text()).toMatch(expectedResult)
})
