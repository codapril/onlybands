import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

    const navigate = useNavigate();

    function handleLogin(e){
        //e.PreventDefault(); // If event is not handled explicitly, no default action should happen

        const form = e.target;
        const user = {
            username: form[0].value, // email ??
            password: form[1].value
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(
            res => res.json()
        ).then(
            data => {
                localStorage.setItem("token", data.token);
            }
        );
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
            <h2>Login on OnlyBands</h2>
            <Form onSubmit={event => handleLogin(event)}>
                <Form.Group>
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group>
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

export default Login;