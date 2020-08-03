import http from './httpService';
import { apiUrl } from '../config.json';
import { getCurrentUser } from './authService';
const apiEndpoint = apiUrl + '/users';

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    type: user.type
  });
}

export function getSellers() {
  return http.get(apiEndpoint+'/sellers');
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUserPacks() {
  return http.get(apiEndpoint+'/getUserPacks');
}

export function getUser() {
  let userid = getCurrentUser()._id;
  return http.get(apiEndpoint+'/'+userid);
}

export function updateUser(user) {
  let form = new FormData();
  //console.log(user);
  form.append('name', user.name);
  form.append('email', user.email);
  form.append('designation', user.designation);
  form.append('number', user.number);
  form.append('userImage', user.userImage);
  form.append('file', user.newImage);
  
  return http.put(apiEndpoint+'/updateUser/'+user._id, form);
}

export function changeUserStatus(users_id, form) {
  return http.put(apiEndpoint+'/changeUserStatus/'+users_id, form);
}

export function updatepassword(users_id, form) {
  return http.put(apiEndpoint+'/updatepassword/'+users_id, form);
}

export function rateSellerByBuyer(form){
  return http.post(apiEndpoint+'/rate_seller', form);
}
