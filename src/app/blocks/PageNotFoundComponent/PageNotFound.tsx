import BlockWrapper from '../blockWrapper/BlockWrapper';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Button from '../modules/NestedComponents/Button/Button';
import styles from './styles/PageNotFound.module.scss';

export default function PageNotFound() {

    const button = {
        color: "Theme Blue",
        path: "/",
        buttonText: "Return to homepage"
    }

    return (
        <BlockWrapper>
            <ContentWrapper>
                <section className={styles.container}>
                    <h1>Woopsie! You've gotten lost</h1>
                    <Button
                        button={button}
                    />
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}