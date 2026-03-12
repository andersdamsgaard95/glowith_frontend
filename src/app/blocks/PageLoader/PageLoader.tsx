'use client';

import { useEffect, useState } from 'react';
import styles from './styles/PageLoader.module.scss';
import Image from 'next/image';

export default function PageLoader() {
    const [isShown, setIsShown] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(false);
        }, 3000)

        return () => clearTimeout(timer);
    }, [])

    if (!isShown) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                <Image
                    src={"/logo/Glowith_Skincare_logo_Black_.png"}
                    alt="Glowith logo"
                    fill
                    //width={476}
                    //height={161}
                    className={styles.logo}
                />
            </div>
        </div>
    )
}