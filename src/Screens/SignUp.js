import React, { Component } from 'react';
import {StatusBar,StyleSheet,Text,View,Dimensions,TextInput,TouchableOpacity,ImageBackground,Image,KeyboardAvoidingView} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from '../Screens/spinner'


export default class SignUp extends Component {
    static navigationOptions = {
    drawerIcon:({ tintColor })=>( <Ionicons name="md-cloud-upload" style={{fontSize:26, color: tintColor}}/>
    )
  }
 state ={email:'', Password:'',success:''};

  signUpUser (){
    const {email,Password}=this.state;
       if(this.state.Password.length<6)
      {
        alert("please Enter At Least 6 Charecters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email,Password).then(this.onSignUpSuccess.bind(this)) 
    }

    onSignUpSuccess() 
    {
    
      this.setState({ loading:  true, success: 'SignUp Succesfullly',})
      setTimeout(()=>{
        this.props.navigation.navigate("Registration");

    },2000)
    }

    renderButton() {
      if (this.state.loading) {
        return <Spinner size="large" />;
      }
      return (
        <TouchableOpacity onPress={this.signUpUser.bind(this)} style={styles.button}
        ><Text style={styles.buttonText}>SignUp</Text></TouchableOpacity>
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
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeHolderTextColor="black"
            returnKeyType='next'
            underlineColorAndroid="transparent"
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
            <Text style={styles.SignUpButton} onPress={() => Actions.Login()}>Login</Text>
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