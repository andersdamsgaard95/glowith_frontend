import { BlockSettings, ButtonType, ImageType } from '@/app/types/types';
import styles from './styles/TextWithImage.module.scss';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import ImageComponent from '../NestedComponents/Image/ImageComponent';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import { getThemeColor, getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import Button from '../NestedComponents/Button/Button';
import { div } from 'framer-motion/client';

interface TextWithImageProps {
    text?: string;
    button?: ButtonType[];
    image?: ImageType;
    settings?: BlockSettings;
    imagePosition?: string;
    textBackgroundColor?: {color: string;}
}

const TextWithImage: React.FC<TextWithImageProps> = (props) => {

    //const imagePosition = props.imagePosition === '' ? 'left' 
    const textHasCustomBackgroundColor = props.textBackgroundColor && props.textBackgroundColor.color !== 'None' ? true : false;
    const multipleButtons = props.button ? props.button.length > 1 : false;

    return (
        <BlockWrapper settings={props.settings}>
            <ContentWrapper isFullBackground={textHasCustomBackgroundColor}>
                <section className={`${styles.container} ${props.imagePosition === 'Right' ? styles.imageRight : ''} ${textHasCustomBackgroundColor ? styles.noGap : ''}`}>
                    {props.image && (
                        <div className={`${styles.imageWrapper} ${textHasCustomBackgroundColor && props.imagePosition === 'Left (default)' ? styles.imageToLeft : ''}`}>
                            <div className={`${styles.imageContainer} ${textHasCustomBackgroundColor ? styles.imageMaxWidth : ''} ${textHasCustomBackgroundColor && props.imagePosition === 'Right' ? styles.imageMarginRight : textHasCustomBackgroundColor && props.imagePosition === 'Left (default)' ? styles.imageMarginLeft : ''}`}>
                                <ImageComponent
                                    image={props.image}
                                />
                            </div>
                        </div>
                        
                    )}
                    {props.text && (
                        <div 
                            className={`${styles.textContainer} ${textHasCustomBackgroundColor && props.imagePosition === 'Right' ? styles.textAlignEnd : ''}`}
                            style={{backgroundColor: textHasCustomBackgroundColor ? getThemeColor(props.textBackgroundColor?.color) : undefined}}
                        >
                            <div 
                                className={`${styles.text} ${textHasCustomBackgroundColor ? styles.textMaxWidth : ''} ${textHasCustomBackgroundColor && props.imagePosition === 'Right' ? styles.textPaddingLeft : textHasCustomBackgroundColor && props.imagePosition === 'Left (default)' ? styles.textPaddingRight : ''}`}
                                style={
                                    props.textBackgroundColor && props.textBackgroundColor.color !== 'None' ? getThemeStyles(props.textBackgroundColor.color) : props.settings?.backgroundColor ? getThemeStyles(props.settings?.backgroundColor?.color) : undefined
                                }
                            >
                                <ReactMarkdown>
                                    {props.text}
                                </ReactMarkdown>

                                {props.button && props.button.length > 0 && (
                                    <div className={styles.buttonsContainer}>
                                        {props.button.map((button, i) => (
                                            <div key={i} className={styles.buttonContainer}>
                                                <Button
                                                    button={button}
                                                    fullWidth={multipleButtons}
                                                /> 
                                            </div>
                                        ))}
                                    </div>
                                )}   
                            </div>
                            
                        </div>
                    )}
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default TextWithImage;