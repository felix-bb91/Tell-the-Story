import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';



function NavbarLogin(props) {
    
    const handleClick = (section) => event => {
        document.getElementById(`${section}`).scrollIntoView()
    };

    
    return (
    <div className="navbarLogin">
        <StyledAppBar classes={props.classes} position="fixed">
            <Toolbar>
                <StyledButton color="inherit" type="button" onClick={handleClick('about')}>Información</StyledButton>
                <StyledButton color="inherit" type="button" onClick={handleClick('why')}>Motivación</StyledButton>
                <StyledTypography classes={props.classes} variant="h6" color="inherit" >
                    <span >Tell The Story</span>
                </StyledTypography>
                <StyledButton color="inherit"  type="button" onClick={handleClick('login')} >Registro</StyledButton>
                <StyledButton color="inherit" type="button" onClick={handleClick('login')} >Login</StyledButton>
            </Toolbar>
        </StyledAppBar>
    </div>
    );
}

export default NavbarLogin;

const StyledAppBar = withStyles({
    root: {
        background: 'rgb(43, 40, 40)',
        border: 0,
        color: 'white',
        height: '4rem',
        padding: '0 20px',
        boxShadow: 'rgb(154, 211, 222)',
        textAlign: 'center',
        alignItems: 'center',
        },    
})(AppBar);

const StyledTypography= withStyles({
    root: {
        color: 'white',
        margin: '2rem',
        fontFamily: 'Sacramento', 
        fontSize: '2.5rem',
        cursor: 'none',
        padding: '0.5rem',
        //left: 0,

    }
})(Typography)

const StyledButton = withStyles({
    root: {
        color: 'white',
        margin: '1rem',
    }
})(Button)

  

