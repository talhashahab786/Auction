import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {Right} from 'native-base'
import BANNER from '../Screens/Banner'
import ContentContainer from '../Screens/ContentContainer'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions } from 'react-native-router-flux'


export default class App extends Component {
  static navigationOptions = {
    drawerIcon:({ tintColor })=>
    (
         <FontAwesome5 name="hotjar" style={{fontSize:26, color: tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>

         <View style={styles.header}>
            <Text style={styles.logo} >Hot Products</Text>
             <Right>
              <Icon name="ios-menu" style={{ fontSize: 32, color: 'black', fontWeight: 'bold', }} onPress={() => this.props.navigation.openDrawer()} />
             </Right>
         </View>   
        
        <ScrollView >
          <BANNER/>
         <ContentContainer/>
         </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height:70,
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:15,
    borderBottomWidth:4,
    borderBottomColor:'red'
  },
  logo:{
      fontSize:30,
      marginLeft:100,
      fontStyle:'italic',
      color:'black',
      fontWeight:'bold'

  }



});
