import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MyProfileMenu from '../MyProfileMenu';
import FilterMenu from '../FilterMenu';
import './style.css';


function NavbarApp(props) {
    
    return (
    <div className="NavbarApp">
        <StyledAppBar classes={props.classes} position="fixed">
            <Toolbar>
                <StyledButton color="inherit" type="button" className="donateButton">
                    <Link
                        to={{
                            pathname: `/donate`,
                        }}> Donar
                    </Link>
                </StyledButton>
                <StyledButton color="inherit" type="button" >
                    <Link
                        to={{
                            pathname: `/home`,
                        }}> Inicio
                    </Link>
                </StyledButton>
                <StyledButton color="inherit" type="button" >
                    <Link
                        to={{
                            pathname: `/information`,
                        }}> Información
                    </Link>
                </StyledButton>
                <StyledTypography classes={props.classes} variant="h6" color="inherit" >
                    <span >Tell The Story</span>
                </StyledTypography>
                <StyledButton color="inherit"  type="button"  >
                    <Link
                        to={{
                            pathname: `/seeAll`,
                        }}> Ver todo
                    </Link>
                </StyledButton>
                <StyledButton color="inherit"  type="button"  >
                    <FilterMenu/>



                </StyledButton>
                <StyledButton color="inherit" type="button"  >
                    <MyProfileMenu/>
                </StyledButton>
            </Toolbar>
        </StyledAppBar>
    </div>
    );
}

export default NavbarApp;

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

    }
})(Typography)

const StyledButton = withStyles({
    root: {
        color: 'white',
        margin: '1rem',
    }
})(Button)

  

