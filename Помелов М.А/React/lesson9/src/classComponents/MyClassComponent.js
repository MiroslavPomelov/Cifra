import {Component} from "react"
 
export class MyClassComponent extends Component {
    constructor(props) {
        super(props); // Обязательно передать пропсы в родителя
        this.state = { count: 0, hasError: false };
    }

    componentDidMount() {
        console.log('Component has been Mounted succesfully!');
    }

    componentWillUnmount() {
        console.log('Component has been Umounted succesfully!');
    }

    componentDidCatch(error, info) {
        this.setState({...this.state, hasError: true});

        console.log('Error!', error.info)
    }

    render() {
        if(this.state.hasError) {
            return <div>Something went wrong!</div>
        }

        return <div>Value: {this.state.count}</div>
    }
}

export default MyClassComponent;