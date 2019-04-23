import React from 'react';
import request  from 'request';
import { Redirect } from 'react-router'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from '../SnackBar';
import Paper from '@material-ui/core/Paper';

import './style.css'


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit * 2,
    },
    textField: {
      flexBasis: 400,
    },
    button: {
        margin: theme.spacing.unit * 2,
    },

  });
  


class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            success: null,
            userCorrect: null,
            formIsValid: false,
            showPassword: false,  
            userIsLogged: false,    
        };

    }
    // Función para cambiar el estado del snackBar y poder cerrarla. Es el padre el que cambia las propiedades del hijo.
    handleSnackBarState = (openState) => {
        this.setState({ userCorrect: openState });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    

    // Documentación:
    //request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })

    // Envio datos al servidor
    postData = () => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
        request.post('http://localhost:3000/login/', {form:{
                username: this.state.username,
                password: this.state.password,
            }},
            function(err,httpResponse,body){
                //console.log(httpResponse);
                //console.log(body);
                if(httpResponse.statusCode === 200){ // El POST se ha realizado con éxito
                    const bodyParsed = JSON.parse(body); // Parseo el body que viene como string
                    //console.log(bodyParsed);

                    // Si el usuario es correcto:
                    if(bodyParsed.userCorrect === true){
                        sessionStorage.setItem('token', bodyParsed.token); // Guardo el token
                        
                        if (bodyParsed.isAdmin) {
                            const token = bodyParsed.token;
                            const URL = `http://localhost:5000/admin/${token}`;
                            //console.log(URL);
                            window.location = URL;
                            
                        }
                        else {
                            const newState = {...self.state}; // Copia del estado
                            newState.success = true; // Altero propiedades
                            newState.userCorrect = true;
                            newState.userIsLogged = true; // Para hacer el redirect
                            self.setState(newState); // Actualizo el estado
                        }


                    } 
                    // Si los datos son incorrectos
                    else {
                        const newState = {...self.state}; // Copia del estado
                        newState.password = '';
                        newState.success = true; // Altero propiedades
                        newState.userCorrect = false;
                        self.setState(newState); // Actualizo el estado
                    }

                }
            }
        );
    }


    render(){
        const { classes } = this.props;

        if(this.state.userIsLogged === true){
            return <Redirect to="/Home"/>
        } 
        else {
            return (
            
                <Paper className="login-container" >
                    <TextField
                        id="username"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Nombre de usuario"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        required='true'
                    />
                    <TextField
                        id="password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Contraseña"
                        required='true'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="button" onClick={this.postData} variant="contained" color="primary" className={classes.button}>
                        Enviar
                    </Button>

                    <CustomizedSnackbars 
                        open={this.state.userCorrect != null ? !this.state.userCorrect : false} 
                        /* Si está definido, manda lo contrario a lo que haya, sino, manda falso */
                        message='Usuario o contraseña incorrectos.' 
                        variant='error'
                        handleSnackBarState={this.handleSnackBarState}
                    />
                </Paper>
            )
        }
        
    }
}


export default withStyles(styles)(Login);







