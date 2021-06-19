import React, { Component } from "react";
import { View, Text,Dimensions,StyleSheet,TextInput, ScrollView,TouchableOpacity,ToastAndroid} from "react-native";
import { Picker, Form } from "native-base";
import firebase from 'firebase';
const {width: WIDTH }=  Dimensions.get('window');
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default class FridgeForm extends Component {
    componentDidMount() {
        var postData = [];
        var RefData = firebase.database().ref('User/');
        RefData.once('value').then((snapshot) => {
          snapshot.forEach(childSnapshot => {
                this.setState( 
                    {      
                        PostID: childSnapshot.key
                    }
                  )
          });
        });
      }


    constructor(props) {
        super(props);
        this.state = {
          condSelected: "",
          description: "",
          title: "",
          startbid: "",
          category: "Electronics",
          prediction: "",
          model: "",
          typeSelected: "",
          brand: "",
          PostID:"",
          isVisible: false,
          chosenDate:"",
          userID:"",
          productID:""
        };
        
    
        
      }

      onCondChange(value) {
        this.setState({
          condSelected: value,
        });
      }

  onTypeChange(value) {
    this.setState({
      typeSelected: value,
    });
  }
  
  handlePicker = (datetime) => {
    this.setState({
        isVisible: false,
        chosenDate: moment(datetime).format('MMMM, Do YYYY HH:mm'),
    })
}


showPicker=()=>{
    this.setState({
        isVisible:true
    })
}

hidePicker=()=>{
    this.setState({
        isVisible:false
    })
}



     
//WRITE TO DB
writeUserData(  
    userID,
    title,
    brand,
    model,
    condSelected,
    typeSelected,
    startbid,
    description,
    chosenDate,
    productID,
    
){   
    if(this.state.cond===1){
    firebase.database().ref('User/'+userID+'/UserProducts/Refrigerator/').push({
        userID,    
        title,
        brand,
        model,
        condSelected,
        typeSelected,
        startbid,
        description,
        chosenDate,
        productID,
  }).then((data)=>{
    productID=data.key;
    firebase.database().ref('User/'+userID+'/UserProducts/Refrigerator/'+productID).update({
        productID
    });
       
    }).catch((error)=>{
        //error callback
        console.log('error while uploading data to database: ' , error)
    })
}
}



 render() {
        return (
        
        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white'}} >
            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Title : </Text>
                    <TextInput style={styles.inputBox} 
                     placeholder="1,2 Door fridge" 
                     placeHolderTextColor= "black"
                     value={this.state.title}
                     onChangeText={title => this.setState({ title })} />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Brand: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Hitachi" 
                    placeHolderTextColor= "black"
                    value={this.state.brand}
                    onChangeText={brand => this.setState({ brand })}
                    multiline />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Model: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Gree G10" 
                    placeHolderTextColor= "black"
                    value={this.state.model}
                    onChangeText={model => this.setState({ model })}
                    multiline />   
            </View>

            
            <View style={styles.viewStyle}>
               <Text style={styles.textStyle}>Type : </Text>
                    <Form style={{ width: 120 }}>
                        <Picker
                         note
                         mode="dropdown"
                         style={{ width: 120 }}
                         selectedValue={this.state.typeSelected}
                         onValueChange={this.onTypeChange.bind(this)}
                        >
                <Picker.Item label="Frost" value="Frost" />
                <Picker.Item label="D-Frost" value="D-Frost" />
                      </Picker>
                   </Form>
          
           </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle}>Condition : </Text>
                    <Form style={{ width: 120 }}>
                        <Picker
                         note
                         mode="dropdown"
                         style={{ width: 120 }}
                         selectedValue={this.state.condSelected}
                         onValueChange={this.onCondChange.bind(this)}
                        >
                <Picker.Item label="0" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                      </Picker>
                   </Form>
          
           </View>

            
            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Start Bid : </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Enter Starting Bid" 
                    placeHolderTextColor= "black"
                    value={this.state.startbid}
                    onChangeText={startbid => this.setState({ startbid })}
                    multiline />   
            </View>

            <View style={styles.descStyle}>
               <Text style={styles.textStyle} > Description : </Text>
                   <TextInput style={styles.descinputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Enter Description" 
                    placeHolderTextColor= "black"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    multiline />   
            </View> 

            <View style={styles.viewStyle}>

<DateTimePicker
     isVisible={this.state.isVisible}
     onConfirm={this.handlePicker}
     onCancel={this.hidePicker}
     mode={'datetime'}
     is24Hour={false}
 />


  <Text  style={{color:'black',fontSize:25}}>
      {this.state.chosenDate}
  </Text>



<TouchableOpacity style={styles.datebutton} onPress={this.showPicker}>
         <Text ><FontAwesome name="calendar"  size={24} color={'white'}/></Text>
</TouchableOpacity>
</View>
            
            <TouchableOpacity 
onPress ={() => {
     this.setState({cond:1})
     this.writeUserData(
          this.state.PostID,       
          this.state.title,
          this.state.brand,
          this.state.model,
          this.state.condSelected,   
          this.state.typeSelected,
          this.state.startbid,
          this.state.description,
          this.state.chosenDate,
          this.state.productID,
          this.state.userID,   
)}} 
style={{alignContent:'center', backgroundColor:'#303f9f',width:'90%',marginVertical:10,paddingVertical:12 }}>
              <Text style={{fontSize:25, fontWeight:'bold', color:'white',textAlign:'center'}}
             >Post Add</Text>
</TouchableOpacity>

        </View>   
        
        );
    }
}

const styles = StyleSheet.create({
   
    inputBox:{
      width: 180,
      backgroundColor:'#ffffff',
      fontSize:22,
      color:'black'
    },
    textStyle: {
        paddingTop: 10,
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
        width: WIDTH-10,
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
      },
      datetext:{
        fontSize:18,
        color:'white',
        textAlign:'center',
        
     },
     datebutton:{
         position:'absolute',
         width:60,
         height:60,
         borderRadius:30,
         right:10,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'#303f9f'
     }
    
 
  
  });
