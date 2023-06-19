import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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

  const handlePromote = () => {
    // Redirect to PromotionPage
    navigate('/promotion');
  };

  const handleViewDetails = (studentId) => {
    const student = students.find((student) => student.id === studentId);
    if (student) {
      // Redirect to the details page with the selected student's data
      navigate(`/student/${student.id}`);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/coach_review/${studentId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      getAllStudents(); // Refresh the student list after deletion
      alert('Student deleted successfully');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <button onClick={handlePromote}>Promote</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Points</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.point_total}</td>
                <td>
                  <button onClick={() => handleViewDetails(student.id)}>Details</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
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

