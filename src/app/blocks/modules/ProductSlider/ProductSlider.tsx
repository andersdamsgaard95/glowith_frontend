import { fetchProducts } from '@/lib/api';
import styles from './styles/ProductSlider.module.scss';
import { BlockSettings, Product } from '@/app/types/types';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import Slider from '../NestedComponents/Slider/Slider';

interface ProductSliderProps {
    Type_of_products?: 'New arrivals' | 'Featured' | 'Eye masks' | 'All products';
    settings?: BlockSettings;
    Heading?: string;
    Description?: string;
}

const ProductSlider = async (props: ProductSliderProps) => {
    const allProducts = await fetchProducts();

    const filteredProducts = 
        props.Type_of_products === "New arrivals" ?
            allProducts.filter((product: Product) => {
                return product.New_arrival === true;
            }) 
        : props.Type_of_products === 'Featured' ?
            allProducts.filter((product: Product) => {
                return product.Featured_product === true;
            })
        : props.Type_of_products === 'Eye masks' ?
            allProducts.filter((product: Product) => {
                return product.category?.toLowerCase() === 'eye mask';
            })
        : allProducts;

    //console.log(allProducts);
    
    return (
        <BlockWrapper settings={props.settings}>
            <ContentWrapper isFullBackground>
                <section className={styles.container}>

                    {/* Text */}
                    {(props.Heading || props.Description) && (
                        <div className={styles.text}>
                            {props.Heading && <h2>{props.Heading}</h2>}
                            {props.Description && <p>{props.Description}</p>}
                        </div>
                    )} 

                    {/* Slider */}
                    {allProducts && allProducts.length > 0 && <Slider slides={filteredProducts}/>}
                </section>
            </ContentWrapper>
        </BlockWrapper>
    )
}

export default ProductSlider;