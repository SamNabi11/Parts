import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";


const superagent = superagentPromise(_superagent, global.Promise);

const url = "https://d3ttaqb72x3f57.cloudfront.net/AddPartNumber";
//"https://localhost:5232/api/PartNumber/AddPartNumber";
const responseBody = res => res.body;
const PartNumber = () => {
    const navigate = useNavigate();
    const [companyPrefix, setCompanyPrefix] = useState('NL');
    const [level, setLevel] = useState('');
    const [origin, setOrigin] = useState('');
    const [category, setCategory] = useState('');
    const [revision, setRevision] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    const [resMsg, setResMsg] = useState('');
    const [show, setShow] = useState(false);

    const navigatePartNumberList = () => {
      // 👇️ navigate to /
      navigate('/PartNumberList', { replace: true });
    }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleGoback = async (e) => {
      e.preventDefault();
      navigatePartNumberList();
    }
    let handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        let res = await fetch(url, {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            companyPrefix: companyPrefix,
            level: level,
            category: category,
            revision: revision,
            origin: origin,
            description: description,
          }),
        });
        //let resJson = await res.json();
        if (res.status === 200) {
          setResMsg("Product created successfully");
        } else {
          setResMsg("Some error occured");
        }
        setLoading(false);
        
        handleShow();
        await delay(1000);

        navigatePartNumberList();
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div  style={{ height: "90%" , width: "70%" }}>
        <br />
        <br />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formComapnPrefix">
              <Form.Label>Company Prefix</Form.Label>
              <Form.Select name='ComapnPrefix' value={companyPrefix} onChange={(e) => setCompanyPrefix(e.target.value)}>
                <option value='NL'>Neatolabs</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formlevel">
              <Form.Label>Level</Form.Label>
              <Form.Select name='level' required as="select" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value=''></option>
                <option value='A'>Assembly</option>
                <option value='P'>Part</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formOrigin">
              <Form.Label>Origin</Form.Label>
              <Form.Select name='origin' required as="select" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                <option value=''></option>
                <option value='C'>Custom</option>
                <option value='S'>Shelf</option>
                <option value='M'>Modified</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select name='category' required as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value=''></option>
                <option value='EL'>Electrical</option>
                <option value='ME'>Mechanical</option>
                <option value='OP'>Optical</option>
                <option value='GA'>Galvo</option>
                <option value='FA'>Fan</option>
                <option value='MO'>Motor</option>
                <option value='CO'>Cooling</option>
                <option value='LS'>Laser Source</option>
                <option value='MC'>Multi Comp</option>
                <option value='SE'>Sensor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formRevision">
              <Form.Label>Revision</Form.Label>
              <Form.Select name='origin' required as="select" value={revision} onChange={(e) => setRevision(e.target.value)}>
                <option value=''></option>
                <option value='X'>Prototype</option>
                {/* <option value='Y'>Alpha</option>
                <option value='Z'>Beta</option> */}
                <option value='A'>Production</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <br />
          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >

            <Form.Control as="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FloatingLabel>
          <br />
          <Button variant="primary" type='submit'>
          {loading ?   
              <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : null }
            {loading ? <>Updating...</> : <>Save</>} 
            </Button> &nbsp; &nbsp;
          <Button variant="primary" type='button' onClick={handleGoback} >GoBack</Button>
          <br />
          

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <h1> {resMsg}</h1>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>

        </Form>


      </div>
    )
  }

export default
  PartNumber