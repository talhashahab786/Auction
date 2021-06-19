import React, { Component } from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fridge from '../Screens/Refrigerator/'
import Cars from '../Screens/Cars'
import Properties from '../Screens/Properties'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
export default class App extends Component {

    static navigationOptions = { drawerIcon: ({ tintColor }) => (<Ionicons name="md-construct" style={{ fontSize: 26, color: tintColor }} />) }

  render() {
      return(
            <Comingsoonproducts/>
      );
  }
}
const Comingsoonproducts = createBottomTabNavigator({
    Cars: {
        screen: Cars,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-car" color={tintColor} size={26} />
            )
        }
    },
    Properties: {
        screen: Properties,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={26} />
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
              
   }
,{
  
    navigationOptions:{
        tabBarVisible:true
    },
    tabBarOptions:{
      activeTintColor:'red',
      inactiveTintColor:'blue',
      showLabel: true,
      showIcon:true,
      style: {
          backgroundColor: 'white',
          height:60
        }
     
  },
  contentOptions:{
      activeTintColor: 'orange'
  }
})





   