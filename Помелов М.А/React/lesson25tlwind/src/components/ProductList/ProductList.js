import ProductCard from '../ProductCard/ProductCard';
import styles from './modules/productList.module.css';


function ProductList({ productsDataList }) {

    return (
        <div className={styles.wrapper}>
            {productsDataList.map((item) => (
                <ProductCard src={item.src} description={item.description} price={item.price} />
            ))}
        </div>
    )
}

export default ProductList;