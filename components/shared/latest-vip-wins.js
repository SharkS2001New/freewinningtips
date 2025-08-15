import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DateTimeToUsersTimezone from "../functions/DatetimeToUsersTimezone";

function LatestVIPWins(props) {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); // defined as an array 
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetch_url = "https://admin.pitchpredictions.com/api/fetch-latest-vip-fixtures";

  useEffect(() => { 
    if (router.isReady) { 
      getLatestVIPPredictionsData(fetch_url).then(data => {
        if (data.status === true) {
          setGames(data.data);
        } else {
          setGames([]);
        }
        setLoading(false); // Set loading to false after fetching data
      }).catch(error => {
        console.error(error);
        setGames([]);
        setLoading(false); // Set loading to false even if there's an error
      });
    }
  }, [router.isReady]);

  async function getLatestVIPPredictionsData(fetch_url) {    
    const headers = { 
      "Authorization": "UJlhuDILIR1Lc2IEwZDIKOln9d",
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(fetch_url, {
        method: 'POST',
        headers: headers,
      });

      const data = await response.json();
      return data;          

    } catch (error) {
      console.error(error);
    }
  }

  const visibleFixtures = showMore ? gamesfixtures : gamesfixtures.slice(0, 7);

  return (
    <React.Fragment>
      {loading ? (
        <div className="d-flex justify-content-center mb-20">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : gamesfixtures.length > 0 ? (
        <>
          <div className="text-center container mb-3" style={{ margin: "auto" }}>
            <h2 className="h1headerTitle">{props.title}</h2>
          </div>
          <table className="styled-table container">
            <thead>
              <tr>
                <th scope="col" style={{ width: "5%" }}>Date</th>
                <th scope="col" style={{ width: "8%" }}>Time</th>
                <th scope="col">Match</th>
                <th scope="col" style={{ textAlign: "center" }}>Tip</th>
                <th scope="col text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              {visibleFixtures.map((fixture, index) => (
                <tr key={index}>
                  <td style={{ width: "5%" }}>
                    {`${DateTimeToUsersTimezone(fixture.fixture_date).split(' ')[0].split('/').reverse().join('/').replace(/^(\d{4})\//, '')}`}
                  </td>
                  <td style={{ width: "8%" }}>
                    {`${DateTimeToUsersTimezone(fixture.fixture_date).split(' ')[1]}`}
                  </td>
                  <td>
                    {fixture.home_team_name} &nbsp;
                    <span style={{ color: 'red' }}>VS</span> &nbsp;
                    {fixture.away_team_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', fontWeight: "bold", fontSize: "14px" }}>{fixture.tip}</div>&nbsp;
                  </td>
                  <td>
                    <div style={{ display: 'inline-block', marginRight: '7px', fontWeight: "bold", fontSize: "15px" }}>
                      {fixture.goals_home !== null && fixture.goals_away !== null
                        ? `${fixture.goals_home} - ${fixture.goals_away}`
                        : "-"}
                    </div>
                    <div style={{ display: 'inline-block' }}>
                      <span style={{ fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px" }}>Won</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!showMore && gamesfixtures.length > 7 && (
            <div className="text-center">
              <button
                className="btn btn-link fixturesTextSize"
                style={{ color: "blue", textDecoration: "underline", fontWeight: "bold", border: "none", textAlign: "left" }}
                onClick={() => setShowMore(true)}
              >
                Show All Matches&nbsp;&nbsp;<i className="bi bi-arrow-down-circle-fill"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mb-20">
          {/* <p>No fixtures available at the moment.</p> */}
        </div>
      )}
      <br/>
    </React.Fragment>
  )
}

export default LatestVIPWins;
