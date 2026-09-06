import React from 'react';
import PreLoader from '../includes/loader';
import MatchOutcomesHome from '../matchdetails/match_outcomes_home_drawings';
import {
  buildCountryPath,
  buildLeaguePath,
} from '@/components/functions/detailsUrls';

function TeamDetailsTop(props) {    
    let team_details = props.props;

    if (team_details && team_details !== undefined) {
        // Safely get team information from NEW nested structure
        const isHomeTeam = props.team_id === (team_details.home_team?.id || team_details.home_team_id);
        
        // Get team names from new structure with fallbacks
        const teamName = isHomeTeam 
            ? (team_details.home_team?.name || team_details.home_team_name || '')
            : (team_details.away_team?.name || team_details.away_team_name || '');
        
        const teamLogo = isHomeTeam 
            ? (team_details.home_team?.logo || team_details.home_team_logo || '')
            : (team_details.away_team?.logo || team_details.away_team_logo || '');
        
        // Get league and country info from new structure
        const league = team_details.league || {};
        const countryName = league.country || team_details.country_name || '';
        const leagueName = league.name || team_details.league_name || '';
        const leagueId = league.id || team_details.league_id || '';
        
        // Get logos from new structure
        const countryLogo = league.country_logo || team_details.downloaded_country_flag || '';
        const leagueLogo = league.logo || team_details.downloaded_league_logo || '';

        const countryHref = countryName ? buildCountryPath(countryName) : null;
        const leagueHref =
          countryName && leagueName && leagueId
            ? buildLeaguePath(countryName, leagueName, leagueId)
            : null;

        return (
            <React.Fragment>
                <div className="col-sm-12 text-left text-nowrap pb-1 pt-1 mb-3">
                    <div className='container'>
                        {(countryLogo || leagueLogo) ? (
                            <img 
                                src={countryLogo || leagueLogo} 
                                className="img-fluid league-logo" 
                                alt={countryName + "-football-predictions"} 
                                loading="lazy"
                                style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : null}
                        &nbsp;

                        <span style={{ fontWeight: "bold", whiteSpace: "break-spaces" }} className="fixturesTextSize">
                            {countryHref ? (
                                <a 
                                    href={countryHref} 
                                    className="ml-2 linkTxt"
                                >
                                    {countryName.toUpperCase()}
                                </a>
                            ) : null}
                            {countryName && leagueName && " : "}
                            {leagueHref ? (
                                <a 
                                    href={leagueHref} 
                                    className="ml-2 linkTxt"
                                >
                                    {leagueName.toUpperCase()}
                                </a>
                            ) : null}
                        </span>
                    </div>
                </div>
                <div className="row fixturesTextSize">
                    <div className="col-md-6 col-sm-12" style={{ textAlign: "left" }}>
                        <div className="row container">
                            <div className="col-4">
                                {teamLogo && (
                                    <img 
                                        className="teamimage_class" 
                                        src={teamLogo} 
                                        alt={teamName + "-predictions-and-fixtures"}
                                        style={{ width: "80px", height: "80px" }}
                                        onError={(e) => { e.target.src = '/placeholder-team.png'; }}
                                    />
                                )}
                            </div>
                            <div className="col-8 fixturesTextSize">
                                <h6 style={{ fontWeight: "bold", whiteSpace: "pre-wrap" }}>
                                    {teamName}
                                </h6>
                                <br />
                                
                                {props.last_6_matches && props.last_6_matches.length > 0 && (
                                    <MatchOutcomesHome props={props.last_6_matches} home_team_id={props.team_id} />
                                )}
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-0"></div>
                </div>
                <br />
            </React.Fragment>
        );
    } else {
        return <PreLoader/>
    }
}

export default TeamDetailsTop;
