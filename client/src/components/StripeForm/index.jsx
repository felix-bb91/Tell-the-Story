import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './style.css';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from '../SnackBar';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        donationCompleted: null,
        name: "",
        amount: "",
        message: null,
        variant: null,
    };
  }

    handleSnackBarState = (openState) => {
        this.setState({ donationCompleted: openState });
    };


  submitDonation = async () => {
    var tokenApp = await sessionStorage.getItem('token');
    //console.log("test");
    this.setState({ donationCompleted: false });
    try {
        // token de stripe,, no el de la App
        let {token} = await this.props.stripe.createToken({name: this.state.name});
        //console.log(token);
        let amount = this.state.amount;
        //console.log(amount);
        const resp = await fetch("/donate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': tokenApp,
            },
            body: JSON.stringify({token, amount}),
        });
        if(resp.status < 400){
            //console.log('TODO ok');
            this.setState({
                donationCompleted: true,
                name:"",
                amount:"",
                message: '¡Donación realizada correctamente!' ,
                variant: 'success',
            });
        } else {
            this.setState({
            donationCompleted: true,
            name:"",
            amount:"",
            message: 'La donación no ha podido realizarse, por favor, intentelo de nuevo más tarde' ,
            variant: 'error',
            })
        }   

    } catch (e) { throw e; }
  }

  loadingFunction = () => {
    if (this.state.donationCompleted === false){
        setTimeout(6000);
        return <div class="row space">
                    <div  className=" col-sm-4"></div>
                    <div className=" col-sm-8">
                        <div class="containerLoading">
                            <div class="first_circle"></div>
                            <div class="second_circle"></div>
                        </div>  
                    </div>
                    <div  className=" "></div>
                </div>
    }
    else{
        return <div></div>
    }
    
  }


  render() {

    return (
        <div className="checkout row">
            <div className="col-sm-6">
                <div class="row space">
                    <p className="donateLabel col-sm-2" >Nombre</p>
                    <input 
                        id="usr"
                        placeholder="Nombre de usuario"
                        type="text" 
                        className="donationName form-control col-sm-4" 
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                </div>
                <div class="row space">
                    <p className="donateLabel col-sm-2" >Cantidad</p>
                        <input 
                            id="amount"
                            type="text" 
                            placeholder="€"
                            className="form-control donationAmount  col-sm-2" 
                            value={this.state.amount}
                            onChange={(e) => this.setState({amount: e.target.value})}
                        />
                </div>
                <div class=" row space">
                    <p className="donateLabel">Número de tarjeta -- Fecha de expiración -- CVC</p>
                    <div className="cardElement col-sm-12">
                        <CardElement />
                    </div>
                </div>

                {  this.loadingFunction() }

                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className="donateStripeButton"
                    onClick={this.submitDonation}
                >
                Enviar donación *
                </Button>
            </div>
            <div className="col-sm-3 thankyouPic rounded-circle">
                <p className="thankyou">¡Gracias!</p>
            </div>
       
            <CustomizedSnackbars 
                open={this.state.donationCompleted != null ? true : false} 
                /* Si está definido, manda lo contrario a lo que haya, sino, manda falso */
                message='¡Donación realizada correctamente!' 
                variant='success'
                handleSnackBarState={this.handleSnackBarState}
            />
        
            <p className="stripeInfo">* Todas las donaciones se gestionan de forma totalmente segura a través de <a target="_blank" href="https://stripe.com/es-ES/">Stripe</a>.</p>
        
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);