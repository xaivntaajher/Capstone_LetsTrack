import React, { useState } from 'react';
import axios from 'axios'


const EventForm = (props) => {
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [points, setPoints] = useState('')
    const [capacity, setCapacity] = useState('')
    

const handlesubmit = async(e) => {
    e.preventDefault()
    let newEvent = {
        type: type,
        title: title,
        date: date,
        points: points,
        capacity: capacity
    }
    await axios.post('127.0.0.1:5000/api/events', newEvent)
    newEvent()
}


    
    return ( 
        <div>
            <form onSubmit={handlesubmit}>
                <h1>Add Event</h1>
                <label>Type</label>
                <input name='type' onChange={(e)=>setType(e.target.value)} />
                <label>Title</label>
                <input name='title' onChange={(e)=>setTitle(e.target.value)} />
                <label>Date</label>
                <input name='Date' onChange={(e)=>setDate(e.target.value)} />
                <label>Points</label>
                <input name='Points' onChange={(e)=>setPoints(e.target.value)} />
                <label>Capacity</label>
                <input name='Capacity' onChange={(e)=>setCapacity(e.target.value)} />
                <button type='submit'>Add Event</button>
            </form>
        </div>
     );
}
 
export default EventForm;