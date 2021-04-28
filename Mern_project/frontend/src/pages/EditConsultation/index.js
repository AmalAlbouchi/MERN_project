import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, ButtonGroup } from 'reactstrap';
//import './dashboard.css'
//Dashboard will show all the events 
export default function EditConsultation(props){
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const Consultation_id =  props.location.state.Consultation_id
 
 
 
 
    const getEvents = async (filter) => {
       // const url = filter ? `/home/${filter}` : '/Consultation'
        const response =   await api.get(`/Consultation/${Consultation_id}`);
 
        setEvents(response.data)
    };
    useEffect(() => {
        getEvents()
    }, [])
    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }
 
    console.log(events)
    return(
        <div>
              Hello {events.description} Syndromes : {events.syndrome}
        </div>
    )
}