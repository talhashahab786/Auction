import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Router, Scene} from 'react-native-router-flux'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import Registration from '../Screens/Registration'
import ProductsPage from '../Screens/ProductsPage'

import swipper from '../Screens/swipper'

export default class AddProduct extends Component {
  static navigationOptions = {
    drawerIcon:({ tintColor })=>( <Ionicons name="md-cloud-upload" style={{fontSize:26, color: tintColor}}/>
    )
  }
  render() {
    return (
      <Router>
        <Scene key="root">
        
        <Scene 
          key="Login"
          component={Login}
          hideNavBar={true}
          initial
          />

          <Scene 
          key="SignUp"
          component={SignUp}
          hideNavBar={true}/>     
          

          <Scene 
          key="ProductsPage"
          component={ProductsPage}
          hideNavBar={true}

           
          />

          <Scene 
          key="Registration"
          component={Registration}
          hideNavBar={true}
          />

          <Scene 
          key="swipper"
          component={swipper}
          hideNavBar={true}
          />
           

          


           
         



        </Scene>
      </Router>
    );
  }

}


    


