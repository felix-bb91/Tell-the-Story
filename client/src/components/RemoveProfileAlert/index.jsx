import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";
import request from 'request';
import { Redirect } from 'react-router'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
    userRemoved: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeProfile = () => {
      
    var token = sessionStorage.getItem('token');
    const self = this; 

    /* Get request with header */
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/myProfile/remove',
        headers: {
            'token': token,
        }
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            response = JSON.parse(body);
            //console.log(response);
            sessionStorage.removeItem('token');
            self.setState({userRemoved: true});
            
        } else {
            console.log(body);
        }
    }
    
    request(options, callback); 

    console.log("Eliminado");
    // redirect al login borrando el local storage
  }



  render() {
    if(this.state.userRemoved === true){
        return <Redirect to="/"/>
    } 
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Eliminar mi perfil
          <DeleteIcon  />
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"¿ Deseas eliminar tu perfil ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Al confirmar dejarás de tener acceso a Tell the Story y todas tus
              aportaciones pasarán a ser anónimas.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.removeProfile}  variant="contained" color="primary">
              Aceptar
            </Button>
            <Button onClick={this.handleClose}  variant="contained" color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
