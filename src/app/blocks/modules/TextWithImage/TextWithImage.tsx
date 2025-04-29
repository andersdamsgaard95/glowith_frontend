import { BlockSettings, ButtonType, ImageType } from '@/app/types/types';
import styles from './styles/TextWithImage.module.scss';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import ImageComponent from '../NestedComponents/Image/ImageComponent';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import { getThemeColor } from '@/app/helperFunctions/helperFunctions';

interface TextWithImageProps {
    text?: string;
    button?: ButtonType;
    image?: ImageType;
    settings?: BlockSettings;
    imagePosition?: string;
    textBackgroundColor?: {color?: string;}
}

const TextWithImage: React.FC<TextWithImageProps> = (props) => {

    //const imagePosition = props.imagePosition === '' ? 'left' 
    const textHasCustomBackgroundColor = props.textBackgroundColor ? true : false;
    
    return (
        <BlockWrapper settings={props.settings}>
            <ContentWrapper isFullBackground={textHasCustomBackgroundColor}>
                <section className={`${styles.container} ${props.imagePosition === 'Right' ? styles.imageRight : ''} ${textHasCustomBackgroundColor ? styles.noGapMobile : ''}`}>
                    {props.image && (
                        <div className={`${styles.imageContainer} ${textHasCustomBackgroundColor && props.imagePosition === 'Right' ? styles.imageMarginRight : styles.imageMarginLeft}`}>
                            <ImageComponent
                                image={props.image}
                            />
                        </div>
                    )}
                    {props.text && (
                        <div 
                            className={`${styles.textContainer} ${props.textBackgroundColor ? styles.textWithBackgroundColor : ''} ${textHasCustomBackgroundColor && props.imagePosition === 'Right' ? styles.textPaddingLeft : styles.textPaddingRight}`}
                            style={{backgroundColor: props.textBackgroundColor ? getThemeColor(props.textBackgroundColor.color) : undefined}}
                        >
                            <ReactMarkdown>
                                {props.text}
                            </ReactMarkdown>
                        </div>
                    )}
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default TextWithImage;