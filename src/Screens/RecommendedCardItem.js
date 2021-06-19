import React, { Component } from 'react';
import {TouchableOpacity,View,Text} from 'react-native';
import {Card,CardItem,Right, Left, Thumbnail,Title,Subtitle} from 'native-base'

export default class RecommendedCardItem extends Component {

  
  render() {
        return (
      <Card >
        <TouchableOpacity>
        <CardItem>
             <Left>
                <Thumbnail  source={require('../images/s9.jpg')} style={{width:80,height:60,borderRadius:10}} />
                <View style={{alignItems:'flex-start',top:-10,margin:5}}>
                  <Text  style={{fontSize:16,color:'blue',fontWeight:'800'}}>{this.props.Title}</Text>
                  <Text style={{fontSize:16,color:'black',fontWeight:'600'}}>{this.props.Model}</Text>
                </View>
              </Left> 
              <Right>
                <View style={{alignItems:'flex-end',top:-10}}>
                  <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>{this.props.StartingBid}</Text>
                  <Text style={{fontSize:16,color:'black',fontWeight:'600'}}>{this.props.ChosenDate}</Text>
                 

                 </View>
              </Right>
             </CardItem>
             </TouchableOpacity>
       </Card>
    );
  }
}


