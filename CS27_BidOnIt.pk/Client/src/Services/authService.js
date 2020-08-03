import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
  const user = jwtDecode(jwt);
  if (user.type === 'seller') {
    window.location = '/seller/dashboard';
  } else if (user.type === 'buyer') {
    window.location = '/buyer/dashboard';
  } else {
    window.location = '/admin/dashboard';
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    // console.log(jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}



export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function checkEmail(email){
  try{
   let res = await http.post(apiEndpoint+'/checkEmail', { email });
   console.log(res);
   if(res.status === 200){
     return res;
   }
  }catch (ex){
    return 'Email not Found';
  }

}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  checkEmail
};
