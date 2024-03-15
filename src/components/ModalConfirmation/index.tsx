import React from 'react';

import { Text } from '@chakra-ui/react';

import GenericModal from '@components/Modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  text?: string;
  hideConfirmButton?: boolean;
}

const ModalConfirmation: React.FC<Props> = ({ onClose, onConfirm, open, title, text, hideConfirmButton, onCancel }) => {
  return (
    <GenericModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
      hideConfirmButton={hideConfirmButton}
      cancelButtonText="Cancelar"
    >
      {text && (
        <Text textAlign="center" fontSize="1.2rem">
          {text}
        </Text>
      )}
    </GenericModal>
  );
};

export default ModalConfirmation;
