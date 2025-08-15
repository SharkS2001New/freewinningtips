import React, {useState} from 'react';
import { useRouter } from 'next/router';

function SeoContentDisplay(props) {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
  
    const toggleContent = () => {
      setExpanded(!expanded);
    };
  
    // Extract the rest of the content starting from the second position
    const restContent = props.props.slice(0).map((item, index) => (
      <div key={index + 2}>
        <div dangerouslySetInnerHTML={{ __html: item.title }} />
        <div dangerouslySetInnerHTML={{ __html: item.body }} />
      </div>
    ));
  
    // Ensure at least 2 paragraphs and 3 titles are shown
    const displayContent = expanded
      ? [...restContent]//Display the first 3 titles and paragraphs
      : [...restContent.slice(0, 3)]; //Display when read more is clicked
  
      if(router.pathname.substring(1) =="payment-methods" || router.pathname.substring(1) == "tipster-tips" || router.pathname.substring(1).includes("predictions/") ||
      router.pathname.substring(1).includes("jackpots/") || router.pathname.substring(1) =="jackpot-predictions"){
        return ( 
        <React.Fragment>
          <div className="row container">
            {restContent}
          </div>
          <br/>
        </React.Fragment>
        );
    }else {
      return ( 
        <React.Fragment>
          <div>
            {displayContent}
            <div className="text-center">
            {props.props.length > 2 && !expanded && (
              <button className="btn btn-link fixturesTextSize"
              style={{ color: "#B11111", textDecoration: "underline", fontWeight: "bold",border: "none", textAlign: "left" }} 
              onClick={toggleContent}>Read More&nbsp;&nbsp;<i className="bi bi-arrow-down-circle-fill"></i></button>
            )}
            </div>
          </div>
          <br/>
        </React.Fragment>
        );
    }
  }
  
export default SeoContentDisplay;