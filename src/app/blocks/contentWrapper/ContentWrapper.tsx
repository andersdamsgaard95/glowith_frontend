import styles from '../contentWrapper/styles/ContentWrapper.module.scss';

interface ContentWrapperProps {
    children: React.ReactNode;
    isFullBackground?: boolean; 
}

export default function ContentWrapper (props: ContentWrapperProps) {
    return (
        <div className={`${styles.contentWrapper} ${!props.isFullBackground ? styles.constrainedWidth : undefined}`}>
            {props.children}
        </div>
    )
}