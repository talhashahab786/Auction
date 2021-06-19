import React, { Component } from 'react';
import {TouchableOpacity,View,Text} from 'react-native';
import {Card,CardItem,Right, Left, Thumbnail,Title,Subtitle} from 'native-base'

export default class bidProduct extends Component {

  
  render() {
        return (
      <Card >
        <CardItem>
            
             <Left>
                <View style={{alignItems:'flex-start',top:-10,margin:5}}>
                  <Text  style={{fontSize:18,color:'black',fontWeight:'800'}}>UserName</Text>
                </View>
              </Left> 

                 <View style={{alignItems:'flex-start',top:-10,margin:5}}>
                  <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>CellNumber</Text>
                </View>

              <Right>
                <View style={{alignItems:'flex-end',top:-10}}>
                  <Text style={{fontSize:18,color:'black',fontWeight:'600'}}>BidPrice</Text>                 
                 </View>
              </Right>
             </CardItem>
       </Card>
    );
  }
}


