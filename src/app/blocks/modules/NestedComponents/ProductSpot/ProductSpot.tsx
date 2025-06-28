'use client';

import styles from './styles/ProductSpot.module.scss';
import { Product } from '@/app/types/types';
import ImageComponent from '../Image/ImageComponent';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductSpotProps {
    product: Product;
}

export default function ProductSpot(props: ProductSpotProps) {
    const [imageIsHovered, setImageIsHovered] = useState<boolean>(false);
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);

    useEffect(() => {
        const multipleImages = props.product.imageCoverOrContain && props.product.imageCoverOrContain?.length > 1;

        if (!multipleImages) return;

        if (imageIsHovered) {
            setShownImageIndex(1);
        } else {
            setShownImageIndex(0);
        }

    }, [imageIsHovered, props.product.imageCoverOrContain])

    return (
        <section className={styles.wrapper}>
            <Link className={styles.container} href={props.product.pdpSlug ? `/products/${props.product.pdpSlug ?? ''}` : ''}>
                {props.product.imageCoverOrContain && props.product.imageCoverOrContain.length > 0 && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={shownImageIndex} // triggers animation when image changes
                            className={styles.imageContainer}
                            onMouseEnter={() => setImageIsHovered(true)}
                            onMouseLeave={() => setImageIsHovered(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'linear' }}
                            >
                            <ImageComponent
                                image={props.product.imageCoverOrContain[shownImageIndex].image}
                                isProductImage={props.product.imageCoverOrContain[shownImageIndex].isProductImage}
                            />
                        </motion.div>
                  </AnimatePresence>
                )}
                {props.product.name && (
                    <div className={styles.productText}>
                        {props.product.name && (
                           <h2 className={styles.name}>{props.product.name}</h2> 
                        )}
                        {props.product.shortDescription && (
                            <p>{props.product.shortDescription}</p>
                        )}
                    </div>
                )}
            </Link>
        </section>
    )
}