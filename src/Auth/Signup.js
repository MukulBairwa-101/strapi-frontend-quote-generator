import React,{useContext,useState} from 'react'
import { useNavigate } from "react-router-dom";

// components
import {AppContext} from "../Context/AppContext";
import Auth from "../Auth/Auth";

// assets
import {FaEye,FaEyeSlash} from "../assets/icons";



const Signup = () => {
    const navigate = useNavigate();
    const { handleChange, formSubmit, validationErrors} = Auth();

    // global state
    const appContext = useContext(AppContext);
    const {signupUser,flag} = appContext;

    // custom state
    const [passwordVisibility,setPasswordVisibility]= useState(false);
    const [confirmPasswordVisibility,setConfirmPasswordVisibility]= useState(false);
    // handlers
    const togglePassword =(attribute)=>{
        if(attribute ===  'passwordToggle'){
            setPasswordVisibility(!passwordVisibility);
        }
        if(attribute === 'confirmPasswordToggle'){
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }

    return (
        <div className="max-w-md my-20 m-auto" >
            <h1>SIGN UP</h1>
        <form  className="flex flex-col  " onSubmit={formSubmit} >
            <div  className="flex flex-col  ">
            <input className="my-4 py-4 px-6 rounded bg-[#122536]"  type="text" placeholder="Username" name="username" value={signupUser.username} onChange={handleChange}/>
            <span className="text-purple-700 px-1 capitalize">{validationErrors.username}</span>

            </div>  
            <div className="flex flex-col  ">
            <input className="my-4 py-4 px-6 rounded bg-[#122536]" type="email" placeholder="Email" name="email" value={signupUser.email} onChange={handleChange}/>
            
            {
                flag.status ?  <span className="text-purple-700 px-1 capitalize">{flag.msg}</span> :''
            }
            <span className="text-purple-700 px-1 capitalize">{validationErrors.email}</span>

            </div>
            <div className="flex flex-col relative ">
            <input className="my-4 py-4 px-6 rounded bg-[#122536]" type={passwordVisibility ? 'text':'password' } placeholder="Password" name="password" value={signupUser.password} onChange={handleChange}/>
    

           {    passwordVisibility  ? 
                <FaEyeSlash   className={ signupUser.password.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `}   onClick={()=>togglePassword("passwordToggle")} />   
                :
                <FaEye  className={ signupUser.password.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `}onClick={()=>togglePassword("passwordToggle")} />
            }
           

            <span className="text-purple-700 px-1 capitalize">{validationErrors.password}</span>

            </div>
            <div className="flex flex-col  relative ">
            <input className="my-4 py-4 px-6 rounded bg-[#122536] " type={confirmPasswordVisibility ? 'text':'password' }  placeholder="Confirm Password" name="confirmPassword" value={signupUser.confirmPassword} onChange={handleChange}/>
            
            {    confirmPasswordVisibility  ? 
                <FaEyeSlash className={ signupUser.confirmPassword.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `}   onClick={()=>togglePassword("confirmPasswordToggle")} />   
                :
                <FaEye className={ signupUser.confirmPassword.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `}   onClick={()=>togglePassword("confirmPasswordToggle")} />
            }
            
            
            <span className="text-purple-700 px-1 capitalize">{validationErrors.confirmPassword}</span>

            </div>
            <div className="flex flex-col  ">
            <input className="my-4 py-4 px-6 rounded bg-[#122536]" type="date" placeholder="Date of Birth" name="dob" value={signupUser.dob} onChange={handleChange}/>

            </div>   
            <button type="submit" className="py-2 px-8  m-auto mb-8 bg-blue-900 rounded">SIGN UP</button>
            <hr />
            <span className="text-center my-4">Have an account ?</span>
            <button type="submit" className="py-2 px-8  m-auto mb-8  bg-slate-500 rounded  " onClick={()=>navigate('/login')}>SIGN IN</button>
        </form>
    </div>
    )
}

export default Signup;
