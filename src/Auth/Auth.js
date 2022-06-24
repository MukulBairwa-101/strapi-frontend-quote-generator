import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

// components
import { AppContext } from "../Context/AppContext";

const AUTH_USERS_URL = "http://localhost:1337/api/auth-users";

const Auth = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  // global states
  const { signupUser, setSignupUser,setFlag} = appContext;

  // custom component states
  const [validationErrors, setValidationErrors] = useState({});
  const [result,setResult]= useState([]);

  // handlers
  const getUniqueId = () => {
    return Date.now();
  };

  const handleChange = (e) => {
    if (window.location.pathname === "/signup") {
      const { name, value } = e.target;
      setSignupUser({ ...signupUser, [name]: value });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let temp = validate();
    setValidationErrors(temp);
    var date1 = moment(signupUser.dob).format("l");

    let tempId = getUniqueId();


    if (date1) {
      signupUser.dob = date1;
      signupUser.userId = Number(tempId);
    }

    if (Object.keys(temp).length === 0) {
      let tempFlag = false;

     
      if (result.length === 0) {
          // alert('execution is in flag ')
        
          axios.post(AUTH_USERS_URL, {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username: signupUser.username,
              email: signupUser.email,
              password: signupUser.password,
              confirmPassword: signupUser.confirmPassword,
              dob: signupUser.dob,
              userId: signupUser.userId,
            },
          })
          .then((response) => {
            console.log(response);
            if (response) {
              Swal.fire({
                title: "Success!",
                text: `You are registered`,
                icon: "success",
                confirmButtonText: "Login",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            }
            setFlag({
              status: false,            
              msg:''
            })
            setSignupUser(
              {
                username:'',
                email:'',
                password:'',
                confirmPassword:'',
                dob:"",
                userId:0
            }
            )
          })
          .catch((error) => {
            setFlag({
              status: true,
              msg:'Email is already registered'          
              // msg:error.response.data.error.message
            })
          })

          
      } 
      

      else {
        console.log(result);
          let existedUser = result.find((user)=> user.email === signupUser.email );
          console.log(existedUser);
          if(existedUser){

              Swal.fire({
                title: "You are already signed up!",
                text: ``,
                icon: "error",
                confirmButtonText: "Login",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
          }
      }


   
    }
    else {
        // alert('i get called for errors please check your details');
      }
  };

  const validate = () => {
    let validationError = {};
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    // for signup credentials check

    if (!signupUser.username) {
      validationError.username = "Field is required";
    }

    if (!signupUser.email) {
      validationError.email = "Field is required";
    } else if (!emailRegex.test(signupUser.email)) {
      validationError.email = "Please enter a valid email";
    }

    if (!signupUser.password) {
      validationError.password = "Field is required";
    } else if (signupUser.password.length < 6) {
      validationError.password = "Please enter a valid password";
    }

    if (!signupUser.confirmPassword) {
      validationError.confirmPassword = "Field is required";
    }
    if (signupUser.password !== signupUser.confirmPassword) {
      validationError.confirmPassword = "password not match";
    }

    return validationError;
  };
  return { handleChange, formSubmit, validationErrors };
};

export default Auth;
