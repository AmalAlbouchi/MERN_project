import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup } from 'reactstrap';
import './dashboard.css'
//Dashboard will show all the events 
export default function Dashboard({history}) {
    const [events, setEvents] = useState([]);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
   
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);

    useEffect(() => {
        getEvents()
    }, [])

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }
    const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        history.push('/login');
    }


    const getEvents = async (filter) => {
        try {
        const url = filter ? `/home/${filter}` : '/Consultation'
        const response = await api.get(url, { headers: { user: user } })
        
        setEvents(response.data)
        
    } catch (error) {
        history.push('/login');
    }

};

    return (
        <>
            <div>
                <Button color="secondary">La liste des consultation</Button>
            </div>

            <ButtonGroup>
                    <br/>
                    <Button color="danger" onClick={logoutHandler}>Logout</Button>
                </ButtonGroup>
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})` }} />
                        <span>Les syndromes du patient: {event.syndrome}</span>
                        <span>La date de consultation: {parseFloat(event.date).toFixed(2)}</span>
                        <span>La description de la consultation: {event.description}</span>
                        <Button color="primary">more details</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}