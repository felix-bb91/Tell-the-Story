import React from 'react';
import styles from './style.module.css';
import request from 'request';
//import PlusButton from '../PlusButton';
import ButtonOrEditor from '../ButtonOrEditor';
//https://milesj.gitbook.io/interweave#documentation
/* Permite parsear el texto que traemos a HTML del WYSWYG */
import Interweave from 'interweave';
import CustomizedSnackbars from '../SnackBar';
import CreateStoryButton from '../CreateStoryButton';
import {Link} from 'react-router-dom';

class Story extends React.Component{
    
    constructor(){
        super();
        this.state = {
            userId: "",
            story: null, // Array
            sections: null,
            sectionPostCorrect : null,  
            message : null,
            variant: null, 
            tags: null,
        };

    }

     // Trae datos del servidor
     getData = (token) => {
        const self = this; // ya que la función de callback no sabe quién es this (problema de scope)
        
        /* Get request with header */
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/story',
            headers: {
                'token': token,
                'storyId': this.props.location.state.storyId,
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                console.log(info);
                // guardar info en el estado descompuesto
                const newState = {...self.state};
                newState.userId = info.userId;
                newState.story = info.story;
                newState.sections = info.sections;
                newState.tags = info.tags;
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

//////////////////////////////////////////
    handleSnackBarState = (openState) => {
        this.setState({ sectionPostCorrect: openState });
    };

    handleSnackbarProperties = (isCorrect, message, variant, sectionsArray) => {
        const newState = {...this.state}; 
        newState.sectionPostCorrect = isCorrect;
        newState.message = message;
        newState.variant = variant;
        newState.sections = sectionsArray;
        this.setState(newState);
    }
   
//////////////////////////////////////////

    render(){

        if(this.state.story == null){
            return null;
        }
        else {
            //console.log(this.state);
            return (
            <div className="row">
                <div className={`row ${styles.titleContainer}`}>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 ">
                        <h1 className={styles.storyTitle}>
                            {this.state.story[0].title}
                        </h1>

                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
                <div className={`row ${styles.tagsStoryRow}`}>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                    {
                        this.state.tags.map((tag, index) => {
                            return <span className={`eachTag ${styles.oneTag}`} key={index}>{tag.tagname}</span>        
                        })
                    }
                    </div>
                    <div className="col-sm-3"></div>
                </div>
                <div className={`row ${styles.storyBodyContainer}`}>
                    <div className={`col-sm-3 ${styles.author}`}>
                        <Link
                            to={{
                                pathname: `/publicProfile`,
                                state: {publicProfileId: this.state.story[0].author_id}, 
                            }}> 
                            <p className={styles.authorText}>{this.state.story[0].username}</p>
                        </Link>
                        
                    </div>
                    <div className={`col-sm-6 ${styles.storyBody}`}>
                        <Interweave content={this.state.story[0].body}/>
                    </div>
                    <div className="col-sm-3">
                        <div className={styles.createStory}>
                            <h3 className="createH1">¿ Te animas a comenzar tu propia historia ?</h3>
                            <CreateStoryButton 
                                userId={this.state.userId}
                            />
                        </div>
  
                    </div>
                </div>

              
                {
                    this.state.sections.map((sect) => {
                        //console.log(sect.id);
                        return(
                        <div className={`row ${styles.storyBodyContainer}`} key={sect.id}>
                            <div className={`col-sm-3 ${styles.author}`}>
                                <Link
                                    to={{
                                        pathname: `/publicProfile`,
                                        state: {publicProfileId: sect.author_id}, 
                                    }}> 
                                    <p className={styles.authorText}>{sect.username}</p>
                                </Link>
                                
                            </div>
                            <div className={`col-sm-6 ${styles.storyBody}`}>
                                <Interweave content={sect.body} />
                            </div>
                            <div className="col-sm-3"></div>
                        </div>)
                    })
                }
                    

            
                <div className={`row ${styles.addSectionsContainer}`}>
                    <div className="col-sm-3"></div>
                    <div className={`col-sm-6 `}>
                        <ButtonOrEditor 
                            story={this.state.story[0].id}
                            handleSnackbarProperties={this.handleSnackbarProperties}
                        />
                    </div>
                    <div className="col-sm-3"></div>
                </div>

                <CustomizedSnackbars 
                    open={this.state.sectionPostCorrect != null ? true : false} 
                    message={this.state.message} 
                    variant={this.state.variant}
                    handleSnackBarState={this.handleSnackBarState}
                />


            </div>
            );
        }
    }
}


export default Story;