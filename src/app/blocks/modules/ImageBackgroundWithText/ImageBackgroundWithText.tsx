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
}

const ImageBackgroundWithText: React.FC<ImageBackgroundWithTextProps> = (props) => {

    return (
        <BlockWrapper backgroundImage={props.image}>
            <ContentWrapper>
                <section 
                    className={styles.container}
                    style={{
                        minHeight: props.Minimum_Height_In_Px ? `calc(${props.Minimum_Height_In_Px}px - 100px)` : "",
                    }}
                >
                    <div className={`${styles.content} ${props.Add_Text_Background_Contrast_Layer ? styles.textBackground : ""}`}>
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