import { AppRegistry } from 'react-native';
import React, {Component} from 'react'
import App5 from './App5';
import AddProduct from './src/Screens/AddProducts';



class Main extends Component {
    constructor(props){
        super(props);
        this.state={currentScreen:'App5'};
        setTimeout(()=>{
            this.setState({currentScreen:'AddProduct'})

        },4400)
    }

    render(){
        const {currentScreen} = this.state
        let mainScreen = currentScreen === 'App5' ? <App5/> :<AddProduct/>
        return mainScreen
    }
}

console.disableYellowBox=true,

AppRegistry.registerComponent('img', () => Main);
