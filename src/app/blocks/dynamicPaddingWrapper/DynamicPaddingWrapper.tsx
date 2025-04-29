import styles from '../dynamicPaddingWrapper/styles/DynamicPaddingWrapper.module.scss';

interface DynamicPaddingWrapperProps {
    children: React.ReactNode;
}

export default function DynamicPaddingWrapper (props: DynamicPaddingWrapperProps) {
    return (
        <div className={styles.dynamicPaddingWrapper}>{props.children}</div>
    )
}