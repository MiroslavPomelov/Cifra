import useStore from '../stores/useStore';



function Counter() {
    const count = useStore((state) => state.count);
    const increase = useStore((state) => state.increase);
    const reset = useStore((state) => state.reset);


    return (
        <div>
            <h1>Счетчик: {count}</h1>
            <button onClick={increase}>Увеличить</button>
            <button onClick={reset}>Обнулить</button>
        </div>
    )
}


export default Counter;