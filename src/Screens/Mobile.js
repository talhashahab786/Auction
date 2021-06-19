

import React, { Component } from "react";
import { Button,View, Text,Dimensions,StyleSheet,TextInput, ToastAndroid,ScrollView,TouchableOpacity, Image} from "react-native";
import { Container, Header, Content, Picker, Form,Spinner,Right } from "native-base";
import firebase from 'firebase';
import axios from 'axios'
import RNFetchBlob from 'react-native-fetch-blob';
const {width: WIDTH }=  Dimensions.get('window');
const serverUrl = 'http://192.168.43.65:5000';
const http = axios.create({baseURL :serverUrl});
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'

import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class Mobile extends Component {

  
    constructor(props) {
        super(props);
        this.state = {

    
          BidderUID:"",
          frontSelected: "",
          backSelected: "",
          frontCond: "",
          backCond: "",
          description: "",
          title: "",
          startbid: "",
          category: "Mobile",
          prediction: "",
          model: "",
          cond: "0",
          id:"",
          image_uri:'',
          avatarSource: null,
          loading:false,
          chosenDate:"",
          isVisible: false,
          productID:"",
          userID:"",
          idata:"",
          bid:0,
          bididArray:['','','','',''],
          bidnameArray:['','','','',''],
          bidbidArray:[0,0,0,0,0],
          totalbidsplaced:0,
          addposted:false
,
          intmemSelected:"",
          intmem:"",

          };  
    }

    uploadImage=()=>{

        const options ={
          title: '             Select Picture',
          chooseFromLibraryButtonTitle: 'Choose from Gallery',
          takePhotoButtonTitle: 'Take Photo',
          storageOptions: {
                 skipBackup: true,
                 path: 'images',
      },
        };
    
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            //const imgdata = response.data; 
            
            this.setState({
              avatarSource: source,  
              loading: true
            });

        //    this.fireUpload(source);

        this.fireUploadImage(response.uri, response.fileName)
        .then(url => { alert('uploaded'); console.log('UPLOAD DONE URL: '+url);this.setState({image_uri: url,loading:false}) })
        .catch(error => console.log("got error"+ error));
           

          }
        });
      }

      fireUploadImage(uri,name,mime = 'image/jpg') {
        return new Promise((resolve, reject) => {

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadUri = uri;
          let uploadBlob = null;
         console.log("fire");
          const imageRef = firebase.storage().ref('Images').child(name);
    
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              //console.log("fire1");
              return Blob.build(data, { type: '${mime};BASE64' })
            })
            .then((blob) => {
              uploadBlob = blob
              //console.log("fire2");
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
             // console.log("fire3");
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              resolve(url);
            })   
            .catch((error) => {
              reject(error);
          })
        })
      }


writeUserData(        
    frontSelected,
    backSelected,
    frontCond,
    backCond,
    description,
    title,
    startbid,
    category,
    prediction,
    model,
    chosenDate,
    productID,
    userID, 
    bid,
    bididArray,
    bidnameArray,
    bidbidArray  ,
    totalbidsplaced,
    BidderUID,
    image_uri,

    intmemSelected,
    internalmemory

){  if(this.state.cond===1&&this.state.loading==false&&this.state.addposted==false&&this.state.image_uri!=""){
  var uid = firebase.auth().currentUser.uid;
userID=uid;
this.setState({addposted:true});

var currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      

  firebase.database().ref('Users/'+uid+'/UserProducts/MobilePhones/').push({

        frontSelected,
        backSelected,
        frontCond,
        backCond,
        description,
        title,
        startbid,
        category,
        prediction,
        model,
        chosenDate,
        productID,
        userID, 
        bid,
        bididArray,
        bidnameArray,
        bidbidArray,
        totalbidsplaced,
        BidderUID,
        image_uri,
        currentDate,
        
    internalmemory
      
      }).then((data)=>{
    productID=data.key;
    ToastAndroid.showWithGravityAndOffset(
      'Add Posted',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,      
      50,
    );


     
    
    var uid = firebase.auth().currentUser.uid;
  firebase.database().ref().child('Users').child(uid).child('UserProducts').child('MobilePhones').child(productID).update({
 productID
    });
     console.log('data put in database: ' , data)
    }).catch((error)=>{
        console.log('error while uploading data to database: ' , error)
    })
}


else if(this.state.loading==true){

  ToastAndroid.showWithGravityAndOffset(
    'Image Not Uploaded Yet',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,      
    50,
  );

}



else if(this.state.addposted==true){

  
  ToastAndroid.showWithGravityAndOffset(
    '  Add has been posted already - Go to navigation drawer - [Swipe left from right corner] ',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,      
    50,
  );

}


}
imageView() {
    
        if(this.state.avatarSource == null)
        {
            return(
                 
                

              <TouchableOpacity onPress={this.uploadImage} style={{justifyContent: 'center',alignContent: 'center',alignItems:'center',backgroundColor: 'blue', margin:10, padding:10,height:40,width:WIDTH-200,marginHorizontal:'20%'}}>
              <Text style={{color:'#fff',alignItems:'center',fontSize:18}}>Upload Image</Text>
              </TouchableOpacity>
 
 
 );    
        }
        else if(this.state.avatarSource != null && this.state.loading == true){
          return(
                  <Spinner color='blue'/>
          );
        }
        else if(this.state.avatarSource != null && this.state.loading == false && this.state.image_uri != null){
      
            return(
           
                <Image source={{uri:this.state.image_uri}} style={{justifyContent: 'center',alignContent: 'center',alignItems:'center',height:190, width:WIDTH-20}} />
               
            );
        }
                  
        
}


