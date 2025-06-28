export const dynamic = 'force-static';

import { fetchProducts, fetchDynamicProductCategoryPageData } from "@/lib/api";
import ProductGrid from "../blocks/modules/NestedComponents/ProductGrid/ProductGrid";
import DynamicBlock from "../blocks/DynamicBlock";
import styles from './styles/allProducts.module.scss';
import PageNotFound from "../blocks/PageNotFoundComponent/PageNotFound";

export async function generateMetadata() {

    const data = await fetchDynamicProductCategoryPageData('products');

    return {
        title: data?.title || "Product Category",
        description: data?.metaDescription || `Explore products in the ${data?.category || 'selected'} category.`,
        openGraph: {
            title: data?.title || "Product Category",
            description: data?.metaDescription || `Explore products in the ${data?.category || 'selected'} category.`,
        },
    };
}

export default async function AllProductsPage() {
    
    const data = await fetchDynamicProductCategoryPageData('products');
    const blocksBeforeProducts = data.blocksBeforeProducts;
    const blocksAfterProducts = data.blocksAfterProducts;
    const allProducts = await fetchProducts();

    if (allProducts.length === 0) {
        return <PageNotFound/>
    }

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