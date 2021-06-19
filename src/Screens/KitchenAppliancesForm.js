import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TextInput,Image, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Picker, Form, Spinner } from "native-base";
const { width: WIDTH } = Dimensions.get('window');
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class KitchenAppliancesForm extends Component {
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
      category:"Electronics-Microwave",
      condSelected: "",
      description: "",
      title: "",
      startbid: "",
      prediction: "",
      model: "",
      image_uri:'',
      avatarSource: null,
      uploading:false,
      resolution: "",
      scrsize: "",
      brand: "",
      isVisible: false,
      chosenDate: "",
      userID: "",
      productID: "",
      bid: 0,
    };

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


  showPicker = () => {
    this.setState({
      isVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  }



  //WRITE TO DB
  writeUserData(
    title,
    brand,
    model,
    condSelected,
    startbid,
    description,
    prediction,
    chosenDate,
    productID,
    userID,
    bid,
    category,
    image_uri
  ) {
    if (this.state.cond === 1) {
      var uid = firebase.auth().currentUser.uid;
      userID = uid;
      firebase.database().ref('Users/' + userID + '/UserProducts/'+category+'/').push({
        title,
        brand,
        model,
        condSelected,
        startbid,
        description,
        prediction,
        chosenDate,
        productID,
        userID,
        bid,
        category,
        image_uri


      }).then((data) => {
        productID = data.key;
        //   firebase.database().ref('User/'+userID+'/UserProducts/MobilePhones/'+productID).update({
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref().child('Users').child(uid).child('UserProducts').child('KitchenAppliances').child(productID).update({
          productID
        });
      }).catch((error) => {
        console.log('error while uploading data to database: ', error)
      })
    }
  }





  render() {
    return (

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} >

<View style={styles.desStyle}>
             {this.imageView()}
         </View> 
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Title : </Text>
          <TextInput style={styles.inputBox}
            placeholder="Juicer Machines, Toasters .."
            placeHolderTextColor="black"
            value={this.state.title}
            onChangeText={title => this.setState({ title })} />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Brand: </Text>
          <TextInput style={styles.inputBox}
            placeholder="Samsung,Philips ..."
            placeHolderTextColor="black"
            value={this.state.brand}
            onChangeText={brand => this.setState({ brand })}
            multiline />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle} > Model: </Text>
          <TextInput style={styles.inputBox}
            placeholder="F8000"
            placeHolderTextColor="black"
            value={this.state.model}
            onChangeText={model => this.setState({ model })}
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
              <Picker.Item label="Select Any One" value="0" />
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


          <Text style={{ color: 'black', fontSize: 25 }}>
            {this.state.chosenDate}
          </Text>



          <TouchableOpacity style={styles.datebutton} onPress={this.showPicker}>
            <Text ><FontAwesome name="calendar" size={24} color={'white'} /></Text>
          </TouchableOpacity>
        </View>




        <TouchableOpacity
          onPress={() => {
            this.setState({ cond: 1 })
            this.writeUserData(
              this.state.title,
              this.state.brand,
              this.state.model,
              this.state.condSelected,
              this.state.startbid,
              this.state.description,
              this.state.prediction,
              this.state.chosenDate,
              this.state.productID,
              this.state.userID,
              this.state.bid,
              this.state.category,
              this.state.image_uri

            )
          }}
          style={{ alignContent: 'center', backgroundColor: '#303f9f', width: '90%', marginVertical: 10, paddingVertical: 12 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Post Add</Text>
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
  datebutton: {
    width: 250,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  },
  datetext: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',

  }



});
