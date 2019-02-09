import React, { Component } from 'react';
import brace from 'brace';
import {split as AceEditor } from 'react-ace';
import { TranslateButton } from '../styles/Ide.jsx'
import 'brace/mode/css';
import 'brace/theme/xcode';


class Ide extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        userInput: '',
        code: ''
    };
  }

  onChange(newValue) {
    let unparsed = '';
    let translated = '';
    console.log('newValue', newValue);
    unparsed += newValue[0];
    newValue[0] = newValue[0] + "hiiii";
    translated += newValue[0];
    this.setState((state, props) => {
        return {
         userInput: state.userInput = unparsed,
        }
    });
    console.log(this.state)
  }

  handleSubmit () {
      let original = this.state.userInput;
      let converted = original;
      this.setState({code: converted});
  }

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
      <TranslateButton>
      <button onClick={()=>{this.handleSubmit()}}>TRANSLATE</button>
      </TranslateButton>
      
      </div>
    )
  }
}

export default Ide;