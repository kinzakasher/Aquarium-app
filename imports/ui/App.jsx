import React, { Component } from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './p5/sketch.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Fishtank } from '../api/fishtank.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fishtank: {},
    };
 
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>super-serial-app</h1>
        </header>
        {/*pass the p5 sktech file into the React wrapper
        also pass the fishtank prop which will updated based on withTracker below*/}
        <P5Wrapper sketch={sketch} fishtank={this.props.fishtank} />
      </div>
    );
  }
}

App.defaultProps = {
  fishtank: {text:"."},
};

App.propTypes = {
  fishtank: PropTypes.object.isRequired,
};

export default withTracker(props => {
  Meteor.subscribe('fishtank');
  return {
    fishtank: Fishtank.find({}, { sort: { updatedAt: -1 } }).fetch()[0],
  };
})(App);

