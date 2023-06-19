import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const EventDetailPage = (props) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [user, token] = useAuth();
  const { event_id } = useParams();
  const navigate = useNavigate();

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

  const getCurrentRankTitle = (student) => {
    if (student && student.promotions.length > 0) {
      const last_promotion = student.promotions[student.promotions.length - 1];
      return last_promotion.rank.title;
    }
    return '';
  };

  const generateChartData = () => {
    const ranks = enrolledStudents.map((student) => getCurrentRankTitle(student));
    const rank_counts = {};
    ranks.forEach((rank) => {
      rank_counts[rank] = (rank_counts[rank] || 0) + 1;
    });

    const chartData = [["Rank", "Count"]];
    Object.keys(rank_counts).forEach((rank) => {
      chartData.push([rank, rank_counts[rank]]);
    });

    return chartData;
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
            <li key={student.id}>Name: {student.first_name} {student.last_name}, Rank: {getCurrentRankTitle(student)}</li>
          ))}
        </ul>
      ) : (
        <p>No students enrolled in this event.</p>
      )}
      <h2>Rank Distribution</h2>
      {enrolledStudents.length > 0 ? (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={generateChartData()}
        />
      ) : (
        <p>No students enrolled to display rank distribution.</p>
      )}
    </div>
  );
};

export default EventDetailPage;







