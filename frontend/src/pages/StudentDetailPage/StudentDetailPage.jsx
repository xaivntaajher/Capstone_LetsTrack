import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import RankProgressChart from '../../components/RankProgressChart/RankProgressChart';
import { useNavigate } from 'react-router-dom';

const StudentDetailPage = (props) => {
  const [student, setStudent] = useState(null);
  const [user, token] = useAuth();
  const { id } = useParams(); // Get the student ID from the URL parameter
  const [isPromotionsExpand, setIsPromotionsExpand] = useState(false);
  const [isEventsExpand, setIsEventsExpand] = useState(false);
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();

  const togglePromotions = () => {
    setIsPromotionsExpand(!isPromotionsExpand);
  };

  const toggleEvents = () => {
    setIsEventsExpand(!isEventsExpand);
  };

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const studentData = response.data;

      // Check if there are promotions and initially expand the promotions section
      const hasPromotions = studentData.promotions && studentData.promotions.length > 0;
      setIsPromotionsExpand(hasPromotions);

      // Find the last promotion date
      const lastPromotionDate = studentData.promotions.length > 0 ? studentData.promotions[studentData.promotions.length - 1].date : null;

      setStudent({ ...studentData, last_promotion: lastPromotionDate });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRanks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/ranks', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setRanks(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getStudent();
    getAllRanks();
  }, [id, token]);

  const getCurrentRankTitle = () => {
    if (student && student.promotions.length > 0) {
      const lastPromotion = student.promotions[student.promotions.length - 1];
      const rank = ranks.find((r) => r.id === lastPromotion.rank.id);
      if (rank) {
        return rank.title;
      }
    }
    return '';
  };

  const handleToggleIsCoach = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:5000/api/coach_review/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the student object with the updated is_coach value
      setStudent((prevStudent) => ({
        ...prevStudent,
        is_coach: !prevStudent.is_coach,
      }));
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page (StudentListPage)
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handleBack}>Close</button>
      </div>
      <div>
        <h1>Student Details</h1>
      </div>
      {student && (
        <div>
          <p>First Name: {student.first_name}</p>
          <p>Last Name: {student.last_name}</p>
          <p>Start Date: {student.start_date}</p>
          <p>Last Promotion: {student.last_promotion}</p>
          <p>Current Rank: {getCurrentRankTitle()}</p>
          <p>
            Is Coach: 
            <button onClick={handleToggleIsCoach}>
              {student.is_coach ? 'Yes' : 'No'}
            </button>
          </p>
          <p>Total Points: {student.point_total}</p>
          <RankProgressChart promotions={student.promotions} />
          <p>
            <button onClick={togglePromotions}>
              {isPromotionsExpand ? 'Collapse Promotions' : 'Expand Promotions'}
            </button>
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
            <button onClick={toggleEvents}>{isEventsExpand ? 'Collapse Events' : 'Expand Events'}</button>
          </p>
          {isEventsExpand && (
            <ul>
              {student.events.map((event) => (
                <li key={event.id}>
                  Date: {event.date}, Title: {event.title}, Type: {event.type}, Points: {event.points}, Capacity: {event.capacity}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetailPage;












