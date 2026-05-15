import React from 'react';

function DetermineWinningOrLost(tip, goals_home, goals_away) {
    let has_won = ""; // Initialize has_won as an empty string

    // Check if goals_home and goals_away are not null
    const goalsAvailable = goals_home !== null && goals_away !== null;

    if (goalsAvailable) {
        // Determine prediction
        if (tip === "1" && goals_home > goals_away) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "X" && goals_home === goals_away) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "2" && goals_home < goals_away) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "1X" && (goals_home >= goals_away || goals_home === goals_away)) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "X2" && (goals_home <= goals_away || goals_home === goals_away)) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "12" && goals_home !== goals_away) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "GG" && goals_home > 0 && goals_away > 0) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "No" && (goals_home === 0 || goals_away === 0)) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Yes" && (goals_home > 0 && goals_away > 0)) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Over1.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 2) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Over2.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 3) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Over3.5" && (parseInt(goals_home) + parseInt(goals_away)) >= 4) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Under1.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 2) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Under2.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 3) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (tip === "Under3.5" && (parseInt(goals_home) + parseInt(goals_away)) <= 4) {
            has_won = <span style={wonStyle}>✓</span>;
        } else if (goalsAvailable && (tip === "1" || tip === "X" || tip === "2" || tip === "1X" || tip === "X2" || tip === "12" || 
                   tip === "GG" || tip === "No" || tip === "Yes" || tip === "Over1.5" || tip === "Over2.5" || tip === "Over3.5" || 
                   tip === "Under1.5" || tip === "Under2.5" || tip === "Under3.5")) {
            // If none of the winning conditions matched, it's a loss
            has_won = <span style={lostStyle}>✗</span>;
        }
    }

    return has_won;
}

const wonStyle = {
    fontWeight: "bold",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
    fontSize: "12px",
    marginLeft: "5px"
};

const lostStyle = {
    fontWeight: "bold",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    color: "white",
    fontSize: "12px",
    marginLeft: "5px"
};

export default DetermineWinningOrLost;