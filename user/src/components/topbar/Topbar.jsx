import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';


function Topbar() {
  const token=localStorage.getItem("token")
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <>
    <Navbar bg={token?"primary":"dark"} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="">{token?"React-Bootstrap":"Not-logged-in"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {token?(
            <>
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link className='nav-link'
            onClick={handleLogout}
            >Logout</Nav.Link>
          </>
        )
        :(<>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link className='nav-link' as={Link} to="/register"
        onClick={handleLogout}
        >Signup</Nav.Link>
        </>)
        }
            
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {token && <Dashboard/>}
    </>
  );
}

export default Topbar;