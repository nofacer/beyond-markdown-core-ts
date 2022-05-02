import DocumentBlock from "./documentBlock";
import HeaderBlock from "./headerBlock";
import ParagraphBlock from "./paragraphBlock";
import FencedCodeBlock from "./FencedCodeBlock";

export const Blocks: any = {
    "Document": DocumentBlock,
    "H1": HeaderBlock,
    "H2": HeaderBlock,
    "H3": HeaderBlock,
    "H4": HeaderBlock,
    "H5": HeaderBlock,
    "H6": HeaderBlock,
    "FencedCode": FencedCodeBlock,
    "Paragraph": ParagraphBlock
}
