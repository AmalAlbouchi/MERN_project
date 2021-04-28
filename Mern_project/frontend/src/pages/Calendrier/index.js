import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, ButtonGroup } from 'reactstrap';
import './dashboard.css'
//Dashboard will show all the events 
export default function Dashboard({history}) {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    console.log("aaaaaaaaaaaaaaaaaa");
    useEffect(() => {
        getEvents()
    }, [])
    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }
    const getEvents = async (filter) => {
        const url = filter ? `/home/${filter}` : '/Consultation'
        const response = await api.get(url)

        setEvents(response.data)
    };

    const deleteEventHandler = async(eventId) => {
        
        try {
            await api.delete(`/Consultation/${eventId}`);
            //setSuccess(true)
            setTimeout(() => {
                //setSuccess(false)
                filterHandler(null)
            }, 0)
            history.push('/')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
    }


  


    return (
        <>
            <div>
                <Button color="secondary">La liste des consultation</Button>
            </div>
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})` }} />
                        <span>Les syndromes du patient: {event.syndrome}</span>
                        <span>La date de consultation: {parseFloat(event.date).toFixed(2)}</span>
                        <span>La description de la consultation: {event.description}</span>
                        <div><Button color="danger"  size="sm"onClick={() => deleteEventHandler(event._id)}>Delete</Button></div>
                        
                        <Link to={{
                            pathname: '/EditConsultation/',
                            state: { Consultation_id: event._id }
                            }}> 
                            <div>
                                <Button color="info"  size="sm" edit>
                                    Edit
                                </Button>
                            </div>
                        </Link>
    
                    </li>
                ))}
            </ul>
        </>
    )
}