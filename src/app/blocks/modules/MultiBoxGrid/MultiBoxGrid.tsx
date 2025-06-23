import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import MultiBox from '../NestedComponents/MultiBox/MultiBox';
import styles from './styles/MultiBoxGrid.module.scss';
import { MultiBoxProps } from '../NestedComponents/MultiBox/MultiBox';
import { BlockSettings, ButtonType } from '@/app/types/types';
import { getThemeStyles } from '@/app/helperFunctions/helperFunctions';
import Button from '../NestedComponents/Button/Button';

interface MultiBoxGridProps {
    heading?: string;
    description?: string;
    multiBoxSmall?: MultiBoxProps[];
    multiBoxBig?: MultiBoxProps;
    bigBoxLeft?: boolean;
    settings?: BlockSettings;
    button?: ButtonType;
    buttonPosition?: string;
}

const MultiBoxGrid: React.FC<MultiBoxGridProps> = (props) => {

    const buttonPositionClass = props.buttonPosition && props.buttonPosition === 'Left' ? styles.buttonLeft : props.buttonPosition === 'Right' ? styles.buttonRight : styles.buttonCenter; 

    return (
        <BlockWrapper
            settings={props.settings}
        >
            <ContentWrapper>
                <section 
                    className={styles.wrapper}
                    style={props.settings?.backgroundColor ? getThemeStyles(props.settings.backgroundColor.color) : undefined}
                >

                    {(props.heading || props.description) && (
                        <div className={styles.sectionText}>
                            {props.heading && (
                                <h2>{props.heading}</h2>
                            )}

                            {props.description && (
                                <p>{props.description}</p>
                            )}
                        </div>
                    )}
                    

                    <div className={`${styles.container} ${props.bigBoxLeft ? styles.flipLayout : ''}`}>
                        <div 
                            className={styles.smallBoxContainer}
                            style={{
                                gridColumn: props.bigBoxLeft ? '3/4' : '1/2',
                                gridRow: '1/2'
                            }}
                        >
                            {props.multiBoxSmall?.map((box) => (
                                <div className={styles.smallBox} key={box.id}>
                                <MultiBox 
                                        {...box}
                                    /> 
                                </div>
                                
                            ))}
                        </div>
                        <div 
                            className={styles.bigBoxContainer}
                            style={{
                                gridColumn: props.bigBoxLeft ? '1/3' : '2/4',
                                gridRow: '1/2',
                                aspectRatio: props.multiBoxBig?.imageCoverOrContain ? '1/1' : ''
                            }}
                        >
                            <MultiBox
                                {...props.multiBoxBig}
                            />
                        </div>
                    </div>

                    {props.button && (
                        <div className={buttonPositionClass}>
                            <Button
                                button={props.button}
                            />
                        </div>
                        
                    )}
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default MultiBoxGrid;