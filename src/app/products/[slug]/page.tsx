import styles from './styles/pdpPage.module.scss';
import ContentWrapper from "@/app/blocks/contentWrapper/ContentWrapper";
import { Product } from "@/app/types/types";
import { fetchProducts, fetchSingleProduct } from "@/lib/api";
import ReactMarkdown from 'react-markdown';
import ImageSlider from '@/app/blocks/modules/NestedComponents/ImageSlider/ImageSlider';
import type { Metadata } from "next";
import PageNotFound from '@/app/blocks/PageNotFoundComponent/PageNotFound';
import Button from '@/app/blocks/modules/NestedComponents/Button/Button';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    if (!slug) {
        return {
            title: "Product Not Found",
            description: "The requested product could not be found."
        };
    }

    const productData = await fetchSingleProduct(slug);
    const product: Product = productData[0];

    return {
        title: product?.name || "Glowith Product Page",
        description: product?.metaDescription || "Details about this product.",
    };
}

export async function generateStaticParams() {
    const allProducts = await fetchProducts();

    return allProducts.map((product: Product) => ({
        slug: product.pdpSlug,
    }))
}

export default async function dynamicPdpPage ({ params }: Props) {

    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        return <PageNotFound/>
    }

    const productData = await fetchSingleProduct(slug);

    const product: Product = productData[0];

    if (!product) {
        return <PageNotFound/>
    }

    const button = {
        buttonText: 'Where to Buy',
        path: '/wheretobuy',
        color: 'Theme Blue',
    }

    return (
        <ContentWrapper>
            <section className={styles.container}>
                {product.imageCoverOrContain && product.imageCoverOrContain.length > 0 && (
                    <ImageSlider
                        images={product.imageCoverOrContain}
                    />
                )}
                {(product.name || product.description) && (
                    <div className={styles.text}>
                        <h1 className={styles.name}>{product.name}</h1>
                        <h2 className={styles.shortDescription}>{product.shortDescription}</h2>
                        <div className={styles.description}>
                           <ReactMarkdown>{product.description}</ReactMarkdown> 
                        </div>
                        <Button button={button}/>
                    </div>
                )}
            </section>
        </ContentWrapper>
    )
}