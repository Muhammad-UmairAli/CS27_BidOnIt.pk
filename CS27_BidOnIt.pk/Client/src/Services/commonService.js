import http from './httpService';
import { getCurrentUser } from './authService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/common';
var user = getCurrentUser();

export function getAllDataCount() {
    return http.get(apiEndpoint+'/getDataCount/'+user._id);
}

export function getAllDataCountSeller() {
    return http.get(apiEndpoint+'/getDataCountBySeller/'+user._id);
}

export function getAllDataCountBuyer() {
    return http.get(apiEndpoint+'/getDataCountByBuyer/'+user._id);
}

export function deletePaymentMethodById(payment_id){
    var user_id = getCurrentUser()._id;
    var data = {
      user_id : user_id,
      payment_method_id : payment_id
    }
    return http.post(apiEndpoint+'/deletePaymentMethod', data);
}

export function saveUserMsg(msg){
    return http.post(apiEndpoint+'/saveUserMsg', msg);
}

export function getAllMsgs(){
    return http.get(apiEndpoint+'/getAllMsgs');
}

export function deleteAllMsgs(){
    return http.delete(apiEndpoint+'/deleteAllMsgs'); 
}