import React from 'react';
import {
  Switch, 
  Route,
  Link
} from 'react-router-dom';
import TestDOMInner from './TestDOMInner';
class TestDOM extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }


  render() {
    console.log('TestDOM');
    return (
      <div>
        TestDOM
      </div>
    );
  }
}

export default TestDOM