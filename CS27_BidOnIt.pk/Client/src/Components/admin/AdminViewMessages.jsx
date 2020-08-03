import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getAllMsgs, deleteAllMsgs } from '../../Services/commonService';
import {Button} from 'react-bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';

export default class AdminViewMessages extends Component {
    state = {
        Msgs: []
    };

    componentDidMount() {
        this.getAllMsgs();
    }

    async getAllMsgs(){
        const { data } = await getAllMsgs();
        console.log(data);
        this.setState({ Msgs : data }, function(){
            $('#msgstable').DataTable({
                "dom": '<"top"lf>t<"bottom"p><"clear">',
          responsive: true,
          "bSort" : false,
            });
        }
); 
    }

    handleDelete = async () => {
        try {
          await deleteAllMsgs();
          this.setState({ Msgs : [] });
          toast.success('Messages Deleted');
        } catch (ex) {
          if (ex.response && ex.response.status === 404) console.log('x');
          toast.error('This Messages are already deleted.');
        }
      };

    renderTableDataMsgs() {
        const { Msgs } = this.state;
        return Msgs.map((MsgDetail,index) =>{
            return (
              <tr key={index}>
                 <td>{index+1}</td>
                 <td>{MsgDetail.name}</td>
                 <td>{MsgDetail.email}</td>
                 <td>{MsgDetail.subject}</td>
                 <td>{MsgDetail.message}</td>
              </tr>            
           )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='row mr-auto'>
                    <div className="col-12">
                        <div>
                            <h3 className="float-left">Messages Data</h3>
                            <Button className="float-right mb-2" variant="danger" type="button" onClick={() => this.handleDelete()}>
                                Clear All Messages
                            </Button>
                            <div className="table-responsive portlet">
                                <table  className="table" id="msgstable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableDataMsgs()}
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