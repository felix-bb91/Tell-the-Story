import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TitleInput from '../TitleInput';
import WYSWYGStory from '../WYSWYGStory';
import TagsSelect from '../TagsSelect';
import request from 'request';
import './style.css';

const styles = theme => ({
  root: {
    width: '100%',
    color: '#e3f2fd', 
    padding: '7rem',
    paddingTop: '3rem',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  buttonFinal: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#ff0066',
    color: 'white',
  },
  finalMessage:{
    fontSize: theme.spacing.unit *4,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 8,
  },

});



class VerticalLinearStepper extends React.Component {
  
  state = {
    activeStep: 0,
    data: {
      authorId: null,
      tags: [],
      storyTitle: null,
      storyBody: null,
      storyPostCorrect: null,
      message: '',
      variant: '',
    }
  };

  handleChange = ( key, value ) => {
    const newState = {...this.state};
    newState.data[key] = value;
    this.setState(newState);
  };


  allSteps = [
    {
      title: <h5 className="leftSteps">Elige un título para tu historia</h5>,
      description: <p className="descriptionCreateStory">Escribe el título de tu historia, ¡ échale imaginación !</p>,
      component: <TitleInput handleChange={this.handleChange} />
    },
    {
      title: <h5 className="leftSteps">Selecciona la temática del relato</h5>,
      description: <p className="descriptionCreateStory">Terror, aventura, un thriller misterioso... Elige sobre qué temática debe ir esta historia.</p>,
      component: <TagsSelect handleChange={this.handleChange} />
    },
    {
      title: <h5 className="leftSteps">Cuerpo de la historia</h5>,
      description: <p className="descriptionCreateStory">Empieza a darle forma a tu relato, recuerda respetar las normas de escritura.</p>,
      component: <div className="editorWidth"><WYSWYGStory  handleChange={this.handleChange} /></div>,
    },
    {
      title: <h5 className="leftSteps">¡ Ya casi has finalizado !</h5>,
      description: <p className="descriptionCreateStory">Si deseas publicar el relato, sólo te queda guardar y estar atento a cómo evoluciona tu historia.</p>,
      component: null,
    }
  ];  


  
  componentDidMount(){
    //console.log(this.props.location.state.userId); // Viene del Link de Story
    const newState = {...this.state};
    newState.data.authorId = this.props.location.state.userId;
    this.setState(newState);
  }

  handleNext = () => {
    if(this.state.activeStep === 3){
      this.postData();
    }

    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  // Envio datos al servidor
  postData = () => {
    var token = sessionStorage.getItem('token');
    //console.log(this.state.data.tags);
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/addStory/',
        headers: {
            'token': token,
            'userId': this.state.data.authorId,
        },
        form: {
          storyTitle: this.state.data.storyTitle,
          storyBody: this.state.data.storyBody,
          tags: this.state.data.tags.join('|'), 
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
            console.log(bodyParsed);
            sessionStorage.setItem('token', bodyParsed.token); // Guardo el token
        }
        else {
            // para probarlo, cambia la url
            console.log(body);
        }
    }

    request(options, callback); 
  }




  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <div className="createStoryContainerComponent">
        
        <div className="createStoryH1">
          <h1>Completa los siguientes pasos para dar forma a tu historia:</h1>
        </div>
      
        <div className={`${classes.root} ` }>
          <Stepper activeStep={activeStep} orientation="vertical" className="createStoryContainer">
            {this.allSteps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.title}</StepLabel>
                <StepContent>
                  {step.description}
                  <Typography>{step.component}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === this.allSteps.length - 1 ? 'GUARDAR' : 'SIGUIENTE'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === this.allSteps.length && (
            <Paper square elevation={0} className={classes.resetContainer } >
              <Typography className={classes.finalMessage}>¡ Muchas gracias por ser parte activa de este proyecto social !</Typography>
              <Button onClick={this.handleReset} className={classes.buttonFinal}>
                Crear otra historia
              </Button>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
