import React from 'react';

function PaymentMethods() {
    return (
    <div className="free-tips-section">
        <div className="container">
            <h2>Our Payment Methods</h2>
            <h3>1. Kenya</h3>
            <ol>
                <li>Go To M-PESA Menu</li>
                <li>Select Lipa Na M-PESA and then Buy Goods & Services.</li>
                <li>Enter the Till number: <strong>8881950 (ALPAC SOFTWARE SOLUTIONS)</strong></li>
                <li>Enter the Package Amount</li>
                <li>You will receive two messages from Safaricom confirming payment & an Instant FreeWinningTips message with the matches.</li>
                <li>For clarifications, SMS/WHATSAPP ONLY +254111509962 : EMAIL: support@freewinningtips.com.</li>
            </ol>

            <h3>2. Uganda</h3>
            <ol>
                <li>Dial 165# on your MTN Uganda phone.</li>
                <li>Select Send Money.</li>
                <li>Select International Transfer.</li>
                <li>Select Safaricom M-Pesa.</li>
                <li>Enter the recipient's M-Pesa phone number in the format 254799566287.</li>
                <li>Enter the amount you want to send.</li>
                <li>Enter your MTN Mobile Money PIN.</li>
                <li>Check and confirm your payment.</li>
            </ol>
            <p>
                We will receive the money in our M-Pesa account within a few minutes.
            </p>
            <p>
                Forward the payment to our support Via: &nbsp;&nbsp;
                <a href="https://wa.me/254799489335" target="_blank" rel="noopener noreferrer" className="btn btn-success" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>WHATSAPP</a>
            </p>

            <h3>3. Tanzania</h3>
            <p>Unaweza kutumia njia zifuatazo kulipia:</p>
            <ol>
                <li><strong>Vodacom M-Pesa:</strong> Pigia <strong>150*00#</strong> kwenye simu yako ya Vodacom na uchague "Tuma pesa kwa MPESA Kenya". Ingiza nambari ya simu ya M-Pesa ya mpokeaji katika umbizo la 254799566287, kiasi unachotaka kutuma, na PIN yako ya M-Pesa.</li>
                <li><strong>Airtel Money:</strong> Pigia <strong>150*55#</strong> kwenye simu yako ya Airtel na uchague "Tuma pesa kwa MPESA Kenya". Ingiza nambari ya simu ya M-Pesa ya mpokeaji katika umbizo la 254799566287, kiasi unachotaka kutuma, na PIN yako ya Airtel Money.</li>
                <li><strong>Tigo Pesa:</strong> Pigia <strong>150*66#</strong> kwenye simu yako ya Tigo na uchague "Tuma pesa kwa MPESA Kenya". Ingiza nambari ya simu ya M-Pesa ya mpokeaji katika umbizo la 254799566287, kiasi unachotaka kutuma, na PIN yako ya Tigo Pesa.</li>
            </ol>
            <p>
                Peleka malipo kwa msaada wetu kupitia: &nbsp;&nbsp;
                <a href="https://wa.me/254799489335" target="_blank" rel="noopener noreferrer" className="btn btn-success" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>WHATSAPP</a>
            </p>
        </div>
    </div>
    );
}

export default PaymentMethods;
