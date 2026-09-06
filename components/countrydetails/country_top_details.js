import React from 'react';
import PreLoader from '../includes/loader';
import { buildCountryPath } from '@/components/functions/detailsUrls';

function  CountriesDetailsTop(props){    
    let country_details = props.props

    if(country_details  !=undefined){
       const countryName = country_details.country_name || '';
       const countryHref = countryName ? buildCountryPath(countryName) : '#';
        return (
            <React.Fragment>
                <div className="col-sm-12 text-left text-nowrap">
                    <div className='container'>
                        <img src={country_details.downloaded_country_flag}  className="img-fluid league-logo" alt={countryName + "-football-predictions"} loading="lazy" />&nbsp;

                        <span style={{fontWeight:"bold",whiteSpace:"break-spaces"}} className="fixturesTextSize">
                            <a href={countryHref} className="ml-2 linkTxt">{(countryName || '').toUpperCase()}</a>
                        </span>
                    </div>
                </div>
            </React.Fragment>
        )
    }else{
        return <PreLoader/>
    }

}

export default CountriesDetailsTop;
