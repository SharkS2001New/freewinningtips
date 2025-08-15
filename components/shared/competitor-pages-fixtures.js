import React from "react";
import DateTimeToUsersTimezone from "../functions/DatetimeToUsersTimezone";
import DoubleChanceWinningTeam from "../functions/double_chance_winning_team_and_odd";
import WinningTeamPred1x2 from "../functions/determine_winning_team_and_odd";
import AdminSelectionsWinningTeam from "../functions/admin_selections_winning_team";
import { Adsense } from "@ctrl/react-adsense";

function CompetitorPagesFixtures(props){
  let winningtip = "";
  let doubleChancewinningTip = "";
    return (
    <React.Fragment>          
    <div className="d-flex flex-wrap justify-content-center pt-2"  style={{color: "black",fontWeight:"bold" }}>
        <h2 className="sectionTitle">{props.title}</h2>
    </div> 
    {/* Check if adminGamesfixtures has data */}
    {props.adminGamesfixtures.length > 0 ? 
      <table className="styled-table">
      <thead>
        <tr>
          {/* <th scope="col" style={{width: "20%"}}>League</th> */}
          <th scope="col" style={{width: "10%"}}>Time</th>
          <th scope="col">Fixture</th>
          <th scope="col" style={{textAlign: "center"}}>Tip</th>
          <th scope="col text-left">Result</th>
        </tr>
      </thead>
      <tbody>
        {props.adminGamesfixtures.map((fixture, index) => (
          winningtip = AdminSelectionsWinningTeam(fixture.tip,fixture.goals_home,fixture.goals_away),
          //Call function to convert date time to users timezone
          <tr key={index}>
            <td style={{width: "10%"}}>{`${DateTimeToUsersTimezone(fixture.date).split(' ')[1]}`}</td>
            <td>{fixture.home_team_name} &nbsp;<span style={{ color: 'red' }}>VS</span> &nbsp;{fixture.away_team_name}</td>
            <td style={{ textAlign: "center" }}>
                {fixture.tip}
            </td>
            <td>
              <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                {fixture.goals_home !== null && fixture.goals_away !== null
                ? `${fixture.goals_home} - ${fixture.goals_away}`
                : "-"}
              </div>&nbsp;
              <div style={{ display: 'inline-block' }}>{winningtip[1]}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    :
    props.gamesfixtures.length >0 ?
      <table className="styled-table">
        <thead>
          <tr>
            {/* <th scope="col" style={{width: "20%"}}>League</th> */}
            <th scope="col" style={{width: "10%"}}>Time</th>
            <th scope="col">Fixture</th>
            <th scope="col" style={{textAlign: "center"}}>Tip (1X2)</th>
            <td scope="col" style={{fontWeight: "bold", textAlign: "center"}}>Tip (DC)</td>
            <th scope="col text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          {props.gamesfixtures.map((fixture, index) => (
            winningtip = WinningTeamPred1x2(fixture.percent_pred_home,fixture.percent_pred_draw,fixture.percent_pred_away, fixture.goals_home, fixture.goals_away),
            doubleChancewinningTip =  DoubleChanceWinningTeam(fixture.percent_pred_home,fixture.percent_pred_draw,fixture.percent_pred_away, fixture.goals_home, fixture.goals_away),
            //Call function to convert date time to users timezone
            <tr key={index}>
              <td style={{width: "10%"}}>{`${DateTimeToUsersTimezone(fixture.date).split(' ')[1]}`}</td>
              <td>{fixture.home_team_name} &nbsp;<span style={{ color: 'red' }}>VS</span> &nbsp;{fixture.away_team_name}</td>
              <td style={{ textAlign: "center" }}>
                  <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>{winningtip[0]}</div>&nbsp;
                  <div style={{ display: 'inline-block' }}>{winningtip[1]}</div>
              </td>
              <td style={{ textAlign: "center" }}>
                  <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>{doubleChancewinningTip[0]}</div>&nbsp;
                  <div style={{ display: 'inline-block' }}>{doubleChancewinningTip[1]}</div>
              </td>
              <td>
                {fixture.goals_home !== null && fixture.goals_away !== null
                  ? `${fixture.goals_home} - ${fixture.goals_away}`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       : 
       //Show Loading
       <div className="d-flex justify-content-center mb-20">
         <div className="spinner-border" role="status">
           <span className="sr-only"></span>
         </div>
       </div>
    }

      <div className="container justify-content-center mb-2">
        <div className="position-relative pt-3">
            <div className="row  nav scrollable">
                <div className="col-lg-3 col-4 ">
                    <div className="d-grid gap-2 mx-auto">
                        <a className="btn btn-warning btn-sm" type="button" href="/vip-packages" style={{whiteSpace: "nowrap",fontWeight: 'bold', marginLeft: "0px"}}>VIP PACKAGES</a>
                    </div>
                </div>
                <div className="col-lg-3 col-4">
                    <div className="d-grid gap-2 mx-auto">
                        <a className="btn btn-primary btn-sm" type="button" style={{whiteSpace: "nowrap",marginLeft: "5px", fontWeight: "bold"}} href="/tip-of-the-day">TIP OF THE DAY </a>
                    </div>
                </div>
                <div className="col-lg-3 col-4">
                    <div className="d-grid gap-2 mx-auto">
                        <a href="https://api.whatsapp.com/send/?phone=254799489335&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm" type="button" style={{whiteSpace: "nowrap", marginLeft: "10px", fontWeight: "bold"}}>WHATSAPP</a>
                    </div>
                </div>
            </div>  
        </div>
        <br/>
    </div>
    <br/>
    <div className="container justify-content-center">
      <Adsense
          client="ca-pub-5665711413000284"
          slot="4141567825"
          style={{ display: "block" }}
          layout="display"
          format="auto"
      /> 
    </div>
    <br/>
    </React.Fragment>
      );      
}

export default CompetitorPagesFixtures;