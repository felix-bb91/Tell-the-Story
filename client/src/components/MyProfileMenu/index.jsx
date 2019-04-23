import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router'


class MyProfileMenu extends React.Component {
  state = {
    anchorEl: null,
    userLogged : true,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state;
    if(this.state.userLogged == false){
        return <Redirect to="/"/>
    } 
    return (
      <div>
        <StyledButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircle />
        </StyledButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
            <MenuItem onClick={this.handleClose}>
                <Link
                    to={{
                        pathname: `/myProfile`,
                        //state: {repos_url: this.state.userInfo.repos_url}, // Los nombres tienen que ser esos, viene en la doc
                    }}>Perfil
                </Link>
                
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
                <Link
                    to={{
                        pathname: `/`,
                        //state: {repos_url: this.state.userInfo.repos_url}, // Los nombres tienen que ser esos, viene en la doc
                    }}>Cerrar sesión
                </Link>
            </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MyProfileMenu;

const StyledButton = withStyles({
    root: {
      color: "white",
      margin: "0.5rem"
    }
  })(Button);
  