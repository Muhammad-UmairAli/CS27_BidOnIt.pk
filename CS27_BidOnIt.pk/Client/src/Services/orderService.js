import http from './httpService';
import { apiUrl } from '../config.json';
import { getCurrentUser } from './authService';

const apiEndpoint = apiUrl + '/orders';

function orderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getOrders() {
  var user_id = getCurrentUser()._id;
  return http.get(apiEndpoint+'/'+user_id);
}

export function getCompletedOrders() {
  var user_id = getCurrentUser()._id;
  return http.get(apiEndpoint+'/getCompletedOrders/'+user_id);
}

export function getCompletedOrdersById() {
  var user_id = getCurrentUser()._id;
  return http.get(apiEndpoint+'/getCompletedOrdersById/'+user_id);
}

export function getOrder(orderId) {
  return http.get(orderUrl(orderId));
}

export function orderPurchaseByUser(orderDetail){
  //console.log(orderDetail);
  return http.post(apiEndpoint+'/purchseByUser', orderDetail);
}


