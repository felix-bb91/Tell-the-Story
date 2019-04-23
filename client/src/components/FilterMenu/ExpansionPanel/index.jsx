import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TagsSelector from './TagsSelector';
import AuthorSelector from './AuthorSelector';
import ContributorSelector from './ContributorSelector';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#ffffff'
  },

  expansion: {
    backgroundColor: '#7b97c7',
    boxShadow: ' 0 0 0 0'
  }
});

class SimpleExpansionPanel extends React.Component {
  
  render() {
    const { classes } = this.props;

    const option = this.props.searchOption;
    let optionSelected;

    if (option === "tags") {
      optionSelected = <TagsSelector />;
    } else if (option === "author") {
      optionSelected = <AuthorSelector />;
    } else {
      optionSelected = <ContributorSelector />;
    }


    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.searchHeader}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { optionSelected }
          </ExpansionPanelDetails>
        </ExpansionPanel>
    
      </div>
    );
  }
}




SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
