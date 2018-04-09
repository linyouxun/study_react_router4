import React from 'react';

class TestDOMInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: '',
    };
  }
  componentDidMount() {
    this.fun();
  }

  fun() {
    this.setState({
      pathName: window.location.pathname,
    });
  }

  render() {
    const { pathName } = this.state;
    return (
      <div>
        {pathName}
        TestDOMInner
      </div>
    );
  }
}

export default TestDOMInner;
