import React, { Component } from 'react';

import MixedNavigators from './src/Navigation/MixedNavigators';
import firebase from 'firebase'
import {Button,StyleSheet,Text,View,TouchableOpacity,Platform,StatusBar,Image} from 'react-native';
export default class App extends Component {
    componentWillMount() {
        this.initializeFirebase();
      }
    
    initializeFirebase() {
      const firebase = require("firebase");
      const firebaseConfig = {
        apiKey: "AIzaSyCgmFEeR9TPIwV9Hj3HvlxnBh7gIbr3KHQ",
        authDomain: "auctionapplication-91e6b.firebaseapp.com",
        databaseURL: "https://auctionapplication-91e6b.firebaseio.com",
        projectId: "auctionapplication-91e6b",
        storageBucket: "auctionapplication-91e6b.appspot.com",
        messagingSenderId: "861302505680"
      };
      firebase.initializeApp(firebaseConfig)
      if (!firebase.apps.length) {
        firebase.initializeApp(config).then(
            console.log("xxxFirebase initialize for Mobiledxxx")
        ).catch(
            console.log("---Firebase Failed for mobile---")
        );
    }
    }
    

  state={
    items:[],
    mainscreenrender:0,
    countrunHashir:0,
    runHASHIRcode:0
  };
  readUserData() {
     const postData = [];
        const RefData = firebase.database().ref('Products/');
          RefData.once('value').then((snapshot) => {
            let DataObj = {};
            snapshot.forEach(childSnapshot => {
              DataObj = {
              PostID: childSnapshot.key,
              Title: childSnapshot.val().title
              };
              console.log("DATA js OBJ {} \n");
              console.log(DataObj);
              postData.push(DataObj);
              //console.log("LEN"+postData.length());
              
            });
            this.setState({items: postData });
           // console.log("POSTDATA ARRAY"+postData);          
            console.log("\nITEMS STATE ARRAY 1st obj postID"+this.state.items[0].PostID);
            console.log("\nITEMS STATE ARRAY 1st obj TITLE"+this.state.items[0].Title);
            console.log("\nITEMS STATE ARRAY MAP"+this.state.items.map);
            this.state.runHASHIRcode=1;
            //console.log("RUN CODEE NOW"+this.state.runHASHIRcode);
        //    this.hashir();
          });
          
      
      }
  
  hashir () {
    console.log("IN hashir "+this.state.countrunHashir++);
    console.log("MAIN SCREE "+this.state.mainscreenrender);

var i;
for (i = 0; i < this.state.items.length; i++) { 
  console.log("DATA titile is: "+this.state.items[i].Title);
  <View>
    <Text>Item: {i} Title:</Text>
    <Text>{this.state.items[i].Title}</Text>
  </View>
  console.log("")
}

  }
alertItemName = (item) => {
  alert(item.name)
}

  render() {
   return (
     <MixedNavigators/>
     
    );
}
}
