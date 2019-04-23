import React from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import WYSWYG from '../WYSWYG';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    margin: {
      margin: theme.spacing.unit
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    }
});




class ButtonOrEditor extends React.Component{
    
    constructor(){
        super();
        this.state = {
            openEditor: false,
            
        };

    }

    handlePlusButtonClick = () => {
        const newState = {...this.state};
        newState.openEditor = true;
        this.setState(newState);
    }

    closeEditor = () => {
        const newState = {...this.state};
        newState.openEditor = false;
        this.setState(newState); 
    }

    render(){

        if(this.state.openEditor === false){
            return (
                <div>
                    <Fab
                        size="medium"
                        color="secondary"
                        aria-label="Add"
                        className={this.props.classes.margin}
                        onClick={() => { this.handlePlusButtonClick() }}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            );
        }
        else {
            
            return (
                <WYSWYG 
                    story={this.props.story} // id de la story en la que estamos
                    closeEditor={this.closeEditor}
                    handleSnackbarProperties={this.props.handleSnackbarProperties}
                />
            );
        }
    }
}


export default withStyles(styles)(ButtonOrEditor);