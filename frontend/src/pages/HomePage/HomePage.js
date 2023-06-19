import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import StudentDetailPage from "../StudentDetailPage/StudentDetailPage";
import RankProgressChart from "../../components/RankProgressChart/RankProgressChart";
import axios from "axios";

const HomePage = () => {
  const [student, setStudent] = useState(null);
  const [user, token] = useAuth();
  const user_id = user.id;
  const [isPromotionsExpand, setIsPromotionsExpand] = useState(false);
  const [isEventsExpand, setIsEventsExpand] = useState(false);
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();

  console.log(student)
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

  const getRanks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/ranks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRanks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
    getRanks();
  }, [user_id, token]);

  const getCurrentRankTitle = () => {
    if (student && student.promotions.length > 0) {
      const lastPromotion = student.promotions[student.promotions.length - 1];
      const rank = ranks.find((r) => r.id === lastPromotion.rank.id);
      if (rank) {
        const promotionDate = new Date(lastPromotion.date);
        const formattedDate = promotionDate.toLocaleDateString(); // Format the date as desired
        return rank.title;
      }
    }
    return "";
  };
  
  const getLastPromotionDate = () => {
    if (student && student.promotions.length > 0) {
      const lastPromotion = student.promotions[student.promotions.length - 1];
      const promotionDate = new Date(lastPromotion.date);
      return promotionDate.toLocaleDateString(); // Format the date as desired
    }
    return "";
  };
  
  const handleEventsClick = () => {
    navigate('/events');
  };

  const handleStudentsClick = () => {
    navigate('/students');
  };

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
            <p>Last Promotion: {getLastPromotionDate()}</p>
            <p>Current Rank: {getCurrentRankTitle()}</p>
            <p>Is Coach: {student.is_coach ? "Yes" : "No"}</p>
            <p>Total Points: {student.point_total}</p>
            <p>
              <button onClick={togglePromotions}>{isPromotionsExpand ? "Collapse Promotions" : "Expand Promotions"}</button>
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
              <button onClick={toggleEvents}>{isEventsExpand ? "Collapse Events" : "Expand Events"}</button>
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
      {/* <div>
        <StudentDetailPage />
      </div> */}
      <button onClick={handleEventsClick}>Events</button>
      <br />
      {student && student.is_coach && <button onClick={handleStudentsClick}>Students</button>}
      <br />
      {/* <Link to="/student/:user_id">Student</Link> */}
      <br />
      {student && <RankProgressChart promotions={student.promotions} />}
    </div>
  );
};

export default HomePage;
