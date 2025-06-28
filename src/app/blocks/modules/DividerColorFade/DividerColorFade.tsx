import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';

interface DividerColorFadeProps {
    blockHeight?: "Small 50px" | "Default 100px";
    backgroundColor: {color: string};
    fadeDirection?: "From top (default)" | "From bottom";
}

const DividerColorFade: React.FC<DividerColorFadeProps> = (props) => {

    const blockHeight = props.blockHeight === "Small 50px" ? "50px" : "100px";
    const backgroundFade = getThemeColor(props.backgroundColor.color);
    const fadeDirection = props.fadeDirection === "From bottom" ? "top" : "bottom";
    
    return (
        <BlockWrapper noTopBottomPadding>
            <ContentWrapper isFullBackground>
                <div 
                    style={{
                        height: blockHeight,
                        background: `linear-gradient(to ${fadeDirection}, ${backgroundFade} 0%, transparent 100%)`
                    }}
                ></div>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default DividerColorFade;