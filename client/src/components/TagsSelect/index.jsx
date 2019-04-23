import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import './style.css';

const styles = theme => ({
  root: {
    //display: "flex",
    flexWrap: "wrap",

  },
  formControl: {
    margin: theme.spacing.unit ,
    minWidth: 400,
    maxWidth: 600,

  },
  text: {
    fontSize: 22,

  },
  select: {
    minHeight: 50,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",

  },
  chip: {
    margin: theme.spacing.unit / 4,
    fontSize: 20,
    padding: 15,
    backgroundColor: pink[500],
    color: grey[50],
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
};

const tags = [
  "Fantasía",
  "Sci-fi",
  "Terror",
  "Drama",
  "Policíaco",
  "Noir",
  "Comedia",
  "Infantil",
  "Juvenil",
  "Aventuras",
  "Histórico",
  "Thriller",
  "Misterio"
];

function getStyles(tag, that) {
  return {
    fontWeight:
      that.state.tag.indexOf(tag) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}

class TagsSelect extends React.Component {
  state = {
    tag: []
  };

  handleChange = event => {
    this.setState({ tag: event.target.value });
    this.props.handleChange('tags', event.target.value)
    };
  

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      tag: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.text} htmlFor="select-multiple-chip" >Tags</InputLabel>
          <Select
            multiple
            className={classes.select}
            value={this.state.tag}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {tags.map(tag => (
              <MenuItem key={tag} value={tag} style={getStyles(tag, this)}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

TagsSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TagsSelect);
