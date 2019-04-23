import React from 'react';
import Layout from '../Layout';
import { Switch, Route } from 'react-router-dom';
import LoginRegisterPage from '../../components/LoginRegisterPage';
import Home from '../../components/Home';
import MyProfile from '../../components/MyProfile';
import SeeAll from '../../components/SeeAll';
import Story from '../../components/Story';
import FilterResults from '../../components/FilterResults';
import Donate from '../../components/Donate';
import CreateStory from '../../components/CreateStory';
import Information from '../../components/Information';
import MyPublicProfile from '../../components/MyPublicProfile';

class MainPage extends React.Component{
    

    render(){

        return (
            <Layout >
                <Switch>

                    < Route 
                        exact
                        path="/"
                        component={LoginRegisterPage}
                    />
                    < Route 
                        exact
                        path="/home"
                        component={Home}
                    />
                    < Route 
                        exact
                        path="/myProfile"
                        component={MyProfile}
                    />
                    < Route 
                        exact
                        path="/publicProfile"
                        component={MyPublicProfile}
                    />

                    < Route 
                        exact
                        path="/seeAll"
                        component={SeeAll}
                    />
                    < Route 
                        exact
                        path="/filterResults"
                        component={FilterResults}
                    />
                    < Route 
                        exact
                        path="/story"
                        component={Story}
                    />
                    < Route 
                        exact
                        path="/donate"
                        component={Donate}
                    />
                    < Route 
                        exact
                        path="/createStory"
                        component={CreateStory}
                    />
                    < Route 
                        exact
                        path="/information"
                        component={Information}
                    />

                </Switch>
            </Layout>
        );
    }
}


export default MainPage;