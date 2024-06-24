import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import "./resetpassword.scss"; 

const ResetPassword = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const storedEmail = useMemo(() => localStorage.getItem('loggedInEmail'), []);

  const [passwordLengthError, setPasswordLengthError] = useState(false);

  useEffect(() => {
    if (storedEmail) {
      setFormData(prevFormData => ({ ...prevFormData, email: storedEmail }));
    } else {
      navigate("/login");  
    }
  }, [navigate, storedEmail]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setPasswordLengthError(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 4) {
      setPasswordLengthError(true);
      return;
    }
    setPasswordLengthError(false);

    try {
      const response = await fetch("http://localhost:5000/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
      if (result.message === "Password reset successfully") {
        localStorage.removeItem('loggedInEmail'); 

        navigate("/login");
        setFormData({
          email: "",
          password: ""
        });
      } else {
        setFormData({
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <div className="resetpassword">
      <div className="box">
        <div className="form-container">
          <h1>Reset Password</h1>
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
                readOnly  
                required 
              />
            </div>
            <div className="password">
              <p>New Password</p>
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
            <button type="submit" className="btn btn-dark">Set Password</button>
          </form>
        
          {  passwordLengthError && (
            <div className="password-length-error">
              <p className="error-message">Password must be at least 4 characters</p>
              
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
