import { CustomDefaultTheme } from './_lib/provider/theme/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomDefaultTheme {}
}
