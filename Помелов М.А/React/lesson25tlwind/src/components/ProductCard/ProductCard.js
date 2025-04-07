import style from './modules/productCard.module.css';

function ProductCard({ src, description, price }) {

    const discount = Math.floor(Math.random() * (50 - 1 + 1)) + min;
    return (
        <div className={style.card}>
            <p className='bg-red-500 w-12 rounded-[50px] relative top-3 left-[210px]'>-20%</p>
            <img src={src} alt="#" />
            <h2>{description}</h2>
            <p>{price} руб.</p>
        </div>
    )
}

export default ProductCard;