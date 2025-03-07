import style from './modules/productCard.module.css';

function ProductCard({src, description, price}) {


    return (
        <div className={style.card}>
            <img src={src} alt="#" />
            <h2>{description}</h2>
            <p>{price} руб.</p>
        </div>
    )
}

export default ProductCard;