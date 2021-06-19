import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, Image,ToastAndroid,ScrollView } from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';




import firebase from 'firebase'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {    
      items: [],
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
    prodIDretrrve:"",
    currentUID:""
    
  }
}

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
    )
  }
  componentWillMount(){
    var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.setState({currentDate: now});
  }
  componentDidMount() {
    var postData = [];
    let DataObj = {};


var uid = firebase.auth().currentUser.uid;
this.state.currentUID = uid;

var RefData2 =firebase.database().ref('BiddedProducts/');



RefData2.once('value').then((snapshot2) => {
  snapshot2.forEach(childSnapshot2 => {
    DataObj = {
        ProductID:  childSnapshot2.key,
           UserID:  childSnapshot2.val().uid ,
           Bid: childSnapshot2.val().bid,
           Category:childSnapshot2.val().category,
         



           Model: childSnapshot2.val().model,
           StartingBid: childSnapshot2.val().StartingBid,
           HighestBid: childSnapshot2.val().HighestBid,
           image_uri:childSnapshot2.val().image_uri,
           title:childSnapshot2.val().title,
           TimeLeft:childSnapshot2.val().TimeLeft

              
    };
 

        postData.push(DataObj);
//        this.state.DataObjID += 1;
      });
      this.setState({ items: postData });
    
    })     



        
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
       
           return(
            h + ' Hours and ' + m+ ' Minutes'
           );
           
  } 








  
  render() {
    
    return (
<ScrollView>

          <View style={{ marginLeft: 1, marginRight: 1, }} >
          {
             this.state.items.map(item => (
              <Card   >
                  <TouchableOpacity 
                     style={{color:'grey' }}
                   
                   >
                <CardItem    >

                  <Left>
                     <Thumbnail  source={{uri:item.image_uri}} style={{width:140,height:120,borderRadius:30}} />
                    
                  </Left> 

                  <Right>
                   <View style={{alignItems:'flex-end'}}>
                   <View>
                   <Text  style={{fontSize:20,color:'black',fontWeight:'800'}}>Title  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.title}</Text></Text>
                      <Text style={{fontSize:19,color:'black',fontWeight:'600'}}>Model  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.Model}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Price  <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.StartingBid}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Highest BId <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.HighestBid}</Text></Text>
                    <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>Time left <Text style={{fontSize:16,color:'#0018a3',fontWeight:'600'}}>{item.TimeLeft}</Text></Text>                    
                   
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
    );
  }
}
