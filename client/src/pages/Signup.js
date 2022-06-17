import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import LOGINPHOTO from '../assets/login-photo.svg'
import { FaChevronLeft } from 'react-icons/fa'

function Signup(props) {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

function handleTextChange(text) {
  setValue(text);

  if (text !== '') {
    setIsActive(true);
  } else {
    setIsActive(false);
  }
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    handleTextChange()

  };



  return (
    <div className="container my-1 signup-container">
    

    
      
      <form onSubmit={handleFormSubmit} className="signup-form">
      <Link className='FaChevronLeft' to="/login"> <FaChevronLeft style={{marginTop: "2%"}}/> Login </Link>
      <h2>Sign Up</h2>
        <div className="flex-row my-2 float-label">
          <input
            // placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            value={value}
            onChange={handleChange}
          />
          <label htmlFor='firstname' className={ isActive ? 'Active' : ''}>
          First Name</label>
        </div>

        <div className="flex-row my-2  float-label">
          <label htmlFor="lastName"></label>
          <input
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
          <label htmlFor='firstname' className={ isActive ? 'Active' : ''}>
          Last Name</label>
        </div>
        <div className="flex-row my-2 float-label">
          
          <input
            
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor='email' className={ isActive ? 'Active' : ''}>
          youremail@gmail.com</label>
        </div>
        <div className="flex-row my-2 float-label">
         
          <input
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
          <label htmlFor='pwd' className={ isActive ? 'Active' : ''}>
          Password</label>
        </div>
        <div className="flex-row my-2 inputs">
          <button type="submit" className='submit-button'>submit</button>
        </div>
      </form>
      <div className='login-right'>
      <img src={LOGINPHOTO} className='login-right-photo'></img>
      </div>
    </div>
  );
}

export default Signup;
