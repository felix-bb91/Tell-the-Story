import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import SaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class SendButton extends React.Component {


  handleOnClick = () => {
    this.props.getToPostHTMLSummernoteContent();
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={this.handleOnClick}
        >
          Publicar
          <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(SendButton);