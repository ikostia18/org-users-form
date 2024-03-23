import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const scaleUp = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const scaleDown = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const animation = ({ isClosing }: { isClosing: boolean; }) => css`
  ${isClosing ? scaleDown : scaleUp} 0.3s forwards;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  width: 50vw;
  height: 50vh;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 11;
  animation: ${animation};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export interface ModalRef {
  closeModal: () => void;
}

const Modal = forwardRef(({ onClose, children }: ModalProps, ref) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useImperativeHandle(ref, () => ({
    openModal: () => setIsClosing(false),
    closeModal: () => setIsClosing(true),
  }));

  // Fix issues with animation on close
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <ModalBackdrop onClick={handleClose} isClosing={isClosing} data-testid="modal-backdrop">
      <ModalContainer onClick={(e: { stopPropagation: () => unknown; }) => e.stopPropagation()} isClosing={isClosing}>

        <CloseButton onClick={handleClose}>X</CloseButton>
        <ModalContent>{children}</ModalContent>

      </ModalContainer>
    </ModalBackdrop>
  );
});

export default Modal;
