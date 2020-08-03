import http from './httpService';
import { apiUrl } from '../config.json';
import { getCurrentUser } from './authService';

const apiEndpoint = apiUrl + '/products';

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getMyProducts() {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/byadmin/'+user._id);
}

export function getMySellerProducts() {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/byseller/'+user._id);
}

export function getLiveProducts() {
  return http.get(apiEndpoint+'/liveproducts');
}

export function liveproductsByUser() {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/liveproductsByUser/'+user._id);
}

export function getFinishdProducts() {
  return http.get(apiEndpoint+'/finshdproducts');
}



export function getprodMaxBid() {
  return http.get(apiEndpoint+'/prodMaxBid');
}

export function getProductsByfilter(type) {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/getProductsByfilter/'+type+'/'+user.type+'/'+user._id);
}

export function getBiddingsByfilter(type) {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/getBiddingsByfilter/'+type+'/'+user.type+'/'+user._id);
}

export function getActiveProducts() {
  return http.get(apiEndpoint+'/active');
}

export function getSellerProducts() {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/seller/'+user._id);
}

export function getProduct(productId) {
  return http.get(productUrl(productId));
}

export function getProductAndSeller(productId) {
  return http.get(apiEndpoint+'/productandseller/'+productId);
}

export function saveProduct(product) {
  let d = product.schedule;
  product.schedule = d.getTime();
  //let dateobj = new Date(product.schedule); 
  //console.log(dateobj, product);return false;
  var form = new FormData();
  form.append('title', product.title);
  form.append('catagoryId', product.catagoryId);
  form.append('description', product.description);
  form.append('timer', product.timer);
  form.append('scheduleChk', product.scheduleChk);
  form.append('schedule', product.schedule);
  form.append('price', product.price);
  for (let index = 0; index < product.imageUrl.length; index++) {
    form.append('file[]', product.imageUrl[index]);
  }
  
  if(product.imagePath !== ""){
    form.append('imagePath', product.imagePath);
  }
  if(product.otherImagesPath.length > 0){
    for (let index = 0; index < product.otherImagesPath.length; index++) {
      form.append('otherImagesPath[]', product.otherImagesPath[index]);
    } 
  }
  form.append('added_by', product.added_by);
  form.append('status', product.status);
  form.append('active_status', product.active_status);
  console.log(form);
  if (product._id) {
    
    const body = { ...product };
    delete body._id;
    return http.put(productUrl(product._id), form);
  }


  return http.post(apiEndpoint, form);
}

export function saveProductBid(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(apiEndpoint+'/saveProductBid/'+product._id, body);
  }

  return http.post(apiEndpoint, product);
}

export function deleteProduct(productId) {
  return http.delete(productUrl(productId));
}

export function approveProduct(product) {
  const body = { ...product };
  delete body._id;
  return http.put(apiEndpoint+'/approveProduct/'+product._id, body);
}
