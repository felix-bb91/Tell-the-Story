import React from "react";
import './style.css';
import CancelButton from '../CancelButton';
import SendButton from '../SendButton';
import request from 'request';

class WYSWYG extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           story_id: null,  // viene desde el componente Story -> ButtonOrEditor 
           sectionPostCorrect : null,  
           message : null,
           variant: null, 
           sections :  null, // PAra que Story se entere cuando añadamos una sección
        };
    }

    componentWillMount(){
        this.setState({story_id : this.props.story});
    }

    // Cambiamos las propiedades de Story para poder renderizar el mensaje de exito y las nuevas secciones
    handleSnackbarProperties = () => {
        this.props.handleSnackbarProperties(this.state.sectionPostCorrect, this.state.message, this.state.variant, this.state.sections);
    }

    // Envio datos al servidor
    postData = (section) => {
        var token = sessionStorage.getItem('token');
        const self = this; 

        var options = {
            method: 'POST',
            url: 'http://localhost:3000/addSection/',
            headers: {
                'token': token,
                'storyId': this.state.story_id,
                'section' : section,
            }
        };

        function callback(error,response,body){
            if (!error && response.statusCode === 200) { // El POST se ha realizado con éxito
                const bodyParsed = JSON.parse(body); // Parseo el body que viene como string
                //console.log(bodyParsed);
                sessionStorage.setItem('token', bodyParsed.token); // Guardo el token
                
                // Hacemos que aparezca el mensaje de success y que el padre sea consciente de las nuevas secciones
                const newState = {...this.state}; // Copia del estado
                newState.sectionPostCorrect = true;
                newState.message = 'Sección añadida correctamente';
                newState.variant = "success";
                newState.sections = bodyParsed.sections;
                self.setState(newState);
                self.handleSnackbarProperties();

                //self.closeEditor();

                // eslint-disable-next-line no-undef
                $('#summernote').summernote('code', 'Agrega más secciones o haz click en cancelar para salir de la edición.');

            }
            else {
                // para probarlo, cambia la url
                
                console.log(body);
                const newState = {...this.state}; // Copia del estado
                newState.sectionPostCorrect = false;
                newState.message = 'Lo sentimos, no se ha podido guardar su sección';
                newState.variant = "error";
                self.setState(newState);

                self.handleSnackbarProperties();
            }
        }

        request(options, callback); 
    }


    componentDidMount(){

        // eslint-disable-next-line no-undef
        $('#summernote').summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: true,                  // set focus to editable area after initializing summe
            placeholder: 'Escribe aquí tu historia...',
        })
        // eslint-disable-next-line no-undef
       $('#summernote').summernote('justifyLeft');
   }

   getToPostHTMLSummernoteContent = () => {
        // eslint-disable-next-line no-undef
        const markupStr = $('#summernote').summernote('code');
        //console.log(markupStr);
        //this.setState({ textHTML: markupStr });
        this.postData(markupStr);
   };

   handleSnackBarState = (openState) => {
    this.setState({ sectionPostCorrect: openState });
    
  };

  closeEditor = () => {
      this.props.closeEditor();
  }

    render(){
        return (
            <div className="addSectionSummernote">
                <div id="summernote"></div>

                <div className="row buttonsSummernote">
                    <div className="col-sm-6">
                        <SendButton
                            getToPostHTMLSummernoteContent={this.getToPostHTMLSummernoteContent}
                        />
                    </div>
                    <div className="col-sm-6">
                        <CancelButton
                            closeEditor={this.closeEditor}
                        />
                    </div>
                </div>

            </div>
               
      );
    }

}


export default WYSWYG;