'use client';

import { useEffect, useState } from 'react';
import styles from './styles/PageLoader.module.scss';
import Image from 'next/image';

export default function PageLoader() {
    const [isShown, setIsShown] = useState<boolean>(true);
    const [canStartAnimation, setCanStartAnimation] = useState<boolean>(false);

    useEffect(() => {
        function startSequence() {
            // Starter animationen
            setCanStartAnimation(true);

            // Og vi fjerner loaderen præcis efter de 3 sekunder, som animationen tager
            setTimeout(() => {
                setIsShown(false);
            }, 3000);
        };

        // Hvis siden allerede er loadet (f.eks. ved hurtig navigation)
        if (document.readyState === 'complete') {
            startSequence();
        } else {
            // Ellers vent til ALT er loadet i browseren
            window.addEventListener('load', startSequence);
            return () => window.removeEventListener('load', startSequence);
        }
    }, []);

    if (!isShown) return null;

    return (
        <div className={styles.wrapper}>
            {/* Animationen kører kun, når canStartAnimation er true */}
            <div className={`${styles.imageWrapper} ${canStartAnimation ? styles.animationWrapper : ''}`}>
                <Image
                    src={"/logo/Glowith_Skincare_logo_Black_.png"}
                    alt="Glowith logo"
                    fill
                    className={styles.logo}
                    priority
                />
            </div>
        </div>
    )
}