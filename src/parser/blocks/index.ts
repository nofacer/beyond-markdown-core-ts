import DocumentBlock from "./documentBlock";
import HeaderBlock from "./headerBlock";
import ParagraphBlock from "./paragraphBlock";
import FencedBlock from "./FencedBlock";

export const Blocks: any = {
    "Document": DocumentBlock,
    "H1": HeaderBlock,
    "H2": HeaderBlock,
    "H3": HeaderBlock,
    "H4": HeaderBlock,
    "H5": HeaderBlock,
    "H6": HeaderBlock,
    "FencedBlock": FencedBlock,
    "Paragraph": ParagraphBlock
}
