import React from 'react';
import './style.css';
import request  from 'request';
import CreateStoryButton from '../CreateStoryButton';
import {Link} from 'react-router-dom';
import UploadButton from '../uploadButton';
import RemoveProfileAlert from '../RemoveProfileAlert';

class MyProfile extends React.Component{
    
    constructor(){
        super();
        this.state = {
            infoProfile: null,
            stories: [],
            storiesSections: [],
        };

    }

    // Trae datos del servidor
    getData = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
    
        /* Get request with header */
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/myProfile',
            headers: {
                'token': token,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var infoProfile = JSON.parse(body);
                //console.log(infoProfile);
                sessionStorage.setItem('token', infoProfile.token);

                const newState = {...self.state};
                newState.infoProfile = infoProfile.userInfo;
                self.setState(newState);
                
            } else {
                console.log(body);
            }
        }
        
        request(options, callback); 
    }

    // Trae datos del servidor
    getStories = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
    
        /* Get request with header */
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/userStories',
            headers: {
                'token': token,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var stories = JSON.parse(body);
                //console.log(stories);
                sessionStorage.setItem('token', stories.token);

                const newState = {...self.state};
                newState.stories = stories.stories;
                self.setState(newState);

                
            } else {
                console.log(body);
            }
        }
        
        request(options, callback); 
    }


    // Trae del servidor los relatos en los que el usuario ha escrito secciones
    getStoriesTitleSections = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)

        var options = {
            method: 'GET',
            url: 'http://localhost:3000/userSections',
            headers: {
                'token': token,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var stories = JSON.parse(body);
                //console.log(stories);
                sessionStorage.setItem('token', stories.token);
                
                const newState = {...self.state};
                newState.storiesSections = stories.storiesTitleSections;
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
        this.getStories(token);
        this.getStoriesTitleSections(token);
    }

    uploadPicture = (updatedProfile) => {
        const newState = {...this.state};
        newState.infoProfile = updatedProfile;
        this.setState(newState);
        
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

        if(this.state.infoProfile == null ){
            return null;
        }
        else{
            
            return (
            <div className="myProfileContainer">

                <h1>Mi perfil</h1>

                <div className="row section1">
                    <div className="col-sm-8 myProfilePictureContainer">
                        <img 
                            className="element rounded-circle" 
                            src={this.state.infoProfile.imgURL ? this.state.infoProfile.imgURL : 'error'} 
                            onError={(e)=>{console.log(e.target); e.target.onerror = null; e.target.src="/images/uploads/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"}}/>
                        <h4 className="left">Nombre de usuario:</h4>
                        <p className="left profileData">{this.state.infoProfile.username}</p>
                        <h4 className="left">Correo electrónico:</h4>
                        <p className="left profileData">{this.state.infoProfile.mail}</p>
                        <h4 className="left">País:</h4>
                        <p className="left profileData">{this.state.infoProfile.country}</p>
                        <h4 className="left">Ciudad:</h4>
                        <p className="left profileData">{this.state.infoProfile.city}</p>
                        <h4 className="left">Miembro desde:</h4>
                        <p className="left profileData">{
                            this.formatDate(this.state.infoProfile.register_date)
                        }</p>

                        {/* ------------------------------------------------------------ */}
                        <div className="uploadButton">
                            <UploadButton uploadPicture={this.uploadPicture} />
                        </div>
                        

                        {/* ------------------------------------------------------------ */}

                        
                    </div>
                    <div className="col-sm-3 myProfileCreateStory">
                        <h3 className="createH1">¿ Te animas a comenzar tu propia historia ?</h3>
                        <CreateStoryButton 
                            userId={this.state.userId}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-sm-2">
                       
                    </div>
                    <div className="col-sm-4 ">
                        <h3 className="mb-2">Mis relatos:</h3>
                        <div className="myProfileStoryTitlesContainer">
                            {this.state.stories.map((story, index)=>(
                                <Link
                                    to={{
                                        pathname: `/story`,
                                        state: {storyId: story.id}, 
                                    }}> 
                                    <div className="myProfileStoryTitle" key={index}>
                                        {story.title}
                                    </div>
                                </Link>
                                
           
                            ))}
                        </div>

                    </div>
                    <div className="col-sm-4 ">
                        <h3 className="mb-2">Colaboré en:</h3>
                        <div className="myProfileStoryTitlesContainer">
                            {this.state.storiesSections.map((story, index)=>(
                                <Link
                                    to={{
                                        pathname: `/story`,
                                        state: {storyId: story.storyID}, // Los nombres tienen que ser esos, viene en la doc -> const { storyId } = this.props.location.state
                                    }}>                                     
                                    <div className="myProfileStoryTitle" key={index}>
                                        {story.storyTitle}
                                    </div>
                                </Link>

                                ))}
                        </div>
                    </div>
                    <div className="col-sm-2">
                       
                    </div>
                </div>
                <div className="row removeProfile">
                    <div  className="col-sm-4"></div>
                    <div  className="col-sm-5"></div>
                    <div  className="col-sm-3">
                        <RemoveProfileAlert />
                    </div>
                    
                </div>

            </div>
        );
        }
        
    }
}


export default MyProfile;