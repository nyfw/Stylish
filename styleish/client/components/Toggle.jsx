import React, { Component } from "react";

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { on } = this.state;
    this.setState({ on: !on });
  }

  render() {
    const { render } = this.props;
    const { on } = this.state;
    return (
      <div>
        {render({
          on,
          toggle: this.toggle
        })}
      </div>
    );
  }
}
