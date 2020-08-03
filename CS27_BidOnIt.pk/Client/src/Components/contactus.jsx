import React from 'react';
import '../Css/contactus.css';
import Joi from 'joi-browser';
import Form from './common/form';
import { saveUserMsg } from '../Services/commonService';

export default class Contactus extends Form {
  state = {
    data: { name: '', email: '', subject: '', message: '' },
    errors: {},
    messages: [],
    newMsg : {},
    successMsg : '',
  };

  schema = {
    name: Joi.string()
      .required()
      .label('Name'),
    email: Joi.string()
      .required()
      .label('Email'),
      subject: Joi.string()
      .required()
      .label('Subject'),
      message: Joi.string()
      .required()
      .label('Message'),
  };


  doSubmit = async () => {
    try {
      const { data } = this.state;
      let message = await saveUserMsg(data);
      console.log(message);
      if(message.status === 200){
        alert(message.data);
        window.location.reload();
      }

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };


  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div
            style={{
              background: "url('./images/contactus.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="col-lg-12 text-center contact-us"
          >
            <span className="display-4 text-white">
              <br />
              Drop Us a Message
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7 back">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13622.412668877641!2d74.20909984340821!3d31.397503851434216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ffd0bc7c5f71%3A0x879e9b82857bcd94!2sCOMSATS%20University%20Islamabad%2C%20Lahore%20Campus!5e0!3m2!1sen!2s!4v1574767247932!5m2!1sen!2s"
              width="100%"
              height="450px"
              frameBorder="0"
              title="myMap"
            ></iframe>
          </div>
          <div className="col-lg-5 back">
            <div className="col-lg-12 text-center">
              <h2 className="mt-2">Contact Us For Any Query</h2>
              
              <form onSubmit={this.handleSubmit}>
                <div className="form-label-group">
                  {this.renderInput('name', 'Name')}
                </div>
                <div className="form-label-group">
                  {this.renderInputEmail('email', 'Email')}
                </div>
                <div className="form-label-group">
                 {this.renderInput('subject', 'Subject')}
                </div>
                <div className="form-label-group">
                  {this.renderTextarea('message', 'Message')}
                </div>
                <div className="form-label-group">
                  {this.renderButton('Send Message')}
                </div> 
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
