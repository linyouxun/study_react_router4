import React from 'react';
import './Index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = '';
    this.state = {
      // text: '',
    };
  }

  componentDidMount() {
  }


  render() {
    // let { text } = this.state;
    // let { routes } = this.props;
    return (
      <div className="wrapper">
        index
      </div>
    );
  }
}

export default Index;
