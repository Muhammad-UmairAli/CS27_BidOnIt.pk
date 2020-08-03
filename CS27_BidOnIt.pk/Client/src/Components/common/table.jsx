// import 'datatables.net-bs/css/dataTables.bootstrap.css';
// import 'datatables.net-bs/js/dataTables.bootstrap.js'
import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody.jsx';
// import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton } from 'react-bootstrap-table';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import $ from 'jquery';

// const $ = require('jquery')
// require( 'datatables.net-bs' )( window, $ );



const Table = ({ id, columns, data }) => {
  return (
    <table id={id} className="table display">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
    // <table className="display" width="100%" ref = {el => this.el = el }></table>
  );
};

export default Table;
