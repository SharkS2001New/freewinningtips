import React from 'react';

function DetermineWinningOrLost(tip, goals_home, goals_away) {
    let winning_team = "";
    let has_won = ""; // Initialize has_won as an empty string

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

        } else if (tip === "1X" && (goals_home >= goals_away || goals_home === goals_away)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "X2" && (goals_home <= goals_away || goals_home === goals_away)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "12" && goals_home !== goals_away) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "GG" && goals_home > 0 && goals_away > 0) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "No" && (goals_home === 0 || goals_away === 0)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip === "Yes" && (goals_home > 0 && goals_away > 0)) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="Over1.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 2) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="Over2.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 3) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="Over3.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 4) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;

        } else if (tip ==="Under1.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 2) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="Under2.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 3) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } else if (tip ==="Under3.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 4) {
            winning_team = tip;

            has_won = <span style={wonStyle}>Won</span>;
        } 
    }

    return has_won;
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

export default DetermineWinningOrLost;
