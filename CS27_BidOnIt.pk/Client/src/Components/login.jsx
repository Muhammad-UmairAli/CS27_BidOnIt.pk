import React from 'react';
import { Redirect } from 'react-router-dom';
import '../Css/login.css';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../Services/authService';
import * as userService from '../Services/userService';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { DropdownButton, Dropdown} from 'react-bootstrap';

export default class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
    user: {},
    showForGotPassword : false,
    showForgotForm : false,
    email : '',
    user_id_to_change : '',
    reset_password : '',
    showTypes : false
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };
  componentDidMount(){
    // Load the required SDK asynchronously for facebook
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    window.fbAsyncInit = function() {
        window.FB.init({
          appId      : 289860742053702 ,
          cookie     : true,  // enable cookies to allow the server to access the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use version 2.1
        });
    };
}
responseGoogle = async (response) => {
  console.log('Res',response.profileObj);
  let userProfile = response.profileObj;
  if(userProfile !== undefined){
    let user = userProfile;
    user.platform = "google";
    this.setState({ user : user }, function (){
      console.log(this.state.user);
    });
    let res =  await userService.checkUserByEmailForSocial(userProfile.email, 'google');
    console.log(res);
    
    if(res.status === 200){
      auth.loginWithJwt(res.headers['x-auth-token']);
      const resuser = auth.getCurrentUser();
      if (resuser.type === 'seller') {
        window.location = '/seller/dashboard';
      } else if (resuser.type === 'buyer') {
        window.location = '/buyer/dashboard';
      } else {
        window.location = '/admin/dashboard';
      }
    }else{
      console.log('in else');
      this.setState({
        showTypes : true,
        showForgotForm : true,
        showForGotPassword : true
      })
    }
  }else{
    toast.error('Something Went Wrong Please Try Again');
  }
}

handleDropdownChange = async (eventkey)  => {
  // const { data } = this.state;
  // data.type = eventkey;
  // this.setState({ data });
  
  try {
    console.log(this.state.user);
    let data = {
      username : this.state.user.email,
      name : this.state.user.name,
      password : '123456',
      type : eventkey,
      platform : this.state.user.platform
      
    }
    const response = await userService.register(data);
    auth.loginWithJwt(response.headers['x-auth-token']);
    const user = auth.getCurrentUser();
    if (user.type === 'seller') {
      window.location = '/seller/dashboard';
    } else if (user.type === 'buyer') {
      window.location = '/buyer/dashboard';
    } else {
      window.location = '/admin/dashboard';
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
};
 
facebookLogin = () => {
  /*window.FB.login(
      this.checkLoginState(), 
      { scope : 'email, public_profile' } //Add scope whatever you need about the facebook user
  ); */
  
  window.FB.login(
      function(resp){
          this.statusChangeCallback(resp);
      }.bind(this),{ scope : 'public_profile,email'});
}

checkLoginState() {
  alert("Checking Login Status")
  console.log( "Checking login status..........." );
  
  window.FB.getLoginStatus(function(response) {
      alert("FB Callback")
      console.log("----------->")
      console.log(response)
      this.statusChangeCallback(response);
  }.bind(this));
}

statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
      alert( "Connected to facebook. Retriving user from fb" );
      // Logged into your app and Facebook.
      this.fetchDataFacebook();
  } else if (response.status === 'not_authorized') {
      console.log('Import error', 'Authorize app to import data', 'error')
  } else {
      console.log('Import error', 'Error occured while importing data', 'error')
  }
}

fetchDataFacebook =  () => {
  let that = this;
  console.log('Welcome!  Fetching your information.... ');

  window.FB.api('/me?fields=email,name', async function(userProfile) {
      console.log( userProfile );
      console.log('Successful login from facebook : ' + userProfile.name);
      if(userProfile !== undefined){
        let user = userProfile;
        user.platform = "facebook";
        that.setState({ user : user }, function (){
          console.log(that.state.user);
        });
        let res =  await userService.checkUserByEmailForSocial(userProfile.email, 'facebook');
        console.log(res);
        
        if(res.status === 200){
          auth.loginWithJwt(res.headers['x-auth-token']);
          const resuser = auth.getCurrentUser();
          if (resuser.type === 'seller') {
            window.location = '/seller/dashboard';
          } else if (resuser.type === 'buyer') {
            window.location = '/buyer/dashboard';
          } else {
            window.location = '/admin/dashboard';
          }
        }else{
          console.log('in else');
          that.setState({
            showTypes : true,
            showForgotForm : true,
            showForGotPassword : true
          })
        }
      }else{
        toast.error('Something Went Wrong Please Try Again');
      }
      //alert( 'Successful login for: ' + user.name );
  });
}

