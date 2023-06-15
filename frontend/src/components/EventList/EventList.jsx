import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import EditEvent from '../EditEvent/EditEvent';

const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
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

  const postEnrollment = async (event_id) => { 
    try {
      await axios.post(`http://127.0.0.1:5000/api/events/enroll/${event_id}`, null, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      getAllEvents();
      alert('Enrolled Successfully');
    } catch (error) {
      console.log(error.response.data);
    } 
  }

  useEffect(() => {
    getAllEvents();
  },[])

  const handleEdit = (event) => {
    console.log("View event details", event);
    setEvent(event);
  }

  const handleEnroll = (event) => {
    console.log("Enroll in event", event);
    postEnrollment(event.id); 
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
                  <td><button type='button' onClick={() => handleEdit(event)}>Edit Event</button></td>
                  <td><button type='button' onClick={() => handleEnroll(event)}>Enroll</button></td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <EditEvent token={token} {...event}>Edit Event</EditEvent>
    </div>
  );
};

export default EventList;




 