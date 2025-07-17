import Hero from "./modules/Hero/Hero"
import MultiBoxGrid from "./modules/MultiBoxGrid/MultiBoxGrid";
import MultiBoxRow from "./modules/MultiBoxRow/MultiBoxRow";
import TextCarrousel from "./modules/TextCarrousel/TextCarrousel";
import TextWithImage from "./modules/TextWithImage/TextWithImage";
import DividerLine from "./modules/DividerLine/DividerLine";
import DividerColorFade from "./modules/DividerColorFade/DividerColorFade";
import ImageBackgroundWithText from "./modules/ImageBackgroundWithText/ImageBackgroundWithText";
import ImageAlone from "./modules/ImageAlone/ImageAlone";

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
        case 'carrousel-text.carrousel-text':
            renderedBlock = <TextCarrousel {...blockProps}/>
            break;
        case 'dividers.divider-color-fade':
            renderedBlock = <DividerColorFade {...blockProps}/>
            break;
        case 'dividers.line-divider':
            renderedBlock = <DividerLine {...blockProps}/>
            break;
        case 'image-background-with-text.image-background-with-text':
            renderedBlock = <ImageBackgroundWithText {...blockProps}/>
            break;
        case 'image-alone.image-alone':
            renderedBlock = <ImageAlone {...blockProps}/>
            break;
    }

    return (
        <>
            {renderedBlock}
        </>
    )
}



