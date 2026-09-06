import { buildMatchPathFromFixture } from '@/components/functions/detailsUrls';

function MatchOutcomesHome(props){
    let home_team_matches = props.props;

    var computedWins = [];
 
    if(home_team_matches && home_team_matches.length>5){
         for(let y =0;y<5;y++){
            const match = home_team_matches[y];
            if (!match) continue;

            var tooltipTitle = (match.home_team_name || match.home_team?.name || '') +'  ('+ match.goals_home +'-'+match.goals_away +')  '+ (match.away_team_name || match.away_team?.name || '')+ "\n"
            +match.date;
 
            const matchHref = buildMatchPathFromFixture(match);
            const homeId = match.home_team_id || match.home_team?.id;
            const awayId = match.away_team_id || match.away_team?.id;

            if(props.home_team_id == homeId){
                if(match.goals_home > match.goals_away){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"green",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            W
                        </span>
                    </a>
                    )
                }else if(match.goals_home===match.goals_away){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"#ffb400",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            D
                        </span>
                    </a>
                    )        
                }else if(match.goals_home < match.goals_away){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"red",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            L
                        </span>
                    </a>
                    )
                }
            }else if(props.home_team_id == awayId){
                if(match.goals_away > match.goals_home){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"green",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            W
                        </span>
                    </a>
                    )
                }else if(match.goals_away===match.goals_home){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"#ffb400",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            D
                        </span>
                    </a>
                    )
        
                }else if(match.goals_away < match.goals_home){
                    computedWins.push(
                    <a href={matchHref} title="Click to View Match details" key={y}>       
                        <span className="number-circle rounded-square" data-toggle="tooltip" style={{backgroundColor:"red",margin:"0.5px",cursor:'pointer'}} title={tooltipTitle}>
                            L
                        </span>
                    </a>
                    )
                }
            }
         }
    }
 
    return computedWins;

}

export default MatchOutcomesHome;
