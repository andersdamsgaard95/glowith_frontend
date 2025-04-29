'use client'

import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import styles from './styles/MultiBox.module.scss';
import { ImageType } from '@/app/types/types';
import ReactMarkdown from 'react-markdown';
import ImageComponent from '../Image/ImageComponent';
import { useState } from 'react';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';

export interface MultiBoxProps {
    backgroundColor?: {color: string};
    image?: ImageType;
    textOptionsIfImage?: string;
    ImageDisplayOptions?: string;
    id?: number;
    text?: string;
    link?: string;
}

export default function MultiBox (props: MultiBoxProps) {
    const [boxIsHovered, setBoxIsHovered] = useState<boolean>(false);
    
    const textPosition = props.textOptionsIfImage === 'Visible on hover inside box' ? 'insideBox' : 'underneathBox';

    function handleMouseEnter () {
        if (props.image && props.text) {
            setBoxIsHovered(true);
        } 
    }

    function handleMouseLeave () {
        if (props.image && props.text) {
            setBoxIsHovered(false);
        } 
    }

    return (
        <div className={styles.container}>
            <div 
                className={`${styles.box} ${styles.boxHover} ${props.image ? styles.hasImage : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    ...(props.backgroundColor && !props.image ? getThemeStyles(props.backgroundColor.color) : {}),
                    ...(props.backgroundColor ? { backgroundColor: getThemeColor(props.backgroundColor.color) } : {})
                }}
            >
                {!props.image && props.text && (
                    <div className={styles.textContentInsideBox}>
                        <ReactMarkdown>
                            {props.text}
                        </ReactMarkdown>
                    </div>  
                )}

                {props.image && props.text && textPosition === 'insideBox' && (
                    <div 
                        className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}
                    >
                        <ReactMarkdown>
                            {props.text}
                        </ReactMarkdown>
                    </div>
                )}

                {props.image && (
                    <div className={styles.imageContainer}>
                        <ImageComponent
                            image={props.image}
                            className={styles.image}
                        />
                    </div>
                )}
                
            </div>

            {props.image && props.text && textPosition === 'underneathBox' && (
                <div className={styles.textContentUnderneathBox}>
                    <ReactMarkdown>
                        {props.text}
                    </ReactMarkdown>
                </div> 
            )}
            
        </div>
    )
}