import React, { Component } from 'react';
import {Image} from 'react-native';

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
    

  
  
  render() {
   return (
  
    <Image
    
    style={ {width:"100%",height:"95%",  }}
    source={require('../AuctionAPPWithImages/src/images/a.jpg')}
    />
    
    );
}
}
