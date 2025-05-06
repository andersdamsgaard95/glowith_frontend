import styles from './styles/pdpPage.module.scss';
import ContentWrapper from "@/app/blocks/contentWrapper/ContentWrapper";
import ImageComponent from "@/app/blocks/modules/NestedComponents/Image/ImageComponent";
import { Product } from "@/app/types/types";
import { fetchSingleProduct } from "@/lib/api";

export default async function dynamicPdpPage ({ params }: { params: {slug: string} }) {
    const productData = await fetchSingleProduct(params.slug);

    const product: Product = productData[0];

    console.log(productData);

    return (
        <ContentWrapper>
            <section className={styles.container}>
                {product.image && (
                    <div className={styles.imageContainer}>
                        <ImageComponent
                            image={product.image[0]}
                        />
                    </div>
                )}
                {(product.name || product.description) && (
                    <div className={styles.text}>
                        <h1 className={styles.name}>{product.name}</h1>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                )}
            </section>
        </ContentWrapper>
    )
}