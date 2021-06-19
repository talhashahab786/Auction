import React, {Component} from 'react';

export default class Routes extends Component
{
    render(){
        return(
<Router>
    <Stack key="root">
    <Scene key="login" component={Login} title="Login" />
    <Scene key="SignUp" component={SignUp} />
    <Scene key="ProductsPage" component={ProductsPage} />
    <Scene key="Registration" component={Registration} />
    <Scene key="swipper" component={swipper} />

   
    </Stack>
</Router>
        )
    }

}