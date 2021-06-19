import React, { Component } from "react";
import { View, Text,Dimensions,StyleSheet,TextInput, ScrollView} from "react-native";
import { Container, Header, Content, Picker, Form } from "native-base";
import Mobile from './Mobile';
import Vehicle from './Vehicle';
import Houses from './Houses';
import Electronics from './Electronics';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger'])
//import { Vibration } from "./C:/Users/Dell/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-native";
const {width: WIDTH }=  Dimensions.get('window');
export default class PostAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: "",
      category: ""

    };
  }
  onCategoryChange(value) {
    this.setState({
      categorySelected: value,
      category: value
    });
  }

  selection() {
    if (this.state.category == 'Mobile Phones') {
          return (<Mobile />);
    }
    else if (this.state.category == 'Cars') {
          return (<Vehicle />);
    } 
    else if (this.state.category == 'Properties') {
      return (<Houses />);
    }
    else if (this.state.category == 'Electronics') {
        return (<Electronics />);
}
  }
  

  render() {
    return (
      <ScrollView>
    <View >
      <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Choose Category : </Text>
          <Form style={{ width: 120 }}>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.categorySelected}
              onValueChange={this.onCategoryChange.bind(this)}
            >
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Cars" value="Cars" />
              <Picker.Item label="Properties" value="Properties" />
              <Picker.Item label="Mobile Phones" value="Mobile Phones" />
            </Picker>
          </Form>
      </View>

      
      {this.selection()}
   </View>
   </ScrollView>
      
    );
  }
}

//<Text>{this.state.category} and {this.state.frontCond} and {this.state.backCond}</Text>

const styles = StyleSheet.create({
   
    inputBox:{
      width: 180,
      backgroundColor:'#ffffff',
      fontSize:22,
      color:'black'
    },
    textStyle: {
        paddingTop: 14,
        paddingBottom: 12 ,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 24, 
        fontWeight: 'bold'
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-start',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 8,marginVertical:6,
        paddingVertical:6,
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor:'white'
    },
    descStyle: {
        //flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-start',
        height: 200,
        width: WIDTH-10,
        backgroundColor: '#fff',
        borderRadius: 7,
        elevation: 6,marginVertical:6,
        paddingVertical:6,
        paddingHorizontal: 6,
        borderWidth:2,
        borderColor:'white'

    },
    descinputBox:{
        paddingBottom: 6,
        paddingTop: 2,
        height: 100,
        width: WIDTH-40,
        backgroundColor:'#ffffff',
        fontSize:22,
        color:'black'
      }
    
 
  
  });