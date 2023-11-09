import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../../services/users";

import { handleChange } from "../../utils/handleChange";
import { API_URL } from "../../constants/config";


export default function SignIn(){
    const navigate = useNavigate();
    const [form, setForm]  = useState({email: '', password: ''});//form for email and password with setter
    const [message, setMessage] = useState('');
   
    //Submit method for when button is cliccked
    const handleSubmit = async (e) => {
         e.preventDefault();
        // console.log(form.email);
        // console.log(form.password);
        const response = await login({...form, navigate});
       // console.log("signin jsx", response)
        //set the response if not authorized
        setMessage(response?.message);
    }

    return (
        <div className="signin-form">
            <form onSubmit={handleSubmit} className="signin-form1">
            {message && <p className="error">{message}</p>}
            <h1>Sign In </h1> <br />
            <label htmlFor="email">Email</label>
            <input value ={form.email} onChange={ (e) => handleChange(e,setForm,form)} type = "email" placeholder = "enter email" name = "email" required></input><br />
            <label htmlFor="password">Password</label>
            <input value ={form.password} onChange={(e) => handleChange(e,setForm,form)} type = "password" placeholder = "enter password" name = "password" required></input><br /> 
            <button type = "submit" >Sign In</button><br />
            </form>
             <Link className="link-button" to='/register' >Do not have an accout? Register Here</Link>
        
        </div>
    )
    
}