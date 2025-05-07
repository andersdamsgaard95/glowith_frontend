import { fetchFooterData } from '@/lib/api';
import BlockWrapper from '../blockWrapper/BlockWrapper';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import styles from './styles/Footer.module.scss';

interface FooterProps {
    footerText?: string;
}

export default async function Footer () {

    const footerData: FooterProps = await fetchFooterData();

    return (
        <BlockWrapper backgroundColor='Theme Green'>
            <ContentWrapper>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img src="/logo/Glowith_Skincare_logo_Black.svg" alt="" className={styles.logo} />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.text}>{footerData.footerText}</p>
                    </div>
                </div>
            </ContentWrapper>
        </BlockWrapper>
    )
}