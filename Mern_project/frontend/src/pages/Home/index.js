
import React, { useEffect, useState } from 'react';


export default function Home({history}){



    useEffect(() => {
        if (!user) history.push('/login');
    }, [])

    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');

    return(
        <div>
            Hello Home
        </div>
    )
}