import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import EventForm from '../../components/EventForm/EventForm';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

const EventListPage = (props) => {
  const [user, token] = useAuth();
  const [student, setStudent] = useState(null);

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/student/${user.id}`, {
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
    <div>
      {student?.is_coach && <EventForm />}
      <h1>Events List</h1>
      <EventList />
    </div>
  );
};

export default EventListPage;




