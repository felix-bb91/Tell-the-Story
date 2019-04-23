import React from 'react';
import {Link} from 'react-router-dom';
import CreateStoryButton from '../CreateStoryButton';
import Interweave from 'interweave';


class FilterResults extends React.Component{
    
    constructor(){
        super();

    }


    render(){

        
        //console.log(this.props.location.state.stories);
        const storiesSearched = this.props.location.state.stories;
        return (
            <div className="homeContent" >

                <div className="col-sm-12 d-flex justify-content-center news">
                    <h1><center> Resultados de la búsqueda:</center></h1>
                </div>

                <div className="row">

                    <div className="col-sm-2 ">
                        <div className="fixed">
                            <h5 className="createH1 m-4 ">¿ Te animas a comenzar tu propia historia ?</h5>
                                <CreateStoryButton 
                                    userId={this.props.location.state.userId}
                                />
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <div className="row storiesSeeAllContainer">
                            {storiesSearched.map((story, index) => (
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
                                            <a href="" className="button read-moreButton readMore" >
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


export default FilterResults;