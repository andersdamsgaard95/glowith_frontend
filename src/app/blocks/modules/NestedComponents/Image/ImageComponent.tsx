'use client';

import { ImageType } from '@/app/types/types';
import styles from '../Image/styles/Image.module.scss';
import Image from 'next/image';
//import { useAppContext } from '@/context/AppContext';

interface ImageComponentProps {
    className?: string;
    image: ImageType;
    isProductImage?: boolean;
}

export default function ImageComponent (props:ImageComponentProps) {
    //const { backendUrl } = useAppContext()

    return (
        <div className={styles.container}>
            <Image
                //src={`${backendUrl}${props.image?.url}`}
                src={`${props.image?.url}`}
                alt={props.image.alternativeText ?? ''}
                //className={props.className}
                className={`${styles.image} ${props.isProductImage ? styles.productImage : ""}`}
                //fill
                height={props.image.height}
                width={props.image.width}
            />
        </div>
    )
}