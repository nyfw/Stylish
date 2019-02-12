import React, { Component } from 'react';
import { TitleWrapper, AboutText, Button } from '../styles/Title.jsx';
import Ide from './Ide.jsx';
import { Link } from 'react-router-dom';

import Tree from 'react-d3-tree';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTreeData: [
        {
          name: 'yourStyledElement',
          attributes: {
            // keyA: 'val A',
            // keyB: 'val B',
            // keyC: 'val C',
          },
          children: [
            {
              name: 'Div',
              attributes: {
                // keyA: 'val A',
                // keyB: 'val B',
                // keyC: 'val C',
              },
              children: [
                {
                  name: 'Div',
                  attributes: {
                    // keyA: 'val A',
                    // keyB: 'val B',
                    // keyC: 'val C',
                  },
                  children: [
                    {
                      name: 'Button',
                      attributes: {
                        // keyA: 'val A',
                        // keyB: 'val B',
                        // keyC: 'val C',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
    this.changeTreeStructure = this.changeTreeStructure.bind(this);
  }

  changeTreeStructure(data) {
    console.log("data is ", data);
    const arr = data.split("{");
    console.log(arr);
    const { myTreeData } = this.state;
    let tempTreeData = [...myTreeData];

    tempTreeData[0].children[0].attributes = {};
    let keyValue = arr[1].split(";");
    for (let i = 0; i < keyValue.length; i++) {
      let theKeyValue = keyValue[i].split(":");
      tempTreeData[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
    }


    tempTreeData[0].children[0].children[0].attributes = {};
    let keyValue2 = arr[2].split(";")
    for (let i = 0; i < keyValue2.length; i++) {
      let theKeyValue = keyValue2[i].split(":");
      tempTreeData[0].children[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
    }
    console.log(keyValue2);

    tempTreeData[0].children[0].children[0].children[0].attributes = {};
    let keyValue3 = arr[3].split(";")
    for (let i = 0; i < keyValue3.length; i++) {
      let theKeyValue = keyValue3[i].split(":");
      tempTreeData[0].children[0].children[0].children[0].attributes[theKeyValue[0]] = theKeyValue[1];
    }

    this.setState({ myTreeData: tempTreeData });
    // this.props.treeData[0].children[0].attributes.data = "Hello";
  }

  render() {
    const { myTreeData } = this.state;
    return (
      <TitleWrapper>
        <img src="./logo.png" />
        <div>
          <Button><Link to="/register">REGISTER</Link></Button>
          <Button><Link to="/login">LOG IN</Link></Button>
        </div>

        <Ide treeData={myTreeData} changeTreeStructure={this.changeTreeStructure} />
        <br></br>
        <br></br>
        <div className="tree"><Tree data={myTreeData} orientation="vertical" /></div>
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
