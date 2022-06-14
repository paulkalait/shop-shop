import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import LOGINPHOTO from '../assets/login-photo.svg'
import { FaChevronLeft } from 'react-icons/fa'

function Signup(props) {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 signup-container">
    

    
      
      <form onSubmit={handleFormSubmit} className="signup-form">
      <Link className='FaChevronLeft' to="/login"> <FaChevronLeft style={{marginTop: "2%"}}/> Login </Link>
      <h2>Sign Up</h2>
        <div className="flex-row my-2 inputs">
          <label htmlFor="firstName"></label>
          <input
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2 inputs">
          <label htmlFor="lastName"></label>
          <input
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2 inputs">
          <label htmlFor="email"></label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2 inputs">
          <label htmlFor="pwd"></label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
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
