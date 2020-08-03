import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Joi from 'joi-browser';
import Form from './common/form';
import '../Css/register.css';
import * as userService from '../Services/userService';
import auth from '../Services/authService';

export default class register extends Form {
  state = {
    data: { username: '', password: '', name: '', type: '', platform : 'website' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name'),
    type: Joi.string()
      .required()
      .label('Type'),
    platform: Joi.string()
      .label('Platform')
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      const user = auth.getCurrentUser();
      if (user.type === 'seller') {
        window.location = '/seller';
      } else if (user.type === 'buyer') {
        window.location = '/buyer';
      } else {
        window.location = '/admin';
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleDropdownChange = eventkey => {
    const { data } = this.state;
    data.type = eventkey;
    this.setState({ data });
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: "url('./images/register_back.jpg')",
          backgroundPosition: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: '1300px 900px'
        }}
        class="container-fluid"
      >
        <div class="row ">
          <div class="col-lg-10 col-xl-9 mx-auto">
            <div class="card card-signin flex-row my-5 set">
              <div
                style={{
                  background: "url('./images/register_side.png')",
                  backgroundSize: 'cover',
                  width: '45%'
                }}
                class="card-img-left d-none d-md-flex"
              ></div>
              <div class="card-body">
                <h5 class="card-title text-center">Register Now!!</h5>
                <form class="form-signin" onSubmit={this.handleSubmit}>
                  <div class="form-label-group">
                    {this.renderInput('name', 'Name')}
                  </div>

                  <div class="form-label-group">
                    {this.renderInput('username', 'Email')}
                  </div>
                  <div>
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
                  <hr />

                  <div class="form-label-group">
                    {this.renderInput('password', 'Password', 'password')}
                  </div>
                  {this.renderButton('Sign Up')}

                  <a class="d-block text-center mt-2 small" href="/login">
                    Sign In
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
