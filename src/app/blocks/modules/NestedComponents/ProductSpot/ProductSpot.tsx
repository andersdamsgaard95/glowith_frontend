'use client';

import styles from './styles/ProductSpot.module.scss';
import { Product } from '@/app/types/types';
import ImageComponent from '../Image/ImageComponent';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductSpotProps {
    product: Product;
}

export default function ProductSpot(props: ProductSpotProps) {
    const [imageIsHovered, setImageIsHovered] = useState<boolean>(false);
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);

    useEffect(() => {
        const multipleImages = props.product.image && props.product.image?.length > 1;

        if (!multipleImages) return;

        if (shownImageIndex === 0) {
            setShownImageIndex(1)
        } else {
            setShownImageIndex(0);
        }

    }, [imageIsHovered, props.product.image])

    return (
        <section className={styles.wrapper}>
            <Link className={styles.container} href={props.product.pdpSlug ? `/products/${props.product.pdpSlug ?? ''}` : ''}>
                {props.product.image && (
                    <div 
                        className={styles.imageContainer}
                        onMouseEnter={() => setImageIsHovered(true)}
                        onMouseLeave={() => setImageIsHovered(false)}
                    >
                        <ImageComponent
                            image={props.product.image[shownImageIndex]}
                        />
                    </div>
                )}
                {props.product.name && (
                    <div className={styles.productText}>
                        {props.product.name && (
                           <h2 className={styles.name}>{props.product.name}</h2> 
                        )}
                    </div>
                )}
            </Link>
        </section>
    )
}