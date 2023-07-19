// import { useEffect  } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Login/userSlice';
import { Link, useNavigate } from 'react-router-dom';
 

const MainBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  function HandleSignOut(event) {
    dispatch(logout());
    navigate('/Login');
  }

  return (
    <div id="test">
      {console.log("inside div   ")}
      {/* {user !== null && Object.keys(user).length !== 0 && */}
        <div id="internal">
          {/* <img src={user.picture}></img> */}
          <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(0, 0, 0, 0.55)',
                    alignSelf: 'center'
                  }}
                  to={'/PartNumberList'}
                  href="/PartNumberList">
                    Home
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(0, 0, 0, 0.55)',
                    alignSelf: 'center',
                    paddingLeft:30,
                    paddingRight:20
                  }}
                  to={'/PartNumber'}
                  href="">
                    New Part
                </Link>
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
                {
                  user.value &&
                  <div style={{ position: 'absolute', display: 'block', top: 0, right: 100, zIndex: 3 }} >
                    &nbsp; &nbsp;
                    <Button variant="primary" type='button' onClick={HandleSignOut} >Sign Out</Button>
                  </div>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </div>
      

    </div>
  );
}

export default MainBar;