import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const StudentListPage = (props) => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [user, token] = useAuth();
  const [expandedPromotions, setExpandedPromotions] = useState([]);

  const getAllStudents = async () => {
    try {
      console.log(token);
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



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Rank</th>
            <th>Last Promotion</th>
            <th>Is Coach</th>
            <th>Total Points</th>
            <th>Promotions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.start_date}</td>
                <td>{student.rank ? student.rank.title : '-'}</td>
                <td>{student.last_promotion}</td>
                <td>{student.is_coach ? student.is_coach.toString() : '-'}</td>
                <td>{student.point_total}</td>
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;


