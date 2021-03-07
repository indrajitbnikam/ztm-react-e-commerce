import React from 'react';
import Spinner from '../spinner/spinner.component';

/**
 * Higher order component that adds spinning loader to a component
 * @param WrappedComponent
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading
  ? <Spinner />
  : <WrappedComponent {...otherProps}/>
};

export default WithSpinner;