import React, { Component } from 'react';
import {createTabNavigator, createBottomTabNavigator,createStackNavigator,createDrawerNavigator,DrawerItems,} from 'react-navigation';
import { SafeAreaView, ScrollView, Dimensions, View, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window');
import  UserProducts from '../Screens/UserProducts';
import Cell from '../Screens/MobilePhones';
import TV from '../Screens/Telivision';
import KAPP from '../Screens/KitchenAppliances';
import AC from '../Screens/AirConditioner';
import HotProducts from '../Screens/HotProducts'
import NewProducts from '../Screens/NewProducts'
import SoldProducts from '../Screens/SoldProducts'
import AddProducts from '../Screens/AddProducts'
import Settings from '../Screens/Setting'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ViewProduct from '../Screens/ViewProduct'
import ViewProductsForProperties from '../Screens/ViewProductsForProperties'
import ViewProductsForCars from '../Screens/ViewProductsForCars'
import ViewProductsForKitchenAppliances from '../Screens/ViewProductsForKitchenAppliances'
import ViewProducDetailforAc from '../Screens/ViewProducDetailforAc'
import UserHome from '../Screens/UserHome'
import Comingsoonproducts from '../Screens/comingsoonproducts'

import Icon from 'react-native-vector-icons/Ionicons'
import { Fab } from 'native-base';
export default class App extends Component {
  render() {
      return(
            <Drawer/>
      );
  }
}

const CustomDrawerComponent = (props) => (
    <SafeAreaView>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../images/auction.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />

        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)



const TabElectronicScreen = createBottomTabNavigator({

    Cell: {
        screen: Cell,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-phone-portrait" color={tintColor} size={26} />
            ),
        }
    },
    KAPP: {
        screen: KAPP,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-cafe" color={tintColor} size={26} />
            )
        }
    },

    TV: {
        screen: TV,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-desktop" color={tintColor} size={26} />
            )
        }
    },

   
    AC: {
        screen: AC,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="air-conditioner" color={tintColor} size={26} />
            )
        }
    },
  


}, {
        navigationOptions: {
            tabBarVisible: true,
            swipeEnabled: true

        },
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'black',
            showIcon: true,
            style: {
                backgroundColor: 'white',
                height: 60
            }

        },
        contentOptions: {
            activeTintColor: 'orange'
        }
    })




    const ViewProducts = createStackNavigator({

        ViewProduct: { screen: ViewProduct },
        ViewProductsForCars: { screen: ViewProductsForCars },
    
        ViewProductsForProperties: { screen: ViewProductsForProperties },
        ViewProductsForKitchenAppliances: { screen: ViewProductsForKitchenAppliances },
        ViewProducDetailforAc: { screen: ViewProducDetailforAc }
    },
    
      );
    
    


const Drawer = createDrawerNavigator({


 Home: {
    screen: TabElectronicScreen,
    navigationOptions :{ drawerIcon: ({ tintColor }) => (<Ionicons name="md-home" style={{size:24}} />) }

},
AddProducts: { screen: UserHome, },
NewProducts: { screen: NewProducts, },
SoldProducts: { screen: SoldProducts, },
Comingsoonproducts:{screen:Comingsoonproducts},
ViewProducts: { screen: ViewProducts ,
 navigationOptions: {
   
        drawerLabel: () => null
   

}}


}, {

    contentComponent: CustomDrawerComponent,
    drawerPosition: "right",
    drawerWidth: 250,
    contentOptions: {
        activeTintColor: 'blue',
    },
},
);



