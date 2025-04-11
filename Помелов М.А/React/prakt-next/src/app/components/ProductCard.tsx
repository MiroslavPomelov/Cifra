export type ProductPropsType = {
    name: string,
    price: number,
    onBuy?: () => void,
}

export default function ProductCard({ name, price, onBuy }: ProductPropsType) {
    return (
        <div className="shadow-xl flex flex-col items-center justify-center p-2 rounded-xl w-1/3 mx-auto border border-indigo-600 m-8">
            <h4 className="font-bold m-2">{name}</h4>
            <p className="text-purple-600 font-bold m-2">  ₽  {price}</p>
            <button className="bg-purple-700 rounded-xl p-3 text-white font-bold" onClick={onBuy}>Buy</button>
        </div>
    )
}