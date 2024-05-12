import React, { useState } from 'react'
import './App.css'
function App(){
  const[formData,setFormData]=useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });
  const[errors,setErrors]=useState({});
  const[formValid,setFormValid]=useState(false);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }
 const validateForm=()=>{
  let errors={};
  let formIsValid=true;

  //Username Valid
  if(!formData.username.trim()){
    errors.username='Username is required'
    formIsValid=false;
    
  }
  if(!formData.email.trim()){
    errors.email='Email is required'
    formIsValid=false;
  }else if(!/\S+@\S+\.\S+/.test(formData.email))
    {
    errors.email='Email is Required'
    formIsValid=false;
    }
   if(!formData.password.trim()){
    errors.password='Password is required'
    formIsValid=false;
   }else if(formData.password.length<6){
    errors.password='Password must be at least 6 characters long'
    formIsValid=false;
   }

   if(!formData.confirmPassword.trim()){
    errors.confirmPassword='Confirm Password is required'
    formIsValid=false;
   }else if(formData.password !== formData.confirmPassword){
    errors.confirmPassword='Password does not match'
    formIsValid=false;
   }






  setErrors(errors);
  setFormValid(formIsValid)
 }



  const handleSubmit=(e)=>{
    e.preventDefault();
    validateForm();
    if(formValid){
      console.log('Form submitted:',formData)
    }else{
      console.log('Form Error')
    }
  }
  








return(
  <div className='form-container'>
    <h2>Form Validations</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input onChange={handleChange} type="text" autoComplete='off' name="username" value={formData.username}></input>
       {errors.username && <span className='error'>{errors.username}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" onChange={handleChange} autoComplete='off' name="email" value={formData.email}></input>
        {errors.email && <span className='error'>{errors.email}</span>}
     
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onChange={handleChange} autoComplete='off' name="password" value={formData.password}></input>
        {errors.password && <span className='error'>{errors.password}</span>}
     
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" onChange={handleChange} autoComplete='off' name="confirmPassword" value={formData.confirmPassword}></input>
        {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
     
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
)
}
export default App