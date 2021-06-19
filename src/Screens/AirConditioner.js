import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, Image,ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'



import RecommendedCardItem from '../Screens/RecommendedCardItemForAC'
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
    productIDfound:''
    
  }
}

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
    )
  }
  componentDidMount() {
    var postData = [];
    var RefData = firebase.database().ref('Users/');
    let DataObj = {};
//here snapshot is the user table acheived
    RefData.once('value').then((snapshot) => {
//here child snapshot is the user ids of many differenet users
      snapshot.forEach(childSnapshot => {
this.setState({userIDfound:childSnapshot.key});

var uid = firebase.auth().currentUser.uid;
var RefData2 =firebase.database().ref('Users/'+this.state.userIDfound+'/UserProducts/AirCondition/');

//var RefData2 = firebase.database().ref('User/'+this.state.userIDfound+'/UserProducts/MobilePhones/');
RefData2.once('value').then((snapshot2) => {
  snapshot2.forEach(childSnapshot2 => {
    DataObj = {
      ID: this.state.DataObjID,
             PostID: childSnapshot2.key,
            Title: childSnapshot2.val().title,
            Brand: childSnapshot2.val().brand,
            Model: childSnapshot2.val().model,
            condSelected: childSnapshot2.val().condSelected,   
            TypeSelected: childSnapshot2.val().typeSelected,
            TonSelected: childSnapshot2.val().tonSelected,
            StartingBid: childSnapshot2.val().startbid,
            Description: childSnapshot2.val().description,
            chosenDate: childSnapshot2.val().chosenDate
    };
          
        postData.push(DataObj);
        this.state.DataObjID += 1;
      });
      this.setState({ items: postData });
    
    })});     

      this.state.runHASHIRcode = 1;
    });
  }
  

  render() {
    return (
      <Container>
         <Header style={{ backgroundColor: '#76a8dd', flexDirection: 'row' }}>
          <View style={{ height: '100%', justifyContent: 'center', width: '85%' }}>
            <Item style={{ backgroundColor: 'white', paddingHorizontal: 10 }}>
              <Icon name="md-search" style={{ fontSize: 40, paddingTop: 5 }} />
              <Input placeholder="Search" style={{ fontSize: 20, fontWeight: 'bold' }} />
            </Item>
          </View>

          <Right >
            <Icon name="ios-menu" style={{  fontSize:55, color: 'white', fontWeight: 'bold', marginleft: 15 }}
               onPress={()=>this.props.navigation.openDrawer()}  />
          </Right>
        </Header>


          <View style={{ marginLeft: 5, marginRight: 5 }} >
          {
              this.state.items.map(item => (
                <View>     
                  <RecommendedCardItem
                   key={item.ID}
                   Title={item.Title}
                   Brand={item.Brand}
                   Model={item.Model}
                   TonSelected={item.TonSelected} 
                   TypeSelected={item.TypeSelected}
                   Condition={item.condSelected} 
                   StartingBid={item.StartingBid}  
                   Description={item.Description}
                   chosenDate={item.chosenDate}
                  />

                  <TouchableOpacity 
                  style={{ alignContent: 'center', backgroundColor: '#357bdd', width: '100%', marginVertical: 10, paddingVertical: 12 }}
                   onPress={() => this.props.navigation.navigate('ViewProducDetailforAc',
                   {  key:item.ID,
                   Title:item.Title,
                   Brand:item.Brand,
                   Model:item.Model,
                   Condition:item.condSelected,
                   StartingBid:item.StartingBid,
                   Description:item.Description,
                   chosenDate:item.chosenDate,
                   TonSelected:item.TonSelected,
                   TypeSelected:item.TypeSelected
                  
                  }) }
                   >
                     <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textAlign: 'center' }} >View  Detail</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
      </Container>

      

    );
  }
}


