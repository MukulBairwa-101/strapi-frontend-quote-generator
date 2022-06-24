import React,{useContext,useState} from 'react'
import {AppContext} from "../Context/AppContext";
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";

const URL = 'http://localhost:1337/api/quotes-collections';

const AddQuote = () => {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    // global states
    const {addquote,setAddquote, authenticatedUser} = appContext

    // custom states
    const [quoteErrors,setQuoteErrors] = useState({
        clicked:false,
        status:true
    });

    // handlers
    const handleChange =(e)=>{
        const {name,value} = e.target;
        setAddquote({...addquote,[name]:value});

    }
    const validateAddQuote = ()=>{
        quoteErrors.clicked= true;

        if(!addquote.title || !addquote.author){
            setQuoteErrors({
                clicked: true,
                status:true
            });
        }
        else {
            setQuoteErrors({
                clicked: true,
                status:false
            });
        };
    }
 
    const postData = ()=>{
        axios.post(URL,    
           { 
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'JWT fefege...'
            }, 
                "data" :{
                    "title":addquote.title,
                    "author":addquote.author
            }
            
        }
    ).then(response =>console.log(response));
    

        Swal.fire({
            title: 'Success!',
            text:  `Quote added`,
            icon: 'success',
            confirmButtonText: 'Ok'
            
          })
          .then((result)=>{
            if(result.isConfirmed){
                navigate('/');
            }
        })
          setAddquote({
            title:'',
            author:''
        })
    
    
      }
      
      const handleSubmit =(e)=>{
          e.preventDefault();
          validateAddQuote();
          console.log(quoteErrors.status,"-------",quoteErrors.clicked)
          if(quoteErrors.status && quoteErrors.clicked){
              if(authenticatedUser.status){
                  postData();
              }
              else{
                Swal.fire({
                    title: 'You are not authenticated !',
                    text:  `Please signup / login  to continue`,
                    icon: 'error',
                    confirmButtonText: 'SIGNUP'
                    
                  })
                  .then((result)=>{
                      if(result.isConfirmed){
                          navigate('/signup');
                      }
                  })
                 
                  }
              
              
          }
          else {
            Swal.fire({
                title: 'Error!',
                text:  `Fields are required`,
                icon: 'error',
                confirmButtonText: 'Ok'
                
              })
          }

    }
    return (
        <div className="max-w-md my-20 m-auto" >
            <form  className="flex flex-col  " onSubmit={handleSubmit} >
                <input className="my-4 py-4 px-6 rounded bg-[#122536]"  type="text" placeholder="Add title" name="title" value={addquote.title} onChange={handleChange}/>
                <input className="my-4 py-4 px-6 rounded bg-[#122536]" type="text" placeholder="Add author" name="author" value={addquote.author} onChange={handleChange}/>
                <button type="submit" className="py-2 px-8  m-auto bg-blue-900 rounded  ">ADD QUOTE</button>
            </form>
        </div>
    )
}

export default AddQuote;
