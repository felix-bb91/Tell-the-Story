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


class AuthorSelector extends React.Component {
    state = {
       authors: null,


    };

    componentDidMount(){
        var token = sessionStorage.getItem('token');
        const self = this; 
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/allAuthors/',
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
                bodyParsed.allAuthors[0].forEach((author) => {
                    newState.authors = {
                        ...newState.authors,
                        [author.username] : false,
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
        const authors = {...this.state.authors};
        authors[name] = event.target.checked;
        this.setState({ authors } );

    };

    startSearching = () => {
        const authorsArrayChecked = Object.entries(this.state.authors);
        //console.log(tagsArrayChecked);
        //console.log(tagsArrayChecked[0]);
        const authors = [];
        authorsArrayChecked.forEach((author) => {
          if(author[1] == true){
            authors.push(author[0])
          }
        });
        console.log(authors); // ya tenemos en authors el array con las key de los authors con checked a true
        this.postData(authors);
    };

    // Envio datos al servidor
    postData = (authors) => {
        var token = sessionStorage.getItem('token');
        const self = this; 
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/filteredByAuthors/',
            headers: {
                'token': token,
            },
            form: {
                authors: authors.join('|'),
                //authors: this.state.data.authors.join('|'), 
                /* authors no se estaba mandando como un array debido a configuración
                interna de la request. Para ello construimos nosotros la cadena separada
                por |, en el controlador, al recibirlo, lo que haremos será decir que 
                descomponga la info en un array donde cada elemento vendrá separado
                por el caracter | */
            }
        };
        //console.log(options.form);
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
    if(this.state.authors == null){return null};
 
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend"><div className="tagColor">Autores disponibles:</div></FormLabel>
          <FormGroup>
            {Object.keys(this.state.authors).map((author) => (
                <FormControlLabel
                    control={
                        <StyledCheckbox onChange={this.handleChange(author)} value={author} />
                    }
                    label={<div className="tagColor">{author}</div>}
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


AuthorSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AuthorSelector));
