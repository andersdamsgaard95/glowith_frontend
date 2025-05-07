import ContentWrapper from '@/app/blocks/contentWrapper/ContentWrapper';
import styles from './styles/productCategoryPage.module.scss';
import DynamicBlock from "@/app/blocks/DynamicBlock";
import ProductSpot from "@/app/blocks/modules/NestedComponents/ProductSpot/ProductSpot";
import { Product } from "@/app/types/types";
import { fetchDynamicProductCategoryPageData, fetchProducts } from "@/lib/api";
import ProductGrid from '@/app/blocks/modules/NestedComponents/ProductGrid/ProductGrid';

/*export async function generateStaticParams() {
    return await fetchAllProductCategorySlugs();
}*/

export default async function dynamicProductCategoryPage ({ params }: { params: {slug: string} }) {
    const data = await fetchDynamicProductCategoryPageData(params.slug);

    const blocksBeforeProducts = data.blocksBeforeProducts;
    const blocksAfterProducts = data.blocksAfterProducts;
    const productPageCategory = data.category; 

    const allProducts = await fetchProducts();

    const thisCategoryProducts = allProducts.filter((product: any) => {
        return product.category?.toLowerCase() === productPageCategory?.toLowerCase();
    })

    console.log(thisCategoryProducts);

    return (
        <>
            {/* Blocks before products */}
            {blocksBeforeProducts.map((block:any, index:number) => {
                return (
                    <DynamicBlock
                        key={index}
                        blockName={block.__component} 
                        blockProps={block}
                    />
                )
            })}
            
            {/* Products */}
            {thisCategoryProducts.length > 0 && (
                <div className={blocksBeforeProducts.length === 0 ? styles.topMargin : ''}>
                    <ProductGrid
                        products={thisCategoryProducts}
                    />
                </div>
            )}

            {/* Blocks after products */}
            {blocksAfterProducts.map((block:any, index:number) => {
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