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
