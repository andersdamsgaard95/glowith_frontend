'use client';

import styles from '../Hero/styles/Hero.module.scss';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ImageComponent from '../NestedComponents/Image/ImageComponent';
import Button from '../NestedComponents/Button/Button';
import { ImageType, ButtonType } from '@/app/types/types';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import { useEffect, useState } from 'react';

interface HeroProps {
    heading?: string;
    text?: string;
    image?: ImageType;
    button?: ButtonType[];
    backgroundColor?: { color: string; }
    imageFullBackground?: boolean;
    textPosition?: string;
    textColorOnImage?: string;
    imageZoomOn?: boolean;
}

const Hero: React.FC<HeroProps> = (props) => {

    const themeStyles = !props.imageFullBackground && props.backgroundColor?.color ? getThemeStyles(props.backgroundColor.color) : undefined; 

    const textPositionClass = props.imageFullBackground && props.textPosition?.includes('Right') ? styles.textAlignRight : undefined;

    return (
        <BlockWrapper isHero={true} backgroundColor={props.backgroundColor?.color} noTopBottomPadding={true}>
            <ContentWrapper isFullBackground={props.imageFullBackground}>
                <section 
                    style={!props.imageFullBackground ? themeStyles : undefined} 
                    className={`${styles.container} ${textPositionClass} ${!props.imageFullBackground && props.textPosition?.includes('Left') ? styles.flipped : undefined} ${!props.imageFullBackground ? styles.splitBackground : undefined}`}
                >

                    {/* Image */}
                    {props.image && (
                        <div className={`${props.imageFullBackground ? styles.imageWrapperFullScreen : styles.imageWrapperHalfScreen}`}>  
                            <div
                                className={`${styles.imageContainer} ${props.imageZoomOn ? styles.zoom : ''}`}
                            >
                                <ImageComponent
                                    image={props.image}
                                /> 
                            </div>         
                        </div> 
                    )}  
                    
                    <div className={`${props.imageFullBackground ? styles.contentWrapper : styles.contentWrapperSplitBackground} ${props.imageFullBackground ? styles.contentPadding : undefined} ${props.textPosition?.includes('Center') ? styles.alignCenter : props.textPosition?.includes('Top') ? styles.alignStart : undefined}`}>
                        {/* Heading */}
                        {props.heading && (
                            <h1 
                                className={styles.heading}
                                style={{color: props.imageFullBackground && props.textColorOnImage === 'Dark' ? '#000000' : props.imageFullBackground && props.textColorOnImage === 'Light' ? '#ffffff' : undefined}}
                            >
                                {props.heading}
                            </h1> 
                        )}

                        {/* Text */}
                        {props.text && (
                            <p 
                                className={styles.text}
                                style={{color: props.imageFullBackground && props.textColorOnImage === 'Dark' ? '#000000' : props.imageFullBackground && props.textColorOnImage === 'Light' ? '#ffffff' : undefined}}
                            >
                                {props.text}</p>
                        )}

                        {/* Button */}
                        {props.button && props.button[0] && props.button[0].path && (
                            <div className={styles.buttonWrapper}>
                                <Button
                                    button={props.button[0]}
                                />  
                            </div>
                        )}  
                    </div>                          

                </section>
            </ContentWrapper>
            
        </BlockWrapper>
    )
} 

export default Hero;