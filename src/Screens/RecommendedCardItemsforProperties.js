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
                  height:300,paddingHorizontal:20}}>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Title<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Title}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>City <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.City}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Location<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Location}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Area<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Area}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Floors<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Floors}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Beds<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Beds}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Bath<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Bath}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Description<Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.Description}</Text></Text>
                     <Text style={{fontSize:18,fontWeight:'bold',color:'blue'}}>Starting Bid<Text style={{marginBottom:30,fontSize:16,fontWeight:'bold',color:'black'}}>{this.props.StartingBid}</Text></Text>
                                          
                      <StarRating
                                  disabled={true}
                                  maxStars={5}
                                  rating={this.props.rating}
                                  starSize={20}
                                  fullStarColor='orange'
                                  emptyStarColor='orange'

                                  />


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
