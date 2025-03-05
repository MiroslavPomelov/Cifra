

const errorHandlingMiddleware = (config) => (set, get, api) => {
    return config((args) => {
        try {
            throw new Error("Erroe rendering component");
            set(args)

        } catch (error) {
            console.log('Error has been detected in: ', error);
        }
    }, get, api)
}

export default errorHandlingMiddleware;