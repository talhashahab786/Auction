import React from 'react-native'
import {TabNavigator,StackNavigator} from 'react-navigation';
import ElectronicItems from '../Screens/ElectronicItems'
import Cars from '../Screens/Cars'
import Properties from '../Screens/Properties'

import IconIonicons from 'react-native-vector-icons/Ionicons'


export default TabNav = TabNavigator({
    ElectronicItems:{screen:ElectronicItems,
        navigationOptions:()=>({tabBarIcon:({tintColor})=>
         { return(<IconIonicons name='md-tv' size={26} color={tintColor}/>)}
     })},

       Cars:{screen:Cars,
         navigationOptions:()=>({tabBarIcon:({tintColor})=>
         { return(<IconIonicons name='md-car' size={26} color={tintColor}/>)}
         })},


         Properties:{screen:Properties,
           navigationOptions:()=>({tabBarIcon:({tintColor})=>
          { return(<IconIonicons name='md-home' size={26} color={tintColor}/>)}
           })},
        },{
          showIcon:true
        });