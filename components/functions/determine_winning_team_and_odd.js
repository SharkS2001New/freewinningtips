import React from 'react';

function WinningTeamPred1x2(hometeamodd, drawodd, awayteamodd, goals_home, goals_away) {
    let winning_team = "";
    let has_won = ""; // Initialize has_won as an empty string

    let winnings_array = [];

    // Check if goals_home and goals_away are not null
    const goalsAvailable = goals_home !== null && goals_away !== null;

    // Determine prediction
    if (hometeamodd > drawodd && hometeamodd > awayteamodd) {
        winning_team = "1";

        if (goalsAvailable && goals_home > goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (drawodd > hometeamodd && drawodd > awayteamodd) {
        winning_team = "X";

        if (goalsAvailable && goals_home === goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (awayteamodd > drawodd && awayteamodd > hometeamodd) {
        winning_team = "2";

        if (goalsAvailable && goals_home < goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (drawodd === hometeamodd && awayteamodd < hometeamodd) {
        winning_team = "1";

        if (goalsAvailable && goals_home === goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (drawodd === hometeamodd && awayteamodd > drawodd) {
        winning_team = "2";

        if (goalsAvailable && goals_home < goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (drawodd === awayteamodd && hometeamodd < awayteamodd) {
        winning_team = "X";
    } else if (hometeamodd === awayteamodd && hometeamodd > drawodd) {
        winning_team = "1"; 

        if (goalsAvailable && goals_home > goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (hometeamodd === drawodd && drawodd === awayteamodd) {
        winning_team = "X";

        if (goalsAvailable && goals_home === goals_away) {
            has_won = <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    }

    winnings_array.push(winning_team, has_won);

    return winnings_array;
}

export default WinningTeamPred1x2;
