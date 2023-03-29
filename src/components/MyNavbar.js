import React, { Component } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";


class MyNavbar extends Component {
    render() {
        return (
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">OnlyBands</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/explore">Explore</Nav.Link>
                        <Nav.Link href="/profile">My Profile</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default MyNavbar;