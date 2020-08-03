import http from './httpService';
import { apiUrl } from '../config.json';

export function getCatagories() {
  return http.get(apiUrl + '/catagories');
}

export function saveCategory(form) {
  if(form._id !== undefined){
    var id = form._id
    delete form._id;
    return http.put(apiUrl + '/catagories/'+id, form);    
  }
  return http.post(apiUrl + '/catagories/', form);
}

export function delCategory(catId) {
  return http.delete(apiUrl + '/catagories/'+catId);
}
