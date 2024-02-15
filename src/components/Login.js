import { useState } from "react";
import Header from "./Header";
import SignInForm from "./SignInFrom";

const Login = () => {
  
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <div className="absolute my-48 mx-[25rem]">
          <SignInForm/>
      </div>
      
    </div>
  );
};
export default Login;