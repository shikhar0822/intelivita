import { useEffect, useState } from 'react';
import './App.css';
import { getCalculate, getLeaderboard } from './api/apiHandler';
import Swal from 'sweetalert2'

function App() {
  const [userId, setUserId] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    getLeaderboard({}).then((response) => {
      if(response.status == 200){
        setLeaderboardData(response.data);
      }
      else{
        setLeaderboardData([]);
      }
    });
  }, [])

  const handleRecalculate = () => {
    getCalculate({ filter: sortBy }).then((response) => {
      if(response.status == 200){
        Swal.fire({
          title: "Recalculate Successfully!",
          text: "You clicked the button!",
          icon: "success"
        });
      }
    });
  };

  const handleFilter = () => {
    getLeaderboard({ search: userId }).then((response) => {
      if(response.status == 200){
        setLeaderboardData(response.data);
      }
      else{
        setLeaderboardData([]);
      }
    });
  };

  if(leaderboardData == null) return <></>
  return (
    <>
      <div class="container">
        <div class="controls">
          <button class="button" onClick={handleRecalculate}>Recalculate</button>
          <div class="form-row">
            <label for="userId">User ID</label>
            <input type="text" id="userId" class="input" placeholder="Enter ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button class="button" onClick={handleFilter}>Filter</button>
          </div>
          <div class="dropdown-container">
            <label for="sort">Sort by&nbsp;</label>
            <select id="sort" class="dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Points</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData && leaderboardData.map((item, index) => {
              return(
                <tr class="row highlight" key={index}>
                  <td>{item._id}</td>
                  <td>{item.full_name}</td>
                  <td>{item.total_points}</td>
                  <td>{`#${item.rank}`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
