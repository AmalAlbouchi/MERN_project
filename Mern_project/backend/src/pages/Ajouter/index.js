import { Container, Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import React, { useState, useEffect , useMemo } from 'react';
import api from '../../services/api';
import "./events.css";
export default function EventsPage({history}) {
    const [syndromes, setSyndrome] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const user = localStorage.getItem('user');
    console.log(syndromes,description,date)

    useEffect(() => {
        if (!user) history.push('/login');
    }, [])


    const submitHandler = async (Consultation) => {
        Consultation.preventDefault()
        var eventData = new FormData();
        eventData.append('syndromes',syndromes)
        eventData.append('description',description)
        eventData.append('date',date)
        console.log('dataaaa_lenaa==>',eventData)
        console.log('dataaaa_lenaa',syndromes)

        const user_id = localStorage.getItem('user');

        try {
            if (syndromes !== "" &&
                description !== "" &&
                date !== "" 
                )
            {
                console.log("Consultation has been sent")
                console.log("data :", eventData)
                await api.post("/Consultation",{'syndrome':syndromes,'description':description,'date':date} , { headers: { user_id } })
                // await api.post("/Consultation",eventData)
                console.log(eventData)
                console.log("consultation has been saved")
            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000)

                console.log("Missing required data")
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
        
    }
    return (
    
        <Container>
            
            <h2>Creer votre consultation</h2>
            <Form onSubmit={submitHandler}>   
                 {/* <FormGroup>
                    <Label>Sport: </Label>
                    <Input id="sport" type="text" value="" placeholder={'Sport name'} />
                </FormGroup>  */}
                {console.log('dattttta::',syndromes,date,description)}
                <FormGroup>
                    <Label>Syndromes </Label>
                    <Input id="syndromes" type="text" value={syndromes} placeholder={'Syndromes'} onChange={(evt) => setSyndrome(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Description: </Label>
                    <Input id="description" type="text" value={description} placeholder={'Description'} onChange={(evt) => setDescription(evt.target.value)}  />
                </FormGroup>
                {/* <FormGroup>
                    <Label>Event price: </Label>
                    <Input id="price" type="text" value="" placeholder={'Event Price £0.00'}  />
                </FormGroup> */}
                <FormGroup>
                    <Label>Date de consultation: </Label>
                    <Input id="date" type="date" value={date} onChange={(evt) => setDate(evt.target.value)}  />
                </FormGroup>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger"> Missing required information</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success"> The event was created successfully!</Alert>
            ) : ""}
        </Container>
    )
}