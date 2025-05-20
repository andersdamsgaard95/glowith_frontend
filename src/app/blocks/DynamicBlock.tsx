import Hero from "./modules/Hero/Hero"
import MultiBoxGrid from "./modules/MultiBoxGrid/MultiBoxGrid";
import MultiBoxRow from "./modules/MultiBoxRow/MultiBoxRow";
import TextWithImage from "./modules/TextWithImage/TextWithImage";

interface DynamicBlockProps {
    blockName: string;
    blockProps?: any;
}

export default function DynamicBlock ({blockName, blockProps}: DynamicBlockProps) {

    let renderedBlock;

    switch (blockName) {
        case 'hero-banner.hero-banner':
            renderedBlock = <Hero {...blockProps}/>
            break;
        case 'multi-box-grid.multi-box-grid':
            renderedBlock = <MultiBoxGrid {...blockProps}/>
            break;
        case 'multi-box-row.multi-box-row':
            renderedBlock = <MultiBoxRow {...blockProps}/>
            break;
        case 'text-with-image.text-with-image':
            renderedBlock = <TextWithImage {...blockProps}/>
            break;
    }

    return (
        <>
            {renderedBlock}
        </>
    )
}



