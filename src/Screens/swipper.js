import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux'

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:100,
   
  },
  container:{

    width:'100%',
    height:'70%',
    bottom:100
  }
 
})

export default class swipper extends Component {
  render(){
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
            <Image  source={require('../images/sw1.png')} style={styles.container}/>

          <Text style={styles.text}>If you are a new user then click on
           <Text style={{color:'red'}}> SignUp </Text> 
           Button, and If you are already have an account then just fill form and Click on Login Button
          </Text>
        </View>
        <View style={styles.slide2}>
        <Image  source={require('../images/sw1.png')} style={styles.container}/>

<Text style={styles.text}>If you are a new user then click on
 <Text style={{color:'red'}}> SignUp </Text> 
 Button, and If you are already have an account then just fill form and Click on Login Button
</Text>
          
        </View>


    
          

        <View style={styles.slide2}>
        <Image  source={require('../images/viewproduct.png')} style={styles.container}/>
          <Text style={styles.text}>you can View ALl the products related to cell phones. Similar work is being done on other products too</Text>
        </View>


        <View style={styles.slide2}>
        <Image  source={require('../images/postadd.png')} style={styles.container}/>
          <Text style={styles.text}>You can easily post different products</Text>
        </View>

        <View style={styles.slide2}>
        <Image  source={require('../images/bidproduct.png')} style={styles.container}/>
          <Text style={styles.text}>Bid and of your favorite product</Text>
        </View>


        


        <View style={styles.slide3}>
          <Text style={{textAlign:'center',justifyContent:'center',color:'red',fontSize:30}} onPress={() => Actions.Registration()}> Back To Registration</Text>
          <Text style={{textAlign:'center',justifyContent:'center',color:'red',fontSize:30}} onPress={() => Actions.Login()}> Back To Login</Text>

        </View>        
      </Swiper>
    );
  }
}
