import React from "react";

import SignIn from "../../component/singin/signin.component";
import SignUp from "../../component/signup/signup.component";

import { SignInAndSignUpContainer } from "./account.component.styles";

const SignInAndSignUpPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

export default SignInAndSignUpPage;
