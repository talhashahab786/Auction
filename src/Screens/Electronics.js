import React, { Component } from "react";
import { View, Text,Dimensions,StyleSheet,TextInput, ScrollView} from "react-native";
import { Container, Header, Content, Picker, Form } from "native-base";
import KitchenAppliancesForm from './KitchenAppliancesForm';
import FridgeForm from './FridgeForm';
import TelevisionForm from './TelevisionForm';
import AirConditionerForm from './AirConditionerForm';
const {width: WIDTH }=  Dimensions.get('window');
export default class Electronics extends Component {
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
    if (this.state.category == 'Kitchen Appliances') {
          return (<KitchenAppliancesForm />);
    }
    else if (this.state.category == 'Television') {
          return (<TelevisionForm />);
    } 
    else if (this.state.category == 'Refrigrator') {
          return (<FridgeForm />);
    }
    else if (this.state.category == 'Air Conditioner') {
          return (<AirConditionerForm />);
    }  
}
  

  render() {
    return (
      <ScrollView>
    <View >
      <View style={styles.viewStyle}>
          <Text style={styles.textStyle}> Electronic Category : </Text>
          <Form style={{ width: 120 }}>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.categorySelected}
              onValueChange={this.onCategoryChange.bind(this)}
            >
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Kitchen Appliances" value="Kitchen Appliances" />
              <Picker.Item label="Television" value="Television" />
              <Picker.Item label="Refrigrator" value="Refrigrator" />
              <Picker.Item label="Air Conditioner" value="Air Conditioner" />
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