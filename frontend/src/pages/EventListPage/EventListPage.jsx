import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import EventForm from '../../components/EventForm/EventForm';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import './EventListPage.css';

const EventListPage = (props) => {
  const [user, token] = useAuth();
  const [student, setStudent] = useState(null);

  const getStudent = async () => {
    try {
      const response = await axios.get(`${props.BASE_URL}/api/student/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getStudent();
  }, [user.id, token]);

  console.log("is_coach:", student?.is_coach);
  console.log("user:", student);

  return (
    <div >
      <div className='event'> 
        <div>
          {student?.is_coach && <EventForm BASE_URL={props.BASE_URL}/>}
        </div>
        <div>
          <h1 className='text-std-list'>Events List</h1>
        </div>
        <div>
          <EventList BASE_URL={props.BASE_URL}/>
        </div>
      </div>
    </div>
  );
};

export default EventListPage;




