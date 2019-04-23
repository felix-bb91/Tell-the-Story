import React from 'react';
import './style.css';
import request  from 'request';



class publicProfile extends React.Component{
    
    constructor(){
        super();
        this.state = {
            publicUserInfo: null,
            stories: null,
            sections: null,
            idPublicUser : window.history.state.state.publicProfileId, // Para poder acceder a los datos pasados por link desde story
        };

    }

    // Trae datos del servidor pero es POST para poder mandar el body con info
    getData = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
        //console.log(this.state.idPublicUser);
        /* Get request with header */
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/myProfile/publicProfile',
            headers: {
                'token': token,
            },
            form: {
                idPublicUser: this.state.idPublicUser,
            }
        };
        //console.log(options.form);
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                //console.log(info);
                sessionStorage.setItem('token', info.token);

                const newState = {...self.state};
                newState.publicUserInfo = info.publicUserInfo;
                newState.stories = info.storiesPublicUser;
                newState.sections = info.sectionsPublicUser;
                self.setState(newState);
                
            } else {
                console.log(body);
            }
        }
        
        request(options, callback); 
    }

    

    componentDidMount(){
        var token = sessionStorage.getItem('token');
        this.getData(token);
    }


    formatDate = (date) => {
        var monthNames = [
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ];
        // La fecha viene en formato string
        var dateFormat = new Date(date);
        var day = dateFormat.getDate();
        var monthIndex = dateFormat.getMonth();
        var year = dateFormat.getFullYear();
      
        return day + ' de ' + monthNames[monthIndex] + ' del ' + year;
    }

    render(){

        //const { publicProfileId } = this.props.location.state; // Enviado desde el Route, con Link to
        //console.log(window);
        //console.log(this.props.location.state.publicProfileId);
        //console.log(publicProfileId);

        if(this.state.idPublicUser == null || this.state.publicUserInfo == null ){
            return null;
        }
        else{
            
            return (
            <div className="myProfileContainer">

                <h1>Información sobre {this.state.publicUserInfo.username}</h1>

                <div className="row section1">

                    <div className="col-sm-3 ">
                    </div>

                    <div className="col-sm-6 myProfilePictureContainer">
                        <img 
                            className="element rounded-circle" 
                            src={this.state.publicUserInfo.imgURL ? this.state.publicUserInfo.imgURL : 'error'} 
                            onError={(e)=>{console.log(e.target); e.target.onerror = null; e.target.src="/images/uploads/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"}}/>
                        <h4 className="left">Nombre de usuario:</h4>
                        <p className="left profileData">{this.state.publicUserInfo.username}</p>
                        <h4 className="left">Correo electrónico:</h4>
                        <p className="left profileData">{this.state.publicUserInfo.mail}</p>
                        <h4 className="left">País:</h4>
                        <p className="left profileData">{this.state.publicUserInfo.country}</p>
                        <h4 className="left">Ciudad:</h4>
                        <p className="left profileData">{this.state.publicUserInfo.city}</p>
                        <h4 className="left">Miembro desde:</h4>
                        <p className="left profileData">{
                            this.formatDate(this.state.publicUserInfo.register_date)
                        }</p>

                        <div className="row otherPublicInfo">
                            <div className="col-sm-6">
                                <h4>Número de relatos creados:</h4>
                                <p className="totalContainer">
                                    {this.state.stories.length}
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <h4>Número de colaboraciones:</h4>
                                <p className="totalContainer">
                                    {this.state.sections.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 ">
                    </div>

                </div>
               

            </div>
        );
        }
        
    }
}


export default publicProfile;