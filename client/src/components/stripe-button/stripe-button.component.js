import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IPYWYD4riJYucLd3sd52o2ogXwcNWk1IaVVbw1ZB3wIuLxQAoijKIjd1CYHtcSrocucPbzK9FXOf8jCVeGwOKvR00Meq3MPnq';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    }).then(response => {
      alert('Payment Successful!');
    }).catch(error => {
      console.warn('Payment error: ', JSON.parse(error));
      alert('There was an issue with your payment. Please use provided credit card.');
    })
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;
