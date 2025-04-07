import { useStoreWithErrorHandlingMiddleware } from "../stores/useStoreWithErrorHandlingMiddleware";



function Counter() {
    const count = useStoreWithErrorHandlingMiddleware((state) => state.count);
    const increase = useStoreWithErrorHandlingMiddleware((state) => state.increase);
    const reset = useStoreWithErrorHandlingMiddleware((state) => state.reset);


    return (
        <div>
            <h1>Счетчик: {count}</h1>
            <button onClick={increase}>Увеличить</button>
            <button onClick={reset}>Обнулить</button>
        </div>
    )
}


export default Counter;