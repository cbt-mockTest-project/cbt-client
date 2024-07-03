import { CustomDefaultTheme } from '@lib/provider/theme/themes';

declare module 'pdfmake/build/pdfmake.js';
declare module 'pdfmake/build/vfs_fonts.js';

declare module '*.d.ts' {
  global {
    interface Window {
      katex: any;
      gtag: any;
      Share: any;
      Kakao: any;
      Bootpay: any;
      PackageInfo: any;
      appInfo: Object<any>;
      appInfoChanged: any;
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends CustomDefaultTheme {}
}
