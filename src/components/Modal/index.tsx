import React from 'react';

import {
  ModalOverlay,
  Modal as ModalChakra,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

import { buttonSubmit } from '@components/ButtonSubmit';

interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const Modal: React.FC<Props> = ({
  children,
  open,
  onClose,
  onConfirm,
  onCancel,
  hideCancelButton,
  hideConfirmButton,
  title,
  cancelButtonText,
  confirmButtonText,
  size,
}) => {
  return (
    <ModalChakra isOpen={open} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          gap="1rem"
          paddingTop="0.6rem"
          fontSize="1.2rem"
          width="100%"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {(!hideCancelButton || !hideConfirmButton) && (
          <ModalFooter gap={3} justifyContent="center">
            {!hideConfirmButton && (
              <Button {...buttonSubmit} onClick={onConfirm}>
                {confirmButtonText || 'Confirmar'}
              </Button>
            )}
            {!hideCancelButton && (
              <Button variant="solid" onClick={onCancel || onClose}>
                {cancelButtonText || 'Fechar'}
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalChakra>
  );
};

export default Modal;
