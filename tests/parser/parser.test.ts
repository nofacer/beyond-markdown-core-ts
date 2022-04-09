import {Parser} from "../../src/index";

let parser: Parser
beforeAll(() => {
    parser = new Parser()
})

test('should say hello world', () => {
    expect(parser.helloWorld()).toBe("hello world");
});
