import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import request from 'request';
import {withRouter} from 'react-router-dom'



const styles = theme => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    color: '#ffffff',
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },

});


class ContributorSelector extends React.Component {
    state = {
       contributors: null,


    };

    componentDidMount(){
        var token = sessionStorage.getItem('token');
        const self = this; 
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/allSectionsAuthors/',
            headers: {
                'token': token,
            },
            
        };
        function callback(error,response,body){
            if (!error && response.statusCode === 200) { 
                const bodyParsed = JSON.parse(body); 
                //console.log(bodyParsed);
                sessionStorage.setItem('token', bodyParsed.token); // Guardo el token
                //console.log(bodyParsed.allAuthors);
                const newState = {...self.state};
                bodyParsed.allAuthors[0].forEach((contributor) => {
                    newState.contributors = {
                        ...newState.contributors,
                        [contributor.username] : false,
                    };

                });
                self.setState(newState);
            }
            else {
                console.log(body);
            }
        }
    
        request(options, callback); 





    }



    handleChange = name => event => {
        const contributors = {...this.state.contributors};
        contributors[name] = event.target.checked;
        this.setState({ contributors } );

    };

    startSearching = () => {
        const contributorsArrayChecked = Object.entries(this.state.contributors);
        //console.log(tagsArrayChecked);
        //console.log(tagsArrayChecked[0]);
        const contributors = [];
        contributorsArrayChecked.forEach((contributor) => {
          if(contributor[1] === true){
            contributors.push(contributor[0])
          }
        });
        console.log(contributors); // ya tenemos en contributors el array con las key de los contributors con checked a true
        this.postData(contributors);
    };

    // Envio datos al servidor
    postData = (contributors) => {
        var token = sessionStorage.getItem('token');
        const self = this; 
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/filteredBySectionsAuthors/',
            headers: {
                'token': token,
            },
            form: {
                contributors: contributors.join('|'),
            }
        };
        function callback(error,response,body){
            if (!error && response.statusCode === 200) { // El POST se ha realizado con éxito
                const bodyParsed = JSON.parse(body); // Parseo el body que viene como string
                console.log(bodyParsed);
                
                sessionStorage.setItem('token', bodyParsed.token); // Guardo el token
                self.props.history.push({
                    pathname:'/filterResults',
                    state: { 
                        stories: bodyParsed.stories,
                        userId: bodyParsed.userId,
                    }
                });
            }
            else {
                console.log(body);
            }
        }

        request(options, callback); 
    };

  


  render() {
    const { classes } = this.props;
    if(this.state.contributors == null){return null};
 
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend"><div className="tagColor">Autores disponibles:</div></FormLabel>
          <FormGroup>
            {Object.keys(this.state.contributors).map((contributor) => (
                <FormControlLabel
                    control={
                        <StyledCheckbox onChange={this.handleChange(contributor)} value={contributor} />
                    }
                    label={<div className="tagColor">{contributor}</div>}
              />
            ))}
          </FormGroup>
          <FormHelperText>
          <div className="tagColor">* Selecciona algún campo para comenzar la búsqueda </div>
          </FormHelperText>
          <Button 
            size="medium" 
            className={classes.margin} 
            color="secondary" 
            variant="contained"
            onClick={this.startSearching}
          >
            Buscar
          </Button>
        </FormControl>
      </div>
    );
  }
}

const StyledCheckbox = withStyles({
    root: {
        color:'#ffffff',
    },
})(Checkbox)


ContributorSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ContributorSelector));
