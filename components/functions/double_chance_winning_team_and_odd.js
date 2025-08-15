function DoubleChanceWinningTeam(hometeamodd, drawodd, awayteamodd, goals_home, goals_away) {
  let winning_team = "";
  let has_won = ""; // Initialize has_won as an empty string

  let winnings_array = [];

  // Determine prediction
  if ((hometeamodd > drawodd && hometeamodd > awayteamodd) && drawodd > awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((hometeamodd > drawodd && hometeamodd > awayteamodd) && drawodd === awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((awayteamodd > drawodd && awayteamodd > hometeamodd) && drawodd === hometeamodd) {
      winning_team = "X2";

      if ((goals_home !== null && goals_away !== null) && (goals_away > goals_home || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((drawodd > hometeamodd && drawodd > awayteamodd) && awayteamodd > hometeamodd) {
      winning_team = "X2";

      if ((goals_home !== null && goals_away !== null) && (goals_away > goals_home || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((drawodd > hometeamodd && drawodd > awayteamodd) && hometeamodd > awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((awayteamodd > hometeamodd && awayteamodd > drawodd) && hometeamodd > drawodd) {
      winning_team = "12";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_away > goals_home)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((awayteamodd > hometeamodd && awayteamodd > drawodd) && drawodd > hometeamodd) {
      winning_team = "X2";

      if ((goals_home !== null && goals_away !== null) && (goals_away > goals_home || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if ((hometeamodd > drawodd && hometeamodd > awayteamodd) && awayteamodd > drawodd) {
      winning_team = "12";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_away > goals_home)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (hometeamodd === drawodd && drawodd === awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (hometeamodd === drawodd && hometeamodd > awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (hometeamodd === awayteamodd && hometeamodd > drawodd) {
      winning_team = "12";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_away > goals_home)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (awayteamodd === drawodd && awayteamodd > hometeamodd) {
      winning_team = "X2";

      if ((goals_home !== null && goals_away !== null) && (goals_away > goals_home || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (hometeamodd === awayteamodd && drawodd > hometeamodd) {
      winning_team = "X2";

      if ((goals_home !== null && goals_away !== null) && (goals_away > goals_home || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  } else if (hometeamodd === awayteamodd && drawodd > awayteamodd) {
      winning_team = "1X";

      if ((goals_home !== null && goals_away !== null) && (goals_home > goals_away || goals_home === goals_away)) {
        has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>; 
      }
  }

  winnings_array.push(winning_team, has_won);

  return winnings_array;
}

export default DoubleChanceWinningTeam;
