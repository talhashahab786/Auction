import React, { Component } from "react";
import { Button,View, Text,Dimensions,StyleSheet,TextInput, ScrollView,TouchableOpacity,Image,TouchableHighlight} from "react-native";
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import moment from 'moment';
const {width: WIDTH }=  Dimensions.get('window');


export default class ViewMobileDetails extends Component {
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
            BidderName:"",
            BidderCity:"",
            BidderEmail:"",
            BidderCellNumber:""

            ,StartingBid:"",
            image_uri:"",
            ProductOwner:""  
            
            


            ,TitleA:"",
            ModelA:"",
            PriceA:"",
            HighestBidA:"",
            TimeLeftA:"",
            image_uriA:""
        }

    }

    componentDidMount() 
    {
      var postData = [];
      let DataObj = {};
  




  var uid = firebase.auth().currentUser.uid;



  
}   



    //UPDATE BID
    updateBid(       
      userID,   
      productID,
      bid,
      BidderUID,
      bidbidArray,
      bididArray,
      bidnameArray,
      totalbids,
      category,
      StartingBid
      ,title,model,image_uri,HighestBid,TimeLeft

  ){  



    
    var uid = firebase.auth().currentUser.uid;
    this.state.BidderUID=uid;
  



    
  var a=bidbidArray[0];
  var b=bid;
  var c=a.toString().length;
  var d=b.toString().length;
  var cc=a.toString();
  var dd=b.toString();
  var ddd=b.toString();
  var y="";
  var xxx= 0;
  while(dd.charAt(0)=="0"){
    dd=dd.substring(1, d);
    xxx++;
  }
    b = parseInt(ddd.substring(xxx, d), 10);
    d=b.toString().length;
    this.state.thehighestbid=b;
    this.state.isupdated=true;

  if((a<b&&c===d||c<d)&& StartingBid<b){


//if(bidbidArray[0]<bid && StartingBid<bid){
      
    
       //update bid
        bidbidArray[4]=  bidbidArray[3];
        bidbidArray[3]= bidbidArray[2];
        bidbidArray[2]= bidbidArray[1];
        bidbidArray[1]= bidbidArray[0];
        bidbidArray[0]= b;

        //update bidder uid and priduct id
        this.state.ProductID=productID;
        this.state.BidderUID=uid;
        this.state.ProductID=productID;


        //update bidder id
        bididArray[4] = bididArray[3];
        bididArray[3] = bididArray[2];
        bididArray[2] = bididArray[1];
        bididArray[1] = bididArray[0];
        bididArray[0] = uid;


     

var x= this.state.items.Bidder_names;


        
        bidnameArray[4]=bidnameArray[3];
        bidnameArray[3]=bidnameArray[2];
        bidnameArray[2]=bidnameArray[1];
        bidnameArray[1]=bidnameArray[0];
        bidnameArray[0]=x;

                //init bidder's info to send to db
                var UserName ="";
                var BidderCity ="";
                var BidderCellNumber ="";
                var BidderEmail ="";
          
        
                UserName = this.state.BidderName;


        //update bidder name
        bidnameArray[4]=bidnameArray[3];
        bidnameArray[3]=bidnameArray[2];
        bidnameArray[2]=bidnameArray[1];
        bidnameArray[1]=bidnameArray[0];
        bidnameArray[0]=UserName;


        //IF NULLS PRESENT
        if(bidnameArray[1]==null){
         // bidnameArray[0]="";
          bidnameArray[1]="";
          bidnameArray[2]="";
          bidnameArray[3]="";
          bidnameArray[4]="";
        }


//take total bids value as provide for a product
totalbids=totalbids+1;

this.setState({totalbidsplaced:totalbids});






     //category here putsMobilePhones
        firebase.database().ref('Users/'+userID+'/UserProducts/MobilePhones/'+productID).update({
     // firebase.database().ref('Users/'+userID+'/UserProducts/'+category+'/'+productID).update({
        bid,
        BidderUID,
        bidnameArray,
        bidbidArray,            
        bididArray,
       

       


        
}).then((data)=>{
  //UPDATE THE KEY RETRIVE AFTER POSTING
productID=data.key;

  console.log('data put in database: ' , data)
}).catch((error)=>{
  console.log('error while uploading data to database: ' , error)
});

//update BIDDED PRODUCTS TABLE
firebase.database().ref('/BiddedProducts/'+productID+'/').set({
        uid,
        bid,
        bidbidArray,
        bididArray,
        category ,
        
        title,model,image_uri,HighestBid, StartingBid,TimeLeft
}).then((data)=>{}).catch((error)=>{}); 

//SHOW BID UPDATE
        ToastAndroid.showWithGravityAndOffset(
            'Bid Updated!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
}
else{

    //cant update bid error
    ToastAndroid.showWithGravityAndOffset(
        'Place A Higher Bid!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
}





    }

// 
//, this.state.TitleA
//, this.state.ModelA
//, this.state.image_uri
//, this.state.HighestBidA

//SUBTRACT timer SHows current date else time end
dater = (choosenDate) => {

  
  var x = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  var c = moment(choosenDate);
  var duration = moment.duration(c.diff(x));
  duration = parseInt(duration.asMinutes());
  var h = Math.floor(duration / 60);
  var m = duration % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
 if(duration>0){
   if(this.state.TimeLeft!=(h + ':' + m)){
this.setState({TimeLeft:(h + ':' + m)});}
  return(
    h + ':' + m
   );
 }
 else{


   return(
     "TIME END"
   );
 }
     
} 

//USED TO SHOW PROUCT WHEN ALREDY VALID AND NOT SOLD
    display(UserID,ProductID,aa,bb,cc,dd,ee,ff,gg,hh,owner,bidder,title,model,image_uri,HighestBid){

      const {navigation}= this.props;
      //var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      var c= navigation.getParam('choosenDate','null' );
     // c=moment(c,"YYYY-MM-DD HH:mm:ss");
      var d= navigation.getParam('currDate','null' );
      
      var  lava= moment(c,"YYYY-MM-DD HH:mm:ss");
      var  lava2= moment(d,"YYYY-MM-DD HH:mm:ss");
       
       var TimeLeft = this.dater(c);

      var duration = moment.duration(lava.diff(lava2));
      duration = parseInt(duration.asMinutes());
                      
      if(duration >0){
        return(       
               <View style={{borderColor:'black',borderWidth:2,marginTop:10,height:120,padding:8,}}>
                 <Text  style={{fontSize:28.5,fontWeight:'bold', fontFamily: "Times New Roman",textAlign:'center',justifyContent:'center',color:'black'}}>BID NOW</Text>
                      <TextInput style={styles.inputBox}
                       underlineColorAndroid='rgba(0,0,0,0)'
                       placeholder="Enter Bid" 
                       placeHolderTextColor= "black" 
                       value={this.state.UBid}
                       keyboardType='numeric'
                       onChangeText={(UBid) => this.setState({UBid})}/>  
                      <TouchableOpacity style={styles.bidbutton} 
                      
                      onPress={()=>{
                        
                        if(owner!=bidder){
                        this.updateBid(UserID,ProductID,aa,bb,cc,dd,ee,ff,gg,hh,title,model,image_uri,HighestBid,TimeLeft);
                      }
                      else{
                     
                        ToastAndroid.showWithGravityAndOffset(
                          'You Cannot Bid on Your Own Product!',
                          ToastAndroid.LONG,
                          ToastAndroid.BOTTOM,
                          25,
                          50,
                        );
                      }
                        this.state.totalbidsplaced=this.state.totalbidsplaced+1;}} >
                          <Ionicons name="md-hammer"  size={24} color={'white'}/>
                      </TouchableOpacity>

               </View> 
        );
      }
      else{
        return(
          
          <View style={{textAlign:'center',justifyContent:'center',height:80,padding:70,}}>
                
          <View style={{textAlign:'center',justifyContent:'center',marginTop:10,height:10,padding:8,}}>
          </View>

          
          <Text>
          <Text  style={{fontSize:20,fontWeight:'bold',textAlign:'center',justifyContent:'center', fontFamily: "Times New Roman",marginTop:5,color:'green'}}>
          </Text>
          <Text  style={{fontSize:20,fontWeight:'bold',textAlign:'center',justifyContent:'center', marginLeft:20,padding:50,  fontFamily: "Times New Roman",marginTop:5,color:'green'}}>Product Sold Out</Text> 
          <Text  style={{fontSize:20,fontWeight:'bold', textAlign:'center',justifyContent:'center',fontFamily: "Times New Roman",marginTop:5,color:'green'}}>
          </Text>
</Text>
          <View style={{textAlign:'center',justifyContent:'center',marginTop:10,height:10,padding:8,}}>
          </View>
          </View>


        );
      }
      
    }
  

    render(){
    
        
        const {navigation}= this.props;
        const Title = navigation.getParam('Title','null');
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
    this.state.category=navigation.getParam('Category','null');


    this.state.image_uri=navigation.getParam('image_uri','null');
    this.state.ProductOwner=navigation.getParam('ProductOwner','null');
     
this.state.BidderName=navigation.getParam('BidderNAME','null');
this.state.BidderCity=navigation.getParam('BidderCity','null');
this.state.BidderEmail=navigation.getParam('BidderEmail','null');
this.state.BidderCellNumber=navigation.getParam('BidderCellNumber','null');
this.state.StartingBid=navigation.getParam('StartingBid','null');



this.state.TitleA= navigation.getParam('Title','null');
this.state.ModelA= navigation.getParam('Model','null' );
this.state.HighestBidA=navigation.getParam('HighestBid','null');

        return(
           
        <ScrollView style={{padding:2}}>
               <Header style={{ backgroundColor: 'black', flexDirection: 'row' }}>
        
        <Right >
          <Icon name="ios-menu" style={{  fontSize:65, color: 'white', fontWeight: 'bold', marginleft: 15 }}
             onPress={()=>this.props.navigation.openDrawer()}  />
        </Right>
      </Header>

           <View style={styles.viewStyle}>

                <View style={{borderColor:'white',borderWidth:2,marginTop:5}}>
      
                     <Image source={{uri:this.state.image_uri}} style={{ width: WIDTH-5, height: 240, textAlign: 'center', justifyContent: 'center', padding:5 }} />
                </View>


                <View style={{borderColor:'black',borderWidth:2,marginTop:10,height:80,padding:8,}}>
               
                   <Text style={{fontSize:22,fontWeight:'bold', textAlign:'center',justifyContent:'center',fontFamily: "Times New Roman",color:'black',}}>
                        <Text>{JSON.stringify(Title).replace(/\"/g, "")}</Text>
                    </Text>

                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',justifyContent:'center', fontFamily: "Times New Roman" ,color:'blue',flexDirection:'row'}}>
                    <Text>{JSON.stringify(Model).replace(/\"/g, "")}</Text>
                    </Text>   

                   
                </View>



              <View style={{borderColor:'black',textAlign:'center',justifyContent:'center',borderWidth:2,marginTop:5,height:270,padding:8}}>
                    <Text  style={{fontSize:28.5,fontWeight:'bold', fontFamily: "Times New Roman",textAlign:'center',justifyContent:'center',color:'black'}}>Product Details</Text>
                    <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",textAlign:'center',justifyContent:'center',color:'black'}}></Text>
                  
                    <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                       Front Condition :
                       <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{JSON.stringify(FrontCondition).replace(/\"/g, "")} /10</Text>
                    </Text>

                    <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                       Back Condition :  
                       <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{JSON.stringify(BackCondition).replace(/\"/g, "")} /10</Text>
                    </Text>

                    <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                      StartingPrice : 
                       <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{JSON.stringify(Price).replace(/\"/g, "")}</Text>
                    </Text>
                    <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                      HighestBid : 
                       <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.bidder_bid_array[0]}</Text>
                    </Text>



                </View>

                <View style={{borderColor:'red',textAlign:'center',justifyContent:'center',borderWidth:2,marginTop:10,height:370,padding:8,}}>
                <Text  style={{fontSize:28.5,fontWeight:'bold', fontFamily: "Times New Roman",textAlign:'center',justifyContent:'center',color:'black'}}>Your Bidding Information</Text>
                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",textAlign:'center',justifyContent:'center',color:'black'}}></Text>
                   

                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                   Bidder Name : 
                  <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.BidderName}</Text>
                </Text>
                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                   Bidder Email : 
                  <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.BidderEmail}</Text>
                </Text>
                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                   Bidder Cell Number : 
                  <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.BidderCellNumber}</Text>
                </Text>
                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                   Bidder City : 
                  <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.BidderCity}</Text>
                </Text>
                <Text  style={{fontSize:20,fontWeight:'bold', fontFamily: "Times New Roman",marginTop:5,color:'black'}}>
                   Amount Bid: 
                  <Text style={{fontSize:18,fontWeight:'bold', fontFamily: "Times New Roman",color:'#093377'}} >{this.state.bidder_bid_array[0]}</Text>
                </Text>

                </View>
               
               
               
{              this.display(UserID,ProductID,this.state.UBid,this.state.BidderUID,this.state.bidder_bid_array,this.state.bidder_array,this.state.bidder_name_array,this.state.totalbidsplaced,this.state.category,this.state.StartingBid,this.state.ProductOwner,this.state.BidderName
  
  , this.state.TitleA
  , this.state.ModelA
  , this.state.image_uri
  , this.state.HighestBidA



  )
                   
                }
               
                </View>

        </ScrollView>
        
    )
}
}


const styles = StyleSheet.create({
   
 
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
        fontSize: 20,
        color: 'black',
        marginVertical: 15,
        borderColor:'black',
        borderWidth:2,
        top:-15
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
        height:54,
        borderRadius:3,
        right:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#303f9f',
        marginTop:48,
        marginRight:9    
        
    }

    
 
  
  });
