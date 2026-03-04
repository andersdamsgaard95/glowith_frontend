'use client';

import styles from './styles/ProductSpot.module.scss';
import { Product } from '@/app/types/types';
import ImageComponent from '../Image/ImageComponent';
import { useState } from 'react';
import Link from 'next/link';
import { getThemeColor } from '@/app/helperFunctions/helperFunctions';

interface ProductSpotProps {
    product: Product;
}

export default function ProductSpot(props: ProductSpotProps) {
    const [shownImageIndex, setShownImageIndex] = useState<number>(0);

    return (
        <section className={styles.wrapper}>
            <Link className={styles.container} href={props.product.pdpSlug ? `/products/${props.product.pdpSlug ?? ''}` : ''}>
                <div
                    className={styles.imageWrapper}
                    style={{
                        backgroundColor: getThemeColor(props.product.Display_Background_Color?.color),
                    }}
                    onMouseEnter={() => setShownImageIndex(1)}
                    onMouseLeave={() => setShownImageIndex(0)}
                >
                    {props.product.imageCoverOrContain.length === 1 ? (
                        <div
                            className={styles.imageContainer}
                        >
                            <ImageComponent
                                image={props.product.imageCoverOrContain[0].image}
                                isProductImage={props.product.imageCoverOrContain[0].isProductImage}
                            />
                        </div>

                    ) : props.product.imageCoverOrContain.length > 1 ? (
                        <>
                            <div
                                className={`${styles.imageContainer} ${shownImageIndex === 1 ? styles.invisible : ''}`}
                            >
                                <ImageComponent
                                    image={props.product.imageCoverOrContain[0].image}
                                    isProductImage={props.product.imageCoverOrContain[0].isProductImage}
                                />
                            </div>
                            <div
                                className={`${styles.imageContainer} ${shownImageIndex === 0 ? styles.invisible : ''}`}
                            >
                                <ImageComponent
                                    image={props.product.imageCoverOrContain[1].image}
                                    isProductImage={props.product.imageCoverOrContain[1].isProductImage}
                                />
                            </div>
                        </>
                    ) : null}
                </div>

                {props.product.name && (
                    <div className={styles.productText}>
                        {props.product.name && (
                            <h2 className={styles.name}>{props.product.name}</h2>
                        )}
                        {props.product.shortDescription && (
                            <p>{props.product.shortDescription}</p>
                        )}
                        <div className={styles.button}>EXPLORE PRODUCT</div>
                    </div>
                )}
            </Link>
        </section>
    )
}