'use client';

import styles from './styles/ImageSlider.module.scss';
import { ImageType, imageCoverOrContainObject } from "@/app/types/types";
import { useState } from "react";
import ImageComponent from '../Image/ImageComponent';
import Image from 'next/image';

interface ImageSliderProps {
    images: imageCoverOrContainObject[];
}

export default function ImageSlider(props: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    //const [touchStartX, setTouchStartX] = useState(0);

    const { images } = props;

    const nextSlide = () => {
        images && setCurrentIndex((prev) => (prev + 1));
    };
    
      const prevSlide = () => {
        images && setCurrentIndex((prev) => (prev - 1));
    };

    /*const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].clientX);
    };*/

    /*const handleTouchEnd = (e: React.TouchEvent) => {

        const distance = touchStartX - e.changedTouches[0].clientX;

        if (distance > 50) {
            nextSlide(); // Swiped left
        } else if (distance < -50) {
            prevSlide(); // Swiped right
        }
    };*/
    
    return (
        images && (
            <div className={styles.imageWrapper}>
                <div 
                    className={styles.imageSliderTrack}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    //onTouchStart={handleTouchStart}
                    //onTouchEnd={handleTouchEnd}
                >
                    {images?.map((image, index) => (
                        <div 
                            className={styles.imageContainer}
                            key={index}
                        >
                            <ImageComponent image={image.image} isProductImage={image.isProductImage} />
                        </div>
                    ))}
                </div>
    
                {/* Slide Buttons */}
                {images.length > 1 && (
                    <>
                        <button 
                            className={`${styles.arrowNext} ${styles.arrow}`} 
                            onClick={nextSlide}
                            disabled={currentIndex === images.length - 1}
                        >
                            <Image
                                src={'/icons/arrow_right.svg'}
                                height={50}
                                width={50}
                                alt='Arrow to right'
                                className={`${currentIndex === images.length - 1 ? styles.hideArrow : ''} ${styles.arrowIcon}`}
                            />
                        </button>
                        <button 
                            className={`${styles.arrowPrev} ${styles.arrow}`} 
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                        >
                            <Image
                                src={'/icons/arrow_left.svg'}
                                height={50}
                                width={50}
                                alt='Arrow to right'
                                className={`${currentIndex === 0 ? styles.hideArrow : ''} ${styles.arrowIcon}`}
                            />
                        </button>
                    </>
                )}
            </div>
        )
    );
}