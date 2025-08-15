import { useRouter } from 'next/router';

function UnderOverWinningTeamAndOdd(averageGoals){
    let winning_team = "";
    const router = useRouter();  

    var winning_preds_array = [];

    if (averageGoals === "-") {
      winning_team = "-";
    } else {
      const path = router.pathname.substring(1);
    
      // determine prediction based on the URL path
      if (path === "predictions/1-5-goals") {
        winning_team = averageGoals < 1.5 ? "Under" : "Over";
      } else if (path === "predictions/2-5-goals") {
        winning_team = averageGoals < 2.5 ? "Under" : "Over";
      } else if (path === "predictions/3-5-goals") {
        winning_team = averageGoals < 3.5 ? "Under" : "Over";
      } else {
        winning_team = "-"; // fallback for other paths if necessary
      }
    }      

    // winning_preds_array.push(winning_team);
      
    return winning_team;
}

export default UnderOverWinningTeamAndOdd;