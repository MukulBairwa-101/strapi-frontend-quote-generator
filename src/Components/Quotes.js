import React,{useContext} from "react";
import {AppContext} from "../Context/AppContext";
import axios from "axios";
// const QUOTE_URL =  `http://localhost:1337/api/quotes-collections/:${id}`;
const Quotes = () => {
  const appContext = useContext(AppContext);
  const {quotes,quote,setQuote,quoteIndex,setQuoteIndex}  = appContext;
  
  const QUOTE_URL =  `http://localhost:1337/api/quotes-collections/${quoteIndex}`;
  

  const generateQuote =()=>{
    let randomIndex = Math.floor(Math.random() * quotes.length) + 1;
    setQuoteIndex(randomIndex);
    console.log(randomIndex,quoteIndex);
    const fetchQuote = async()=>{
      if(quoteIndex>0){
        // alert('i am setting quote')
        const result = await axios.get(QUOTE_URL);
        // console.log(result.data.data);
        setQuote([result.data.data]);
        
      }
    }
    fetchQuote();
  }
  return (
    <div className="flex flex-col justify-content align-items quote-container">
  
      <button className="quote-btn " onClick ={generateQuote}>Get quote</button>

      {quote.map((item,idx)=>{
        return(
          <div className="quote-holder" key={idx}>
            <p className="quote-text quote-title ">

            " <i><b>{item.attributes.title}</b></i>  " 

            </p>
            <span className="quote-text quote-author flex ">
            - {item.attributes.author}

            </span>
          </div>
        )
      })}
    </div>
  );
};

export default Quotes;
