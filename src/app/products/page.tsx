import { fetchProducts, fetchDynamicProductCategoryPageData } from "@/lib/api";
import ProductGrid from "../blocks/modules/NestedComponents/ProductGrid/ProductGrid";
import DynamicBlock from "../blocks/DynamicBlock";
import styles from './styles/allProducts.module.scss';

export default async function AllProductsPage() {
    
    const data = await fetchDynamicProductCategoryPageData('products');
    const blocksBeforeProducts = data.blocksBeforeProducts;
    const blocksAfterProducts = data.blocksAfterProducts;
    const allProducts = await fetchProducts();

    return (
        <>
            {blocksBeforeProducts.map((block: any, index: number) => {
                return (
                    <DynamicBlock
                        key={index}
                        blockName={block.__component} 
                        blockProps={block}
                    />
                )
            })}

            <div className={blocksBeforeProducts.length === 0 ? styles.marginTop : ''}>
                <ProductGrid
                    products={allProducts}
                />
            </div>

            {blocksAfterProducts.map((block: any, index: number) => {
                return (
                    <DynamicBlock
                        key={index}
                        blockName={block.__component} 
                        blockProps={block}
                    />
                )
            })}
        </>
    )
}