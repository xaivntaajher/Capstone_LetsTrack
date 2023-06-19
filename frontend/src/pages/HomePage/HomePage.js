import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import StudentDetailPage from "../StudentDetailPage/StudentDetailPage";
import RankProgressChart from "../../components/RankProgressChart/RankProgressChart";
import axios from "axios";

const HomePage = () => {
  const [student, setStudent] = useState(null);
  const [user, token] = useAuth();
  const user_id = user.id;
  const [isRankExpand, setIsRankExpand] = useState(false);
  const [isPromotionsExpand, setIsPromotionsExpand] = useState(false);
  const [isEventsExpand, setIsEventsExpand] = useState(false);

  const toggleRank = () => {
    setIsRankExpand(!isRankExpand);
  };

  const togglePromotions = () => {
    setIsPromotionsExpand(!isPromotionsExpand);
  };

  const toggleEvents = () => {
    setIsEventsExpand(!isEventsExpand);
  };

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/student/${user_id}`, {
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
  }, [user_id, token]);

  return (
    <div className="container">
      <div>
        <div>
          <h1>Student Details</h1>
        </div>
        {student && (
          <div>
            <p>First Name: {student.first_name}</p>
            <p>Last Name: {student.last_name}</p>
            <p>Start Date: {student.start_date}</p>
            <p>Last Promotion: {student.last_promotion}</p>
            <p>Is Coach: {student.is_coach ? "Yes" : "No"}</p>
            <p>Total Points: {student.point_total}</p>
            <p>
              <button onClick={toggleRank}>{isRankExpand ? "Rank" : "Rank"}</button>
            </p>
            {isRankExpand && (
              <ul>
                <li>ID: {student.rank.id}</li>
                <li>Title: {student.rank.title}</li>
                <li>Points Required: {student.rank.points_required}</li>
              </ul>
            )}
            <p>
              <button onClick={togglePromotions}>{isPromotionsExpand ? "Promotions" : "Promotions"}</button>
            </p>
            {isPromotionsExpand && (
              <ul>
                {student.promotions.map((promotion) => (
                  <li key={promotion.id}>
                    Date: {promotion.date}, Rank ID: {promotion.rank.id}, Rank Title: {promotion.rank.title},
                    Points Required: {promotion.rank.points_required}
                  </li>
                ))}
              </ul>
            )}
            <p>
              <button onClick={toggleEvents}>{isEventsExpand ? "Events" : "Events"}</button>
            </p>
            {isEventsExpand && (
              <ul>
                {student.events.map((event) => (
                  <li key={event.id}>
                    Date: {event.date}, Title: {event.title}, Type: {event.type}, Points: {event.points}, Capacity:{" "}
                    {event.capacity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div>
        <StudentDetailPage />
      </div>
      <Link to="/events">Events</Link>
      <br />
      {student && student.is_coach && <Link to="/students">Students</Link>}
      <br />
      {/* <Link to="/student/:user_id">Student</Link> */}
      <br />
      {student && <RankProgressChart promotions={student.promotions} />}
    </div>
  );
};

export default HomePage;