readUserData() {
    firebase.database().ref().once('value', function (snapshot) {
        console.log(snapshot.val())
    });
}

onFrontChange(value) {
    this.setState({
      frontSelected: value,
      frontCond: value
    });
  }

  onBackChange(value) {
    this.setState({
      backSelected: value,
      backCond: value
    });
  }


  SuggestedPrice()
  {
      const{model,frontCond,backCond,intmem} = this.state;
      if(frontCond !=null && backCond!=null && intmem!=null && model !=null)
      {
        http.post('/',{model,backCond,frontCond,intmem}).then(response => this.setState ({Suggested_Price:response.data}));
      
        
      }
    }
    onIntMemoryChange(value) {
      this.setState({
        intmemSelected:value,  
        intmem: value
      }); 
}
  fakeAdPredict()
  {
    const{description} = this.state;
    if(description !=null)
    {
      http.post('/fakeAdPredict',{description}).then(response => this.setState ({adPredict:response.data}));
    
      
    }

  }  

  handlePicker = (datetime) => {
    this.setState({
        isVisible: false,
        chosenDate: moment(datetime).format('YYYY-MM-DD HH:mm:ss'),
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

  
     



    
 render() {
        return (
     



<View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white'}} >

         <View style={styles.descStyle}>
             {this.imageView()}
         </View>
         


         
         
         <View style={styles.viewStyle}>
            
              <Text style={styles.textStyle} > Title: </Text>
                    <TextInput style={styles.inputBox} 
                     placeholder="Enter Title" 
                     placeHolderTextColor= "black"
                     value={this.state.title}
                     onChangeText={title => this.setState({ title })
                     
                     } />  
                     {/* {this.writeUserData("4","5","6")}
                      {this.readUserData()}
                    */}
                   
        </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Model: </Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Galaxy S9" 
                    placeHolderTextColor= "black"
                    value={this.state.model}
                    onChangeText={model => this.setState({ model })}
                    multiline />   
            </View>

            <View style={styles.viewStyle}>
               <Text style={styles.textStyle}>Front Condition : </Text>
                    <Form style={{ width: 120 }}>
                        <Picker
                         note
                         mode="dropdown"
                         style={{ width: 120 }}
                         selectedValue={this.state.frontSelected}
                         onValueChange={this.onFrontChange.bind(this)}
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
            <Text style={styles.textStyle}>Back Condition : </Text>
            <Form style={{ width: 120 }}>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.backSelected}
                onValueChange={this.onBackChange.bind(this)}
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
            <Text style={styles.textStyle}>Internal Memory : </Text>
            <Form style={{ width: 120 }}>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.intmemSelected}
                onValueChange={this.onIntMemoryChange.bind(this)}
              >
                <Picker.Item label="32" value="32" />
                <Picker.Item label="64" value="64" />
                <Picker.Item label="128" value="128" />
                <Picker.Item label="256" value="256" />
                
              </Picker>
            </Form>
          
        </View>


            
            <View style={styles.viewStyle}>
               <Text style={styles.textStyle} > Start Bid:</Text>
                   <TextInput style={styles.inputBox} 
                    placeholder="Enter Start Bid" 
                    placeHolderTextColor= "black"
                    keyboardType='numeric'
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
                    is24Hour={false}
                />


                 <Text  style={{color:'black',fontSize:25}}>
                     {this.state.chosenDate}
                 </Text>
          
            

            <TouchableOpacity style={styles.datebutton} onPress={this.showPicker}>
                        <Text ><FontAwesome name="calendar"  size={24} color={'white'}/></Text>
            </TouchableOpacity>
            </View>



<TouchableOpacity onPress ={ () => {
     this.setState({cond:1})
     this.writeUserData(      
          this.state.frontSelected,
          this.state.backSelected,
          this.state.frontCond,
          this.state.backCond,
          this.state.description,
          this.state.title,
          this.state.startbid,
          this.state.category,
          this.state.prediction,
          this.state.model,
          this.state.chosenDate,
          this.state.productID,
          this.state.userID,
          this.state.bid,
          this.state.bididArray,
          this.state.bidnameArray,
          this.state.bidbidArray  ,
          this.state.totalbidsplaced   ,
          this.state.BidderUID ,
          this.state.image_uri,

          this.state.intmemSelected,
          this.state.intmem,
          

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
    desStyle: {
        //flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
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
    },

    
 
  
  });
