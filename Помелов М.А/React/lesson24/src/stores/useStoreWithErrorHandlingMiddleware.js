import { create } from "zustand";
import loggingMiddleware from "../middlewares/loggingMiddleware";
import errorHandlingMiddleware from "../middlewares/errorHandlingMiddleware";

export const useStoreWithErrorHandlingMiddleware = create(errorHandlingMiddleware((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 2 })),
    reset: () => set({ count: 0 }),
})));
