declare module 'pdfmake/build/pdfmake.js';
declare module 'pdfmake/build/vfs_fonts.js';

declare module '*.d.ts' {
  global {
    interface Window {
      gtag: any;
      FlutterVersion: any;
      Share: any;
      Kakao: any;
      Bootpay: any;
    }
  }
}
