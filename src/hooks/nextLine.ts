import { KeyboardEvent } from 'react';

const nextLine = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): string => {
  let newInput = '';

  if (e.keyCode === 13) {
    const idAtual = e.currentTarget.id;
    const nextId = 1 + Number(idAtual.split('-')[0]);

    newInput = idAtual.split('-')[1] ? `${nextId}-${idAtual.split('-')[1]}` : `${nextId}`;
    document.getElementById(newInput)?.focus();
  }

  return newInput || '';
};

export default nextLine;
