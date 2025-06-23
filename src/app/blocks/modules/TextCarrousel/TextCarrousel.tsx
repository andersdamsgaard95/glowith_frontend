import { BlockSettings } from '@/app/types/types';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import styles from './styles/TextCarrousel.module.scss';
import { getThemeColor } from '@/app/helperFunctions/helperFunctions';

interface TextCarrouselProps {
  text?: string;
  settings?: BlockSettings;
}

export default function TextCarrousel({ text, settings }: TextCarrouselProps) {

  const repeatedText = Array(10).fill(text).map((t, i) => <span key={i}>{t}</span>);

  return (
    <BlockWrapper settings={settings}>
      <ContentWrapper isFullBackground>
        <div className={styles.wrapper}>
            <div className={styles.track}>
                {repeatedText}
                {repeatedText}
            </div>

            {/* Fading edges */}
            <div 
                className={`${styles.fadingEdge} ${styles.leftFade}`}
                style={{background: `linear-gradient(to right, ${getThemeColor(settings?.backgroundColor?.color)}, transparent)`}}
            >
            </div>
            <div 
                className={`${styles.fadingEdge} ${styles.rightFade}`}
                style={{background: `linear-gradient(to left, ${getThemeColor(settings?.backgroundColor?.color)}, transparent)`}}
            >
            </div>
        </div>
      </ContentWrapper>
    </BlockWrapper>
  );
}
