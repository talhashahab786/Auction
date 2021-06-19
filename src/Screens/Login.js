import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions,ImageBackground, TextInput, TouchableOpacity,KeyboardAvoidingView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import Spinner from '../Screens/spinner'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Login extends Component 

{
  static navigationOptions = { drawerIcon: ({ tintColor }) => (<Ionicons name="md-cloud-upload" style={{ fontSize: 26, color: tintColor }} />) }
  state = { email: '', Password: '', error: '', success: '', loading: false } 
  
 
     
//WRITE TO DB
writeUserData(       
  email,
  Password
){  

 
  var uid = firebase.auth().currentUser.uid;

  firebase.database().ref().child('Users').child(uid).child('UserInformation').update({
    email,
    Password

}).then((data)=>{
      //success callback
      console.log('data put in database: ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error while uploading data to database: ' , error)
  })

}

  
  LoginUser() 
  {
    this.setState({ error: '', loading: true, success: '' })
    const { email, Password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, Password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this))
  }
  
  onLoginFail() 
  {
    this.setState({ error: 'Authentication Failed', loading: false });
  }
  onLoginSuccess() 
  {
  
    //Take user Data and save as directory
    this.writeUserData(      this.state.email,      this.state.Password);
    this.setState({ email: '', Password: '', loading: false, success: 'Successfully LoggedIn',});
  this.props.navigation.navigate("ProductsPage");
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableOpacity onPress={this.LoginUser.bind(this)} style={styles.button}
      ><Text style={styles.buttonText}>SignIn</Text></TouchableOpacity>
    );
  }
  render() {
    return (
      <ImageBackground source={require('../images/6.jpg')} style={styles.container}>
       
       
        <StatusBar
          backgroundColor="#f1f8e9"
          barStyle="light-content" />
      
        <KeyboardAvoidingView>
       

          <View style={styles.inputContainer}>
            <MaterialIcons name={'email'} size={30}  color={'black'}
            style={styles.inputIcons}
            />
          <TextInput
          style={styles.inputBox}
          placeholder="Email"
          placeHolderTextColor="black"
          returnKeyType='next'
          underlineColorAndroid='rgba(0,0,0,0)'

          onChangeText={(email) => this.setState({ email })}  
          onSubmitEditing={()=>this.refs.txtPassword.focus()}   
        />
          </View>

          <View   style={styles.inputContainer}>
            <MaterialIcons name={'lock'} size={30}    color={'black'}
            style={styles.inputIcons}
            />
             <TextInput
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          placeHolderTextColor="black"
          secureTextEntry={true}
          returnKeyType='next'
          
          underlineColorAndroid="transparent"
          onChangeText={Password => this.setState({ Password })}
          ref={"txtPassword"}
        />
     
        
          </View>
        
       

</KeyboardAvoidingView>

        <Text style={{ color: 'red', fontSize: 22, fontWeight: '500' }}>
          {this.state.error}
        </Text>

        <Text style={{ color: 'blue', fontSize: 22, fontWeight: '500' }}>
          {this.state.success}

        </Text>

        {this.renderButton()}

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet? </Text>
          <Text style={styles.SignUpButton} onPress={() => Actions.SignUp()}>SignUp</Text>
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