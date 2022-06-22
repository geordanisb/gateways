import { FunctionComponent } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SimpleLayout: FunctionComponent = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link href="#">
        <a>MusalaSoft-Gateways</a>
        </Link>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
          <Link href='/gateway/list'>
              <a>Gateways</a>
            </Link>
          </Nav.Link>
          <Nav.Link>
          <Link href='/peripheral/list'>
              <a>Peripherals</a>
            </Link>
          </Nav.Link>
      </Nav>
      <Form>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default SimpleLayout;
