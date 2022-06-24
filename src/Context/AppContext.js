import React,{useState,createContext} from 'react';
export const AppContext =createContext();

export const Provider = (props) =>{

    const [authenticated,setAuthenticated]= useState(false);
    const [authenticatedUser,setAuthenticatedUser]= useState({
        status:false,
        userLoggedIn:"",
    });
    const [quotes,setQuotes] = useState([]);
    const [quote,setQuote]=useState([]);
    const [quoteIndex,setQuoteIndex]=useState(1);
    const [addquote,setAddquote]= useState({
        title:'',
        author:''
    });

    const [signupUser,setSignupUser] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        dob:"",
        userId:0
    });
    const [signIn,setSignIn] = useState({
        email:'',
        password:''
    })

    const [flag,setFlag]= useState({ 
        status:false,
        msg:''
    })
    
  
    
    return(
        <AppContext.Provider value ={{authenticated,setAuthenticated,authenticatedUser,setAuthenticatedUser,quotes,setQuotes, quote,setQuote , quoteIndex,setQuoteIndex,addquote,setAddquote ,signupUser,setSignupUser,signIn,setSignIn,   flag,setFlag,}}>
            {props.children}
        </AppContext.Provider>
    )
}