'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles/Accordian.module.scss';
import { AccordianType, ButtonType } from '@/app/types/types';
import Button from '../Button/Button';
import Image from 'next/image';
import { getThemeColor } from '@/app/helperFunctions/helperFunctions';

export interface AccordianProps {
    //children: React.ReactNode;
    accordian: AccordianType;
}

export default function Accordian(props: AccordianProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);

    const accordian = props.accordian;

    return (
        <div
            className={`${styles.container} ${!accordian.background_color || accordian.background_color.color === 'Theme White' ? styles.hasBorder : ''}`}
            style={{
                backgroundColor: accordian.background_color?.color ? getThemeColor(accordian.background_color.color) : ''
            }}
        >
            <button
                className={styles.headingButtonWrapper}
                onClick={() => setIsOpen(!isOpen)}
            >
                {accordian.heading && <h2 className={styles.heading}>{accordian.heading}</h2>}
                <div className={styles.toggleAccordianBtn}>
                    <Image
                        className={`${styles.arrow} ${isOpen ? styles.isOpen : ''}`}
                        src={'/icons/arrow_right.svg'}
                        alt={isOpen ? 'Close accordian' : 'Open accordian'}
                        fill
                    />
                </div>
            </button>

            <div
                ref={divRef}
                style={{
                    height: isOpen ? `${divRef.current?.scrollHeight}px` : '0px',
                    overflow: 'hidden',
                    transition: 'height 0.3s'
                }}
            >
                <div className={styles.toggleContentWrapper}>
                    {accordian.text && <p>{accordian.text}</p>}
                    {accordian.buttons && accordian.buttons.length > 0 && (
                        <div className={styles.btnsContainer}>
                            {accordian.buttons.map((btn, i) => (
                                <Button
                                    key={i}
                                    button={btn}
                                    fullWidth
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/*
                <div>
                    {props.children}
                </div>
                */}
            </div>
        </div>
    )
}