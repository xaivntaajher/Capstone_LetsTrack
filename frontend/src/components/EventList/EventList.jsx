import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";

const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [user, token] = useAuth();


  const getAllEvents = async () => {
    try {
      let response = await axios.get('http://127.0.0.1:5000/api/events', {
        headers: {
          Authorization: 'Bearer ' + token
        } 
      });
      setEvents(response.data);
    } catch (error) {
      console.log(error.response.data);
    } 
  }
  

  useEffect(() => {
    getAllEvents()
  },[])

  const handleEdit = () => {
    console.log("Edit event", event);
    setEvent(event)
  }

  return (
    <div>
      <table>
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
      </table>
    </div>
  );
};

export default EventList;


 
