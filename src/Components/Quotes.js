import React,{useContext,useState} from "react";
import {AppContext} from "../Context/AppContext";
import axios from "axios";
const Quotes = () => {
  const appContext = useContext(AppContext);
  const {quotes,quote,setQuote,quoteIndex,setQuoteIndex}  = appContext;

  // custom state
  const [isGenerated,setIsGenerated]= useState(false);
  
  const QUOTE_URL =  `http://localhost:1337/api/quotes-collections/${quoteIndex}`;
  

  const generateQuote =()=>{
    let min = 1;
    let max=  quotes.length;
    let randomIndex = Math.floor(Math.random() * (max - min +1)) + min;
    
    setQuoteIndex(randomIndex);
    const fetchQuote = async()=>{
      if(quoteIndex!== 0){

        const result = await axios.get(QUOTE_URL);
        setQuote([result.data.data]);
        setIsGenerated(true);
        
      }
    }
    fetchQuote();
  }

  return (
    <div className="flex flex-col max-w-4xl  my-10  m-auto  ">
      
      <button className="py-2 px-8  m-auto bg-blue-900 w-36 rounded  " onClick ={generateQuote}>Get quote</button>
    {
      isGenerated ? 
    quote.map((item,idx)=>{
        return(
          <div className=" my-16 m-auto py-10 px-16 bg-[#122536] rounded-xl" key={idx}>
            <p className="text-xl my-6 mx-2 ">

            " <i><b>{item.attributes.title}</b></i>  " 

            </p>
            <span className=" flex justify-end my-6 mx-2 ">
            - {item.attributes.author}

            </span>
          </div>
        )
      })
      :

      <div className=" my-16 m-auto py-10 px-16 bg-[#122536] rounded-xl">
            <p className="text-xl my-6 mx-2 ">

            " <i><b>You never have to change anything you got up in the middle of the night to write.</b></i>  " 

            </p>
            <span className=" flex justify-end my-6 mx-2 ">
            - Saul Bellow

            </span>
         </div>
      
      }


         </div>
  );
};

export default Quotes;
