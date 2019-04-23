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
import './style.css';


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

class TagsSelector extends React.Component {
  state = {

    tags:{
      Fantasía: false,
      "Sci-fi": false,
      Terror: false,
      Drama: false,
      Policíaco: false,
      Noir: false,
      Comedia: false,
      Infantil: false,
      Juvenil: false,
      Aventuras: false,
      Histórico: false,
      Thriller: false,
      Misterio: false,
    },

  };

  handleChange = name => event => {
    const tags = {...this.state.tags};
    tags[name] = event.target.checked;
    this.setState({ tags } );
    
  };

  startSearching = () => {
    const tagsArrayChecked = Object.entries(this.state.tags);
    //console.log(tagsArrayChecked);
    //console.log(tagsArrayChecked[0]);
    const tags = [];
    tagsArrayChecked.forEach((tag) => {
      if(tag[1] === true){
        tags.push(tag[0])
      }
    });
    //console.log(tags); // ya tenemos en tags el array con las key de los tags con checked a true
    this.postData(tags);
  };

   // Envio datos al servidor
   postData = (tags) => {
    var token = sessionStorage.getItem('token');
    const self = this; 
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/filteredByTags/',
        headers: {
            'token': token,
        },
        form: {
          tags: tags.join('|'),
          //tags: this.state.data.tags.join('|'), 
          /* tags no se estaba mandando como un array debido a configuración
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
            //console.log(bodyParsed);
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
  }





  render() {
    const { classes } = this.props;

 
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend"><div className="tagColor">Tags disponibles:</div></FormLabel>
          <FormGroup>
            {tags.map((tag, index) => (
              <FormControlLabel
                control={
                  <StyledCheckbox onChange={this.handleChange(tag)} value={tag} />
                }
                label={<div className="tagColor">{tag}</div>}
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


TagsSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TagsSelector));
