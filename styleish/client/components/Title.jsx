import React from 'react';
import { TitleWrapper, AboutText, Button } from '../styles/Title.jsx';
import Ide from './Ide.jsx';
import { Link } from 'react-router-dom';

function Title() {
  return (
    <TitleWrapper>
      <img src="./logo.png" />
      <div>
        <Button><Link to="/register">REGISTER</Link></Button>
        <Button><Link to="/login">LOG IN</Link></Button>
      </div>

      <Ide />
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

export default Title;
