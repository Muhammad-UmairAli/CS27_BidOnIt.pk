import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap';
import '../../Css/SellerProfile.css'
import { updateUser, getUser, updatepassword } from '../../Services/userService';
import { imageUrl } from '../../config.json';
export default class AdminProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            form : {},
            passForm : {},
            file: null,
            errors: {
                showError : true
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePassForm = this.handleChangePassForm.bind(this)
        this.updateProfile= this.updateProfile.bind(this)
        this.validPass= this.validPass.bind(this)
        this.updatePassword= this.updatePassword.bind(this)
      }

     async componentDidMount(){
          let user = await getUser();
          //console.log(user);
          this.setState({
              form : user.data
          })
      }

      handleChange(event) {
          let form = this.state.form;
          if(event.target.name !== "userImage"){
            form[event.target.name] = event.target.value;
          }else{
            form['newImage'] = event.target.files[0];
          }
          
        this.setState({
          form : form
        })
      }

      validPass(e){
          var passForm = this.state.passForm;
          let errors = this.state.errors;
          let showError = false;
          let msg = '';
          if(e.target.name === 'old_password' && e.target.value === ""){
            showError = true;
            msg = "Old Password is required!";
          }else if(e.target.name === 'password' && e.target.value === ""){
            showError = true;
            msg = "Password is required!";
          }else if(e.target.name === 'conf_password' && e.target.value === ""){
            showError = true;
            msg = "Confirm Password is required!";
          }else if(passForm.password !== passForm.conf_password){
            showError = true;
            msg = "Passwords do no match!";
          }
          errors['showError'] = showError;
          errors[e.target.name] = msg;
          
          this.setState({
            errors : errors
          })
      }

      handleChangePassForm(event) {
        let form = this.state.passForm;
        form[event.target.name] = event.target.value;
        this.setState({
            passForm : form
        })
    }

      async updateProfile(){
          let user = this.state.form;
          let upuser = await updateUser(user);
          this.setState({
            form : upuser.data.resp
          })
          localStorage.setItem('token', upuser.data.token);
          setTimeout(() => {
            window.location.reload();    
          }, 1000);
        }
        
        async updatePassword(){
            if((this.state.errors.showError === true || this.state.passForm.old_password === "" || this.state.passForm.password === "" || this.state.passForm.conf_password === ""|| this.state.passForm.old_password === undefined || this.state.passForm.password === undefined || this.state.passForm.conf_password === undefined)){
                return false;
            }
          let form = this.state.passForm;
          let user_id = this.state.form._id;
          let upuser = await updatepassword(user_id, form);
          //console.log(upuser);
          let msg = 'Password Changed Successfully!';
          if(upuser.data.erormsg !== undefined){
              msg = upuser.data.erormsg;
          }
        this.setState({
            passForm : {},
            errors : {
                showError : true
            },
            changePassMsg : msg
        })
        }

    render() {
        //console.log('sfsfd');
        return (
            <div>
                <div className='row'>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 profile">
                        <Form className="col" >
                            <Form.Group>
                                <Form.Text className="titleform">
                                    Profile Information  
                                </Form.Text>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Mian Afnan"
                                    value = {this.state.form.name}
                                    name="name" onChange={this.handleChange}
                                />
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Manager"
                                    value = {this.state.form.designation}
                                    name="designation" onChange={this.handleChange}
                                />
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value = {this.state.form.email} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Phone Number (format: 000-0000-000):</Form.Label>
                                <Form.Control type="tel" pattern="^\d{3}-\d{4}-\d{3}$" name="number" value = {this.state.form.number} onChange={this.handleChange} required  />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <img src={this.state.form.userImage ? imageUrl+this.state.form.userImage : ''} height="130px" width="150px" className="updateImage" alt="Please Upload"></img>
                                <input type="file" name="userImage" onChange={this.handleChange}/>
                                <Form.Group>
                                <Button variant="success" type="button" className="UpdateButton" onClick={this.updateProfile}>
                                Update !
                                </Button>
                                </Form.Group>
                        </Form>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 profiletwo">
                        <Form>
                        <Form.Text className="titleform">
                                   Change Password  
                        </Form.Text>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" value={this.state.passForm.old_password !== undefined ? this.state.passForm.old_password : '' } name="old_password" placeholder="Password" onBlur={this.validPass} onChange={this.handleChangePassForm} />
                            {this.state.errors.showError === true &&
                                <span style={{color : 'red'}}>{this.state.errors.old_password}</span>
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={this.state.passForm.password !== undefined ? this.state.passForm.password : '' } name="password" placeholder="Password" onBlur={this.validPass} onChange={this.handleChangePassForm} />
                            {this.state.errors.showError === true &&
                                <span style={{color : 'red'}}>{this.state.errors.password}</span>
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={this.state.passForm.conf_password !== undefined ? this.state.passForm.conf_password : '' } name="conf_password" placeholder="Password" onBlur={this.validPass} onChange={this.handleChangePassForm} />
                            {this.state.errors.showError === true &&
                                <span style={{color : 'red'}}>{this.state.errors.conf_password}</span>
                            }
                        </Form.Group>
                        <Button variant="success" type="button" onClick={this.updatePassword}>
                                Change Password
                        </Button>
                        {this.state.changePassMsg !== undefined &&
                            <span>&nbsp;{this.state.changePassMsg}</span>
                        }
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}