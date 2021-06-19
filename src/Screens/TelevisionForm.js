import React, { Component } from "react";
import { View, Text,Dimensions,StyleSheet,TextInput, TouchableOpacity} from "react-native";
import { Container, Header, Content, Picker, Form } from "native-base";
import firebase from 'firebase';
import axios from 'axios'
const {width: WIDTH }=  Dimensions.get('window');
const serverUrl = 'http://192.168.43.103:5000';
const http = axios.create({baseURL :serverUrl});
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class TelevisionForm extends Component {

    componentDidMount() {
        var postData = [];
        var RefData = firebase.database().ref('User/');
        RefData.once('value').then((snapshot) => {
          snapshot.forEach(childSnapshot => {
                this.setState( 
                    {                PostID: childSnapshot.key
                    }
                  )
          });
          
    
        });
      }

    constructor(props) {
        super(props);
        this.state = {
          category:"Electronics-Television",  
          condSelected: "",
          description: "",
          title: "",
          startbid: "",
          prediction: "",
          model: "",
          resolution: "",
          scrsize: "",
          brand: "",
          PostID:"",
          Suggested_Price:"",
          adPredict:"",
          chosenDate:"",
          isVisible: false,
          userID:"",
          productID:"",

        };
      }

      onCondChange(value) {
        this.setState({
          condSelected: value,
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
    scrsize,
    resolution,
    condSelected,
    startbid,
    Suggested_Price,
    prediction,
    description,
    adPredict,
    productID,
    chosenDate,
    category,

){   
    if(this.state.cond===1){
    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/'+userID+'/UserProducts/'+category+'/').push({   
        userID,        
        title,
        brand,
        model,
        scrsize,
        resolution,
        condSelected,
        startbid,
        Suggested_Price,
        prediction,
        description,
        adPredict,
        productID,
        chosenDate,
        category,
     
  }).then((data)=>{
    productID=data.key;
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/'+uid+'/UserProducts/Television/'+productID).update({
        productID
    });
       
    }).catch((error)=>{
        //error callback
        console.log('error while uploading data to database: ' , error)
    })
}
}
SuggestedPrice()
{
    const{model,condSelected,scrsize} = this.state;
    if(condSelected !=null && scrsize!=null && model !=null)
    {
      http.post('/television',{model,condSelected,scrsize}).then(response => this.setState ({Suggested_Price:response.data}));
    
      
    }
  }
  fakeAdPredict()
  {
    const{description} = this.state;
    if(description !=null)
    {
      http.post('/fakeAdPredict',{description}).then(response => this.setState ({adPredict:response.data}));
    
      
    }

  }  




 render() {
        return (
        
        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white'}} >
            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Title : </Text>
                    <TextInput style={styles.inputBox} 
                     placeholder="LCD, LED" 
                     placeHolderTextColor= "black"
                     value={this.state.title}
                     onChangeText={title => this.setState({ title })} />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Brand: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Samsung,LG" 
                    placeHolderTextColor= "black"
                    value={this.state.brand}
                    onChangeText={brand => this.setState({ brand })}
                    multiline />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Model: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="LG22-1" 
                    placeHolderTextColor= "black"
                    value={this.state.model}
                    onChangeText={model => this.setState({ model })}
                    multiline />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Screen(Inc) : </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder=" 46" 
                    placeHolderTextColor= "black"
                    value={this.state.scrsize}
                    onChangeText={scrsize => this.setState({ scrsize })}
                    multiline />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Resolution: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="1080px" 
                    placeHolderTextColor= "black"
                    value={this.state.resolution}
                    onChangeText={resolution => this.setState({ resolution })}
                    multiline />   
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
                    onChangeText={(startbid) => {this.setState({ startbid });this.SuggestedPrice();}}
                    multiline />   
            </View>

            <View style={styles.descStyle}>
               <Text style={styles.textStyle} > Description : </Text>
                   <TextInput style={styles.descinputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Enter Description" 
                    placeHolderTextColor= "black"
                    value={this.state.description}
                    onChangeText={(description) => {this.setState({ description });this.fakeAdPredict();}}
                    multiline />   
            </View> 
			
			
			  <View style={styles.viewStyle}>
               <Text style={styles.textStyle} >Suggested : </Text>
                   <Text style={styles.inputBox}>{this.state.Suggested_Price}</Text>

            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} >adType : </Text>
                   <Text style={styles.inputBox}>{this.state.adPredict}</Text>

            </View>

            <View style={styles.viewStyle}>

        <DateTimePicker
         isVisible={this.state.isVisible}
         onConfirm={this.handlePicker}
         onCancel={this.hidePicker}
         mode={'datetime'}
         is24Hour={false}/>
        
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
          this.state.scrsize,
          this.state.resolution,
          this.state.condSelected,   
          this.state.startbid,
          this.state.Suggested_Price,
          this.state.prediction,
          this.state.description,
          this.state.adPredict,
          this.state.chosenDate,
          this.state.productID,
          this.state.userID,
          this.state.category,  
          
)}}
style={{alignContent:'center', backgroundColor:'#303f9f',width:'90%',marginVertical:10,paddingVertical:12 }}>
              <Text style={{fontSize:25, fontWeight:'bold', color:'white',textAlign:'center'}}>Post Add</Text>
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
