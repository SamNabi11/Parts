import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


const url = "https://d3ttaqb72x3f57.cloudfront.net/";
  //"https://localhost:5232/api/PartNumber/";


const BtnCellRenderer = (props) => {

  const invokeParentMethod = () => {
    props.context.updateRefreshKey();

  };

  const handleClose = () => setShow(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShow = () => setShow(true);
  const handleShowDelete = () => setShowDelete(true);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedItem, setCheckedItem] = useState({});
  const [radioPrototypeDisabled, SetPrototypeDisabled] = useState({});
  const [radioAlphaDisabled, SetAlphaDisabled] = useState({});
  const [radioBetaDisabled, SetBetaDisabled] = useState({});

  const handleChange = (e)  => {
    setCheckedItem(e.target.value);
  };

  const handleupdateRevision = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(description);
      let res = await fetch(url + "UpdateRevision", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          ID: props.data.ID,
          Revision: checkedItem,
          Description: description,
          
        }),
      });
      //let resJson = await res.json();
      if (res.status === 200) {
        invokeParentMethod();
        //setResMsg("Revision updated successfully");
      } else {
        //todo
      }
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }
  const handleDeletePart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch(url + "ArchivePartNumber", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          ID: props.data.ID,
        }),
      });
      //let resJson = await res.json();
      if (res.status === 200) {
        invokeParentMethod();
        //setResMsg("Revision updated successfully");
      } else {
        //todo
      }
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const btnUpdateClickedHandler = (e) => {
    e.preventDefault();
    if (props.data.Revision.trim() === 'X')
    {
      setCheckedItem("Y");
      SetPrototypeDisabled(true);
      SetAlphaDisabled(false);
      SetBetaDisabled(false);

    }
    else if (props.data.Revision.trim() === 'Y')
    {
      setCheckedItem("Z");
      SetPrototypeDisabled(true);
      SetAlphaDisabled(true);
      SetBetaDisabled(false);

    }
    else
    {
      setCheckedItem("A");
      SetPrototypeDisabled(true);
      SetAlphaDisabled(true);
      SetBetaDisabled(true);

    }
     

    handleShow();
    // props.clicked(props.data.ID + "-" + props.data.PartNumber);
  }

  const btnDeleteClickedHandler = (e) => {
    e.preventDefault();
    
    handleShowDelete();
    // props.clicked(props.data.ID + "-" + props.data.PartNumber);
  }


  return (
    <div>
      <Button name='Rev' size="sm" onClick={btnUpdateClickedHandler}><img src="../revision.png" height="20" width="20" /></Button> &nbsp;
      <Button name='Delete' size="sm" onClick={btnDeleteClickedHandler}><img src="../delete.png" height="20" width="20" /></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please add new description for updated revision!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <div key={`inline-radio`} className="mb-3">
              <Form.Group controlId="kindOfStand" >
                <Form.Check
                  inline
                  value="X"
                  label="Prototype"
                  name="group1"
                  disabled={radioPrototypeDisabled}
                  type="radio"
                  id={`inline-radio-1`}
                  onClick={handleChange}
                  defaultChecked={checkedItem === "X"}
                />
                <Form.Check
                  inline
                  value="Y"
                  label="Alpha"
                  name="group1"
                  disabled={radioAlphaDisabled}
                  type="radio"
                  id={`inline-radio-2`}
                  onChange={handleChange}
                  defaultChecked={checkedItem === "Y"}
                />
                <Form.Check
                  inline
                  value="Z"
                  label="Beta"
                  name="group1"
                  disabled={radioBetaDisabled}
                  type="radio"
                  id={`inline-radio-3`}
                  onChange={handleChange}
                  defaultChecked={checkedItem === "Z"}
                />
                <Form.Check
                  inline
                  value="A"
                  label="Production"
                  name="group1"
                  type="radio"
                  id={`inline-radio-4`}
                  onChange={handleChange}
                  defaultChecked={checkedItem === "A"}
                />
              </Form.Group>
            </div>

          </Form>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)} rows={3} autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleupdateRevision}>
          {loading ?   
              <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : null }
            {loading ? <>Updating...</> : <>Update</>} 
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title> Caution!! Are you sure you want to delete this PartNumber?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          </Form>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeletePart}>
          {loading ?   
              <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : null }
            {loading ? <>Archiving...</> : <>Yes</>} 
          </Button>
          <Button variant="primary" onClick={handleCloseDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default BtnCellRenderer