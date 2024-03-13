import { useUpdateEffect } from 'react-use';

import useDefaultBrowserTheme from './useDefaultBrowserTheme';
import useLocalStorage from './useLocalStorage';
import usePersistedState from './usePersistedState';

function useTheme(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isDark, setIsDark] = usePersistedState<boolean>('isDark', useDefaultBrowserTheme());
  const storedValue = useLocalStorage<boolean>('isDark', isDark);

  useUpdateEffect(() => {
    setIsDark(storedValue);
  }, [storedValue]);

  return [isDark, setIsDark];
}

export default useTheme;
