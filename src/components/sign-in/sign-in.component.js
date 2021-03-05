import React, { useState } from "react";
import { connect } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  return (
    <div className="sign-in">
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={(event) => setEmail(event.target.value)}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={(event) => setPassword(event.target.value)}
          label="Password"
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);
