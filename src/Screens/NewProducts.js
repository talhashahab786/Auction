import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, Image,ToastAndroid,ScrollView } from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import firebase from 'firebase'


export default class App extends Component {
  static navigationOptions = {
    drawerIcon:({ tintColor })=>( <Icon name="ios-albums" style={{fontSize:26, color: tintColor}}/>
    )
  }
  constructor(props){
    super(props);
    this.state = {    
      items: [],
      itemXX:[],
    mainscreenrender: 0,
    countrunHashir: 0,
    runHASHIRcode: 0,
    DataObjID: 0,
    keyID: 0,
    userIDfound:'',
    productIDfound:'',
    bid_name:[],
    currentDate:'',
    chDate:'',
    image_uri:''
    ,
    BidderName:"",
    BidderCity:"",
    BidderEmail:"",
    BidderCellNumber:"",
    
    TimeLeft:""



    
  }
}

     


  componentDidMount() {
   // var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
   var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
   this.setState({currentDate: now});
    var postData = [];
    var RefData = firebase.database().ref('Users/');
    let DataObj = {};
//here snapshot is the user table acheived
    RefData.once('value').then((snapshot) => {
//here child snapshot is the user ids of many differenet users
      snapshot.forEach(childSnapshot => {

      this.setState({userIDfound:childSnapshot.key});

var uid = firebase.auth().currentUser.uid;
var RefData2 =firebase.database().ref('Users/'+this.state.userIDfound+'/UserProducts/MobilePhones/');

RefData2.once('value').then((snapshot2) => {
  snapshot2.forEach(childSnapshot2 => {
if( this.dater2(childSnapshot2.val().currentDate)){
    DataObj = {
      ID: this.state.DataObjID,

      PostID: childSnapshot2.key,
      Title: childSnapshot2.val().title,
      Model: childSnapshot2.val().model,
      FrontCondition: childSnapshot2.val().frontCond,
      BackCondition: childSnapshot2.val().backCond,
      StartingBid: childSnapshot2.val().startbid,
      Description: childSnapshot2.val().description,
      ProductID: childSnapshot2.val().productID,
      UserID:childSnapshot2.val().userID,
      BidderUID:childSnapshot2.val().BidderUID,
      HighestBid:childSnapshot2.val().bid,
      iuri:childSnapshot2.val().image_uri,
      
      Category:childSnapshot2.val().category,
      Prediction:childSnapshot2.val().prediction,
      choosenDate:childSnapshot2.val().chosenDate,
               

      Bidder_array_id:childSnapshot2.val().bididArray,
      Bidder_array_name:childSnapshot2.val().bidnameArray,
      Bidder_array_bid:childSnapshot2.val().bidbidArray,
      Bidder_bidcount:childSnapshot2.val().totalbidsplaced
      

    };
          
        postData.push(DataObj);}

    });

  
      this.setState({ items: postData });
    
    })});     

    });



    
//BIDDER DETAILS WORK
var postDataXX = [];
let DataObjXX = {};

var uidXX = firebase.auth().currentUser.uid;
var RefDataXX =firebase.database().ref('Users/'+uidXX+'/UserInformation/');

var my_counter = 1;

//CellNumber , City , UserName , Password , email
RefDataXX.once('value').then((snapshotXX) => {
          

 console.log('HERE - In snapshot which is   :  '+snapshotXX);

snapshotXX.forEach(childSnapshotXX => { 
  
  



  console.log('HERE - In the Childs of Snapshot [childsnapshotxx]'+childSnapshotXX);

  console.log('HERE - [Childsnapshot.val]  :  '+childSnapshotXX.val());

if(my_counter==1){
this.setState({BidderCellNumber:childSnapshotXX.val()});
}
else if(my_counter==2){
  this.setState({BidderCity:childSnapshotXX.val()});
  }
  else if(my_counter==3){
    //dont take password
  }

  else if(my_counter==4){
      this.setState({BidderName:childSnapshotXX.val()});
      }
      else if(my_counter==5){
        this.setState({BidderEmail:childSnapshotXX.val()});
        }
my_counter++;




          });
      
})


  }
  

  dater2 = (choosenDate) => {
    //bigger
    var x = moment(this.state.currentDate);
    //smaller
    var c = moment(choosenDate);
    var duration = moment.duration(x.diff(c));
    var durationH = parseInt(duration.asHours());
    var durationM = parseInt(duration.asMinutes());

    var h = Math.floor(duration / 60);
    var m = duration % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;

   if(durationH>0&&durationH<=6||(durationM>0&&durationH>0&&durationH<=6)){
    return true ;

   }
   else{
     return false;
     
   }
       
       
} 


  dater = (choosenDate) => {
        var x = moment(this.state.currentDate);
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

  render() {
    return (
      <View style={styles.container}>
      
        <Container>
         <Header style={{ backgroundColor: 'white', flexDirection: 'row' }}>
        

          <Right >
            <Icon name="ios-menu" style={{  fontSize:65, color: 'black', fontWeight: 'bold', marginleft: 15 }}
               onPress={()=>this.props.navigation.openDrawer()}  />
          </Right>
        </Header>
<ScrollView>

          <View style={{ marginLeft: 1, marginRight: 1, }} >
          {
             this.state.items.map(item => (
              <Card   >
                  <TouchableOpacity 
                     style={{color:'grey' }}
                        onPress={() => this.props.navigation.navigate('ViewProduct',{Title: item.Title, Model:item.Model, FrontCondition:item.FrontCondition,
                   BackCondition:item.BackCondition, StartingBid:item.StartingBid, Description:item.Description, ProductID:item.ProductID,
                   UserID:item.UserID,  BidderUID:item.BidderUID, HighestBid:item.HighestBid,   ID: item.ID, PostID: item.PostID,Category:item.Category,
                   Prediction:item.Prediction,
                   choosenDate:item.choosenDate,
                   Bidder_array_id: item.Bidder_array_id,
                   Bidder_array_name:item.Bidder_array_name,
                   Bidder_array_bid:item.Bidder_array_bid,
                   Bidder_bidcount:item.Bidder_bidcount,
                   currDate:this.state.currentDate,
                   image_uri:item.iuri,


                   BidderNAME: this.state.BidderName,
                   BidderCity:this.state.BidderCity,
                   BidderEmail:this.state.BidderEmail,
                   BidderCellNumber:this.state.BidderCellNumber
,                  ProductOwner:this.state.userIDfound
,                  TimeLeft:this.state.TimeLeft
                   }) }>
                <CardItem    >




                  <Left>
                     <Thumbnail  source={{uri:item.iuri}} style={{width:140,height:120,borderRadius:30}} />
                    
                  </Left> 

                  <Right>
                   <View style={{alignItems:'flex-end'}}>
                   <View>
                   <Text  style={{fontSize:20,color:'black',fontWeight:'800'}}>Title  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.Title}</Text></Text>
                      <Text style={{fontSize:19,color:'black',fontWeight:'600'}}>Model  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.Model}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Price  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.StartingBid}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Highest BId <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.HighestBid}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Time left <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{ this.dater(item.choosenDate)}</Text></Text>                    
                   
                   </View>
                   </View>

                  </Right>
                </CardItem>
                 </TouchableOpacity>
                </Card>
              ))
          }
          </View>
          </ScrollView>
      </Container>


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
