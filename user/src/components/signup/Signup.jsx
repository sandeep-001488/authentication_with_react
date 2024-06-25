import React, { useState } from "react";
// import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

import "./signup.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [nameLengthError, setNameLengthError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailExistsError,setEmailExistsError]=useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData({ ...formData, [name]: updatedValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (formData.name.length < 3) {
      setNameLengthError(true);
      return;
    }
    setNameLengthError(false);

    if (!emailPattern.test(formData.email)) {
      setEmailError(true);

      return;
    }

    setEmailError(false);

    if (formData.password.length < 4) {
      setPasswordLengthError(true);
      return;
    }
    setPasswordLengthError(false);

    try {
      const response = await fetch("https://authentication-with-react-2.onrender.com/user/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (response.status === 409) {
        setEmailExistsError(true); // Email already exists error
        setFormData({
          email:"",
          password:""
        })
      } else if (response.status === 201 && result.User._id) {
        navigate("/login");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(`error found during form submit ${error}`);
    }
    //  finally {
    //   setFormData({
    //     name: "",
    //     email: "",
    //     password: "",
    //   });
    // }
  };
  return (
    <>
      <div className="signup">
        <div className="box">
          <div className="form-container">
            <h1>Sign Up</h1>
            <form action="">
              <div className="name">
                <p>Name</p>
                <input
                  type="string"
                  name="name"
                  id="user"
                  minLength="3"
                  placeholder="Enter your name "
                  value={formData.name}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="email">
                <p>Email address</p>
                <input
                  type="text"
                  name="email"
                  id="user"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="password">
                <p>Password</p>

                <input
                  type="text"
                  name="password"
                  id="user"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInput}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-dark"
              >
                Sign Up
              </button>
            </form>

            <div className="name-length-error">
              {nameLengthError  && <p>Name length must be atleast 3 </p>}
            </div>
            <div className="email-exist">
              {emailExistsError  && <p>User email already exist </p>}
            </div>
            <div className="email-error">
              {emailError && !nameLengthError  && <p>Email format is not valid </p>}
            </div>
            
            <div className="password-length-error">
              {passwordLengthError && !emailError && !nameLengthError  && <p>Password length must be atleast 4 </p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
