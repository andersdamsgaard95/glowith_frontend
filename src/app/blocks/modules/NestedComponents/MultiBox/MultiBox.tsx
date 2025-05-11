'use client'

import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import styles from './styles/MultiBox.module.scss';
import { ImageType } from '@/app/types/types';
import ReactMarkdown from 'react-markdown';
import ImageComponent from '../Image/ImageComponent';
import { useEffect, useState } from 'react';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import Link from 'next/link';

export interface MultiBoxProps {
    backgroundColor?: {color: string};
    image?: ImageType[];
    textOptionsIfImage?: string;
    ImageDisplayOptions?: string;
    id?: number;
    text?: string;
    link?: string;
    imageOptions?: string;
}

export default function MultiBox (props: MultiBoxProps) {
    const [boxIsHovered, setBoxIsHovered] = useState<boolean>(false);
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);
    //const [isFading, setIsFading] = useState(false);
    
    const textPosition = props.textOptionsIfImage === 'Visible on hover inside box' ? 'insideBox' : 'underneathBox';

    useEffect(() => {
        const multipleImages = props.image && props.image.length > 1;
    
        if (!multipleImages) return;
    
        if (props.imageOptions === 'Shift automatically') {
            if (boxIsHovered) return;
    
            const interval = setInterval(() => {
                setShownImageIndex(prev => (prev + 1) % props.image!.length);
            }, 2000);
    
            return () => clearInterval(interval); // cleanup
        }
    
        if (props.imageOptions === 'Shift to next on hover') {
            if (boxIsHovered) {
                setShownImageIndex(1);
            } else {
                setShownImageIndex(0);
            }
        }
    }, [props.image, boxIsHovered, props.imageOptions]);
    

    function handleMouseEnter () {
        if (props.image && ((props.text && textPosition === 'insideBox') || props.image.length > 1)) {
            setBoxIsHovered(true);
        } 
    }

    function handleMouseLeave () {
        if (props.image && ((props.text && textPosition === 'insideBox') || props.image.length > 1)) {
            setBoxIsHovered(false);
        } 
    }

    //console.log(styles.backgroundFade);

    return (
        props.link ? (
            <Link className={styles.link} href={props.link}>
                <div className={`${styles.container} ${styles.boxHover}`}>
                    <div 
                        className={`${styles.box} ${props.image ? styles.hasImage : ''}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            ...(props.backgroundColor && !props.image ? getThemeStyles(props.backgroundColor.color) : {}),
                            ...(props.backgroundColor ? { backgroundColor: getThemeColor(props.backgroundColor.color) } : {})
                        }}
                    >
                        {!props.image && props.text && (
                            <div className={`${styles.textContentInsideBox} ${props.backgroundColor?.color !== 'None' ? styles.hasPadding : ''}`}>
                                <ReactMarkdown>{props.text}</ReactMarkdown>
                            </div>  
                        )}
    
                        {props.image && props.text && textPosition === 'insideBox' && (
                            <div className={styles.backgroundFade}>
                                <div className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}>
                                    <ReactMarkdown>{props.text}</ReactMarkdown>
                                </div>
                            </div>
                        )}
    
                        {props.image && (
                            <div className={styles.imageContainer}>
                                <ImageComponent
                                    image={props.image[shownImageIndex]}
                                    className={styles.image}
                                />
                            </div>
                        )}   
                    </div>
    
                    {props.image && props.text && textPosition === 'underneathBox' && (
                        <div className={styles.textContentUnderneathBox}>
                            <ReactMarkdown>{props.text}</ReactMarkdown>
                        </div> 
                    )}
                </div>
            </Link>
        ) : (
            <div className={styles.container}>
                <div 
                    className={`${styles.box} ${props.image ? styles.hasImage : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        ...(props.backgroundColor && !props.image ? getThemeStyles(props.backgroundColor.color) : {}),
                        ...(props.backgroundColor ? { backgroundColor: getThemeColor(props.backgroundColor.color) } : {})
                    }}
                >
                    {!props.image && props.text && (
                        <div className={`${styles.textContentInsideBox} ${props.backgroundColor?.color !== 'None' ? styles.hasPadding : ''}`}>
                            <ReactMarkdown>{props.text}</ReactMarkdown>
                        </div>  
                    )}
    
                    {props.image && props.text && textPosition === 'insideBox' && (
                        <div className={styles.backgroundFade}>
                            <div className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}>
                                <ReactMarkdown>{props.text}</ReactMarkdown>
                            </div>
                        </div>
                    )}
    
                    {props.image && (
                        <div className={styles.imageContainer}>
                            <ImageComponent
                                image={props.image[shownImageIndex]}
                                className={styles.image}
                            />
                        </div>
                    )}
                </div>
    
                {props.image && props.text && textPosition === 'underneathBox' && (
                    <div className={styles.textContentUnderneathBox}>
                        <ReactMarkdown>{props.text}</ReactMarkdown>
                    </div> 
                )}  
            </div>
        )
    );
    
}