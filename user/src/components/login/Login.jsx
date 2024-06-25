import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import "./login.scss"; 

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    setEmailError(false);
    setPasswordError(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://authentication-with-react-2.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
      if (result.User && result.User._id) {
        // Save email to local storage after successful login
        // localStorage.setItem('loggedInEmail', formData.email);
        localStorage.setItem("token", result.token);
        navigate("/");
        setFormData({
          email: "",
          password: ""
        });
      } else if (result.message === "Invalid email") {
        setEmailError(true);
        setPasswordError(false);
        setFormData({
          password: ""
        });
      } else if (result.message === "Invalid password") {
        localStorage.setItem('loggedInEmail', formData.email);

        setEmailError(false);
        setPasswordError(true);
        setFormData({
          password: ""
        });
      } else {
        setEmailError(true);
        setPasswordError(true);
        setFormData({
          email:"",
          password:""
        })
      }
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
    } 
  }

  return (
    <div className="login">
      <div className="box">
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <p>Email address</p>
              <input 
                type="text" 
                name="email" 
                id="user"  
                placeholder='Enter your Email' 
                value={formData.email}     
                onChange={handleInput}
                required 
              />
            </div>
            <div className="password">
              <p>Password</p>
              <input 
                type="password" 
                name="password" 
                id="user"  
                placeholder='Enter your password' 
                value={formData.password} 
                onChange={handleInput}
                required 
              />
            </div>
            <button type="submit" className="btn btn-dark">Login</button>
          </form>
          {emailError && (
            <div className="reset-new-email">
              <p className="error-message">Invalid Email</p>
              <Link to="/register" className='link'>Create New Account?</Link>
            </div>
          )}
          {!emailError && passwordError && (
            <div className="reset-password">
              <p className="error-message">Invalid password</p>
              <Link to="/reset-password"  className='link'>Reset password?</Link>
            </div>
          )}
        </div>
        <div className={`signup ${(emailError) || (!emailError &&passwordError) ? "hide-content" : ""}`}>
          <p>New User?</p>
          <Link to="/register" className='link'>Create Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
