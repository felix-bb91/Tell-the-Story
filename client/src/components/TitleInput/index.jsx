import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 25,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  root: {
    //display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 25
  }
});

class TitleInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null
        };
    }
   
  render() {
    const { classes } = this.props;
    
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="age-customized-select"
            className={classes.bootstrapFormLabel}
          >
            Títlulo de la historia
          </InputLabel>
          <BootstrapInput 
            onChange={ (e) => {this.props.handleChange('storyTitle', e.target.value)}}
          />
        </FormControl>
      </form>
    );
  }
}

TitleInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitleInput);