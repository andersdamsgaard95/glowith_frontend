import { BlockSettings, ButtonType, ImageType } from '@/app/types/types';
import styles from './styles/ImageAlone.module.scss';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import ImageComponent from '../NestedComponents/Image/ImageComponent';
import Button from '../NestedComponents/Button/Button';

interface ImageAloneProps {
    image?: ImageType;
    heading?: string;
    text?: string;
    settings?: BlockSettings;
    Max_Width_In_Px?: number;
    Center_Text?: boolean;
    button?: ButtonType;
}

const ImageAlone: React.FC<ImageAloneProps> = (props) => {

    const maxWidth = props.Max_Width_In_Px ?? "100%";

    const content = 
        <div className={`${styles.container} ${props.Center_Text ? styles.centerContent : ''}`}>
            {props.heading && (
                <h2>{props.heading}</h2>
            )}
            {props.text && (
                <p>{props.text}</p>
            )}
            {props.image && (
                <div 
                    style={{
                        maxWidth: maxWidth,
                        margin: props.Max_Width_In_Px ? '0 auto' : 'none'    
                    }}
                >
                <ImageComponent
                        image={props.image}
                        isProductImage={true}
                    /> 
                </div>
            )}
            {props.button && (
                <Button button={props.button}/>
            )}
        </div>

    return (
        <BlockWrapper settings={props.settings}>
            <ContentWrapper>
                {props.heading ? (
                    <section>{content}</section>
                ) : (
                    content
                )}
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default ImageAlone;