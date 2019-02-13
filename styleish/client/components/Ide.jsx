import React, { Component } from "react";
import brace from "brace";
import { split as AceEditor } from "react-ace";
import fetch from "isomorphic-fetch";
import { TranslateButton } from "../styles/Ide.jsx";
import "brace/mode/css";
import "brace/theme/xcode";

class Ide extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.convertToStyled = this.convertToStyled.bind(this);
    this.state = {
      userInput: "/*Load your css*/ \n \n",
      example:
        "/* This is the component you will style and visualize*/\n<div>\n  <div>\n    <button>\n    </button>\n  </div>\n</div>\n \n \n",
      converted: "/*Styled component translation here*/ \n \n"
    };
  }

  onChange(newValue) {
    // console.log(newValue);
    let unparsed = "";
    unparsed += newValue[0];
    this.setState({ userInput: unparsed });
    unparsed = "";
    unparsed += newValue[1];
    this.setState({ example: unparsed });
  }

  convertToStyled(data) {
    let firstBracket, lastBracket, copiedinfo;

    for (let i = 0; i < data.length; i++) {
      if (data[i] === "{") {
        firstBracket = i;
        break;
      }
    }
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i] === "}") {
        lastBracket = i;
        break;
      }
    }
    copiedinfo = data.substring(firstBracket + 1, lastBracket);
    let result =
      "/*Styled component translation here*/ \n \n const <yourStyledWrapper> = styled.<tagToStyle>`" +
      copiedinfo +
      "`;";
    return result;
  }

  handleSubmit() {
    const { userInput } = this.state;
    fetch("http://localhost:3000/translate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        css: userInput
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log("data is ", data);
        this.props.buildTreeStructure(data, this.state.example);
        this.props.changeTreeStructure(data);
        if (data) {
          data = this.convertToStyled(data);
          // console.log("data2 is ", data);
          this.setState({ converted: data });
        } else {
          console.log(data);
        }
      });
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="css"
          theme="xcode"
          onChange={this.onChange}
          name="app"
          value={[
            this.state.userInput,
            this.state.example,
            this.state.converted
          ]}
          splits={3}
          editorProps={{ $blockScrolling: true }}
          showLineNumbers={false}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          wrapEnabled={true}
          width="700px"
          height="250px"
          readOnly={false}
        />

        <TranslateButton
          onClick={() => {
            this.handleSubmit();
          }}
        >
          TRANSLATE
        </TranslateButton>
      </div>
    );
  }
}

export default Ide;
