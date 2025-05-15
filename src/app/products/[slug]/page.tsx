export const dynamic = 'force-dynamic';

import styles from './styles/pdpPage.module.scss';
import ContentWrapper from "@/app/blocks/contentWrapper/ContentWrapper";
import { Product } from "@/app/types/types";
import { fetchSingleProduct } from "@/lib/api";
import ReactMarkdown from 'react-markdown';
import ImageSlider from '@/app/blocks/modules/NestedComponents/ImageSlider/ImageSlider';
import { DynamicPageProps } from '@/app/[slug]/page';

export default async function dynamicPdpPage ({ params }: DynamicPageProps) {

    const { slug } = params;

    const productData = await fetchSingleProduct(slug);

    const product: Product = productData[0];

    return (
        <ContentWrapper>
            <section className={styles.container}>
                {product.image && (
                    <ImageSlider
                        images={product.image}
                    />
                )}
                {(product.name || product.description) && (
                    <div className={styles.text}>
                        <h1 className={styles.name}>{product.name}</h1>
                        <h2 className={styles.shortDescription}>{product.shortDescription}</h2>
                        <div className={styles.description}>
                           <ReactMarkdown>{product.description}</ReactMarkdown> 
                        </div>
                    </div>
                )}
            </section>
        </ContentWrapper>
    )
}