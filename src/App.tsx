import { ToastContainer } from 'react-toastify';

import { useColorMode } from '@chakra-ui/react';

import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import Routes from '@routes';
import { darkTheme, lightTheme } from '@theme';
import GlobalStyle from '@theme/global';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={colorMode}
      />

      <SWRConfig>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default App;
