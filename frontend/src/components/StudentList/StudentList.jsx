import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PromotionPage from '../../pages/PromotionPage/PromotionPage';

const StudentList = (props) => {
  const [students, setStudents] = useState([]);
  const [user, token] = useAuth();
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();

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
    getAllStudents();
    getAllRanks();
  }, []);

  const handlePromote = (studentId) => {
    const student = students.find((student) => student.id === studentId);
    if (student) {
      // Redirect to PromotionPage with the selected student's data
      navigate('/promotion', { state: { studentData: student } });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Details</th>
            <th>Promote</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>
                  <Link to={`/student/${student.id}`}>View Details</Link>
                </td>
                <td>
                  <button onClick={() => handlePromote(student.id)}>Promote</button>
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





