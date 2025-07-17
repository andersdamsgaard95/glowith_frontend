import { getBlockPadding, getThemeColor } from "@/app/helperFunctions/helperFunctions";
import { BlockSettings, ImageType } from "@/app/types/types";
import styles from './styles/BlockWrapper.module.scss';
import ImageComponent from "../modules/NestedComponents/Image/ImageComponent";

interface BlockWrapperProps {
    children: React.ReactNode;
    noTopBottomPadding?: boolean; 
    settings?: BlockSettings;
    backgroundColor?: string;
    isHero?: boolean;
    backgroundImage?: ImageType;
    imageOverlay?: boolean;
}

export default function BlockWrapper (props: BlockWrapperProps) {

    return (
        <div 
            style={{
                backgroundColor: props.settings?.backgroundColor ? getThemeColor(props.settings.backgroundColor.color) : props.backgroundColor ? getThemeColor(props.backgroundColor) : undefined,
                paddingTop: props.noTopBottomPadding ? '0' : props.settings?.blockPadding?.paddingTop ? getBlockPadding(props.settings.blockPadding.paddingTop) : '50px',
                paddingBottom: props.noTopBottomPadding ? '0' : props.settings?.blockPadding?.paddingBottom ? getBlockPadding(props.settings.blockPadding.paddingBottom) : '50px',
            }}
            className={styles.container}
        >
            {/* If background image */}
            {props.backgroundImage && (
                <div className={`${styles.backgroundImage} ${props.imageOverlay ? styles.imageOverlay : ""}`}>
                    <ImageComponent
                        image={props.backgroundImage}
                    />
                </div>
            )}
            {props.children}
        </div>
    )
}