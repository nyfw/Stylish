import React, { Component } from 'react';
import brace from 'brace';
import {split as AceEditor } from 'react-ace';
import fetch from 'isomorphic-fetch'
import 'brace/mode/css';
import 'brace/theme/xcode';


class Ide extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {
        userInput: '',
        converted: ''
    };
  }


  onChange(newValue) {
    let unparsed = '';
    unparsed += newValue[0];
    this.setState((state, props) => {
        return {
         userInput: state.userInput = unparsed,
        }
    });
    console.log(this.state)
  }

  // handleSubmit () {
  //     let original = this.state.userInput;
  //     let converted = original;
  //     this.setState({converted: converted});
  // }

  handleSubmit() {
    fetch('http://localhost:3000/translate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        css: this.state.userInput
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(data)
        } else {
          console.log(data);
        }
      });
  };

  render() {
    return (
      <div>
      <AceEditor
        mode="css"
        theme="xcode"
        onChange={this.onChange}
        name="app"
        value = {[this.state.userInput, this.state.code]}
        splits = {2}
        editorProps={{$blockScrolling: true}}
        showLineNumbers = {false}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        width = '700px'
        height = '250px'
      />
      <button onClick={()=>{this.handleSubmit()}}>TRANSLATE</button>
      </div>
    )
  }
}

export default Ide;