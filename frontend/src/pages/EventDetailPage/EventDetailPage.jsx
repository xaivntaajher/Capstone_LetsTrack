import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const EventDetailPage = (props) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [user, token] = useAuth();
  const { event_id } = useParams();
  const navigate = useNavigate();

  console.log(enrolledStudents)
  useEffect(() => {
    fetchEventDetails();
  }, [event_id, token]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/event_info/${event_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const eventData = response.data;
      setEventDetails(eventData);
      setEnrolledStudents(eventData.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
        <button type="button" onClick={handleBack}>Close</button>
        {eventDetails && (
            <div>
            <h1>Event Details</h1>
            <p>Event ID: {eventDetails.id}</p>
            <p>Event Type: {eventDetails.type}</p>
            <p>Points: {eventDetails.points}</p>
            <p>Title: {eventDetails.title}</p>
            <p>Date: {eventDetails.date}</p>
            <p>Capacity: {eventDetails.capacity}</p>
            </div>
        )}
        <h2>Enrolled Students</h2>
        {enrolledStudents.length > 0 ? (
            <ul>
            {enrolledStudents.map((student) => (
                <li key={student.id}>Name: {student.first_name} {student.last_name}, Rank: {student.rank.title}</li>
            ))}
            </ul>
        ) : (
            <p>No students enrolled in this event.</p>
        )}
    </div>
  );
};

export default EventDetailPage;





