import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignUp = ({ signUpStart }) => {
  const [userData, setUserData ] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { displayName, email, password, confirmPassword } = userData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    const userDataForSignUp = {
      email,
      password,
      additionalData: {
        displayName
      }
    }
    signUpStart(userDataForSignUp);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData({...userData, [name]: value});
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        ></FormInput>
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        ></FormInput>
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        ></FormInput>
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        ></FormInput>

        <CustomButton type='submit'>Sign Up</CustomButton>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userData => dispatch(signUpStart(userData))
})

export default connect(null, mapDispatchToProps)(SignUp);