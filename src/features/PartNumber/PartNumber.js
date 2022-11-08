import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const url = 'http://localhost:5232/api/PartNumber';
const responseBody = res => res.body;

const 
PartNumber = () => {
    const [companyPrefix , setCompanyPrefix] = useState('')
    const [level , setLevel] = useState('')
    const [origin , setOrigin] = useState('')
    const [category , setCategory] = useState('')
    const [revision , setRevision] = useState('')
    const [description , setDescription] = useState('')
    

    const dispatch = useDispatch();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     superagent.post(`${url}`, {partNumber: { companyPrefix, level, origin,category,revision,description }}).then(responseBody)
    //     // dispatch(login(
    //     //     {
    //     //         userName:userName,
    //     //         password:password,
    //     //         loggedIn:true,

    //     //     }
    //     // ));

    // }

    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res = await fetch(url, {
          method: "POST",
          headers:{'Content-type':'application/json'},
          body: JSON.stringify({
            companyPrefix: companyPrefix,
            level: level,
            category: category,
            revision: revision,
            origin: origin,
            description: description,
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("User created successfully");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Part Number</h1>
            <br />
            <select name='ComapnPrefix' value={companyPrefix} onChange={(e)=>setCompanyPrefix(e.target.value)}>
              <option value='NL'>Neatolabs</option>
              <option value='FR'>FlashRobotics</option>
            </select>
            <br />
            <select name='level' value={level} onChange={(e)=>setLevel(e.target.value)}>
              <option value='A'>Assembly</option>
              <option value='P'>Part</option>
            </select>
            <br />
            <select name='origin' value={origin} onChange={(e)=>setOrigin(e.target.value)}>
              <option value='C'>Custom</option>
              <option value='S'>Shelf</option>
              <option value='M'>Modified</option>
            </select>
            <br />
            <select name='category' value={category} onChange={(e)=>setCategory(e.target.value)}>
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
            </select>
            <br />
            <select name='origin' value={revision} onChange={(e)=>setRevision(e.target.value)}>
              <option value='P'>Prototype</option>
              <option value='A'>Alpha</option>
              <option value='B'>Beta</option>
              <option value='D'>Production</option>
            </select>
            <br />
            <textarea name='description' placeholder='Description' value={description}  onChange={(e)=>setDescription(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
        </form>
            
    </div>
  )
}

export default 
PartNumber