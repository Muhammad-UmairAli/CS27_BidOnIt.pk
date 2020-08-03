import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../Services/authService';
import { imageUrl } from './../config.json';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';
// require( 'datatables.net-responsive' )( window, $ );
const apiEndpoint = imageUrl;
export default class ProductsTable extends Component {
  dltcolumn = {
    key: 'delete',
    content: product => (
      product.status === 'Un-Sold' &&
      <button
        onClick={() => this.props.onDelete(product)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: product => (
        product.status === "Un-Sold" ? <Link to={`./products/${product._id}`}>{product.title}</Link> : product.title
      )
    },
    { path: 'catagory.name', label: 'Catagory' },
    { path: 'description', label: 'Description' },
    { path: 'timer', label: 'Timer' },
    { path: 'price', label: 'Price' },
    { path: 'bidAmount', label: 'Bid Amount' },
    { path: 'imageUrl', label: 'Image' ,
    content: product => ( 
    product.imageUrl ? <img alt="Hello" src={`./products/${product._id}`}></img> : <img src={product.imageUrl} alt="Hello"/>,
    <img
                src={apiEndpoint+product.imageUrl}
                className="viewProductsImage"
                alt="Hello"
                width="100"
                height="100"
    />
    ) 
  },
    { path: 'status', label: 'Status' ,
    content: product => (
      product.timer > 0 && product.status === "Sold" ? 'Un-Sold' : product.status 
    )  
    },
    { path: 'active_status', label: 'Approval Status',
      content: product => (
        getCurrentUser().type === 'admin' && (product.active_status === undefined || product.active_status === 0) ? <button onClick={() => this.props.onApprove(product)} className="btn btn-primary btn-sm">Approve</button> : product.active_status === 1 ? 'Approved' : 'Pending' 
      )  
   },
    
  ];
  state ={
    showData : false,
    newData : false
  }
  componentDidMount(){
    if(this.state.showData === false && this.props.products.length > 0 && this.props.products.length === this.renleng){
      this.setState({showData : true}, function(){
        $('#prodtable').DataTable({
          "dom": '<"top"lf>t<"bottom"p><"clear">',
          responsive: true
        });
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props);
    if(prevProps.dlt !== this.props.dlt){
      if(this.props.dlt === true){
        this.columns.push(this.dltcolumn);
        //console.log(this.columns);
        this.setState({render :true})
      }
    }
    if(this.props !== prevProps){
      this.setState({
        newData : this.state.newData === true ? false : true
      })
    }
    console.log(this.props.products.length,this.renleng);
    if(this.state.showData === false && this.props.products.length > 0 && this.props.products.length === this.renleng){
      this.setState({showData : true}, function(){
        $('#prodtable').DataTable({
          "dom": '<"top"lf>t<"bottom"p><"clear">',
          responsive: true
        });
      })
    }
    // setTimeout(() => {
    //   $('#prodtable').DataTable();
    // }, 500);
    
  }
  renleng = 0;
  renderTableDataProducts() {
    const { products } = this.props;    
    return products.map((prod,index) =>{
      let ind = index;
      this.renleng = ind+1;
        return (
          <tr key={index}>
             
             <td>{prod.status === "Un-Sold" ? <Link to={`./products/${prod._id}`}>{prod.title}</Link> : prod.title}</td>
             <td>{prod.catagory.name}</td>
             <td>{prod.description}</td>
             <td>{Math.round(prod.timer)}</td>
             <td>{prod.scheduleChk === 1 ? [new Date(prod.schedule).getHours(),new Date(prod.schedule).getMinutes(),new Date(prod.schedule).getSeconds()].join(':') : ''}</td>
             <td>Rs&nbsp;{prod.price}/-</td>
             <td>Rs&nbsp;{Math.round(prod.bidAmount)}/-</td>
             <td><img
                src={apiEndpoint+prod.imageUrl}
                className="viewProductsImage"
                alt="..."
                width="70"
                height="70"
              /></td>
             <td>{prod.timer > 0 && prod.status === "Sold" ? 'Un-Sold' : prod.status}</td>
             <td>{getCurrentUser().type === 'admin' && (prod.active_status === undefined || prod.active_status === 0) ? <button onClick={() => this.props.onApprove(prod)} className="btn btn-primary btn-sm">Approve</button> : prod.active_status === 1 ? 'Approved' : 'Pending'}</td>
             <td>{prod.status === 'Un-Sold' &&
                <button
                  onClick={() => this.props.onDelete(prod)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>}</td>
          </tr>            
       )
    })
}

  render() {
    
    const { products } = this.props;
    return (
      <div className="container-fluid">
        <table  className="table" id="prodtable">
        <thead className="thead-light">
            <tr>
                <th>Title</th>
                <th>Catagory</th>
                <th>Description</th>
                <th>Timer</th>
                <th>Schedule</th>
                <th>Price</th>
                <th>Bid Amount</th>
                <th>Image</th>
                <th>Status</th>
                <th>Approval Status</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {products && this.renderTableDataProducts()}
        </tbody>
    </table>
        {/* <Table id={"pdtable"} columns={this.columns} data={products} /> */}
      </div>
    );
  }
}
