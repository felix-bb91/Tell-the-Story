// ScrollToTop.jsx

import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
    
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
		}
    }
    componentDidMount() {
		window.scrollTo(0, 0)
    }

	render() {
		return null;
	}
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

export default ScrollToTopWithRouter;
