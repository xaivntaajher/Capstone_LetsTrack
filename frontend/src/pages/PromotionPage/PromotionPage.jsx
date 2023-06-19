import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PromotionPage = () => {
  const [user, token] = useAuth();
  const [promotionData, setPromotionData] = useState({
    id: null,
    user_id: 5,
    rank_id: 7,
    date: '2023-07-20',
  });
  const [rankOptions, setRankOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRankOptions();
    fetchUserOptions();
  }, []);

  const fetchRankOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/ranks', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setRankOptions(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchUserOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/coach_review', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setUserOptions(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const generateUniqueId = () => {
    // Generate a unique ID using a suitable method
    const uniqueId = Math.floor(Math.random() * 1000000); // Example: using random number
    setPromotionData({ ...promotionData, id: uniqueId });
  };

  useEffect(() => {
    generateUniqueId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/promotions',
        promotionData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(response.data);
      // Perform any necessary actions after successful promotion
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page (StudentListPage)
  };

  return (
    <div>
      <h2>Promotion Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <select
            name="user_id"
            value={promotionData.user_id}
            onChange={(e) =>
              setPromotionData({ ...promotionData, user_id: e.target.value })
            }
          >
            {userOptions.map((userOption) => (
              <option key={userOption.id} value={userOption.id}>
                {userOption.first_name} {userOption.last_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Rank:
          <select
            name="rank_id"
            value={promotionData.rank_id}
            onChange={(e) =>
              setPromotionData({ ...promotionData, rank_id: e.target.value })
            }
          >
            {rankOptions.map((rankOption) => (
              <option key={rankOption.id} value={rankOption.id}>
                {rankOption.title}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={promotionData.date}
            onChange={(e) =>
              setPromotionData({ ...promotionData, date: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Promote</button>
        <button type="button" onClick={handleBack}>Close</button>
      </form>
    </div>
  );
};

export default PromotionPage;

