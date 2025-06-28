'use client'

import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import styles from './styles/MultiBox.module.scss';
import ReactMarkdown from 'react-markdown';
import ImageComponent from '../Image/ImageComponent';
import { useEffect, useState } from 'react';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { imageCoverOrContainObject } from '@/app/types/types';

export interface MultiBoxProps {
    backgroundColor?: {color: string};
    textOptionsIfImage?: string;
    ImageDisplayOptions?: string;
    id?: number;
    text?: string;
    link?: string;
    imageOptions?: string;
    openLinkInNewTab?: boolean;
    imageCoverOrContain?: imageCoverOrContainObject[];
}

export default function MultiBox (props: MultiBoxProps) {
    const [boxIsHovered, setBoxIsHovered] = useState<boolean>(false);
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);
    //const [isFading, setIsFading] = useState(false);
    
    const textPosition = props.textOptionsIfImage === 'Visible on hover inside box' ? 'insideBox' : 'underneathBox';

    useEffect(() => {
        //const hasCoverOrContain = props.imageCoverOrContain && props.imageCoverOrContain.length > 0;
        const imagesArray = props.imageCoverOrContain ?? null;
    
        const multipleImages = imagesArray && imagesArray.length > 1;
    
        if (!multipleImages) return;
    
        if (props.imageOptions === 'Shift automatically') {
            if (boxIsHovered) return;
    
            const interval = setInterval(() => {
                setShownImageIndex(prev => (prev + 1) % imagesArray!.length);
            }, 2000);
    
            return () => clearInterval(interval); // Cleanup on unmount or deps change
        }
    
        if (props.imageOptions === 'Shift to next on hover') {
            if (boxIsHovered) {
                setShownImageIndex(1);
            } else {
                setShownImageIndex(0);
            }
        }
    }, [
        props.imageCoverOrContain,
        boxIsHovered,
        props.imageOptions
    ]);
    
    

    function handleMouseEnter () {
        if (props.imageCoverOrContain && ((props.text && textPosition === 'insideBox') || props.imageCoverOrContain.length > 1)) {
            setBoxIsHovered(true);
        } 
    }

    function handleMouseLeave () {
        if (props.imageCoverOrContain && ((props.text && textPosition === 'insideBox') || props.imageCoverOrContain.length > 1)) {
            setBoxIsHovered(false);
        } 
    }

    //console.log(styles.backgroundFade);

    return (
        props.link ? (
            <Link className={styles.link} href={props.link} target={props.openLinkInNewTab ? '_blank' : '_self'}>
                <div className={`${styles.container} ${styles.boxHover}`}>
                    <div 
                        className={`${styles.box} ${props.imageCoverOrContain ? styles.hasImage : ''}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            ...(props.backgroundColor && !props.imageCoverOrContain ? getThemeStyles(props.backgroundColor.color) : {}),
                            ...(props.backgroundColor ? { backgroundColor: getThemeColor(props.backgroundColor.color) } : {})
                        }}
                    >
                        {!props.imageCoverOrContain && props.text && (
                            <div className={`${styles.textContentInsideBox} ${props.backgroundColor?.color !== 'None' ? styles.hasPadding : ''}`}>
                                <ReactMarkdown>{props.text}</ReactMarkdown>
                            </div>  
                        )}
    
                        {props.imageCoverOrContain && props.text && textPosition === 'insideBox' && (
                            <div className={styles.backgroundFade}>
                                <div className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}>
                                    <ReactMarkdown>{props.text}</ReactMarkdown>
                                </div>
                            </div>
                        )} 
    
                        <AnimatePresence mode="wait">
                            {props.imageCoverOrContain && props.imageCoverOrContain.length > 0 && (
                                <motion.div
                                    key={shownImageIndex} // this triggers re-animation on index change
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12, ease: 'easeInOut' }}
                                    className={styles.imageContainer}
                                >
                                    <ImageComponent
                                        image={props.imageCoverOrContain[shownImageIndex].image}
                                        isProductImage={props.imageCoverOrContain[shownImageIndex].isProductImage}
                                        className={styles.image}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
    
                    {props.imageCoverOrContain && props.text && textPosition === 'underneathBox' && (
                        <div className={styles.textContentUnderneathBox}>
                            <ReactMarkdown>{props.text}</ReactMarkdown>
                        </div> 
                    )}
                </div>
            </Link>
        ) : (
            <div className={`${styles.container}`}>
                <div 
                    className={`${styles.box} ${props.imageCoverOrContain ? styles.hasImage : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        ...(props.backgroundColor && !props.imageCoverOrContain ? getThemeStyles(props.backgroundColor.color) : {}),
                        ...(props.backgroundColor ? { backgroundColor: getThemeColor(props.backgroundColor.color) } : {})
                    }}
                >
                    {!props.imageCoverOrContain && props.text && (
                        <div className={`${styles.textContentInsideBox} ${props.backgroundColor?.color !== 'None' ? styles.hasPadding : ''}`}>
                            <ReactMarkdown>{props.text}</ReactMarkdown>
                        </div>  
                    )}

                    {props.imageCoverOrContain && props.text && textPosition === 'insideBox' && (
                        <div className={styles.backgroundFade}>
                            <div className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}>
                                <ReactMarkdown>{props.text}</ReactMarkdown>
                            </div>
                        </div>
                    )} 

                    <AnimatePresence mode="wait">
                        {props.imageCoverOrContain && props.imageCoverOrContain.length > 0 && (
                            <motion.div
                                key={shownImageIndex} // this triggers re-animation on index change
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'linear' }}
                                className={styles.imageContainer}
                            >
                                <ImageComponent
                                    image={props.imageCoverOrContain[shownImageIndex].image}
                                    isProductImage={props.imageCoverOrContain[shownImageIndex].isProductImage}
                                    className={styles.image}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {props.imageCoverOrContain && props.text && textPosition === 'underneathBox' && (
                    <div className={styles.textContentUnderneathBox}>
                        <ReactMarkdown>{props.text}</ReactMarkdown>
                    </div> 
                )}
            </div>
        )
    );
    
}