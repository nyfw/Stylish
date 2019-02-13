import React, { Component } from "react";
import styled from "styled-components";
import { TitleWrapper, AboutText, Button } from "../styles/Title.jsx";
import Ide from "./Ide.jsx";
import { Link } from "react-router-dom";
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
        <div>
          <Button>
            <Link to="/register">REGISTER</Link>
          </Button>
          <Button>
            <Link to="/login">LOG IN</Link>
          </Button>
        </div>

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi
          ab alias harum quia. Rerum esse, illo rem sequi cumque vitae vel.
          Necessitatibus omnis cumque nihil eveniet quos odit accusamus. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi ab
          alias harum quia. Rerum esse, illo rem sequi cumque vitae vel.
          Necessitatibus omnis cumque nihil eveniet quos odit accusamus.
        </AboutText>
      </TitleWrapper>
    );
  }
}

export default Title;

// original state tree structure
// children: [
//   {
//     name: 'Div',
//     attributes: {
//       // keyA: 'val A',
//       // keyB: 'val B',
//       // keyC: 'val C',
//     },
//     children: [
//       {
//         name: 'Div',
//         attributes: {
//           // keyA: 'val A',
//           // keyB: 'val B',
//           // keyC: 'val C',
//         },
//         children: [
//           {
//             name: 'Button',
//             attributes: {
//               // keyA: 'val A',
//               // keyB: 'val B',
//               // keyC: 'val C',
//             },
//           },
//         ],
//       },
//     ],
//   },
// ],

// function that worked without recursion

// tempTreeData[0].children[0].attributes = {};
// if (arr[1]) {

//   let keyValue = arr[1].split(";");

//   for (let i = 0; i < keyValue.length - 1; i++) {
//     let theKeyValue = keyValue[i].split(":");
//     tempTreeData[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
//     console.log(theKeyValue, "THE KEY VALUE");
//   }
// }

// tempTreeData[0].children[0].children[0].attributes = {};
// if (arr[2]) {

//   let keyValue2 = arr[2].split(";");
//   for (let i = 0; i < keyValue2.length - 1; i++) {
//     let theKeyValue = keyValue2[i].split(":");
//     tempTreeData[0].children[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
//   }
// }
// // console.log(keyValue2);
// tempTreeData[0].children[0].children[0].children[0].attributes = {};
// if (arr[3]) {

//   let keyValue3 = arr[3].split(";")
//   for (let i = 0; i < keyValue3.length - 1; i++) {
//     let theKeyValue = keyValue3[i].split(":");
//     tempTreeData[0].children[0].children[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
//   }
// }
