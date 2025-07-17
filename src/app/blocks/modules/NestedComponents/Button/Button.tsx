import styles from '../Button/styles/Button.module.scss';
import { ButtonType } from "@/app/types/types";
import Link from "next/link";

interface ButtonProps {
    className?: string;
    button: ButtonType;
    fullWidth?: boolean; 
}

export default function Button (props: ButtonProps) {

    const buttonStyleClass = props.button.color === 'Theme Dark Pink' ? styles.themeDarkPink : props.button.color === 'Theme Blue' ? styles.themeBlue : props.button.color === 'Theme Green' ? styles.themeGreen : styles.themeBlue;

    return (
        <Link
            href={props.button.path}
            className={`${styles.button} ${buttonStyleClass} ${props.fullWidth ? styles.fullWidth : ''}`}
            target={props.button.openInNewTab ? '_blank' : '_self'}
        >
            {props.button.buttonText}
        </Link>
    )
}