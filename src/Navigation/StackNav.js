import {StackNavigator} from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

export default StackHome = StackNavigator({
Login:{
    screen: Login,
    navigationOptions:()=>({
        title:'Login Page',
    })
},
SignUp:{
    screen:SignUp,
    navigationOptions:()=>({
        title:'SignUp Page',
    })
}
},{ initialRouteName:'Login'});
