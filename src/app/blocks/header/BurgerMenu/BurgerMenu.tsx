import { menuItem } from '@/app/types/types';
import { headerProps } from '../Header';
import styles from './styles/BurgerMenu.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BurgerMenuProps extends headerProps {
    showBurger: boolean;
    closeBurger: () => void;
};

export default function BurgerMenu(props: BurgerMenuProps) {
    const {menuItems} = props;
    const [clickedMenuItem, setClickedMenuItem] = useState<number | null>(null)
    const [showLevel2, setShowLevel2] = useState<boolean>(false);

    useEffect(() => {
        if (!props.showBurger) {
            setClickedMenuItem(null);
            setShowLevel2(false);
        }
    }, [props.showBurger])
    
    return (
        <nav className={styles.wrapper}>
            
            {/* Level 1 */}
            <div className={styles.burgerLevel1}>
                <div 
                    className={styles.exitBurger}
                    onClick={props.closeBurger}
                >
                    X
                </div>
                {menuItems.map((menuItem: menuItem, index: number) => (
                    <div
                        className={styles.menuItemWrapper}
                        key={index}
                    >
                        <Link
                            className={styles.menuItem}
                            href={menuItem.destinationPath ? menuItem.destinationPath : ''}
                            onClick={props.closeBurger}
                        >
                            {menuItem.name}
                        </Link>
                        {menuItem.menuChild.length > 0 && (
                            <div 
                                className={styles.plusIcon}
                                onClick={() => {
                                    setClickedMenuItem(index);
                                    setShowLevel2(true);
                                }}
                            >
                                +
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Level 2 */}
            <div className={`${styles.slideWrapper} ${showLevel2 ? styles.openLevel2 : ''}`}>
                {clickedMenuItem !== null && menuItems[clickedMenuItem].menuChild.length > 0 && (
                    <div className={styles.burgerLevel2}>
                        <div className={styles.burgerLevel2HeadingWrapper}>
                            <div 
                                onClick={() => {
                                    setShowLevel2(false),
                                    setTimeout(() => {
                                        setClickedMenuItem(null)
                                    }, 600)
                                }}
                                className={styles.arrowBack}
                            >
                                Arrow back
                            </div>
                            <span className={styles.burgerLevel2Heading}>{menuItems[clickedMenuItem].name}</span>
                        </div>
                        {menuItems[clickedMenuItem].menuChild.map((menuChild, index) => (
                            <div className={styles.menuChildWrapper} key={index}>
                                <Link 
                                    href={menuChild.destinationPath ? menuChild.destinationPath : ''}
                                    className={styles.menuItem}    
                                >
                                    {menuChild.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}