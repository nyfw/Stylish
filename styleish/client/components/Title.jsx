import React, { Component } from "react";
import styled from "styled-components";

import { TitleWrapper, AboutText } from "../styles/Title.jsx";
import Ide from "./Ide.jsx";
import Toggle from "./Toggle.jsx";
import Tree from "react-d3-tree";

const ToggleStyled = styled.button`
  border: 2px solid hotpink;
  background: Lavenderblush;
  height: 30px;
  width: 300px;
  margin-top: 10px;
  font-weight: 700;
`;
class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTreeData: [
        {
          name: "yourStyledWrapper",
          attributes: {}
        }
      ]
    };
    this.resetTreeData = this.resetTreeData.bind(this);
    this.buildTreeStructure = this.buildTreeStructure.bind(this);
    this.changeTreeStructure = this.changeTreeStructure.bind(this);
  }

  resetTreeData() {
    this.setState({
      myTreeData: [
        {
          name: "yourStyledWrapper",
          attributes: {}
        }
      ]
    });
  }

  buildTreeStructure(data, example) {
    this.resetTreeData();
    const { myTreeData } = this.state;
    let tempTreeData = [...myTreeData];
    let currentNode = tempTreeData[0];

    const elementTags = example.split("\n");
    let stack = [];

    for (let i = 0; i < elementTags.length; i++) {
      if (elementTags[i].trim().slice(0, 2) === "</") {
        currentNode = stack[stack.length - 1];
        stack.pop();
      } else if (elementTags[i].trim()[0] === "<") {
        if (!Array.isArray(currentNode.children)) currentNode.children = [];
        currentNode.children[currentNode.children.length] = {};
        currentNode.children[
          currentNode.children.length - 1
        ].name = elementTags[i].trim();
        currentNode.children[currentNode.children.length - 1].attributes = {};
        let temp = currentNode;
        stack.push(temp);
        currentNode = currentNode.children[currentNode.children.length - 1];
      }
    }
    this.setState({ myTreeData: tempTreeData });
  }

  changeTreeStructure(data) {
    // console.log(data, " IS DATA");
    const dataArr = data.split("{");
    // console.log(dataArr, " IS DATAARR");
    // dataArr.forEach(element => {
    //   console.log(element.trim().split('\n'));
    // })
    const appendChild = (node, arr, index) => {
      if (!node.children) return;
      if (!arr[index]) return;
      node.children[0].attributes = {};
      let keyValue = arr[index].split(";");
      for (let i = 0; i < keyValue.length - 1; i++) {
        let theKeyValue = keyValue[i].split(":");
        for (let j = 0; j < node.children.length; j++) {
          node.children[j].attributes[theKeyValue[0]] = theKeyValue[1];
        }
      }
      node = node.children[0];
      appendChild(node, arr, index + 1);
    };
    const { myTreeData } = this.state;
    let tempTreeData = [...myTreeData];
    let currentNode = tempTreeData[0];
    appendChild(currentNode, dataArr, 1);
    this.setState({ myTreeData: tempTreeData });
  }

  render() {
    const { myTreeData } = this.state;
    return (
      <TitleWrapper>
        <img src="./logo.png" />

        <Ide
          treeData={myTreeData}
          buildTreeStructure={this.buildTreeStructure}
          changeTreeStructure={this.changeTreeStructure}
        />
        <br />
        <Toggle
          render={({ on, toggle }) => (
            <div>
              <ToggleStyled onClick={toggle}>
                Show / Hide Styled Components Tree
              </ToggleStyled>

              {on && (
                <div className="tree">
                  <Tree
                    data={myTreeData}
                    orientation="vertical"
                    translate={{ x: 300, y: 80 }}
                    zoom={0.7}
                  />
                </div>
              )}
            </div>
          )}
        />

        <AboutText>
          Curious about how your project's CSS would look like if converted to
          styled-components?
          <br />
          Input your CSS into the editor and see how it looks like with
          styled-component syntax!
          <br />
          <br />
          A React D3 tree will be generated based on your input CSS structure so
          you can better visualize your component structure.
          <br />
          <br />
          Register and login to save any translations.
        </AboutText>
      </TitleWrapper>
    );
  }
}

export default Title;
