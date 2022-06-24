import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

// components
import { AppContext } from "../Context/AppContext";

const AUTH_USERS_URL = "http://localhost:1337/api/auth-users";

const SignInAuth = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  // global states
  const { signIn, setSignIn ,setAuthenticatedUser} = appContext;

  // custom component states
  const [validationErrors, setValidationErrors] = useState({});



  // handlers

  const handleChange = (e) => {

      const { name, value } = e.target;
      setSignIn({ ...signIn, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let temp = validate();
    setValidationErrors(temp);
    
    axios.get(AUTH_USERS_URL) 
    .then((response) => {
      let fetchedUsers = response.data.data;
      console.log(fetchedUsers);
      let found = fetchedUsers.find(user => user.attributes.email ===  signIn.email  &&  user.attributes.password === signIn.password)
      if(found){
        Swal.fire({
          title: "Success!",
          text: `Welcome back ${found.attributes.username}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setAuthenticatedUser({
              status:true,
              userLoggedIn:found.attributes.username,
            })
            
            navigate("/");
          }
        });

      }
      else{
        Swal.fire({
          title: "Authentication Error!",
          text: `${!signIn.email || !signIn.password ? "Please enter valid credentials ": !found?"Credentials not match":''}`,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setAuthenticatedUser({
              status:false,
              userLoggedIn:"",
            })
            
          }
        });
      }
      
    })
    
    
    
   
  };

  const validate = () => {
    let validationError = {};
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // for login credentials check

    if (!signIn.email) {
      validationError.email = "Field is required";
    } else if (!emailRegex.test(signIn.email)) {
      validationError.email = "Please enter a valid email";
    }

    if (!signIn.password) {
      validationError.password = "Field is required";
    } else if (signIn.password.length < 6) {
      validationError.password = "Please enter a valid password";
    }

    return validationError;
  };
  return { handleChange, formSubmit, validationErrors };
};

export default SignInAuth;
