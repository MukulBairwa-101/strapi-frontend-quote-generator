import React,{useContext,useState} from 'react'
// components
import {AppContext} from "../Context/AppContext";
import SignInAuth from "../Auth/SignInAuth";

// assets
import {FaEye,FaEyeSlash} from "../assets/icons";

const Login = () => {

    const { handleChange, formSubmit, validationErrors} = SignInAuth();


    const appContext = useContext(AppContext);
    const {signIn} = appContext;

        // custom state
        const [passwordVisibility,setPasswordVisibility]= useState(false);

        // handlers
        const togglePassword =(e)=>{
            const {name,value} = e.target;
            if(name ===  value){
                setPasswordVisibility(!passwordVisibility);
            }
        }

    return (
        <div className="max-w-md my-20 m-auto" >
        <h1>SIGN IN</h1>
    <form  className="flex flex-col  " onSubmit={formSubmit} >
    <div className="flex flex-col relative ">
        <input className="my-4 py-4 px-6 rounded bg-[#122536]" type="email" placeholder="Email" name="email" value={signIn.email} onChange={handleChange}/>
        <span className="text-purple-700 px-1 capitalize">{validationErrors.email}</span>

    </div>
    <div className="flex flex-col relative ">
        <input className="my-4 py-4 px-6 rounded bg-[#122536]" type={passwordVisibility ? 'text':'password' }placeholder="Password" name="password" value={signIn.password} onChange={handleChange}/>
        {    passwordVisibility  ? 
                <FaEyeSlash  className={ signIn.password.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `} onClick={togglePassword} />   
                :
                <FaEye  className={ signIn.password.length === 0 ? ` absolute right-7 top-10 cursor-pointer text-[#20405c]  `: ` absolute right-7 top-10 cursor-pointer   `} onClick={togglePassword} />
        }
       
        <span className="text-purple-700 px-1 capitalize">{validationErrors.password}</span>  

    </div>
        <button type="submit" className="py-2 px-8  m-auto bg-blue-900 rounded  ">SIGN IN</button>
    </form>
</div>
    )
}

export default Login
