import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;

    colors: {
      primary: string;
      secondary: string;

      text: string;
      lightText: string;
      mutedText: string;

      darkBlue: string;

      background: string;
      secondaryBackground: string;

      success: string;
      error: string;
      warning: string;
      info: string;
      default: string;
      disabled: string;

      border: string;
      ripple: string;

      itemSelected: string;
      inputBorder: string;
    };
  }
}
