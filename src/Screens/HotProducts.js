import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



export default class App extends Component {
  static navigationOptions = {
    drawerIcon:({ tintColor })=>
    (
         <FontAwesome5 name="hotjar" style={{fontSize:26, color: tintColor }}/>
    )
  }
  render() {
    return (
<View>
  
    <Text>
            View Your Recommended Products
    </Text>
  
</View>
    );
  }
}
