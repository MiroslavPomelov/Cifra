import { config } from 'zustand'

const loggingMiddleware = (config) => (set, get, api) => {
    return config((args) => {
        console.log('Action: ', args);
        set(args);
        console.log('New action: ', get());
    }, get, api)
}

export default loggingMiddleware;