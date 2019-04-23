import React from 'react';
import './style.css';
import request  from 'request';
import {Link} from 'react-router-dom';
import CreateStoryButton from '../CreateStoryButton';
import Interweave from 'interweave';


class Home extends React.Component{
    
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
            url: 'http://localhost:3000/home',
            headers: {
                'token': token,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                console.log(info);
                // guardar info en el estado descompuesto
                const newState = {...self.state};
                newState.userId = info.userId;
                newState.stories = info.stories;
                self.setState(newState);
            } 
            else {
                console.log(body);
            }
        }
        
        request(options, callback); 
    }
     
    componentDidMount(){
        var token = sessionStorage.getItem('token');
        this.getData(token);
    }
    // Para que la animación corra cuando lleguen los datos
    componentDidUpdate() {
        this.animationCascade();
    }

    animationCascade = () => {
        // El $ no lo reconocia (undef), la línea de abajo es para hacer que ignore ese supuesto undef que no es real ya que jQuery está importado en el html
        // eslint-disable-next-line no-undef
        $('#cascade-slider').cascadeSlider({
            itemClass: 'cascade-slider_item',
            arrowClass: 'cascade-slider_arrow'
        });

    }


    render(){

        
        if(this.state.stories == null){
            return null;
        }
        else {

            return (

            <div className="homeContent" >

                <div className="col-sm-12 d-flex justify-content-center news">
                    <h1><center> Últimos relatos</center></h1>
                </div>

                <div className="row">

                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                    <div className="cascade-slider_container" id="cascade-slider">
                        <div className="cascade-slider_slides">
                            {this.state.stories.map((story, index) => (
                                <div className="cascade-slider_item" key={index}>
                                    <div className="storyTitleContainerHome ">
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

                        <ol className="cascade-slider_nav">
                            <li className="cascade-slider_dot cur"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                            <li className="cascade-slider_dot"></li>
                        </ol>

                        <span className="cascade-slider_arrow cascade-slider_arrow-left " data-action="prev">
                            <i className="fa fa-chevron-left arrow" ></i>
                        </span>
                        <span className="cascade-slider_arrow cascade-slider_arrow-right" data-action="next">
                            <i className="fa fa-chevron-right arrow" ></i>
                        </span>
                    </div>

                    </div>
                    <div className="col-sm-1"></div>

                </div>
                <div className="row moreInfo">
                    <div className="col-sm-12">
                        <h1 className="createH1">¿ Te animas a comenzar tu propia historia ?</h1>
                        <CreateStoryButton 
                            userId={this.state.userId}
                        />
                    </div>
                    
                </div>

            </div>
            );
            }
    }
}


export default Home;
