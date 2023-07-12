import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';

const StudentList = (props, getStudent) => {
  const [students, setStudents] = useState([]);
  const [user, token] = useAuth();
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();
  
  const getAllStudents = async () => {
    try {
      const response = await axios.get('http://3.134.97.22:8000/api/coach_review', {
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
      const response = await axios.get('http://3.134.97.22:8000/api/ranks', {
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

  const handleDelete = async (key) => {
    try {
      const response = await axios.delete(`http://3.134.97.22:8000/api/coach_review/${key}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response); // Log the response object to inspect its structure
      getAllStudents(); // Refresh the student list after deletion
      alert('Student deleted successfully');
    } catch (error) {
      console.log(error.response);
    }
  };
  

  return (
    <div>
      <div className='std-list'>
        <h1 className='text-2'>Student List</h1>
          <button className='text-2' onClick={handlePromote}>Promote</button>
          <div className='text'>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Details</th>
                  {/* <th>Remove</th> */}
                </tr>
              </thead>
              <tbody className='text-2'>
                {students.map((student) => {
                  return (
                    <tr key={student.id}>
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>
                        <button  onClick={() => handleViewDetails(student.id)}>Details</button>
                      </td>
                      {/* <td>
                        <button className='btn btn:hover' onClick={() => handleDelete(student.id)}>Remove</button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default StudentList;

