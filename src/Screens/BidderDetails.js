import React, { Component } from "react";
import { Button,View, Text,Dimensions,StyleSheet,TextInput, ScrollView,TouchableOpacity,Image,TouchableHighlight} from "react-native";
const {width: WIDTH }=  Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

export default class BidderDetails extends Component {
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
items: [],

item: "",
mainscreenrender: 0,
countrunHashir: 0,
runHASHIRcode: 0,
DataObjID: 0,
keyID: 0,
userIDfound:'',
productIDfound:'',
BidderEmail:"",
BidderPass:"",
totalbidsplaced:0,
bidder_array:
[
    'bidder1_id',
    'bidder2_id',
    'bidder3_id',
    'bidder4_id',
    'bidder5_id'
]
,bidder_name_array:
[
    'bidder1_name',
    'bidder2_name',
    'bidder3_name',
    'bidder4_name',
    'bidder5_name'
]
,bidder_bid_array:
[
  0,
  0,
  0,
  0,
  0
]
,
bidname:'',

thehighestbid:0,
isupdated:false
           
            
        }

    }

    //
    componentDidMount() {
        var postData = [];
        let DataObj = {};
  
    var uid = firebase.auth().currentUser.uid;
    var RefData2 =firebase.database().ref('Users/'+uid+'/UserInformation/');
    
    //var RefData2 = firebase.database().ref('User/'+this.state.userIDfound+'/UserProducts/MobilePhones/');
    RefData2.once('value').then((snapshot2) => {
      snapshot2.forEach(childSnapshot2 => {
        DataObj = {
      
          PostID: childSnapshot2.key,
          Bidder_names:childSnapshot2.val().UserName
          
    
        };
             
            postData.push(DataObj);
          });
          this.setState({ items: postData });
        
        })
    }   

    render(){
    
        
        const {navigation}= this.props;
        const BidderName = navigation.getParam('BidderName','null');
        const BidderID = navigation.getParam('BidderID','null');
        const BidderBid = navigation.getParam('BidderBid','null');
       
        /*    const Title = navigation.getParam('Title','null');
        const Model = navigation.getParam('Model','null' );
        const FrontCondition = navigation.getParam('FrontCondition','null' );
        const BackCondition = navigation.getParam('BackCondition','null' );
        const Description = navigation.getParam('Description','null');
        const Price = navigation.getParam('StartingBid','null');
        const ProductID =navigation.getParam('ProductID','null');
        const UserID =navigation.getParam('UserID','null');
        const HighestBid =navigation.getParam('HighestBid','null');

    this.state.bidder_bid_array=navigation.getParam('Bidder_array_bid','null');
    this.state.bidder_name_array=navigation.getParam('Bidder_array_name','null');
    this.state.bidder_array=navigation.getParam('Bidder_array_id','null');
    this.state.totalbidsplaced=navigation.getParam('Bidder_bidcount','null');
*/

     
        return(
            <ScrollView style={{padding:2}}>
                <View style={styles.viewStyle}>

            <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman"}}>Highest Bidder Details</Text>
            <Text  style={{fontSize:16,fontWeight:'bold', fontFamily: "Times New Roman"}}>Our top bidder</Text>
            <Text  style={{fontSize:14,fontWeight:'bold', fontFamily: "Times New Roman"}}>NAME: {JSON.stringify(BidderName).replace(/\"/g, "")} ID: {JSON.stringify(BidderID).replace(/\"/g, "")} Bid: {JSON.stringify(BidderBid).replace(/\"/g, "")}</Text>

                </View>
            </ScrollView>
            );
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
    bidinfobutton:{
      position:'absolute',
      width:60,
      height:55,
      borderRadius:3,
      right:10,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#303f9f',
      marginTop:100
  },

  });
