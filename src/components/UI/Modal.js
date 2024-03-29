import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;

const StyledBackrop = styled.div.attrs((props) => ({
  onClick: props.onClose,
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalOverlay = (props) => {
  return (
    <StyledModal>
      <div className="">{props.children}</div>
    </StyledModal>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<StyledBackrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
