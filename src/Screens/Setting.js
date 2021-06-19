import React, { Component } from 'react';
import {StyleSheet,Text,View,Button} from 'react-native';
import {Header,Left,} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'


export default class App extends Component {
  static navigationOptions = {
    drawerIcon:({ tintColor })=>( <Icon name="ios-settings" style={{fontSize:26, color: tintColor}}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      
        <Header>
          <Left>  
          <Icon name="ios-menu" style={{fontSize:30, color: 'black',fontWeight:'bold'}} onPress={()=>this.props.navigation.openDrawer()}/> 
            </Left>
             </Header>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{ fontSize: 20,textAlign: 'center',margin: 10,fontWeight:'bold',color:'blue'}}>Setting</Text>
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },

 
});
