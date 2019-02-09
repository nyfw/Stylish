import styled from "styled-components";
import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
    width: 100%;
  }
  * *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    height: 100%;
    width: 100%;
  }
`;


export const Wrapper = styled.div`
  margin: 0;
  padding: 0px;
  font-family: 'Helvetica';
`;