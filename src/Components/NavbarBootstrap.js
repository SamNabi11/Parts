// import { useEffect  } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useLocalStorage } from '../util/useLocalStorage';
import { useNavigate } from "react-router-dom";
 

const MainBar = () => {

    const user = useLocalStorage("user",null);
    const navigate = useNavigate();

  function HandleSignOut(event) {
    localStorage.setItem('user', null);
    navigate('/Login', { replace: true });
  }

  return (
    <div id="test">
      {console.log("inside div   ")}
      {console.log(user)}
      {/* {user !== null && Object.keys(user).length !== 0 && */}
        <div id="internal">
          {/* <img src={user.picture}></img> */}
          <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/PartNumberList">Home</Nav.Link>
                <Nav.Link href="/PartNumber">New Part</Nav.Link>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <div style={{ position: 'absolute', display: 'block', top: 0, right: 100, zIndex: 3 }} >
                  {user != null && user.name}  &nbsp; &nbsp;
                  <Button variant="primary" type='button' onClick={HandleSignOut} >Sign Out</Button></div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </div>
      

    </div>
  );
}

export default MainBar;