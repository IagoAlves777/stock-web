import { ClipboardEvent } from 'react';

const pasteMultiline = (
  e: ClipboardEvent,
  id: string,
  setGoalsValues: React.Dispatch<any>,
  goalsValues: {
    [key: string]: number | string | '';
  },
): void => {
  // event.stopPropagation();
  e.preventDefault();

  // Get pasted data via clipboard API
  const clipboardData = e.clipboardData || window.Clipboard;
  const pastedData = clipboardData.getData('Text');

  const temp = goalsValues;

  // Percorrer células
  pastedData.split(/\n/).forEach((val, index: number) => {
    const newInput = id.split('-')[1] ? `${Number(id.split('-')[0]) + index}-${id.split('-')[1]}` : Number(id) + index;

    if (val) {
      const numberVal = Number(Number(val.replaceAll('.', '').replace(',', '.')).toString());

      if (temp[newInput]) temp[newInput] = numberVal;
      else {
        const keys = Object.keys(temp);
        const keyIndex = keys.indexOf(id);
        const key = keys[keyIndex + index];

        temp[key] = numberVal;
      }
    }
  });

  setGoalsValues({ ...goalsValues, ...temp });
};

export default pasteMultiline;
