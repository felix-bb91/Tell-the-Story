import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';
import red from '@material-ui/core/colors/red';
import './style.css';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  icon: {
    color: red[50],
  }
});



class FloatingActionButtons extends React.Component {


  render(){
    const { classes } = this.props;
    //console.log(this.props.userId);
    return (
      <div>
        <Fab color="secondary" aria-label="Edit" className={classes.fab} type="button">
          <Link 
            to={{
                pathname: `/createStory`,
                state: {userId: this.props.userId}, // Los nombres tienen que ser esos, viene en la doc
            }}> <Icon className={classes.icon} >edit_icon</Icon>
          </Link>
          
        </Fab>
      </div>
    );
  } 
}


export default withStyles(styles)(FloatingActionButtons);