import React,{useEffect,useContext} from 'react';
import Quotes from "./Components/Quotes";
import {AppContext} from "./Context/AppContext";
import axios  from 'axios';


import './App.css';
const URL = 'http://localhost:1337/api/quotes-collections';

function App() {
  const appContext = useContext(AppContext);
  const {setQuotes}  = appContext;

  useEffect(()=>{
    const fetchData = async()=>{
      const result = await axios.get(URL);
      // console.log(result);
      setQuotes(result.data.data);
    }
    fetchData();
  })

  return (
    <div className="App ">
      <h1 className="">Quote Generator</h1>
     <Quotes />
    </div>
  );
}

export default App;
