import React, { Component } from 'react';
import brace from 'brace';
import {split as AceEditor } from 'react-ace';
import fetch from 'isomorphic-fetch'
import { TranslateButton } from '../styles/Ide.jsx'
import 'brace/mode/css';
import 'brace/theme/xcode';


class Ide extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.convertToStyled = this.convertToStyled.bind(this); 
    this.state = {
        userInput: '/*Load your css*/ \n \n',
        converted: '/*Styled component translation here*/ \n \n'
    };
  }


  onChange(newValue) {
    let unparsed = '';
    unparsed += newValue[0];
    this.setState({userInput: unparsed})
  }

  convertToStyled(data) {
    let firstBracket, lastBracket, copiedinfo;

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '{') {
        firstBracket = i;
        break; 
      }
    }
    for (let i = data.length-1; i > 0; i--) {
      if (data[i] === '}') {
        lastBracket = i;
        break; 
      }
    }
    copiedinfo = data.substring(firstBracket + 1, lastBracket);
    let result = "/*Styled component translation here*/ \n \n const <yourStyledElement> = styled.<tagToStyle>`" + copiedinfo + "`;"
    return result;
  }

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
          data = this.convertToStyled(data);
          this.setState({converted: data})
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
          value={[this.state.userInput, this.state.converted]}
          splits={2}
          editorProps={{$blockScrolling: true}}
          showLineNumbers={false}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          width='700px'
          wrapEnabled = {true}
          height='250px'
        />
      <TranslateButton>
        <button onClick={()=>{this.handleSubmit()}}>TRANSLATE</button>
      </TranslateButton>
      </div>
    )
  }
}

export default Ide;