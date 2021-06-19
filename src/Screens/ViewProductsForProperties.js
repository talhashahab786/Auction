import React, { Component } from "react";
import { Button,View, Text,Dimensions,StyleSheet,TextInput, ScrollView,TouchableOpacity,Image} from "react-native";
const {width: WIDTH }=  Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export default class ViewProperitiesDetails extends Component {
    static navigationOptions = {
        drawerIcon:({ tintColor })=>( <Ionicons name="md-cloud-upload" style={{fontSize:26, color: tintColor}}/>
        ),
        header: null
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
        const Location = navigation.getParam('Location','null' );
        const City = navigation.getParam('City','null' );
        const Area = navigation.getParam('Area','null' );
        const Description = navigation.getParam('Description','null');
        const FLoors = navigation.getParam('FLoors','null');
        const Beds =navigation.getParam('Beds','null');
        const Bath =navigation.getParam('Bath','null');
        const StartingBid =navigation.getParam('StartingBid','null');
   
        return(
        <ScrollView style={{padding:2}}>
       <Button
          onPress={() => navigation.dismiss()}
          title="Go back from screen-123"
        />
           <View style={styles.viewStyle}>
   
                <View style={{borderColor:'white',borderWidth:2,marginTop:5}}>
      
                     <Image source={require('../images/s9.jpg')} style={{ width: WIDTH-5, height: 240, textAlign: 'center', justifyContent: 'center', padding:5 }} />
                </View>

                <View style={{borderColor:'white',borderWidth:2,marginTop:20,height:75,padding:8,shadowColor: '#fff',elevation:3,shadowOpacity:1,shadowColor:'grey'}}>
                    <Text style={{fontSize:22,fontWeight:'bold', fontFamily: "Times New Roman"}}>
                        <Text>{JSON.stringify(Title).replace(/\"/g, "")}</Text>
                    </Text>

                    <Text style={{fontSize:22,fontWeight:'bold', fontFamily: "Times New Roman"}}>
                        <Text> PKR {JSON.stringify(StartingBid).replace(/\"/g, "")}</Text>
                    </Text>
            </View>

              <View style={{borderColor:'white',borderWidth:2,marginTop:20,height:125,padding:8,shadowColor: '#fff',elevation:3,shadowOpacity:1,shadowColor:'grey'}}>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>AREA: {JSON.stringify(Area).replace(/\"/g, "")} </Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>CITY: {JSON.stringify(City).replace(/\"/g, "")}</Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5}}>LOCATION: {JSON.stringify(Location).replace(/\"/g, "")}</Text>
                </View>

                <View style={{borderColor:'white',borderWidth:2,marginTop:20,height:170,padding:8,shadowColor: '#fff',elevation:3,shadowOpacity:1,shadowColor:'grey'}}>
                    <Text style={{fontSize:21.5,fontWeight:'bold', fontFamily: "Times New Roman"}}>HOUSE DETAILS</Text>
                    <Text style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman"}}>FLOOR:{JSON.stringify(FLoors).replace(/\"/g, "")}</Text>
                    <Text style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman"}}>BEDROOM:{JSON.stringify(Beds).replace(/\"/g, "")}</Text>
                    <Text  style={{fontSize:19,fontWeight:'bold', fontFamily: "Times New Roman"}}>BATH:{JSON.stringify(Bath).replace(/\"/g, "")}</Text>
            

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
