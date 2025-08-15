import React from "react";
import { useRouter } from 'next/router';

function Navbar(){
    const router = useRouter();

    return(
    <React.Fragment>
    <div className="" style={{backgroundColor: "#05384B", color: "white"}}>
        <div className="container">
            {/* /** Header is here**/}
        </div>
    </div>
    {/**For Desktop or Large Device */}
    <div className="" style={{backgroundColor: "#05386B", color: "white"}}>
        <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-0">
            <div className="d-none d-xl-block d-lg-block align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none" style={{ height: "100%", width: "25%", display: "block" }}>
                <a className="navbar-brand fs-4" href="/"><img src="/freewinningtipslogo.png" style={{ height: "100%", width: "100%" }} alt="logo" /></a>
            </div>
            <div className="d-lg-none" style={{ height: "100%", width: "100%", objectFit: "contain" }}>
                <a className="navbar-brand d-lg-none" href="/"><img src="/freewinningtipslogo.png" height="100%" width="100%" alt="logo" /></a>
            </div>
            <div className="d-none d-xl-block d-lg-block">
                <div className="row justify-content-around">
                    <div className="col d-flex justify-content-center">
                        <a className="nav-link text-light" href="/" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>Free Tips</a>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle text-light" 
                                href="/" 
                                id="predictionsDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                            >
                            Predictions
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="predictionsDropdown">
                                <li><a className="dropdown-item" href="/predictions/todays-predictions">Todays Predictions</a></li>
                                <li><a className="dropdown-item" href="/predictions/double-chance">Double Chance</a></li>
                                <li><a className="dropdown-item" href="/predictions/1-5-goals">1.5 Goals</a></li>
                                <li><a className="dropdown-item" href="/predictions/2-5-goals">2.5 Goals</a></li>
                                <li><a className="dropdown-item" href="/predictions/3-5-goals">3.5 Goals</a></li>
                                <li><a className="dropdown-item" href="/predictions/gg-no-gg">GG/NO GG</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <a className="nav-link text-light" href="/free-vip-tips-today" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>Vip Tips</a>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <a className="nav-link text-light" href="/jackpot-predictions" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>Jackpots</a>
                    </div>
                </div>
            </div>
        </header>
        </div>
    </div>
    {/**For Mobile Device */}
    <div className="d-lg-none" style={{backgroundColor: "#05384B", color: "white"}}>
        <div className="container-fluid">
            <div className="col-lg-12 col-sm-12">
                <div className="nav scrollable nav-fill small position-relative flex-nowrap fixturesTextSize pb-2 pt-2">
                    <a href="/" className={`nav-link scroll-card ${router.pathname.substring(1) === "" ? "activeElement" : ""}`}>
                        Free Tips
                    </a>
                    
                    {/* Predictions Dropdown */}
                    <div className="nav-item dropdown mx-2">
                        <a 
                            className={`nav-link dropdown-toggle scroll-card ${router.pathname.substring(1) === "predictions" ? "activeElement" : ""}`}
                            href="#" 
                            id="predictionsDropdown" 
                            role="button"  
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                        Predictions
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="predictionsDropdown">
                            <li><a className="dropdown-item" href="/predictions/todays-predictions">Todays Predictions</a></li>
                            <li><a className="dropdown-item" href="/predictions/double-chance">Double Chance</a></li>
                            <li><a className="dropdown-item" href="/predictions/1-5-goals">1.5 Goals</a></li>
                            <li><a className="dropdown-item" href="/predictions/2-5-goals">2.5 Goals</a></li>
                            <li><a className="dropdown-item" href="/predictions/3-5-goals">3.5 Goals</a></li>
                            <li><a className="dropdown-item" href="/predictions/gg-no-gg">GG/NO GG</a></li>
                        </ul>
                    </div>
                                        
                    <a href="/free-vip-tips-today" className={`nav-link scroll-card ${router.pathname.substring(1) === "free-vip-tips-today" ? "activeElement" : ""}`}>
                        Vip Tips
                    </a>
                    <a href="/jackpot-predictions" className={`nav-link scroll-card ${router.pathname.substring(1) === "jackpot-predictions" ? "activeElement" : ""}`}>
                        Jackpots
                    </a>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment> 
    )
}

export default Navbar;