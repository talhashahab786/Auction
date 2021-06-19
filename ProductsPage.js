import React, { Component } from 'react';
import {createTabNavigator, createBottomTabNavigator,createStackNavigator,createDrawerNavigator,DrawerItems,} from 'react-navigation';
import { SafeAreaView, ScrollView, Dimensions, View, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window');
import  UserProducts from '../Screens/UserProducts';
import Cell from '../Screens/MobilePhones';
import TV from '../Screens/Telivision';
import Fridge from '../Screens/Refrigerator/'
import KAPP from '../Screens/KitchenAppliances';
import AC from '../Screens/AirConditioner';
import HotProducts from '../Screens/HotProducts'
import NewProducts from '../Screens/NewProducts'
import SoldProducts from '../Screens/SoldProducts'
import AddProducts from '../Screens/AddProducts'
import Settings from '../Screens/Setting'
import Cars from '../Screens/Cars'
import Properties from '../Screens/Properties'
import ViewProduct from '../Screens/ViewProduct'
import ViewProductsForProperties from '../Screens/ViewProductsForProperties'
import ViewProductsForCars from '../Screens/ViewProductsForCars'
import ViewProductsForKitchenAppliances from '../Screens/ViewProductsForKitchenAppliances'
import ViewProducDetailforAc from '../Screens/ViewProducDetailforAc'
import UserHome from '../Screens/UserHome'

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

    Fridge: {
        screen: Fridge,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcon name="kitchen" color={tintColor} size={26} />
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
            inactiveTintColor: 'grey',
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
    
    


const TabHomeScreen = createBottomTabNavigator({
  
    Cars: {
        screen: Cars,
        navigationOptions: {
            tabBarLabel: 'Vehicles',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-car" color={tintColor} size={26} />
            )
        }
    },
 


    Properties: {
        screen: Properties,
        navigationOptions: {
            tabBarLabel: 'Properties',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={26} />
            )
        }
    },



}, {
        navigationOptions: {
            tabBarVisible: true,
            swipeEnabled: true,
        },
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'blue',
            showLabel: true,
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

    

const Drawer = createDrawerNavigator({


 TabElectronicScreen: {
    screen: TabElectronicScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-desktop" color={tintColor} size={26} />
        )
    }
},
AddProducts: { screen: UserHome, },
NewProducts: { screen: NewProducts, },
SoldProducts: { screen: SoldProducts, },
Setting: { screen: Settings },
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



