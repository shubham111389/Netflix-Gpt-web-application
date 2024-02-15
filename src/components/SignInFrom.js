import React, { useState, useRef } from "react";
import "../app.css";
import { checkValidData } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";



const SignInForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const emailSignUp = useRef(null);
  const passwordSignUp = useRef(null);
  const emailSignIn = useRef(null);
  const passwordSignIn = useRef(null);
  const navigate = useNavigate();
  
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const message = checkValidData(emailSignIn.current.value, passwordSignIn.current.value);
    setErrorMessage(message);
    if (message) return;
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailSignIn.current.value,
        passwordSignIn.current.value
      );
      
      // Signed in
      const user = userCredential.user;
      console.log(user);
      navigate("/browse");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    }
  };
  
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const message = checkValidData(emailSignUp.current.value, passwordSignUp.current.value);
    setErrorMessage(message);
    if (message) return;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailSignUp.current.value,
        passwordSignUp.current.value
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name.current.value,
        photoURL: USER_AVATAR,
      });
      console.log(user);
  
      const { uid, email, displayName, photoURL } = auth.currentUser;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    }
  };
  

  return (
    <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebookF />
            </a>
            <a href="#" className="social">
              <FaGoogle />
            </a>
            <a href="#" className="social">
              <FaTwitter />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text"
           ref={name} 
           placeholder="Enter your Name "
           name="name"
           />
        

          <input
            ref={emailSignUp}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            ref={passwordSignUp}
            type="password"
            name="password"
            placeholder="Password"
          />

          <p className="text-red-500 font-normal text-base">{errorMessage}</p>
          <button type="submit">SignUp</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebookF />
            </a>
            <a href="#" className="social">
              <FaGoogle />
            </a>
            <a href="#" className="social">
              <FaTwitter />
            </a>
          </div>
          <span>or use your account</span>
          <input
            ref={emailSignIn}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            ref={passwordSignIn}
            type="password"
            name="password"
            placeholder="Password"
          />
          <a href="#">Forgot Your Password</a>
          <p className="text-red-500 font-normal text-base">{errorMessage}</p>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start the journey with us</p>
            <button className="ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
