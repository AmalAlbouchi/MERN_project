import React, { useState } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Container, Input, Alert } from 'reactstrap';

export default function Register({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [role, setRole] = useState("")

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    const handleSubmit = async evt => {
        evt.preventDefault();

        if (email !== "" && password !== "" && nom !== "" && prenom !== ""  && role !== "") {
            const response = await api.post('/user/register', { email, password, nom, prenom, role })
           
            const user_id = response.data.user_id || false;

            if ( user_id) {
               
                localStorage.setItem('user_id', user_id)
                history.push('/')
            } else {
                const { message } = response.data
                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 2000)
            }
        } else {
            setError(true)
            setErrorMessage("You need to fill all the Inputs")
            setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 2000)

        }

    }

    return (
        <Container>
            <h2>Register:</h2>
            <p>Please <strong>Register</strong> for a new account</p>
            <Form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="nom" id="nom" placeholder="Votre nom" onChange={evt => setNom(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="prenom" id="prenom" placeholder="Votre Prenom" onChange={evt => setPrenom(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="role" id="password" placeholder="Votre role" onChange={evt => setRole(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="email" name="email" id="email" placeholder="Votre email" onChange={evt => setEmail(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="password" name="password" id="password" placeholder="Votre password" onChange={evt => setPassword(evt.target.value)} />
                    </FormGroup>
                    
                </div>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("/login")}>Login instead?</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ) : ""}
        </Container>
    );
}