import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function SiteNav(props) {
    const handleLogout = () => {
        props.logOut();
    }

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link to='/Journal' className="navbar-brand">Hobn'Go</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-md-auto">
                            <Link to='/Profile' className="nav-link">Profile</Link>  
                            <Link to='/MatchMaking' className="nav-link">Match</Link> 
                            <Link to='/Journal' className="nav-link">Journal</Link> 
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default SiteNav;