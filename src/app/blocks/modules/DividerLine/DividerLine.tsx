import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import styles from './styles/DividerLine.module.scss';

interface DividerLineProps {
    blockHeight?: 'Small 50px' | 'Default 100px';
    lineColor?: {color: string};
    backgroundColor?: {color: string};
}

const DividerLine: React.FC<DividerLineProps> = (props) => {

    const blockHeight = props.blockHeight === "Small 50px" ? '50px' : '100px';

    const lineColor = props.lineColor?.color ? getThemeColor(props.lineColor?.color) : "#000000";

    return (
        <BlockWrapper backgroundColor={props.backgroundColor?.color} noTopBottomPadding>
            <ContentWrapper>
                <div 
                    className={styles.container}
                    style={{
                        height: blockHeight,
                    }}
                >
                    <div 
                        className={styles.line}
                        style={{
                            color: lineColor,
                        }}
                    ></div>
                </div>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default DividerLine;