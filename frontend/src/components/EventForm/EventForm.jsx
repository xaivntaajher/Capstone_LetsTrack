import React, { useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import './EventForm.css'

const EventForm = (props) => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [points, setPoints] = useState('');
  const [capacity, setCapacity] = useState('');
  const [user, token] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      type: type,
      title: title,
      date: date,
      points: points,
      capacity: capacity
    };
    try {
      await axios.post(`${props.BASE_URL}/api/events`, newEvent, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setType('');
      setTitle('');
      setDate('');
      setPoints('');
      setCapacity('');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='text-e-list'>
      <form onSubmit={handleSubmit}>
        <h1>Add Event</h1>
        <label>Type</label>
        <input name="type" value={type} onChange={(e) => setType(e.target.value)} />
        <label>Title</label>
        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Date</label>
        <input name="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Points</label>
        <input name="Points" value={points} onChange={(e) => setPoints(e.target.value)} />
        <label>Capacity</label>
        <input name="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
