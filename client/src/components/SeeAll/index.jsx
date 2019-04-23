import React from 'react';
import './style.css';
import request  from 'request';
import {Link} from 'react-router-dom';
import CreateStoryButton from '../CreateStoryButton';
import Interweave from 'interweave';

class SeeAll extends React.Component{
    
    constructor(){
        super();
        this.state = {
            userId: "",
            stories: null, // Array
     
        };

    }

     // Trae datos del servidor
     getData = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
        
        /* Get request with header */
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/showAll',
            headers: {
                'token': token,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                //console.log(info);
                sessionStorage.setItem('token', info.token);
                const newState = {...self.state};
                newState.userId = info.userId;
                newState.stories = info.stories;
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

    render(){

        if(this.state.stories == null){
            return null;
        }
        else {

            return (

            <div className="homeContent" >

                <div className="col-sm-12 d-flex justify-content-center news">
                    <h1><center> ¿ No sabes qué leer ? Echa un vistazo a todas nuestras historias:</center></h1>
                </div>

                <div className="row">

                    <div className="col-sm-2 ">
                        <div className="fixed">
                            <h5 className="createH1 m-3 ">¿ Te animas a comenzar tu propia historia ?</h5>
                                <CreateStoryButton 
                                    userId={this.state.userId}
                                />
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <div className="row storiesSeeAllContainer">
                            {this.state.stories.map((story, index) => (
                                <div className="storySeeAllContainer" key={index}>
                                    <div className="storyTitleContainerSeeAll ">
                                        <h2 className="storyTitle ">{story.title}</h2>
                                    </div>
                                    <div className="tags">
                                        {story.tagname.map((tag, index)=>(
                                            <span className="eachTag" key={index}>{tag}</span>
                                        ))}
                                    </div>
                                    <div className="storyBody">
                                        <Interweave content={story.body}/> 
                                        <p className="read-more">
                                            <a className="button read-moreButton readMore" >
                                                <Link
                                                    to={{
                                                        pathname: `/story`,
                                                        state: {storyId: story.id}, // Los nombres tienen que ser esos, viene en la doc -> const { storyId } = this.props.location.state
                                                    }}> <span><b>Leer más</b> </span>
                                                </Link>
                                            </a>
                                        </p>

                                    </div>
                                </div>
                            ))} 
                        </div>
                    </div>

                 
                    <div className="col-sm-2"></div>

                </div>


            </div>
            );
            }
    }
}


export default SeeAll;