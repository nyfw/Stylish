import styled from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ecd0ee;

  img {
    margin: 50px 0 40px 0;
    width: 160px;
    height: 200px;
    flex: 1;
  }

  .ghlogin {
    width: 180px;
    height: 40px;
    fontsize: 16px;
  }

  .tree {
    border: 1px black solid;
    height: 30em;
    width: 47em;
    background-color: white;
  }
`;
export const Button = styled.button`
  border: 0px;
  border-radius: 10px;
  background-color: "white";
  padding: 0px;
  margin: 0px 20px 40px 20px;
  width: 110px;
  height: 35px;
  display: inline;
`;

export const AboutText = styled.div`
  margin: 40px 40px 40px 40px;
  max-width: 700px;
  text-align: center;
`;
