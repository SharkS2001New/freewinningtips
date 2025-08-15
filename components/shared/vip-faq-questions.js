import React, { useState } from 'react';

const FAQSection = () => {
  const [activeCollapsible, setActiveCollapsible] = useState(0);

  const faqData = [
    {
      question: 'What are Premium/V.I.P Tips?',
      answer: 'Premium/V.I.P Tips are carefully selected betting tips provided exclusively to our premium members. These tips are based on thorough research and expert analysis to maximize your chances of winning.'
    },
    {
      question: 'How do I become a Premium/V.I.P member?',
      answer: 'To become a Premium/V.I.P member, you can follow the steps mentioned on our website or app. Simply choose a subscription plan, make the payment, and you\'ll gain access to our premium betting tips.'
    },
    {
      question: 'What kind of tips do you provide?',
      answer: 'We provide a variety of betting tips, including single bets, multi bets, and occasional jackpot predictions. Our team of experts focuses on different sports and markets to offer a well-rounded selection of tips.'
    },
    {
      question: 'How are the Premium/V.I.P Tips delivered?',
      answer: 'Premium/V.I.P Tips are delivered to you via SMS or through our dedicated app. You\'ll receive timely notifications with the tips and recommended odds to place your bets.'
    },
    {
      question: 'Is there a guarantee of winning with Premium/V.I.P Tips?',
      answer: 'While our Premium/V.I.P Tips are meticulously researched and analyzed, sports betting involves an element of uncertainty. We provide well-informed tips to improve your chances, but we cannot guarantee a win every time.'
    },
    {
      question: 'Can I cancel my Premium/V.I.P subscription?',
      answer: 'Yes, you can cancel your subscription at any time. Please refer to our cancellation policy on our website for detailed instructions.'
    },
    {
      question: 'Do you provide customer support for Premium/V.I.P members?',
      answer: 'Absolutely! Our dedicated customer support team is available to assist our Premium/V.I.P members. You can contact us via email, live chat, or phone for any queries or assistance.'
    },
    {
      question: 'Are the odds provided with Premium/V.I.P Tips guaranteed?',
      answer: 'The odds provided with our Premium/V.I.P Tips are accurate at the time of analysis, but they may change before the actual match. We recommend placing bets as soon as you receive the tips to secure the best odds.'
    },
    {
      question: 'What is the success rate of Premium/V.I.P Tips?',
      answer: 'Our success rate varies and is influenced by factors such as team performance, injuries, and external variables. We strive to provide high-quality tips, and many of our members have reported significant success.'
    }
  ];
  

  const toggleCollapsible = (index) => {
    if (index === activeCollapsible) {
      setActiveCollapsible(-1); // Close the active collapsible
    } else {
      setActiveCollapsible(index); // Open the clicked collapsible
    }
  };

  return (
    <div className="faq-section container">
        <div className="text-center container mb-2" style={{margin: "auto"}}>
            <h2 className="h1headerTitle">FREQUENTLY ASKED QUESTIONS</h2>
        </div>
      {faqData.map((faq, index) => (
        <div className="collapsible" key={index}>
          <div className={`collapsible-header ${index === activeCollapsible ? 'active' : ''}`} onClick={() => toggleCollapsible(index)}>
            {faq.question}
          </div>
          {index === activeCollapsible && (
            <div className="collapsible-content">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
