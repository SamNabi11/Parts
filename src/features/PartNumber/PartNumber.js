import React, { useState } from 'react';
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
import { FormGroup } from 'react-bootstrap';


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
    const [partnumber, setPartnumber] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [resMsg, setResMsg] = useState('');
    const [show, setShow] = useState(false);

    
    const navigatePartNumberList = () => {
      // 👇️ navigate to /
      navigate('/', { replace: true });
    }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      const handleChange = async (evt)  => {
      console.log(evt.target.name);
      switch (evt.target.name) {
        case 'companyPrefix':
          setCompanyPrefix();
          setPartnumber(evt.target.value+level+"-" + origin +"-" + category + "xxxxx" + revision);
          break;
        case 'level':
            setLevel(evt.target.value);
            setPartnumber(companyPrefix + evt.target.value+"-" + origin +"-" + category + "xxxxx" + revision);
            break;
        case 'origin':
            setOrigin(evt.target.value);
            setPartnumber(companyPrefix+level+"-" + evt.target.value +"-" + category + "xxxxx" + revision);
            break;
        case 'category':
            setCategory(evt.target.value);
            setPartnumber(companyPrefix+level+"-" + origin +"-" + evt.target.value + "xxxxx" + revision);
            break;
        case 'revision':
            setRevision(evt.target.value);
            setPartnumber(companyPrefix+level+"-" + origin +"-" + category + "xxxxx" + evt.target.value);
            break;
              }
      
    }

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
          let resJson = await res.json();
          setResMsg(resJson + "        created successfully");
        } else {
          setResMsg("Some error occured");
        }
        setLoading(false);
        
        handleShow();
        await delay(5000);

        navigatePartNumberList();
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div>
        <br />
        <br />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formComapnPrefix">
              <Form.Label>Company Prefix</Form.Label>
              <Form.Select name='companyPrefix' value={companyPrefix} onChange={handleChange}>
                <option value='NL'>Neatolabs</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formlevel">
              <Form.Label>Level</Form.Label>
              <Form.Select name='level' required as="select" value={level} onChange={handleChange}>
                <option value=''></option>
                <option value='A'>Assembly</option>
                <option value='P'>Part</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formOrigin">
              <Form.Label>Origin</Form.Label>
              <Form.Select name='origin' required as="select" value={origin} onChange={handleChange}>
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
              <Form.Select name='category' required as="select" value={category} onChange={handleChange}>
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
                <option value='PN'>Pneumatic</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formRevision">
              <Form.Label>Revision</Form.Label>
              <Form.Select name='revision' required as="select" value={revision} onChange={handleChange}>
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
          <label>New Part:{partnumber}</label> 
          <br /><br />
          <table>
            <tr>
              <td width={100}>
          <Button className="mb-3" variant="primary" type='button' onClick={handleGoback}  >GoBack</Button></td>
          
          <td width={1500}>
          <Button  className="mb-3"  variant="primary" type='submit'>
          {loading ?   
              <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : null }
            {loading ? <>Updating...</> : <>Save</>} 
            </Button>
            </td>
            </tr>
            </table>
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