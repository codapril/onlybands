import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {

        e.preventDefault()

        const user = {
            username: username,
            password: password
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((res) => res.json()
        ).then(
            (data) => {
                localStorage.setItem("token", data.token)
                setLoggedIn(true)
            }
        );

    }

    useEffect(() => {

        async function fetchToken() {
            fetch(`${process.env.REACT_APP_SERVER_URL}/getUsername`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }).then(
                res => res.json()
            ).then(
                data => {
    
                    if (data.isLoggedIn) navigate(`/profile/${username}`)
                }
            )
        }

        fetchToken()
        
    });

    return (
        <div>
            <h2>Login on OnlyBands </h2>
            <p>Is logged in? { loggedIn }</p>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" value="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;