import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";


function MyNavbar() {

    const [username, setUsername] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/getUsername`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(
            res => res.json()
        ).then(
            data => {
                if (data.isLoggedIn) setUsername(data.username)
                else setUsername(null)
            }
        )
    });

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">OnlyBands</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/register">Register</Nav.Link>
                    {
                        username
                            ? <Nav.Link href={"/profile/" + username}>{username}'s Profile</Nav.Link>
                            : <Nav.Link href="/login">Login</Nav.Link>
                    }
                    <Nav.Link href="/explore">Explore</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
    
}

export default MyNavbar;