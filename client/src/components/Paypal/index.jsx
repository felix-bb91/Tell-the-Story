// Aunque la carpeta poner Paypal, está implementado stripe

import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../StripeForm';

class StripeCheckoutForm extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_OfTszmQz6fAmTLNJngZtN6sf00eGfCa44b">
        <div className="example">
          
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeCheckoutForm;