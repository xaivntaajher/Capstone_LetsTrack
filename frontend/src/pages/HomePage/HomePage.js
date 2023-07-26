import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import RankProgressChart from "../../components/RankProgressChart/RankProgressChart";
import axios from "axios";
import './HomePage.css';

const HomePage = (props) => {
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
      const updatedStudent = response.data;
      if (updatedStudent.events.length > 0) {
        const startDate = new Date(updatedStudent.events[0].date);
        updatedStudent.start_date = startDate.toLocaleDateString();
      }
      setStudent(updatedStudent);
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
      const last_promotion = student.promotions[student.promotions.length - 1];
      const rank = ranks.find((r) => r.id === last_promotion.rank.id);
      if (rank) {
        const promotion_date = new Date(last_promotion.date);
        const formattedDate = promotion_date.toLocaleDateString(); 
        return rank.title;
      }
    }
    return "";
  };
  
  const getLastPromotionDate = () => {
    if (student && student.promotions.length > 0) {
      const last_promotion = student.promotions[student.promotions.length - 1];
      const promotion_date = new Date(last_promotion.date);
      return promotion_date.toLocaleDateString(); 
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
    <div >
      <div>
        <div className="detail-title">
          <h1>Welcome {user.username}!</h1>
        </div>
        <div className="event-student">
          <button onClick={handleEventsClick}>Events</button>
          {student && student.is_coach && <button onClick={handleStudentsClick}>Students</button>}
        </div>
        <div className="container-3">
          {student && (
            <div className="student-details">
              <p>First Name: {student.first_name}</p>
              <p>Last Name: {student.last_name}</p>
              <p>Start Date: {student && student.start_date ? student.start_date : "N/A"}</p>
              <p>Last Promotion: {getLastPromotionDate()}</p>
              <p>Current Rank: {getCurrentRankTitle()}</p>
              <p>Is Coach: {student.is_coach ? "Yes" : "No"}</p>
              <p>Total Points: {student.point_total}</p>
              <p>
                <button onClick={togglePromotions}>{isPromotionsExpand ? "Collapse Promotions" : "Expand Promotions"}</button>
              </p>
              {isPromotionsExpand && (
                <div className="expand-content">
                  <ul>
                    {student.promotions.map((promotion) => (
                      <li key={promotion.id}>
                        Date: {promotion.date}<br />
                        Title: {promotion.rank.title}<br />
                        Type: {promotion.rank.type}<br />
                        Points: {promotion.points}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p>
                <button onClick={toggleEvents}>{isEventsExpand ? "Collapse Events" : "Expand Events"}</button>
              </p>
              {isEventsExpand && (
                <div className="expand-content">
                  <ul>
                    {student.events.map((event) => (
                      <li key={event.id}>
                        Date: {event.date}<br />
                        Title: {event.title}<br />
                        Type: {event.type}<br />
                        Points: {event.points}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            )}
            <div className="chart">
              <div className="detail-title">
                <p className="ranktitle">Rank Progress Chart</p>
              </div>
              <div className="graph">
                {student && <RankProgressChart promotions={student.promotions} />}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
