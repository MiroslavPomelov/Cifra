export type ProductPropsType = {
    name: string,
    price: number,
    onBuy?: () => void,
}

export default function ProductCard({ name, price, onBuy }: ProductPropsType) {
    return (
        <div className="shadow-xl flex flex-col items-center justify-center p-2 rounded-xl  w-1/2 mx-auto">
            <h3 className="font-bold">{name}</h3>
            <h2 className="text-purple-600 font-bold">  ₽  {price}</h2>
            <button className="bg-purple-700 rounded-xl p-3 text-white font-bold" onClick={onBuy}>Buy</button>
        </div>
    )
}