import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {

    const navigate = useNavigate();

    async function handleRegister(e) {
        //e.preventDefault();

        const form = e.target
        const user = {
            username: form[0].value,
            password : form[1].value 
        }

        console.log(user)

        fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/getUsername`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(
            res => res.json()
        ).then(
            data => data.isLoggedIn ? navigate(`/`) : null
        )
    });

    return (
        <div>
            <h2>Register on OnlyBands</h2>
            <p>Please provide a username and a password.</p>
            <Form onSubmit={event => handleRegister(event)}>
                <Form.Group>
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" value="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )

}

export default Register;