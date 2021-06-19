import React, { Component } from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostAdd from './PostAdd'
import UserProducts from '../Screens/UserProducts'
import UserProfileSetting from '../Screens/UserProfileSetting'
import Icon from 'react-native-vector-icons/Ionicons'
export default class App extends Component {

    static navigationOptions = { drawerIcon: ({ tintColor }) => (<Ionicons name="md-cloud-upload" style={{ fontSize: 26, color: tintColor }} />) }

  render() {
      return(
            <TabHomeScreen/>
      );
  }
}
const TabHomeScreen = createBottomTabNavigator({
    AddPost:{
        screen:PostAdd,
              navigationOptions:{
                 tabBarLabel:'Add-Post',
                 tabBarIcon :({tintColor})=>(
                               <Icon name="md-cloud-upload" color={tintColor} size={24}/>
                                             )
                                }
                    },
                    UserProducts:{
                      screen:UserProducts,
                          navigationOptions:{
                              tabBarLabel:'Your Products',
                              tabBarIcon :({tintColor})=>(
                                  <Icon name="md-cart" color={tintColor} size={24}/>
                                                           )
                                           }},
              
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





   