import { useDispatch, useSelector } from "react-redux";
import { decrement, incremet } from "../App";

export default function Counter() {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={() => dispatch(incremet())}>Increase</button>
            <button onClick={() => dispatch(decrement())}>Decrease</button>
        </div>
    )
}

