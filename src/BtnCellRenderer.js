
import React, { useState ,Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const url = //"https://d3ttaqb72x3f57.cloudfront.net/UpdateRevision";
  "https://localhost:5232/api/PartNumber/UpdateRevision";

  
class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  
  btnClickedHandler = async (e) => {
    try { 
      let res = await fetch(url + "?ID=" + this.props.data.ID, {
        method: "POST",
      });
      //let resJson = await res.json();
      if (res.status === 200) {
        //setResMsg("Revision updated successfully");
      } else {
        //setResMsg("Some error occured");
      }

    

    } catch (err) {
      console.log(err);
    }
    this.props.clicked(this.props.data.ID + "-" + this.props.data.PartNumber);
  }
  render() {
    return (
      <div>
        <Button name='Rev' size="sm" onClick={this.btnClickedHandler}><img src="../revision.png" height="20" width="20" /></Button> &nbsp;
        <Button name='Delete' size="sm" onClick={this.btnClickedHandler}><img src="../delete.png" height="20" width="20" /></Button>
      </div> 
    )
  }
}
export default BtnCellRenderer