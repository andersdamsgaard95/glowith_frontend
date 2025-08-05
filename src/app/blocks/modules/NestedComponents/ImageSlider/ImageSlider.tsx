'use client';

import styles from './styles/ImageSlider.module.scss';
import { imageCoverOrContainObject } from "@/app/types/types";
import { useEffect, useRef, useState } from "react";
import ImageComponent from '../Image/ImageComponent';
import Image from 'next/image';

interface ImageSliderProps {
    images: imageCoverOrContainObject[];
    productBackgroundColor?: string;
}

export default function ImageSlider(props: ImageSliderProps) {
    const [slideWidth, setSlideWidth] = useState<number>(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const { images } = props;

    const sliderRef = useRef<HTMLDivElement>(null);

    // Measure slide width after render
    useEffect(() => {
        if (sliderRef.current?.firstElementChild) {
            setSlideWidth(sliderRef.current.firstElementChild.clientWidth);
        }

        // Optional: update on window resize
        /*const handleResize = () => {
            if (sliderRef.current?.firstElementChild) {
                setSlideWidth(sliderRef.current.firstElementChild.clientWidth);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);*/

    }, [images]);

    const nextSlide = () => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollBy({
            left: slideWidth,
            behavior: 'smooth',
        });
    };
    
    const prevSlide = () => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollBy({
            left: -slideWidth,
            behavior: 'smooth',
        });
    };   
    
    const handleScroll = () => {
        if (!sliderRef.current) return;
    
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // subtract 1 to allow for rounding errors
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        handleScroll(); // Initial check
        slider.addEventListener('scroll', handleScroll);
    
        return () => slider.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        images && (
            <div className={styles.imageWrapper}>
                <div 
                    className={styles.imageSliderTrack}
                    ref={sliderRef}
                    style={{
                        backgroundColor: props.productBackgroundColor
                    }}
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
                            disabled={isAtEnd}
                        >
                            <Image
                                src={'/icons/arrow_right.svg'}
                                height={50}
                                width={50}
                                alt='Slide to next image'
                                className={`${isAtEnd ? styles.hideArrow : ''} ${styles.arrowIcon}`}
                            />
                        </button>
                        <button 
                            className={`${styles.arrowPrev} ${styles.arrow}`} 
                            onClick={prevSlide}
                            disabled={isAtStart}
                        >
                            <Image
                                src={'/icons/arrow_left.svg'}
                                height={50}
                                width={50}
                                alt='Slide to previous image'
                                className={`${isAtStart ? styles.hideArrow : ''} ${styles.arrowIcon}`}
                            />
                        </button>
                    </>
                )}
            </div>
        )
    );
}