import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const StudentList = (props) => {
  const [students, setStudents] = useState([]);
  const [user, token] = useAuth();
  const [expandPromotions, setExpandPromotions] = useState([]);

  const getAllStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/coach_review', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const togglePromotion = (student_id) => {
    if (expandPromotions.includes(student_id)) {
      // Promotion is already expanded, collapse it
      setExpandPromotions(expandPromotions.filter((id) => id !== student_id));
    } else {
      // Promotion is not expanded, expand it
      setExpandPromotions([...expandPromotions, student_id]);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Promotions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const isExpanded = expandPromotions.includes(student.id);
            return (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>
                  <button type="button" onClick={() => togglePromotion(student.id)}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                  {isExpanded && student.promotions && student.promotions.length > 0 && (
                    <ul>
                      {student.promotions.map((promotion) => (
                        <li key={promotion.id}>
                          <div>Date: {promotion.date}</div>
                          <div>User ID: {promotion.user_id}</div>
                          <div>Rank: {promotion.rank ? promotion.rank.title : '-'}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  <Link to={`/student/${student.id}`}>Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;



