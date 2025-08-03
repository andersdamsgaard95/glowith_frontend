import styles from '../Hero/styles/Hero.module.scss';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ImageComponent from '../NestedComponents/Image/ImageComponent';
import Button from '../NestedComponents/Button/Button';
import { ImageType, ButtonType } from '@/app/types/types';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';

interface HeroProps {
    heading?: string;
    text?: string;
    image?: ImageType;
    button?: ButtonType[];
    backgroundColor?: { color: string; }
    imageFullBackground?: boolean;
    textPosition?: string;
    textColorOnImage?: "Dark" | "Light";
    imageZoomOn?: boolean;
    Text_Contrast_Background_Fade?: boolean;
    Block_height?: 'Default 100% view height' | 'Smaller 80% view height';
}

const Hero: React.FC<HeroProps> = (props) => {

    const themeStyles = !props.imageFullBackground && props.backgroundColor?.color ? getThemeStyles(props.backgroundColor.color) : undefined; 

    const textPositionClass = props.imageFullBackground && props.textPosition?.includes('Right') ? styles.textAlignRight : undefined;

    return (
        <BlockWrapper isHero={true} backgroundColor={props.backgroundColor?.color} noTopBottomPadding={true}>
            <ContentWrapper isFullBackground={props.imageFullBackground}>
                <section 
                    style={!props.imageFullBackground 
                        ? {
                            ...themeStyles,
                            color: props.textColorOnImage === "Light" ? "#000000" : "#ffffff"
                        } : undefined} 
                    className={`
                        ${styles.container}
                        ${props.Block_height === 'Smaller 80% view height' ? styles.constrainVh : ''} 
                        ${textPositionClass} 
                        ${!props.imageFullBackground && props.textPosition?.includes('Left') ? styles.flipped : ''} 
                        ${!props.imageFullBackground ? styles.splitBackground : ''} 
                        ${props.imageFullBackground && props.Text_Contrast_Background_Fade
                            ? props.textPosition?.includes('Right')
                                ? styles.backgroundLayerToLeft
                                : styles.backgroundLayerToRight
                            : ''}
                    `}
                >

                    {/* Image */}
                    {props.image && (
                        <div className={`${props.imageFullBackground ? styles.imageWrapperFullScreen : styles.imageWrapperHalfScreen}`}>  
                            <div
                                className={`${styles.imageContainer} ${props.imageZoomOn ? styles.zoom : ''}`}
                            >
                                <ImageComponent
                                    image={props.image}
                                /> 
                            </div>         
                        </div> 
                    )}  
                    
                    <div className={`${props.imageFullBackground ? styles.contentWrapper : styles.contentWrapperSplitBackground} ${props.imageFullBackground ? styles.contentPadding : undefined} ${props.textPosition?.includes('Center') ? styles.alignCenter : props.textPosition?.includes('Top') ? styles.alignStart : undefined}`}>
                        {/* Heading */}
                        {props.heading && (
                            <h1 
                                className={styles.heading}
                                style={{color: props.imageFullBackground && props.textColorOnImage === 'Light' && !props.Text_Contrast_Background_Fade ? '#ffffff' : ''}}
                            >
                                {props.heading}
                            </h1> 
                        )}

                        {/* Text */}
                        {props.text && (
                            <p 
                                className={styles.text}
                                style={{color: props.imageFullBackground && props.textColorOnImage === 'Light' && !props.Text_Contrast_Background_Fade ? '#ffffff' : ''}}
                            >
                                {props.text}
                            </p>
                        )}

                        {/* Button */}
                        {props.button && props.button.length > 0 && props.button.map((button, i) => (
                            <div key={i} className={styles.buttonWrapper}>
                                <Button
                                    button={button}
                                />  
                            </div>
                        ))}  
                    </div>                          

                </section>
            </ContentWrapper>
            
        </BlockWrapper>
    )
} 

export default Hero;