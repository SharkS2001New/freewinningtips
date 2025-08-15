import React from 'react';

function AdminSelectionsWinningTeam(tip, goals_home, goals_away) {
    let winning_team = "";
    let has_won = ""; // Initialize has_won as an empty string

    let winnings_array = [];

    // Check if goals_home and goals_away are not null
    const goalsAvailable = goals_home !== null && goals_away !== null;

    if (goalsAvailable) {
        // Determine prediction
        if (tip === "1" && goals_home > goals_away) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "X" && goals_home === goals_away) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "2" && goals_home < goals_away) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "DC1X" && (goals_home >= goals_away || goals_home === goals_away)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "DCX2" && (goals_home <= goals_away || goals_home === goals_away)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "DC12" && goals_home !== goals_away) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "GG" && goals_home > 0 && goals_away > 0) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "NOGOAL" && (goals_home === 0 || goals_away === 0)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "BTS" && (goals_home > 0 && goals_away > 0)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV15" && (parseInt(goals_home) + parseInt(goals_away)) >= 2) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV25" && (parseInt(goals_home) + parseInt(goals_away)) >= 3) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV35" && (parseInt(goals_home) + parseInt(goals_away)) >= 4) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV45" && (parseInt(goals_home) + parseInt(goals_away)) >= 5) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV55" && (parseInt(goals_home) + parseInt(goals_away)) >= 6) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV65" && (parseInt(goals_home) + parseInt(goals_away)) >= 7) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="OV75" && (parseInt(goals_home) + parseInt(goals_away)) >= 8) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="UN15" && (parseInt(goals_home) + parseInt(goals_away)) <= 2) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN25" && (parseInt(goals_home) + parseInt(goals_away)) <= 3) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN35" && (parseInt(goals_home) + parseInt(goals_away)) <= 4) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN45" && (parseInt(goals_home) + parseInt(goals_away)) <= 5) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN55" && (parseInt(goals_home) + parseInt(goals_away)) <= 6) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN65" && (parseInt(goals_home) + parseInt(goals_away)) <= 7) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="UN75" && (parseInt(goals_home) + parseInt(goals_away)) <= 8) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        }
    }

    winnings_array.push(winning_team, has_won);

    return winnings_array;
}

const wonStyle = {
    fontWeight: "bold",
    borderRadius: "20px",
    padding: "5px",
    backgroundColor: "green",
    border: "1px solid green",
    color: "white",
    fontSize: "12px"
};

export default AdminSelectionsWinningTeam;