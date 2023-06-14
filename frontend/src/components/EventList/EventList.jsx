import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EventList = (props) => {
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])


  const getEvents = async() => {
    let response = await axios.get('127.0.0.1:5000/api/events');
    setEvents(response.data.events);
  }

  useEffect(() => {
    getEvents()
  })

  const handleEdit = () => {
    console.log("Edit event", event);
    setEvent(event)
  }

  return (
    <div>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Title</th>
          <th>Date</th>
          <th>Points</th>
          <th>Capacity</th>
        </tr>
      </thead>
      <tbody>
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.type}</td>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.points}</td>
                <td>{event.capacity}</td>
                <td><button type='button' onClick={() => handleEdit(event)}>Edit</button></td>
              </tr>
            )
          })}
      </tbody>
    </div>
  );
};

export default EventList;


 
