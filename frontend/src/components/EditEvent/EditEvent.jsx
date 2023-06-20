import axios from 'axios';
import React, { useState } from 'react';
import './EditEvent.css'

const EditEvent = ({ token, ...props }) => {
  const [type, setType] = useState(props.type);
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [points, setPoints] = useState(props.points);
  const [capacity, setCapacity] = useState(props.capacity);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let updateEvent = {
      type: type,
      title: title,
      date: date,
      points: points,
      capacity: capacity,
    };
    try {
      await axios.put(`http://127.0.0.1:5000/api/events/${props.id}`, updateEvent, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className='text-e-list'>
      <section>
        <form onSubmit={handlesubmit}>
          <h1>Edit Event</h1>
          <label>Type</label>
          <input name="type" onChange={(e) => setType(e.target.value)} defaultValue={props.type} />
          <label>Title</label>
          <input name="title" onChange={(e) => setTitle(e.target.value)} defaultValue={props.title} />
          <label>Date</label>
          <input name="Date" onChange={(e) => setDate(e.target.value)} defaultValue={props.date} />
          <label>Points</label>
          <input name="Points" onChange={(e) => setPoints(e.target.value)} defaultValue={props.points} />
          <label>Capacity</label>
          <input name="Capacity" onChange={(e) => setCapacity(e.target.value)} defaultValue={props.capacity} />
          <button type="submit">Update</button>
        </form>
      </section>
    </div>
  );
};

export default EditEvent;
