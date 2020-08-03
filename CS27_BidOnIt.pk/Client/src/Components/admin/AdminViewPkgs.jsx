import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getPkgs, deletePkg, savePkg } from '../../Services/pakgService';
import {Button} from 'react-bootstrap'
export default class AdminViewPkgs extends Component {
  state = {
    Pkgs: [],
    newPkg : {},
    error : [],
    btnDisabled : true
};



componentDidMount() {
  this.getAllPkgs();
}

async getAllPkgs(){
  const { data } = await getPkgs();
  //console.log(data);
  this.setState({ Pkgs : data }); 
}

numberValid(event)
   {
      let inputtxt = event.target.value;
      var numbers = /^[0-9]+$/;
      var msg = '';
      var showMsg = false;
      var btnDisabled =false;
      if(inputtxt !== "" && !(inputtxt.match(numbers))){
        msg = "Invalid Value!";
        showMsg = true;
      }
      var error = this.state.error;
      error[event.target.name] = msg;
      error.showMsg = showMsg;
      //console.log(error);
      this.setState({
        error : error,
        btnDisabled : btnDisabled
      })
   }

handleChange(e){
  let pkg = this.state.newPkg;
  pkg[e.target.name] = e.target.value;
  this.setState({
    newPkg : pkg
  })
}

async saveNewPkg(){
  if(this.state.btnDisabled){
    return false;
  }
  let pkg = this.state.newPkg;
  pkg = await savePkg(pkg);
  this.getAllPkgs();
}

handleDelete = async (pkg, index) => {
  const originalPkgs = this.state.Pkgs;
  try {
    await deletePkg(pkg._id);
    originalPkgs.splice(index, 1);
    this.setState({ Pkgs : originalPkgs });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) //console.log('x');
    toast.error('This Product has already been deleted.');

    this.setState({ Pkgs: originalPkgs });
  }
};


 renderTableDataPkgs() {
    const { Pkgs } = this.state;
    return Pkgs.map((PkgDetail,index) =>{
        return (
          <tr key={index}>
             <td>{index+1}</td>
             <td>{PkgDetail.bids}</td>
             <td>{PkgDetail.price}</td>
             <td> 
                <Button variant="danger" type="button" onClick={() => this.handleDelete(PkgDetail, index)} className="UpdateButton">
                    Delete
                </Button>
            </td>
          </tr>            
       )
    })
 }
render() {
    const { Pkgs } = this.state;
    let error = this.state.error;
    return (
        <div className="container-fluid">
            <div className='row mr-auto'>
                <div className="col-12">
                    <div>
                    {Pkgs.length <= 0  && <div className="container mb-5">
                            <h4>Add New Package</h4>
                            <form>
                              <div className="row">
                                <div className="col-md-2">
                                  <label>No. of Bids</label>
                                  </div>
                                <div className="col-md-3">
                                  <input type="text" className="form-control" name="bids" onKeyUp={(event) =>{this.numberValid(event)}} onChange={(event) => {this.handleChange(event)}} />
                                  {error.bids !== undefined && error.showMsg === true &&
                                    <span style={{color : 'red'}}>{error.bids}</span>
                                  }
                                </div>
                                <div className="col-md-2">
                                  <label>Price</label>
                                  </div>
                                <div className="col-md-3">
                                  <input  type="text" className="form-control" name="price" onKeyUp={(event) =>{this.numberValid(event)}} onChange={(event) => {this.handleChange(event)}} />
                                  {error.bids !== undefined && error.showMsg === true &&
                                    <span style={{color : 'red'}}>{error.price}</span>
                                  }
                                </div>
                                <div className="col-md-2">
                                  <button type="button" className="btn btn-success" onClick={() => {this.saveNewPkg()}} >Save</button>
                                </div>
                              </div>
                              
                            </form>
                          </div>}
                        <h3>Package Data</h3>
                        <div className="table-responsive portlet">
                            <table  className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Sr#</th>
                                        <th>No. of Bids</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableDataPkgs()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
