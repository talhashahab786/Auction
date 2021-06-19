import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity ,ImageBackground} from 'react-native';
import firebase from 'firebase';

export default class UserProfuleSetting extends Component {

  signOutUser() 
{
  firebase.auth().signOut()
  .then(this.onLogoutSuccess.bind(this))
  .catch(this.onLogoutFail.bind(this))
}

onLogoutFail() 
{
  <View>
    <Text>
      LOGOUT Fail
    </Text>
  </View>
}

onLogoutSuccess() 
{
  <View>
    <Text>
      Logout Successfull
    </Text>
  </View>
}



onLogoutFail() 
{
  <View>
    <Text>
      LOGOUT Fail
    </Text>
  </View>
}


  render() {
    return (
      <View>
         <Button title="LOGOUT" onPress={() => this.signOutUser()}
      />
</View>


    );
  }
}