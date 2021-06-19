import {DrawerNavigator,DrawerItems,StackNavigator} from 'react-navigation';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home'
import HotProducts from '../Screens/HotProducts'
import NewProducts from '../Screens/NewProducts'
import SoldProducts from '../Screens/SoldProducts'
import AddProducts from '../Screens/AddProducts'
import Setting from '../Screens/Setting'
import {SafeAreaView,ScrollView,Dimensions,View,Image} from 'react-native'
import React from 'react'

const HomeScreen = StackNavigator({Home:{screen:Home, navigationOptions:()=>({ title:'HomeScreen',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const HotProduct = StackNavigator({HotProducts:{screen:HotProducts, navigationOptions:()=>({ title:'Hot Products',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const NewProduct = StackNavigator({NewProducts:{screen:NewProducts, navigationOptions:()=>({ title:'New Products',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const SoldProduct = StackNavigator({SoldProducts:{screen:SoldProducts, navigationOptions:()=>({ title:'Sold Products',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const AddProduct = StackNavigator({AddProducts:{screen:AddProducts, navigationOptions:()=>({ title:'Login To Add Product',
headerTintColor:'white',headerStyle:{backgroundColor:'red'} }) }})
const Settings = StackNavigator({Setting:{screen:Setting, navigationOptions:()=>({ title:'Setting ',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const login = StackNavigator({Login:{screen:Login, navigationOptions:()=>({ title:'Login Page',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})
const signup = StackNavigator({SignUp:{screen:SignUp, navigationOptions:()=>({ title:'SignUp ',
headerTintColor:'white',headerStyle:{backgroundColor:'red'}}) }})


const CustomDrawerComponent = (props) =>(
    <SafeAreaView>
        <View style={{height:150,backgroundColor:'white'}}>
        <Image />

        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)


export default DrawerHome = DrawerNavigator({
Home:{screen: HomeScreen,},
HotProducts:{screen:HotProduct},
NewProducts:{screen: NewProduct},
SoldProducts:{screen: SoldProduct},
AddProducts:{screen:AddProduct},
Setting:{screen:Settings},
Login:{ screen: login},
SignUp:{screen:signup}
},
{
contentComponent:CustomDrawerComponent
});
