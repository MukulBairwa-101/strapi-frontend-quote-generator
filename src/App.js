import React,{useEffect,useContext} from 'react';
import {Routes, Route ,Link} from "react-router-dom";

// components

import Quotes from "./Components/Quotes";
import AddQuote from "./Components/AddQuote";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import {AppContext} from "./Context/AppContext";
import {useNavigate} from "react-router-dom";

// assets
import axios  from 'axios';
import './App.css';

const URL = 'http://localhost:1337/api/quotes-collections';

function App() {
  const appContext = useContext(AppContext);
  const {setQuotes,authenticatedUser,setAuthenticatedUser}  = appContext;

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      const result = await axios.get(URL);
      setQuotes(result.data.data);
    }
    fetchData();
  },[])

  const handleLogout =()=>{
    setAuthenticatedUser({
      status:false,
      userLoggedIn:"",
  })  
}

  return (
    <div className="App  "> 
    <nav className="flex justify-between  py-4 px-4 uppercase border-b border-[#122536]"> 
    <div >
      <Link to="/" className="text-lg  "><span className="italic" >" Quote "</span>Generator</Link>
      <Link to="/addQuote" className="mx-6" >Addquote</Link>

    </div>
      <div className="flex">
      {authenticatedUser.userLoggedIn ?
      <div  > 
      <span className="px-4">{authenticatedUser.userLoggedIn}</span>
      <button className=" px-4  m-auto bg-blue-900 rounded" onClick ={handleLogout}>Logout</button>
      </div> 
      : 
      <div>
        <button className=" px-4  py-1 m-auto bg-slate-700 mx-4 rounded" onClick={()=>navigate('/login')}>Login</button>
        <button className=" px-4  py-1 m-auto bg-blue-900 rounded" onClick={()=>navigate('/signup')}>SignUp</button>

      </div>
      }

      </div>  
 
    </nav>
   <div className="container p-auto  ">

     <Routes>
       <Route path="/" element={  <Quotes />} />
       <Route path="/addQuote" element={<AddQuote />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
     </Routes>
   </div>
    </div>
  );
}

export default App;
