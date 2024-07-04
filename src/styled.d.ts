import { CustomDefaultTheme } from '@lib/provider/theme/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomDefaultTheme {}
}
