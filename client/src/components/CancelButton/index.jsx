import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

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

class CancelButton extends React.Component{


  closeEditor = () => {
    this.props.closeEditor();
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={this.closeEditor}
        >
          Cancelar
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </div>
    );
}
}


export default withStyles(styles)(CancelButton);
