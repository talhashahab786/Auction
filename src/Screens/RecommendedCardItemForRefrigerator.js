import React, { Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import {Card,CardItem,Right} from 'native-base'
import StarRating from 'react-native-star-rating'
export default class RecommendedCardItem extends Component {
  
  render() {
    return (
            <CardItem>
                <View>   
                    <Image style={{height:140,width:100}}
                    source={this.props.imageUri}
                    />
                    </View>
                    <Right style={{flex:1,alignItems:'flex-start',
                  height:160,paddingHorizontal:20}}>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Title  <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Title}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Brand <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Brand}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Model  <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Model}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Condition  <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Condition}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Type  <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.TypeSelected}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Starting Bid  <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.StartingBid}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Description <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>{this.props.Description}</Text></Text>
                     
                      <StarRating
disabled={true}
maxStars={5}
rating={this.props.rating}
starSize={20}
fullStarColor='orange'
emptyStarColor='orange'/>


                    </Right>


            </CardItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

 
});
