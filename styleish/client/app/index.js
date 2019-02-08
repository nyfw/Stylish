var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>hi ()=^-^=</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
