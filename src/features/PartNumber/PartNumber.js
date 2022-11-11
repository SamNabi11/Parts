import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";


const superagent = superagentPromise(_superagent, global.Promise);

const url = 'https://localhost:5232/api/PartNumber';
const responseBody = res => res.body;

const
  PartNumber = () => {
    const navigate = useNavigate()
    const [companyPrefix, setCompanyPrefix] = useState('NL')
    const [level, setLevel] = useState('')
    const [origin, setOrigin] = useState('')
    const [category, setCategory] = useState('')
    const [revision, setRevision] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch();
    const [isAlertVisible, setIsAlertVisible] = React.useState(false);
    const [resMsg, setResMsg] = useState('')

    const navigatePartNumberList = () => {
      // 👇️ navigate to /
      navigate('/', { replace: true });
    }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    let handleSubmit = async (e) => {
      e.preventDefault();
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
        console.log("testtttt");
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
       await delay(3000);
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
              <Form.Select name='ComapnPrefix' value={companyPrefix} onChange={(e) => setCompanyPrefix(e.target.value)}>
                <option value='NL'>Neatolabs</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formlevel">
              <Form.Label>Level</Form.Label>
              <Form.Select name='level' value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value=''></option>
                <option value='A'>Assembly</option>
                <option value='P'>Part</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formOrigin">
              <Form.Label>Origin</Form.Label>
              <Form.Select name='origin' value={origin} onChange={(e) => setOrigin(e.target.value)}>
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
              <Form.Select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <Form.Select name='origin' value={revision} onChange={(e) => setRevision(e.target.value)}>
                <option value=''></option>
                <option value='P'>Prototype</option>
                <option value='A'>Alpha</option>
                <option value='B'>Beta</option>
                <option value='D'>Production</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Description"  value={description} onChange={(e) => setDescription(e.target.value)} />
      </FloatingLabel>
      <br />
          <Button variant="primary" type='submit'>Submit</Button>
          <br />
          {isAlertVisible && <div className='alert-container'>
              <div className='alert-inner'>{resMsg}</div>
          </div>}

        </Form>
        
       
      </div>
    )
  }

export default
  PartNumber