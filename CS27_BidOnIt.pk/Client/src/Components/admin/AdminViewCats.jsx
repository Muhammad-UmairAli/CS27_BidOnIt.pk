import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getCatagories, saveCategory, delCategory } from '../../Services/catagoryService';
import {Button} from 'react-bootstrap'
export default class AdminViewCats extends Component {
  state = {
    Cats: [],
    newCat : {},
    error : [],
    btnDisabled : true
};



componentDidMount() {
  this.getCatagories();
}

async getCatagories(){
  const { data } = await getCatagories();
  //console.log(data);
  this.setState({ Cats : data }); 
}

Valid(event)
   {
      let inputtxt = event.target.value;
      var msg = '';
      var showMsg = false;
      var btnDisabled =false;
      if(inputtxt === ""){
        msg = "Required!";
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
    let cat = this.state.newCat;
    cat[e.target.name] = e.target.value;
    this.setState({
      newCat : cat
    })
  }

async saveNewCat(){
  if(this.state.btnDisabled){
    return false;
  }
  let cat = this.state.newCat;
  cat = await saveCategory(cat);
  if(cat.data.error !== undefined){
    toast.error(cat.data.error.raw.message);
  }else{
    this.setState({
      newCat : {},
      error : [],
      btnDisabled : true
    })
    toast.success('Saved Successfully!');
  }
  this.getCatagories();
}

handleEdit = async (cat, index) => {
  this.setState({
    newCat : cat,
    error : [],
    btnDisabled : false
  })
};

handleDelete = async (cat, index) => {
  const originalCats = this.state.Cats;
  try {
    await delCategory(cat._id);
    originalCats.splice(index, 1);
    this.setState({ Cats : originalCats });
    toast.success('Deleted Successfully!');
  } catch (ex) {
    if (ex.response && ex.response.status === 404) //console.log('x');
    toast.error('This Product has already been deleted.');

    this.setState({ Cats: originalCats });
  }
};


 renderTableDataCats() {
    const { Cats } = this.state;
    return Cats.map((CatDetail,index) =>{
        return (
          <tr key={index}>
             <td>{index+1}</td>
             <td>{CatDetail.name}</td>
             <td> 
                <Button variant="primary" type="button" onClick={() => this.handleEdit(CatDetail, index)} className="UpdateButton">
                    Edit
                </Button>
                <Button variant="danger" type="button" onClick={() => this.handleDelete(CatDetail, index)} className="UpdateButton">
                    Delete
                </Button>
            </td>
          </tr>            
       )
    })
 }
render() {
    let error = this.state.error;
    return (
        <div className="container-fluid">
            <div className='row mr-auto'>
                <div className="col-12">
                    <div>
                    {<div className="container mb-5">
                            <h4>Add New Category</h4>
                            <form>
                              <div className="row">
                                <div className="col-md-2">
                                  <label>Category Name</label>
                                  </div>
                                <div className="col-md-3">
                                  <input type="text" className="form-control" name="name" value={this.state.newCat.name === undefined || this.state.newCat.name == null ? '' : this.state.newCat.name} onKeyUp={(event) =>{this.Valid(event)}} onChange={(event) => {this.handleChange(event)}} />
                                  {error.name !== undefined && error.showMsg === true &&
                                    <span style={{color : 'red'}}>{error.name}</span>
                                  }
                                </div>
                                <div className="col-md-2">
                                  <button type="button" className="btn btn-success" onClick={() => {this.saveNewCat()}} >Save</button>
                                </div>
                              </div>
                              
                            </form>
                          </div>}
                        <h3>Categories Data</h3>
                        <div className="table-responsive portlet">
                            <table  className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Sr#</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableDataCats()}
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
