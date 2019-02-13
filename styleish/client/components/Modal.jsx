import React, { Component } from "react";
import styled from "styled-components";
import Portal from "./Portal.jsx";

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  min-width: 320px;
  padding: 35px;
  z-index: 10;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.3);
  margin-bottom: 100px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.2;
`;
export default class Modal extends Component {
  render() {
    const { children, on, toggle } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard>
              <CloseButton onClick={toggle}>Close</CloseButton>
              <div>{children}</div>
            </ModalCard>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}
