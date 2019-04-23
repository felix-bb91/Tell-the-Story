import React from 'react';
import request  from 'request';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CustomizedSnackbars from '../SnackBar';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    margin: theme.spacing.unit * 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class RegisterComponent extends React.Component{
    
  constructor(){
      super();
      this.state = {
        username: "",
        password: "",
        email: "",
        city: "",
        country: "",
        message: '',
        variant: '',
        success: null,
        formIsValid: false,
        userRegisterCorrect: null,
        showPassword: false,
      };
  }
  // Función para cambiar el estado del snackBar y poder cerrarla. 
  // Es el padre el que cambia las propiedades del hijo.
  handleSnackBarState = (openState) => {
    this.setState({ userRegisterCorrect: openState });
  };


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // Envio datos al servidor
  postData = () => {
    const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
    request.post('http://localhost:3000/register/', {form:{
            user: this.state.username,
            password: this.state.password,
            mail: this.state.email,
            city: this.state.city,
            country: this.state.country,
        }},
        function(err,httpResponse,body){
            //console.log(httpResponse);
            //console.log(body);
            if(httpResponse.statusCode == 200){ // El POST se ha realizado con éxito
                const bodyParsed = JSON.parse(body); // Parseo el body que viene como string
                //console.log(bodyParsed);

                // Si el usuario es correcto:
                if(bodyParsed.userInserted == true){
                  //console.log('Usuario insertado');
                  const newState = {...this.state}; // Copia del estado
                  newState.userRegisterCorrect= true;
                  newState.username= "";
                  newState.password= "";
                  newState.email= "";
                  newState.city= "";
                  newState.country= "";
                  newState.message = 'Usuario creado correctamente. Inicie sesión.';
                  newState.variant = 'success';
                  self.setState(newState); 
                }
                else{ // username ya usado
                  const newState = {...this.state}; // Copia del estado
                  newState.userRegisterCorrect= true;
                  newState.username= "";
                  newState.password= "";
                  newState.message = 'Nombre de usuario ya existente.';
                  newState.variant = 'warning';
                  self.setState(newState); 
                } 
            }
        }
    );
}



  render(){

  const { classes } = this.props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {/*Sign in */}
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
            <Input value={this.state.username} id="username" name="username" onChange={this.handleChange('username')} autoComplete="username" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input 
              value={this.state.password}
              name="password" 
              type={this.state.showPassword ? 'text' : 'password'} 
              onChange={this.handleChange('password')} 
              id="password" 
              autoComplete="current-password" 
              endAdornment={
              <InputAdornment position="end">
                  <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
              }
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input value={this.state.email} id="email" name="email" onChange={this.handleChange('email')} autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal"  fullWidth>
            <InputLabel htmlFor="country">País</InputLabel>
            <Input value={this.state.country} id="country" name="country" onChange={this.handleChange('country')} autoComplete="country" autoFocus />
          </FormControl>
          <FormControl margin="normal"  fullWidth>
            <InputLabel htmlFor="city">Ciudad</InputLabel>
            <Input value={this.state.city} id="city" name="city" onChange={this.handleChange('city')} autoComplete="city" autoFocus />
          </FormControl>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.postData}
            className={classes.submit}
          >
            Enviar
          </Button>
        </form>
      </Paper>
      <CustomizedSnackbars 
        open={this.state.userRegisterCorrect != null ? true : false} 
        message={this.state.message} 
        variant={this.state.variant}
        handleSnackBarState={this.handleSnackBarState}
      />
    </main>
  );
  }
}



export default withStyles(styles)(RegisterComponent);