import React from 'react';
import './style.css';
import StripeCheckoutForm from '../Paypal';



class Donate extends React.Component{
    
    constructor(){
        super();

    }


    render(){

        const {} = this.props;

        return (
        <div className="row donateContainer">

            <div className="row donateTitleContainer">
                <div className="col-sm-3"></div>
                <div className="col-sm-6 donateTitle">
                    <h1> ¡Gracias por contribuir!  </h1>
                    <h5> Por favor, completa el siguiente formulario para realizar la donación </h5>
                </div>
                <div className="col-sm-3"></div>
            </div>
            <div className="row donatePaypalContainer">
                <div className="col-sm-2"></div>
                <div className="col-sm-8 paypalContainer">
                    <StripeCheckoutForm />
                </div>
                <div className="col-sm-2"></div>
            </div>

        </div>
        );
    }
}


export default Donate;