onSignIn = googleUser => {
  this.toggleLoggedIn();

  let user = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;

  console.log('google user obj', user);
  console.log('google_id_token', id_token);
  // plus any other logic here
};



  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/seller';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  showForGotFields(){
    this.setState({
      showForGotPassword : this.state.showForGotPassword === true ? false : true 
    })
  }
  showForGotPassFields(){
    this.setState({
      showForgotForm : false,
      showForGotPassword : false
    })
  }
  handleChangeEmail(e){
    this.setState({
      email :  e.target.value
    })
  }
  handleForgotSubmit = async () => {
    let res = await auth.checkEmail(this.state.email);
    console.log(res);
    if(res.status === 200){
      this.setState({
        user_id_to_change : res.data._id,
        showForgotForm : true
      });
      console.log(this.state.user_id_to_change);
    }else{
      toast.error(res);
    }
    
  }
  handleChangePass(e){
    this.setState({
      reset_password :  e.target.value
    })
  }
  handleForgotPassSubmit = async () => {
    let res = await userService.updatepassword(this.state.user_id_to_change,this.state.reset_password);
    console.log(res);
    if(res.status === 200){
      toast.success('Password Changed!');
      this.setState({
        showForGotPassword : false,
        showForgotForm :  false
      });
    }else{
      toast.error('Something Went Wrong Please Try Again');
    }
    
  }
  handleSocialLogin = (user) => {
    console.log(user)
  }
   
 handleSocialLoginFailure = (err) => {
    console.error(err)
  }
 
   
  render() {
    
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div
            style={{
              background: "url('./images/login_cover.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
          ></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  {(!this.state.showForGotPassword && !this.state.showForgotForm && !this.state.showTypes) &&
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        {this.renderInput('username', 'Username')}
                      </div>
                      <div className="form-label-group">
                        {this.renderInput('password', 'Password', 'password')}
                      </div>
                      {this.renderButton('Sign in')}
                      <hr className="my-4" />
                      {/* <button
                        className="btn btn-lg btn-google btn-block text-uppercase"
                        type="submit" onClick={ () => this.googleLogin() }
                      >
                        <i className="fab fa-google mr-2"></i> Sign In with
                        Google
                      </button> */}
                      {/* <GoogleLogin
                          clientId="569827819202-0hnoaon44ki84dkmmel842485cjlq6on.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={this.responseGoogle()}
                          onFailure={this.responseGoogle()}
                          cookiePolicy={'single_host_origin'}
                        /> */}
                        <GoogleLogin
                          clientId="569827819202-0hnoaon44ki84dkmmel842485cjlq6on.apps.googleusercontent.com"
                          buttonText="Sign In with Google"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                          className="btn btn-lg btn-google btn-block text-uppercase"
                        />
                      <button
                        className="btn btn-lg btn-facebook btn-block text-uppercase"
                        type="button" onClick={ () => this.facebookLogin() }
                      >
                        <i className="fab fa-facebook mr-2"></i> Sign In with
                        FB
                      </button>
                      
                      <div className="text-center">
                        <a className="small" href="/#" onClick={() => this.showForGotFields()}>
                          Forgot password?
                        </a>
                      </div>
                    </form>
                  </div>
                  }
                  {/* Verify Email form For Password */}
                  {(this.state.showForGotPassword && !this.state.showForgotForm) &&
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Verify Your Email</h3>
                    <form>
                      <div className="form-label-group"> 
                        <input type="email" className="form-control" name="email" onChange={(event) => {this.handleChangeEmail(event)}}/>
                      </div>
                      <button type="button" className="btn btn-success" onClick={() => {this.handleForgotSubmit()}} >Save</button>
                      <hr className="my-4" />
                      <div className="text-center">
                        <a className="small" href="/#" onClick={() => this.showForGotFields()}>
                          Sign In
                        </a>
                      </div>
                    </form>
                  </div>
                  }
                  {/* Reset Password */}
                  {(this.state.showForgotForm && !this.state.showTypes) &&
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Reset Password</h3>
                    <form>
                      <div className="form-label-group">
                        <input type="password" className="form-control" name="password" onChange={(event) => {this.handleChangePass(event)}}/>
                      </div>
                      <button type="button" className="btn btn-success" onClick={() => {this.handleForgotPassSubmit()}} >Save</button>
                      <hr className="my-4" />
                      <div className="text-center">
                        <a className="small" href="/#" onClick={() => this.showForGotPassFields()}>
                          Sign In
                        </a>
                      </div>
                    </form>
                  </div>
                  }
                  {this.state.showTypes && 
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Select Your Type</h3>
                      <div className="form-label-group">
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Register As"
                          variant="warning"
                        >
                          <Dropdown.Item
                            onSelect={this.handleDropdownChange}
                            eventKey="seller"
                          >
                            Seller
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={this.handleDropdownChange}
                            eventKey="buyer"
                          >
                            Buyer
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
