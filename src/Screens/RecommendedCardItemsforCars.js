import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import {Card,CardItem,Right,Left, Thumbnail} from 'native-base'
import StarRating from 'react-native-star-rating'
export default class RecommendedCardItem extends Component {

  render() {
    return (
      <Card>
       
            <CardItem button onPress={() => alert('hi')}>
            <Left>
                <Thumbnail  source={require('../images/s9.jpg')} style={{width:80,height:60,borderRadius:10}} />
                <View style={{alignItems:'flex-start',top:-10,margin:5}}>
                  <Text  style={{fontSize:16,color:'blue',fontWeight:'800'}}>{this.props.Title}</Text>
                  <Text style={{fontSize:16,color:'black',fontWeight:'600'}}>{this.props.Brand}</Text>
                </View>
              </Left> 
                    
                 
              <Right>
                <View style={{alignItems:'flex-end',top:-10}}>
                  <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>{this.props.StartingBid}</Text>
                  <Text style={{fontSize:16,color:'black',fontWeight:'600'}}>{this.props.ChosenDate}</Text>
                 

                 </View>
              </Right>


            </CardItem>
            </Card>
    );
  }
}

