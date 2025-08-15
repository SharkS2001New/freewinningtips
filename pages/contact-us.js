import React from 'react';

function ContactUs(){
    return (
    <div className="free-tips-section">
        <div className="row container mb-2">
            <div className="m-2" style={{color:"black", fontSize: "17px"}}>
                <p>For assistance, inquiries, or any feedback regarding our site, please feel free to contact us using the following information:</p>
                <p><b>Email:</b> &nbsp;<a style={{color:"blue",fontWeight:"bold"}} href="mailto:contact@freewinningtips.com">contact@freewinningtips.com</a></p>
                <p><b>Tel:</b> &nbsp;<b style={{color:"blue"}}>#</b></p>
                <p>We welcome your feedback, ideas, and suggestions. Don't hesitate to reach out to us.</p><br/>
                <h4 className="sectionTitle text-center"><b>Freewinningtips.com - Your Trusted Source for Football Insights.</b></h4>
            </div>
            <br/>
        </div>
    </div>
    )
}

export default  ContactUs;