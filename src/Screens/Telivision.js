import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import RecommendedCardItem from '../Screens/RecommendedCardItemForTv'
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
    keyID: 0
  }
}

 
componentWillMount() {
    var postData = [];
    var RefData = firebase.database().ref('Television/');
    let DataObj = {};
    RefData.once('value').then((snapshot) => {
    snapshot.forEach(childSnapshot => {     
          DataObj = {
             ID: this.state.DataObjID,
             PostID: childSnapshot.key,
            Title: childSnapshot.val().title,
            Model: childSnapshot.val().model,
            condSelected: childSnapshot.val().condSelected,
            Brand: childSnapshot.val().brand,
            ScreenSize: childSnapshot.val().scrsize,
            Resolution: childSnapshot.val().resolution,
            StartingBid: childSnapshot.val().startbid,
            Description: childSnapshot.val().description
          };
          postData.push(DataObj);
        this.state.DataObjID += 1;
      });
      this.setState({ items: postData });
      

      this.state.runHASHIRcode = 1;
    });
  }
  alertItemName = (item) => {
    alert(item.Title)
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

        <Content>
          <Card style={{ marginLeft: 5, marginRight: 5 }}>
            {
              this.state.items.map((item, index) => (
                <View>
               
                  <RecommendedCardItem
                    key={item.ID}
                    Title={item.Title}
                    Brand={item.Brand}
                    Model={item.Model}
                    Condition={item.condSelected}  
                    StartingBid={item.StartingBid}
                    ScreenSize={item.ScreenSize}  
                    Resolution={item.Resolution}
                    Description={item.Description}
                  
                  />
                  <TouchableOpacity style={{ alignContent: 'center', backgroundColor: '#357bdd', width: '100%', marginVertical: 10, paddingVertical: 12 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>View Product</Text>
                  </TouchableOpacity>
                </View>
              ))
            }



          </Card>





        </Content>

      </Container>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c'
  }
});


