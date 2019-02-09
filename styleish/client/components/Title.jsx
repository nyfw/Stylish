import React from 'react';
import { TitleWrapper, AboutText, Button } from '../styles/Title.jsx';
import Ide from './Ide.jsx';
import { Link } from 'react-router-dom';

function Title() {
  return (
    <TitleWrapper>
        <img src="./logo.png"></img>
        <div>
        <Button>GITHUB</Button>
        <Button>ABOUT</Button>
        </div>
        <AboutText>
      &hearts; the Ready-To-Use styling transpiler &hearts; <br></br>
      Convert your CSS elements to React Styled Components instantly
      </AboutText>
        <Ide />
    </TitleWrapper>
  );
}

export default Title;
