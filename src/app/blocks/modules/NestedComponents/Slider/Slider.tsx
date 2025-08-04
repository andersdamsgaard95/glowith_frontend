'use client';

import { Product } from '@/app/types/types';
import styles from './styles/Slider.module.scss';
import ProductSpot from '../ProductSpot/ProductSpot';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import Image from 'next/image';

interface SliderProps {
    slides?: Product[];
}

export default function Slider (props: SliderProps) {

    const sliderRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [prevIsDisabled, setPrevIsDisabled] = useState<boolean>(false);
    const [nextIsDisabled, setNextIsDisabled] = useState<boolean>(false);

    function updateButtonStates() {
        const slider = sliderRef.current;
        if (!slider) return;

        const scrollLeft = slider.scrollLeft;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        setPrevIsDisabled(scrollLeft <= 0);
        setNextIsDisabled(scrollLeft >= maxScrollLeft - 1); // -1 for edge precision
    }

    function nextSlide() {

        const gap = width <= 700 ? 10 : width <= 1000 ? 25 : 50;

        const slider = sliderRef.current;

        if (slider && slider.firstChild instanceof HTMLElement) {
            const slideWidth = slider.firstChild.offsetWidth;
            slider.scrollBy({
                left: slideWidth + gap,
                behavior: 'smooth',
            });
        }
    }

    function prevSlide() {

        const gap = width <= 700 ? 10 : width <= 1000 ? 25 : 50;

        const slider = sliderRef.current;

        if (slider && slider.firstChild instanceof HTMLElement) {
            const slideWidth = slider.firstChild.offsetWidth;
            slider.scrollBy({
                left: -(slideWidth + gap),
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleScroll = () => updateButtonStates();

        slider.addEventListener('scroll', handleScroll);
        updateButtonStates(); // initial check

        return () => {
            slider.removeEventListener('scroll', handleScroll);
        };
    }, [width, props.slides]); // re-check on resize or new slides
    
    return (
        <div className={styles.sliderContainer}>

            <div className={styles.sliderTrack} ref={sliderRef}>
                {props.slides && props.slides.length > 0 && props.slides.map((slide: Product, i: number) => (
                    <div key={i} className={styles.slideContainer}>
                        <ProductSpot product={slide}/>  
                    </div>
                ))}
            </div>

            {/* Arrow buttons */}
            {width >= 700 && (
                <>
                    <button
                        aria-label='Slide to previous slide' 
                        className={styles.arrowBack}
                        onClick={prevSlide}
                        disabled={prevIsDisabled}
                    >
                        <Image
                            src={'/icons/arrow_left.svg'}
                            alt='Slide to next slide'
                            width={50}
                            height={50}
                            className={styles.arrow}
                        />
                    </button>

                    <button 
                        aria-label='Slide to next slide' 
                        className={styles.arrowNext}
                        onClick={nextSlide}
                        disabled={nextIsDisabled}
                    >
                        <Image
                            src={'/icons/arrow_right.svg'}
                            alt='Slide to next slide'
                            width={50}
                            height={50}
                            className={styles.arrow}
                        />
                    </button>
                </>
            )}

        </div>
    )
}