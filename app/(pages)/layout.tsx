import '@styles/global.css';
import * as gtag from '../../app/_lib/ga/gtag';
import { Suspense } from 'react';
import Script from 'next/script';
import StoreProvider from '_providers/StoreProvider';
import StyledComponentsRegistry from '_providers/StyledComponentsRegistry';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppRouterConsumer from '_providers/AppRouterConsumer';
import TanstackQueryProvider from '_providers/tanstackQueryProvider';
import Globalstyles from '@styles/globalStyles';

const originalWarn = console.warn;
const originalError = console.error;
console.warn = (...args) => {
  if (/styled-components/.test(args[0])) {
    return;
  }
  originalWarn.call(console, ...args);
};
console.error = (...args) => {
  if (/React does not recognize the .* prop on a DOM element./.test(args[0])) {
    return;
  }
  if (/Received .* for a non-boolean attribute .*/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXJD2HF"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-9145855450425143?ers=1"
          nonce="jbUWBdFKM2denqwRJFTGyw"
        />
        <script
          nonce="jbUWBdFKM2denqwRJFTGyw"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`,
          }}
        />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
          rel="stylesheet"
        />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta name="msapplication-TileColor" content="#1990ff"></meta>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/png/favicon-32x32.png"
        />
      </head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9145855450425143"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Script
        id="clarify-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mnhew0syru");
        `,
        }}
      />
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TXJD2HF');
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={<></>}>
        <StoreProvider>
          <TanstackQueryProvider>
            <AppRouterConsumer>
              <StyledComponentsRegistry>
                <AntdRegistry>
                  <body>
                    <Globalstyles />
                    {children}
                  </body>
                </AntdRegistry>
              </StyledComponentsRegistry>
            </AppRouterConsumer>
          </TanstackQueryProvider>
        </StoreProvider>
      </Suspense>
    </html>
  );
}
