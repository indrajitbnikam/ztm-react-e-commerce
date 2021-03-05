import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/**
 * Higher order component that adds spinning loader to a component
 * @param WrappedComponent
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps}/>
  )
};

export default WithSpinner;