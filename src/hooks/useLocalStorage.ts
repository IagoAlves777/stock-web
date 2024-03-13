import { useState, useCallback } from 'react';
import { useEvent } from 'react-use';

class LocalStorageEvent extends Event {
  private _key = '';

  private _value = '';

  get key() {
    return this._key;
  }

  set key(newKey: string) {
    this._key = newKey;
  }

  get value() {
    return this._value;
  }

  set value(newValue: string) {
    this._value = newValue;
  }
}

function useLocalStorage<T>(useKey: string, initialValue: T): T {
  const originalSetItem = localStorage.setItem;
  const [state, setState] = useState<T>(initialValue);

  localStorage.setItem = function setItem(key, value) {
    const event = new LocalStorageEvent('insertedValue');

    event.value = value;
    event.key = key;

    window.dispatchEvent(event);

    originalSetItem.apply(this, [key, value]);
  };

  const onStorage = useCallback(
    (data: any) => {
      if (data.value && data.key === useKey && state !== data.value) {
        setState(JSON.parse(data.value));
      }
    },
    [useKey, state],
  );

  useEvent('insertedValue', onStorage);

  return state;
}

export default useLocalStorage;
