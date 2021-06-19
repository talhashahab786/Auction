import React, { Component } from "react";
import {View, Text, Dimensions, StyleSheet, TextInput,TouchableOpacity,ToastAndroid,Image} from "react-native";
import {  Picker, Form, Spinner} from "native-base";
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
const { width: WIDTH } = Dimensions.get('window');
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class Houses extends Component {
  static navigationOptions = {
    header: null
  }
  
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
      location: "",
      areasq: "",
      floor: "",
      beds: "",
      bath: "",
      city: "",
      title: "",
      startbid: "",
      category: "House",
      image_uri:'',
      avatarSource: null,
      uploading:false,
      prediction: "",
      citySelected: "",
      description: "",
      chosenDate:"",
      isVisible: false,
      userID:"",
      productID:"",
      bid:0,
    };
  }
  
  
  //WRITE TO DB
  writeUserData(
    location,
            areasq,
            floor,
            beds,
            bath,
            city,
           title,
           startbid,
            category,
            prediction,
            citySelected,
            description,
            chosenDate,
            productID,
            userID,
            bid,
            image_uri
  ) {
    if (this.state.cond === 1) {
      var uid = firebase.auth().currentUser.uid;
userID=uid;
      firebase.database().ref('Users/'+userID+'/UserProducts/Properties').push({
        location,
        areasq,
        floor,
        beds,
        bath,
        city,
       title,
       startbid,
        category,
        prediction,
        citySelected,
        description,
        chosenDate,
        productID,
        userID,
        bid,
        image_uri
      }).then((data)=>{
        productID=data.key;
        //   firebase.database().ref('User/'+userID+'/UserProducts/MobilePhones/'+productID).update({
         var uid = firebase.auth().currentUser.uid;
         firebase.database().ref().child('Users').child(uid).child('UserProducts').child('Properties').child(productID).update({
        productID
        });
      }).catch((error) => {
        console.log('error while uploading data to database: ', error)
      })
    }
  }


  imageView() {
    
    if(this.state.avatarSource == null)
    {
        return(
             
              <TouchableOpacity onPress={this.uploadImage} style={{justifyContent: 'center',alignContent: 'center',alignItems:'center',backgroundColor: 'blue', margin:10, padding:10,height:40,width:WIDTH-200}}>
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

//var uniqueUID = uuidv1();

  //    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
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



  onCityChange(value) {
    this.setState({
      citySelected: value,
      city: value
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


  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginBottom: 100 }} >
       
       <View style={styles.desStyle}>
             {this.imageView()}
         </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Title : </Text>
          <TextInput style={styles.inputBox}
            placeholder="Enter Title"
            placeHolderTextColor="black"
            value={this.state.title}
            onChangeText={title => this.setState({ title })} />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Location : </Text>
          <TextInput style={styles.inputBox}
            placeholder="Nazimabad"
            placeHolderTextColor="black"
            value={this.state.location}
            onChangeText={location => this.setState({ location })}
            multiline />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}> City : </Text>
          <Form style={{ width: 120 }}>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.city}
              onValueChange={this.onCityChange.bind(this)}
            >
            <Picker.Item label="Select Any One" value="Karachi" />
              <Picker.Item label="Karachi" value="Karachi" />
              <Picker.Item label="Islamabad" value="Islamabad" />
              <Picker.Item label="Lahore" value="Lahore" />
              <Picker.Item label="Faisalabad" value="Faisalabad" />
              <Picker.Item label="Multan" value="Multan" />
              <Picker.Item label="Peshawar" value="Peshawar" />
              <Picker.Item label="Quetta" value="Quetta" />
              <Picker.Item label="Sialkot" value="Sialkot" />
              <Picker.Item label="Sukkur" value="Sukkur" />
              <Picker.Item label="Hyderabad" value="Hyderabad" />
              <Picker.Item label="Rawalpindi" value="Rawalpindi" />
            </Picker>
          </Form>

        </View>


        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Area(SQ.FT) : </Text>
          <TextInput style={styles.inputBox}
            placeholder="150"
            placeHolderTextColor="black"
            value={this.state.areasq}
            onChangeText={areasq => this.setState({ areasq })}
            multiline />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Floors : </Text>
          <TextInput style={styles.inputBox}
            placeholder="1"
            placeHolderTextColor="black"
            value={this.state.floor}
            onChangeText={floor => this.setState({ floor })}
            multiline />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Beds : </Text>
          <TextInput style={styles.inputBox}
            placeholder="3"
            placeHolderTextColor="black"
            value={this.state.beds}
            onChangeText={beds => this.setState({ beds })}
            multiline />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Bath : </Text>
          <TextInput style={styles.inputBox}
            placeholder="2"
            placeHolderTextColor="black"
            value={this.state.bath}
            onChangeText={bath => this.setState({ bath })}
            multiline />
        </View>


        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Start Bid : </Text>
          <TextInput style={styles.inputBox}
            placeholder="Enter Starting Bid"
            placeHolderTextColor="black"
            value={this.state.startbid}
            onChangeText={startbid => this.setState({ startbid })}
            multiline />
        </View>

        <View style={styles.descStyle}>
          <Text style={styles.textStyle} > Description : </Text>
          <TextInput style={styles.descinputBox}
            underlineColorAndroid='transparent'
            placeholder="Enter Description"
            placeHolderTextColor="black"
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
         onPress={() => {
          this.setState({ cond: 1 })
          this.writeUserData(
            this.state.location,
            this.state.areasq,
            this.state.floor,
            this.state.beds,
            this.state.bath,
            this.state.city,
            this.state.title,
            this.state.startbid,
            this.state.category,
            this.state.prediction,
            this.state.citySelected,
            this.state.description,
            this.state.chosenDate,
            this.state.productID,
            this.state.userID,
            this.state.bid,
            this.state.image_uri

            
          )
        }}
       
style={{alignContent:'center', backgroundColor:'#303f9f',width:'90%',marginVertical:10,paddingVertical:12 }}>
              <Text style={{fontSize:25, fontWeight:'bold', color:'white',textAlign:'center'}}>Post Add</Text>
</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  inputBox: {
    width: 180,
    backgroundColor: '#ffffff',
    fontSize: 22,
    color: 'black'
  },
  textStyle: {
    paddingTop: 10,
    paddingBottom: 12,
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
    width: WIDTH - 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8, marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white'
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
  descStyle: {
    //flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    height: 200,
    width: WIDTH - 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    elevation: 6, marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white'

  },
  descinputBox: {
    paddingBottom: 6,
    paddingTop: 2,
    height: 100,
    width: WIDTH - 40,
    backgroundColor: '#ffffff',
    fontSize: 22,
    color: 'black'
  },
  item: {
    marginTop: 10,
    width: 250,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  logo: {
    fontSize: 52,
    textAlign: 'center',
    color: '#2980b9',
    fontFamily: 'Lobster-Regular'
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 80,
    fontSize: 16
  },
  button: {
    height: 40,
    marginTop: 20,
    marginBottom: 100,
    flex: 1,
    backgroundColor: '#2980b9'
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
