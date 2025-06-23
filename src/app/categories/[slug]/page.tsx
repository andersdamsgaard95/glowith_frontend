//export const dynamic = 'force-dynamic';

//import ContentWrapper from '@/app/blocks/contentWrapper/ContentWrapper';
import styles from './styles/productCategoryPage.module.scss';
import DynamicBlock from "@/app/blocks/DynamicBlock";
import { fetchAllCategoryPages, fetchDynamicProductCategoryPageData, fetchProducts } from "@/lib/api";
import ProductGrid from '@/app/blocks/modules/NestedComponents/ProductGrid/ProductGrid';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    if (!slug) {
        return {
            title: "Category Not Found",
            description: "The requested product category could not be found."
        };
    }

    const data = await fetchDynamicProductCategoryPageData(slug);

    return {
        title: data?.title || data?.title || "Product Category",
        description: data?.metaDescription || `Explore products in the ${data?.category || 'selected'} category.`,
        openGraph: {
            title: data?.title || data?.title || "Product Category",
            description: data?.metaDescription || `Explore products in the ${data?.category || 'selected'} category.`,
        },
    };
}

export async function generateStaticParams() {
    const allCategoryPages = await fetchAllCategoryPages();

    const filtered = allCategoryPages.filter((page: any) => page.slug !== "products");

    return filtered.map((page: any) => ({
        slug: page.slug,
    }));
}

export default async function dynamicProductCategoryPage ({ params }: Props) {
    
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        return <p>Slug not found</p>;
    }

    const data = await fetchDynamicProductCategoryPageData(slug);

    const blocksBeforeProducts = data.blocksBeforeProducts;
    const blocksAfterProducts = data.blocksAfterProducts;
    const productPageCategory = data.category; 

    const allProducts = await fetchProducts();

    const thisCategoryProducts = allProducts.filter((product: any) => {
        return product.category?.toLowerCase() === productPageCategory?.toLowerCase();
    })

    //console.log(thisCategoryProducts);

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