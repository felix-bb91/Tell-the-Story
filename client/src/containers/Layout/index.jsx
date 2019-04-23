import React from 'react';
import './style.css';
import Footer from '../../components/Footer';
//import Navbar from '../../components/Navbar';
import NavbarApp from '../../components/NavbarApp';
import ScrollToTop from '../../components/ScrollToTop';

class Layout extends React.Component{
    
 
    render(){
        return (
            <div className="App">
                <ScrollToTop />
                <NavbarApp />
                <div id="appContent">
                    {this.props.children} 
                </div>
                <Footer />
            </div>
        );
    }

}

export default Layout;