'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles/header.module.scss';
//import { fetchMenuData } from '@/lib/api';
import BlockWrapper from '../blockWrapper/BlockWrapper';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useState, useEffect } from 'react';
import { menuItem } from '@/app/types/types';
import ImageComponent from '../modules/NestedComponents/Image/ImageComponent';
import { useWindowSize } from 'react-use';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Image from 'next/image';

export interface headerProps {
    menuItems: menuItem[];
}

export default function Header (props:headerProps) {
    //const menuItems = await fetchMenuData();
    const {menuItems} = props;
    const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [headerIsAtTop, setHeaderIsAtTop] = useState<boolean>(true);
    const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false);
    //const [burgerMenuExists, setBurgerMenuExists] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    //Is Hydrated
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Submenu hide on scroll
    useEffect(() => {
        function handleScroll() {
          if (hoveredMenuItem !== null) {
            setHoveredMenuItem(null);
          }
        };
      
        document.addEventListener('scroll', handleScroll);

        return () => {
          document.removeEventListener('scroll', handleScroll);
        };
    }, [hoveredMenuItem]);

    // Smart sticky header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setHeaderIsAtTop(currentScrollY <= 100);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setShowHeader(false);
            } else {
                // Scrolling up
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const pathname = usePathname();

    // Close submenu or burgermenu on navigation
    useEffect(() => {
        if (hoveredMenuItem !== null) {
           setHoveredMenuItem(null);
        }
        if (burgerMenuIsOpen) {
            closeBurgerMenu();
        }
    }, [pathname])

    function closeBurgerMenu() {
        /*setBurgerMenuIsOpen(false);
        setTimeout(() => {
            setBurgerMenuExists(false);
        }, 600);*/
        setBurgerMenuIsOpen(false);
    }

    const { width } = useWindowSize();

    const isTabletOrSmaller = width <= 1000;

    return (
        <BlockWrapper noTopBottomPadding={true}>
            <ContentWrapper isFullBackground={true}>
                
                {/* Header */}
                <div className={`${styles.header} ${!showHeader ? styles.hideHeader : ''}`}>
                    <div className={`${styles.innerHeader} ${!headerIsAtTop ? styles.scrolledHeader : ''}`}>

                        <Link 
                            className={styles.logoContainer}
                            href={'/'}
                        >
                            <Image
                                src={"/logo/Glowith_Skincare_logo_Black_.png"}
                                alt="Glowith logo"
                                fill
                                sizes='150'
                                className={styles.logo}
                            />
                        </Link>

                        {isClient && isTabletOrSmaller ? (
                            <button 
                                onClick={() => {
                                    /*setBurgerMenuExists(true);
                                    setTimeout(() => {
                                        setBurgerMenuIsOpen(true) 
                                    }, 0);*/
                                    setBurgerMenuIsOpen(true);
                                }}
                                className={styles.burgerIconContainer}
                            >
                                <Image
                                    src={'/icons/burger_menu.svg'}
                                    alt='Open menu'
                                    fill
                                    className={styles.burgerIcon}
                                />
                            </button>
                        ) : (
                            <nav 
                                className={styles.menu}
                                onMouseLeave={() => setHoveredMenuItem(null)}
                            >
                                {menuItems.map((menuItem:menuItem, index:number) => (
                                    <div
                                        key={menuItem.id}
                                        className={`${styles.menuItemWrapper} ${hoveredMenuItem === index && menuItem.menuChild.length > 0 ? styles.activeStyle : ''} ${pathname === menuItem.destinationPath ? styles.active : ''}`}
                                        onMouseEnter={() => setHoveredMenuItem(index)}
                                    >
                                        <Link
                                            className={`${styles.menuItem}`}
                                            href={menuItem.destinationPath ? menuItem.destinationPath : ''}
                                        >
                                            {menuItem.name}
                                        </Link>
                                    </div>
                                ))}

                                {/* Submenu */}
                                {hoveredMenuItem !== null && menuItems[hoveredMenuItem].menuChild.length > 0 && (
                                    <div className={styles.subMenuAirWrapper}>
                                        <div className={styles.subMenu}>
                                            <div className={styles.subMenuItems}>
                                                {menuItems[hoveredMenuItem].menuChild.map((menuChild) => (
                                                    <Link
                                                        className={styles.subMenuItem}
                                                        key={menuChild.id} 
                                                        href={menuChild.destinationPath ?? '/'}
                                                    >
                                                        <div className={styles.hoverItem}>
                                                            <span className={styles.childMenuItemName}>{menuChild.name}</span>
                                                            <span className={styles.childMenuItemDescription}>{menuChild.description}</span>
                                                        </div>
                                                        
                                                    </Link>
                                                ))}
                                            </div>
                                            {menuItems[hoveredMenuItem].inspirationLink && (menuItems[hoveredMenuItem].inspirationLink?.heading || menuItems[hoveredMenuItem].inspirationLink?.image) && (
                                                <div className={styles.submenuInspirationContainer}>
                                                    <p className={styles.inspirationHeading}>{menuItems[hoveredMenuItem].inspirationLink?.heading}</p>
                                                    {menuItems[hoveredMenuItem].inspirationLink?.image && (
                                                        <div className={`${styles.submenuImageContainer} ${menuItems[hoveredMenuItem].inspirationLink?.destinationPath ? styles.hoverEffect : ''}`}>
                                                            {menuItems[hoveredMenuItem].inspirationLink?.destinationPath ? (
                                                                <Link href={menuItems[hoveredMenuItem].inspirationLink?.destinationPath!}>
                                                                    <ImageComponent
                                                                        image={menuItems[hoveredMenuItem].inspirationLink!.image!}
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <ImageComponent
                                                                    image={menuItems[hoveredMenuItem].inspirationLink!.image!}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                    
                                                </div>
                                            )}
                                            
                                            
                                        </div>
                                    </div>
                                )}
                            </nav>
                        )}
                    </div>
                </div> 

                {/* Burger Menu */}
                {isClient && isTabletOrSmaller && (
                    <>
                        <div 
                            className={`${styles.burgerMenu} ${burgerMenuIsOpen ? styles.showBurger : ''}`}
                            aria-hidden={!burgerMenuIsOpen}
                        >
                            <BurgerMenu
                                showBurger={burgerMenuIsOpen}
                                closeBurger={closeBurgerMenu}
                                menuItems={menuItems}
                            /> 
                        </div>
                    </>
                )}

                {isClient && isTabletOrSmaller && burgerMenuIsOpen && (
                    <div 
                        className={styles.burgerBackLayer}
                        onClick={closeBurgerMenu}
                    ></div>
                )}

            </ContentWrapper>
        </BlockWrapper>
    )
}