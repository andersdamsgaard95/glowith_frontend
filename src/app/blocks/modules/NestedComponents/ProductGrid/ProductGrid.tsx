import ContentWrapper from '@/app/blocks/contentWrapper/ContentWrapper';
import styles from './styles/ProductGrid.module.scss';
import ProductSpot from '../ProductSpot/ProductSpot';
import { Product } from '@/app/types/types';
import BlockWrapper from '@/app/blocks/blockWrapper/BlockWrapper';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid (props: ProductGridProps) {
    return (
        <BlockWrapper>
            <ContentWrapper>
                <div className={styles.productGrid}>
                    {props.products.map((product: Product, index: number) => (
                        <ProductSpot
                            key={index}
                            product={product}
                        />
                    ))}
                </div>
            </ContentWrapper>
        </BlockWrapper>
    )
}