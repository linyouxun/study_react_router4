import React from 'react';
class TestDOMInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: ''
    }
  }
  componentDidMount() {
    this.setState({
      pathName: window.location.pathname
    })
  }


  render() {
    let {pathname} = this.state;
    return (
      <div>
        {pathname}
        TestDOMInner
      </div>
    );
  }
}

export default TestDOMInner