import React from "react";

function PreLoader() {
  return (
    <React.Fragment>
        <br/><br/>
        <br/><br/>
        <div className="d-flex justify-content-center mb-20">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </React.Fragment>
  );
}

export default PreLoader;
