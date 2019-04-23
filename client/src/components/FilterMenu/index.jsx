import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import ExpansionPanel from './ExpansionPanel';


const styles = {
  list: {
    width: 380,
    padding: 10,
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };




  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button >
            <StyledListItemText 
              primary={<ExpansionPanel 
                          searchHeader={"POR AUTOR"}
                          searchOption={"author"}
                      />}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <StyledListItemText 
              primary={<ExpansionPanel 
                          searchHeader={"POR COLABORADOR"}
                          searchOption={"contributor"}
                      />}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <StyledListItemText 
              primary={<ExpansionPanel 
                          searchHeader={"POR TAGS"}
                          searchOption={"tags"}
                      />}
            />
          </ListItem>
        </List>
        <Divider />
      </div>
    );

   

    return (
      <div>
        <StyledButton onClick={this.toggleDrawer("left", true)}>FILTRAR <SearchIcon /> </StyledButton>

        <StyledDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", true)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </StyledDrawer>
      </div>
    );
  }
}

const StyledButton = withStyles({
    root: {
        color: 'white',
        margin: '0.5rem',
    }
})(Button)

const StyledDrawer = withStyles({
    root: {
        color:'grey',
    },
    paper:{
        backgroundColor: '#7b97c7',
    }
})(Drawer)

const StyledListItemText = withStyles({
    primary: {
        color: 'white',
    }
})(ListItemText)



TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
