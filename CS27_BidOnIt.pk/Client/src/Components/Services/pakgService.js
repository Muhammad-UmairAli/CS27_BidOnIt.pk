import http from './httpService';
import { apiUrl } from '../config.json';
import { getCurrentUser } from './authService';

const apiEndpoint = apiUrl + '/pkgs';

function pkgUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPkgs() {
  return http.get(apiEndpoint);
}

export function getMyPkgs() {
  var user = getCurrentUser();
  return http.get(apiEndpoint+'/getMyPkgs/'+user._id);
}

export function getPkg(pkgId) {
  return http.get(pkgUrl(pkgId));
}

export function savePkg(pkg) {
  //console.log(pkg);//return false;
  if (pkg._id) {
    const body = { ...pkg };
    delete body._id;
    return http.put(pkgUrl(pkg._id), pkg);
  }
  return http.post(apiEndpoint, pkg);
}

export function deletePkg(pkgId) {
  return http.delete(pkgUrl(pkgId));
}


export function pkgPurchaseByUser(pkgDetail){
  //console.log(pkgDetail);
  return http.post(apiEndpoint+'/purchseByUser', pkgDetail);
}
