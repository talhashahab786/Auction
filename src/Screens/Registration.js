import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import firebase from 'firebase'

export default class Registration extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (<Ionicons name="md-cloud-upload" style={{ fontSize: 26, color: tintColor }} />
    )
  }
  state = { UserName: '', CellNumber: '', City: '' };


  writeUserData(
    UserName,
    CellNumber,
    City,
  ) {
    if (this.state.cond === 1) {
      var uid = firebase.auth().currentUser.uid;
      userID = uid;
      firebase.database().ref('Users/' + uid + '/UserInformation/').set({
        UserName,
        CellNumber,
        City,

      }).then((data) => {
        this.props.navigation.navigate("Login");
      }).catch((error) => {
        //error callback
        console.log('error while uploading data to database: ', error)
      })
    }
  }

  render() {
    return (
      

      <ImageBackground source={require('../images/6.jpg')} style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content" />


<View style={styles.inputContainer}>
              <MaterialIcons name={'email'} size={30}  color={'black'}
              style={styles.inputIcons}
              />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter User Name" placeHolderTextColor="black"
          onChangeText={(UserName) => this.setState({ UserName })}
        />
          </View>
          <View   style={styles.inputContainer}>
              <MaterialIcons name={'lock'} size={30}    color={'black'}
              style={styles.inputIcons}
              />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Cell Number" placeHolderTextColor="black"
          keyboardType='numeric' 
          onChangeText={(CellNumber) => this.setState({ CellNumber })}
        />
             </View>
             <View   style={styles.inputContainer}>
              <MaterialIcons name={'lock'} size={30}    color={'black'}
              style={styles.inputIcons}
              />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Your City" placeHolderTextColor="black" 
          onChangeText={(City) => this.setState({ City })}
        />
</View>

        <Text style={{ color: 'blue', fontSize: 22, fontWeight: '500' }}>
          {this.state.success}
          </Text>

          

        

  


        <TouchableOpacity style={styles.button}
          onPress={() => {
            this.setState({ cond: 1 })
            this.writeUserData(
              this.state.UserName,
              this.state.CellNumber,
              this.state.City,
            )
          }}
        ><Text style={styles.buttonText}>Click To Proceed</Text></TouchableOpacity>

<View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Want to Learn </Text>
          <Text style={styles.SignUpButton} onPress={() => Actions.swipper()}> Click Here</Text>
        </View>
     
       

      </ImageBackground>

      
    );
  }

}

const styles = StyleSheet.create({
  container: {
          flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: 350,
    height:60,
    borderRadius:25,
    paddingLeft: 45,
    marginHorizontal:25,
    marginVertical:10,
    fontSize: 22,
    color: 'black',
    opacity:0.9,
    backgroundColor:'white'

    
  },
  button: {
    backgroundColor: 'black',
    width: 350,
    height:60,
    
    justifyContent:'center',
    opacity:0.9,
    borderRadius: 20,
    marginVertical: 10,
  
  },
  buttonText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    
   
  },
  signupTextCont: {
   
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    paddingVertical: 19,
    flexDirection: 'row',
 
  },
  signupText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
    fontFamily:'Roboto-mesium'
  }, SignUpButton: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily:'Roboto-medium'
  }
,
logo:{
  width:150,
  height:150
},
logoContainer:{
  alignItems:'center',
  marginBottom:50
},
inputIcons:{
  position:'absolute',
  top:25,
  left:35,
  fontWeight: 'bold',
}
,
inputContainer:{
  marginTop:10,
}
});