'use client'

import { getThemeColor } from '@/app/helperFunctions/helperFunctions';
import styles from './styles/MultiBox.module.scss';
import ReactMarkdown from 'react-markdown';
import ImageComponent from '../Image/ImageComponent';
import { useEffect, useState } from 'react';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import Link from 'next/link';
import { imageCoverOrContainObject } from '@/app/types/types';

export interface MultiBoxProps {
    backgroundColor?: { color: string };
    textOptionsIfImage?: string;
    ImageDisplayOptions?: string;
    id?: number;
    text?: string;
    link?: string;
    imageOptions?: 'Shift automatically' | 'Shift to next on hover';
    openLinkInNewTab?: boolean;
    imageCoverOrContain?: imageCoverOrContainObject[];
    Button_Text?: string;
}

export default function MultiBox(props: MultiBoxProps) {
    const [boxIsHovered, setBoxIsHovered] = useState<boolean>(false);
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);

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
            }, 4000);

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

    function handleMouseEnter() {
        if (props.imageCoverOrContain && ((props.text && textPosition === 'insideBox') || props.imageCoverOrContain.length > 1)) {
            setBoxIsHovered(true);
        }
    }

    function handleMouseLeave() {
        if (props.imageCoverOrContain && ((props.text && textPosition === 'insideBox') || props.imageCoverOrContain.length > 1)) {
            setBoxIsHovered(false);
        }
    }

    const boxContent =
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
                        {props.Button_Text && (
                            <p className={styles.button}>
                                {props.Button_Text}
                            </p>
                        )}
                    </div>
                )}

                {props.imageCoverOrContain && props.text && textPosition === 'insideBox' && (
                    <div className={styles.backgroundFade}>
                        <div className={`${styles.textWithImage} ${boxIsHovered ? styles.textFadeIn : ''}`}>
                            <ReactMarkdown>{props.text}</ReactMarkdown>
                            {props.Button_Text && (
                                <p className={styles.button}>
                                    {props.Button_Text}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {props.imageCoverOrContain && props.imageCoverOrContain.length > 1 && props.imageOptions === 'Shift automatically' ? (
                    <div className={styles.imageSlider}>
                        <div
                            className={styles.sliderInner}
                            style={{ transform: `translateX(-${shownImageIndex * 100}%)` }}
                        >
                            {props.imageCoverOrContain.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${styles.imageContainer}`}
                                    style={{
                                        backgroundColor: image.Background_color ? getThemeColor(image.Background_color.color) : ''
                                    }}
                                >
                                    <ImageComponent
                                        image={image.image}
                                        isProductImage={image.isProductImage}
                                        className={styles.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : props.imageCoverOrContain && props.imageCoverOrContain.length > 1 && props.imageOptions === 'Shift to next on hover' ? (
                    <>
                        <div
                            className={`${styles.absolutImageContainer} ${shownImageIndex === 1 ? styles.invisible : ''}`}
                        >
                            <ImageComponent
                                image={props.imageCoverOrContain[0].image}
                                isProductImage={props.imageCoverOrContain[0].isProductImage}
                                className={styles.image}
                            />
                        </div>
                        <div
                            className={`${styles.absolutImageContainer} ${shownImageIndex === 0 ? styles.invisible : ''}`}
                        >
                            <ImageComponent
                                image={props.imageCoverOrContain[1].image}
                                isProductImage={props.imageCoverOrContain[1].isProductImage}
                                className={styles.image}
                            />
                        </div>
                    </>

                ) : props.imageCoverOrContain && props.imageCoverOrContain.length === 1 && (
                    <div
                        className={styles.imageContainer}
                    >
                        <ImageComponent
                            image={props.imageCoverOrContain[0].image}
                            isProductImage={props.imageCoverOrContain?.[0].isProductImage}
                            className={styles.image}
                        />
                    </div>
                )}
            </div>

            {props.imageCoverOrContain && props.text && textPosition === 'underneathBox' && (
                <div className={styles.textContentUnderneathBox}>
                    <ReactMarkdown>{props.text}</ReactMarkdown>
                    {props.Button_Text && (
                        <div className={styles.button}>
                            {props.Button_Text}
                        </div>
                    )}
                </div>
            )}
        </div>

    return (
        props.link ? (
            <Link className={styles.link} href={props.link} target={props.openLinkInNewTab ? '_blank' : '_self'}>
                {boxContent}
            </Link>
        ) : (
            boxContent
        )
    );
}