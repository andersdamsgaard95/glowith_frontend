import { BlockSettings, ButtonType } from '@/app/types/types';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import MultiBox, { MultiBoxProps } from '../NestedComponents/MultiBox/MultiBox';
import styles from './styles/MultiBoxRow.module.scss';
import Button from '../NestedComponents/Button/Button';

interface MultiBoxRowProps {
    backgroundColor?: {color: string};
    multiBoxSmall?: MultiBoxProps[];
    settings?: BlockSettings; 
    heading?: string;
    description?: string;
    button?: ButtonType;
    buttonPosition?: string;
}

const MultiBoxRow: React.FC<MultiBoxRowProps> = (props) => {

    const buttonPositionClass = props.buttonPosition && props.buttonPosition === 'Left' ? styles.buttonLeft : props.buttonPosition === 'Right' ? styles.buttonRight : styles.buttonCenter; 
    
    return (
        <BlockWrapper settings={props.settings}>
            <ContentWrapper>
                <section className={styles.wrapper}>

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

                    <div className={styles.container}>
                        {props.multiBoxSmall?.map((box) => (
                            <div 
                                className={styles.box}
                                key={box.id}
                            >
                                <MultiBox {...box}/>
                            </div>
                        ))}
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

export default MultiBoxRow;