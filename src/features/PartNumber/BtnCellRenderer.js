import React, { useState, Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const url = "https://d3ttaqb72x3f57.cloudfront.net/UpdateRevision";
 // "https://localhost:5232/api/PartNumber/UpdateRevision";


const BtnCellRenderer = (props) => {

  const invokeParentMethod = () => {
    props.context.updateRefreshKey(`Row: ${props.node.rowIndex}, Col: ${props.colDef?.field}`);
};

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);


  const handleupdateRevision = () => {
    try {
      //alert(`${props.data.ID} was clicked`);   
      let res = fetch(url + "?ID=" + props.data.ID, {
        method: "POST",
      });
      //let resJson = await res.json();
      if (res.status === 200) {
        //setResMsg("Revision updated successfully");
      } else {
        //setResMsg("Some error occured");


      }

      handleClose();
      invokeParentMethod();


    } catch (err) {
      console.log(err);
    }
  }

  const btnClickedHandler = () => {
    handleShow();
    // props.clicked(props.data.ID + "-" + props.data.PartNumber);
  }

  return (
    <div>
      <Button name='Rev' size="sm" onClick={btnClickedHandler}><img src="../revision.png" height="20" width="20" /></Button> &nbsp;
      <Button name='Delete' size="sm" onClick={btnClickedHandler}><img src="../delete.png" height="20" width="20" /></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to update Revision?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleupdateRevision}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default BtnCellRenderer