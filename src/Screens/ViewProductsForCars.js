import React, { Component } from "react";
import { Button,View, Text,Dimensions,StyleSheet,TextInput, ScrollView,TouchableOpacity,Image,BackHandler} from "react-native";
const {width: WIDTH }=  Dimensions.get('window');
import { Container, Header, Right } from 'native-base'

import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'

export default class ViewCarDetails extends Component {
    static navigationOptions = {
      
        header: null
      }
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    constructor(props){
        super(props);
        this.state={
            scrsize:"",
            UBid: 0,
            BidderUID:"",
            ProductID:"",

            item: "",
            mainscreenrender: 0,
            countrunHashir: 0,
            runHASHIRcode: 0,
            DataObjID: 0,
            keyID: 0,
            userIDfound:'',
            productIDfound:'',
            BidderEmail:"",
            BidderPass:""
            
        
            
        }

    }
/*
componentDidMount(){
    var postData = [];
    let DataObj = {};

//here child snapshot is the user ids of many differenet users
var RefData2 = firebase.database().ref('Users/'+this.state.BidderUID+'/');
RefData2.once('value').then((snapshot2) => {
snapshot2.forEach(childSnapshot2 => {
    DataObj = {

      BidderEmail: childSnapshot2.val().email,
      BidderPass: childSnapshot2.val().Password
   
    };
this.setState({    BidderEmail:childSnapshot2.val().email
 
});
this.setState({    
BidderPass: childSnapshot2.val().Password
});

    this.state.BidderEmail=childSnapshot2.val().email;
    this.state.BidderPass= childSnapshot2.val().Password;
    
          
    postData.push(DataObj);
  });
  this.setState({ items: postData });

})
     


}

    //UPDATE BID

    updateBid(       
        userID,   
        productID,
        bid,
        BidderUID
    ){  
        
        var uid = firebase.auth().currentUser.uid;
        this.state.BidderUID=uid;
        this.state.ProductID=productID;
    

//category here puts
     //   firebase.database().ref('User/'+userID+'/UserProducts/MobilePhones/'+productID).update({
        firebase.database().ref('Users/'+userID+'/UserProducts/MobilePhones/'+productID).update({
                  bid,
                BidderUID
      }).then((data)=>{
        productID=data.key;
    //    firebase.database().ref('User/'+userID+'/UserProducts/MobilePhones/'+productID).update({
    //    firebase.database().ref().child('Users').child(userID).child('UserProducts').child('MobilePhones').child(productID).update({
        firebase.database().ref('Users/'+userID+'/UserProducts/MobilePhones/'+productID).update({
              productID
        });
         console.log('data put in database: ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error while uploading data to database: ' , error)
        })
    
    }


 
getBidderDetails(){
    var postData = [];
    let DataObj = {};

//here child snapshot is the user ids of many differenet users
var RefData2 = firebase.database().ref('Users/'+this.state.BidderUID+'/');
RefData2.once('value').then((snapshot2) => {
snapshot2.forEach(childSnapshot2 => {
    DataObj = {

     // BidderEmail: childSnapshot2.val().email,
   //   BidderPass: childSnapshot2.val().Password
   
    };

    this.setState({    BidderEmail:childSnapshot2.val().email
 
});
this.setState({    
BidderPass: childSnapshot2.val().Password
});

  //  this.state.BidderEmail = childSnapshot2.val().email;
    //this.state.BidderPass  = childSnapshot2.val().Password;
    
          
    postData.push(DataObj);
  });
  this.setState({ items: postData });

})
 
}
*/
    render(){
        const {navigation}= this.props;
        const Title = navigation.getParam('Title','null');
        const Brand = navigation.getParam('Brand','null' );
        const Model = navigation.getParam('Model','null' );
        const Year = navigation.getParam('Year','null' );
        const Description = navigation.getParam('Description','null');
        const KMDriven = navigation.getParam('KMDriven','null');
        const Condition =navigation.getParam('Condition','null');
        const StartingBid =navigation.getParam('StartingBid','null');
   
        return(

            <Container>
         <Header style={{ backgroundColor: '#76a8dd', flexDirection: 'row' }}>
         

          <Right >
            <Ionicons name="md-arrow-round-back" 
            style={{  fontSize:55, color: 'white', fontWeight: 'bold', marginleft: 15 }}
               onPress={() => Actions.SignUp()}/>
          </Right>
        </Header>
       
        <ScrollView style={{padding:2}}>
           <View style={styles.viewStyle}>
   
                <View style={{borderColor:'white',borderWidth:2,marginTop:5}}>
      
                     <Image source={require('../images/s9.jpg')} style={{ width: WIDTH-5, height: 240, textAlign: 'center', justifyContent: 'center', padding:5 }} />
                </View>

                <View style={{borderColor:'white',borderWidth:2,marginTop:20,height:75,padding:8,shadowColor: '#fff',elevation:3,shadowOpacity:1,shadowColor:'grey'}}>
                    <Text style={{fontSize:22,fontWeight:'bold', fontFamily: "Times New Roman"}}>
                        <Text>{JSON.stringify(Title).replace(/\"/g, "")}</Text>
                    </Text>

                    <Text style={{fontSize:22,fontWeight:'bold', fontFamily: "Times New Roman"}}>
                        <Text>  {JSON.stringify(Brand).replace(/\"/g, "")}</Text>
                    </Text>
                    
                    <Text style={{fontSize:22,fontWeight:'bold', fontFamily: "Times New Roman"}}>
                        <Text>  {JSON.stringify(StartingBid).replace(/\"/g, "")}</Text>
                    </Text>
            </View>

              <View style={{borderColor:'white',borderWidth:2,marginTop:20,height:130,padding:8,shadowColor: '#fff',elevation:3,shadowOpacity:1,shadowColor:'grey'}}>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>Model: {JSON.stringify(Model).replace(/\"/g, "")} </Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>Year: {JSON.stringify(Year).replace(/\"/g, "")}</Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>Km Drive: {JSON.stringify(KMDriven).replace(/\"/g, "")}</Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>Condition: {JSON.stringify(Condition).replace(/\"/g, "")}/10</Text>

                </View>

                <View style={{borderColor:'white',borderWidth:2,height:120,padding:8,shadowColor: '#fff',elevation:2,shadowOpacity:1,shadowColor:'grey',}}>
                 <Text style={{fontSize:21.5,fontWeight:'bold', fontFamily: "Times New Roman"}}>Enter Bid: </Text>
                    <TextInput style={styles.inputBox}
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="Enter Bid" 
                     placeHolderTextColor= "black" 
                     value={this.state.UBid}
                     onChangeText={(UBid) => this.setState({UBid})}/>  
                  
                 
                </View>    
           </View>
        </ScrollView>
        </Container>
        
    )
}
}

const styles = StyleSheet.create({
  
    inputBox:{
      width: 50,
      backgroundColor:'#ffffff',
      fontSize:22,
      color:'black'
    },
    textStyle: {
        paddingTop: 10,
        paddingBottom: 12 ,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 24, 
        fontWeight: 'bold'
    },
    inputBox:{
        width: 300,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        marginVertical: 15,
        borderColor:'black',
        borderWidth:2
      },
    viewStyle: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        width: WIDTH-10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 8,marginVertical:6,
        paddingVertical:6,
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor:'white'
    },
    descStyle: {
        //flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-start',
        height: 200,
        width: WIDTH-10,
        backgroundColor: '#fff',
        borderRadius: 7,
        elevation: 6,marginVertical:6,
        paddingVertical:6,
        paddingHorizontal: 6,
        borderWidth:2,
        borderColor:'black'

    },
    descinputBox:{
        paddingBottom: 6,
        paddingTop: 2,
        height: 100,
        width: WIDTH-40,
        backgroundColor:'#ffffff',
        fontSize:22,
        color:'black'
      },
      bidbutton:{
        position:'absolute',
        width:60,
        height:55,
        borderRadius:3,
        right:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#303f9f',
        marginTop:51
    },

    
 
  
  });
