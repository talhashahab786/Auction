import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity, Platform, StatusBar, Image,ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Item, Input, CardItem, Card, Right,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import YourBiddedProduct from '../Screens/YourBiddedProducts'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {    
      items: [],
    mainscreenrender: 0,
    countrunHashir: 0,
    runHASHIRcode: 0,
    DataObjID: 0,
    keyID: 0,
    userIDfound:'',
    productIDfound:'',
    bid_name:[],
    UserName:"",
    CellNumber:"",


    



    image_uri:""
    ,
    BidderName:"",
    BidderCity:"",
    BidderEmail:"",
    BidderCellNumber:"",

    avatarSource: null,
    loading:false,
  
 
    
  }
}

    static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
    )
  }
  componentDidMount() {
 
    
  
  
  
  
  
  
  
  
  
  
  
      
//BIDDER DETAILS WORK
var postDataXX = [];
let DataObjXX = {};

var uidXX = firebase.auth().currentUser.uid;
var RefDataXX =firebase.database().ref('Users/'+uidXX+'/UserInformation/');

var my_counter = 1;

//CellNumber , City , UserName , Password , email
RefDataXX.once('value').then((snapshotXX) => {
          

 console.log('HERE - In snapshot which is   :  '+snapshotXX);

snapshotXX.forEach(childSnapshotXX => { 
 
  console.log('HERE - In the Childs of Snapshot [childsnapshotxx]'+childSnapshotXX);

  console.log('HERE - [Childsnapshot.val]  :  '+childSnapshotXX.val());

if(my_counter==1){
this.setState({BidderCellNumber:childSnapshotXX.val()});
}
else if(my_counter==2){
  this.setState({BidderCity:childSnapshotXX.val()});
  }
  else if(my_counter==3){
    //dont take password
  }

  else if(my_counter==4){
      this.setState({BidderName:childSnapshotXX.val()});
      }
      else if(my_counter==5){
        this.setState({BidderEmail:childSnapshotXX.val()});
        }
my_counter++;

          });
      
})
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














  //       <Image style={styles.profilepic} source={(this.state.image_uri=="")?(require('../images/userlogo.jpg')):({uri:this.state.image_uri})}/>
      

  render() {
    return (
      <Container>
     
     
      
         <ScrollView>
          <View >







           <Card >
                 <View style={styles.header}>
                 

          
          <View style={styles.profilepicWrap}>
            <Image style={styles.profilepic} source={require('../images/userlogo.jpg')}/>
          </View>

          </View>

          <View style={styles.bar}>
          <View style={[styles.baritem,styles.barseperator]}>
              <FontAwesome name="user" style={styles.bartop} /><Text>
              <Text style={styles.barbottom}>{this.state.BidderName}</Text></Text>
          </View>

          <View style={styles.baritem}>
              <MaterialCommunityIcons name="cellphone" style={styles.bartop}/><Text>
              <Text style={styles.barbottom}>{this.state.BidderCellNumber}</Text></Text>

          </View>
        </View>
                
                </Card>
           
          </View>
          <YourBiddedProduct/>
          </ScrollView>
      </Container>
      
    );
  }
}







const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:"#fff"
   },
   header:{

     alignItems:'center',
     justifyContent:'center',
     padding:20,
     backgroundColor:'rgba(0,0,0,0.5)',
 height:180,
   },
   profilepicWrap:{

     width:180,
     height:180,
     borderRadius:100,
     borderColor:'rgba(0,0,0,0.4)',
     borderWidth:16,
   },
   profilepic:{
     flex:1,
     width:null,
     alignSelf:'stretch',
     borderRadius:100,
     borderColor:'#000',
     borderWidth:4
   },
   bar:{
     backgroundColor:'#ec2e4a',
     flexDirection:'row'

   },
   barseperator:{
     borderRightWidth:4,
   },
   baritem:{
     flex:1,
     padding:18,
     alignItems:'center',
   },
   bartop:{
     color:'#fff',
     fontSize:25,
     fontWeight:'bold',
     fontStyle:'italic'
   },
   barbottom:{
     paddingTop:10,
color:'#000',
fontSize:14,
fontWeight:'bold',
   }
})

