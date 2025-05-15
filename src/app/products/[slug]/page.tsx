export const dynamic = 'force-dynamic';

import styles from './styles/pdpPage.module.scss';
import ContentWrapper from "@/app/blocks/contentWrapper/ContentWrapper";
import { Product } from "@/app/types/types";
import { fetchSingleProduct } from "@/lib/api";
import ReactMarkdown from 'react-markdown';
import ImageSlider from '@/app/blocks/modules/NestedComponents/ImageSlider/ImageSlider';

type Props = {
    params: Promise<{ slug: string }>
};

export default async function dynamicPdpPage ({ params }: Props) {

    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        return <p>Slug not found</p>; // or handle error / 404 here
    }

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