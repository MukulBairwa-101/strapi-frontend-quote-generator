import React,{useState,createContext} from 'react';
export const AppContext =createContext();

export const Provider = (props) =>{
    const [quotes,setQuotes] = useState([]);
    const [quote,setQuote]=useState([]);
    const [quoteIndex,setQuoteIndex]=useState(0);
    
    return(
        <AppContext.Provider value ={{quotes,setQuotes, quote,setQuote , quoteIndex,setQuoteIndex }}>
            {props.children}
        </AppContext.Provider>
    )
}