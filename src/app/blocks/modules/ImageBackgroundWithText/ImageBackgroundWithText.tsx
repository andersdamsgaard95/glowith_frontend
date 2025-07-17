import { ButtonType, ImageType } from '@/app/types/types';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import styles from './styles/ImageBackgroundWithText.module.scss';
import Button from '../NestedComponents/Button/Button';

interface ImageBackgroundWithTextProps {
    image?: ImageType;
    heading?: string;
    text?: string;
    button?: ButtonType;
    Minimum_Height_In_Px?: number;
    Add_Text_Background_Contrast_Layer?: boolean;
    Text_Color?: "Dark (default)" | "Light";
}

const ImageBackgroundWithText: React.FC<ImageBackgroundWithTextProps> = (props) => {

    const textColor = props.Text_Color === "Light" && !props.Add_Text_Background_Contrast_Layer ? "#fafafa" : "#000000";

    return (
        <BlockWrapper backgroundImage={props.image} imageOverlay={props.Add_Text_Background_Contrast_Layer}>
            <ContentWrapper>
                <section 
                    className={styles.container}
                    style={{
                        minHeight: props.Minimum_Height_In_Px ? `calc(${props.Minimum_Height_In_Px}px - 100px)` : "",
                    }}
                >
                    <div 
                        className={`${styles.content}`}
                        style={{color: textColor}}
                    >
                        {props.heading && <h2 className={styles.heading}>{props.heading}</h2>}
                        {props.text && <p>{props.text}</p>}
                        {props.button && <Button button={props.button}/>}
                    </div>
                    
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default ImageBackgroundWithText;