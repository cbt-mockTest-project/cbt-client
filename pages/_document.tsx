import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

class MainDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script
            async
            src="https://fundingchoicesmessages.google.com/i/pub-9145855450425143?ers=1"
            nonce="jbUWBdFKM2denqwRJFTGyw"
          ></script>
          <script
            async
            custom-element="amp-auto-ads"
            src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          ></script>
          <script
            nonce="jbUWBdFKM2denqwRJFTGyw"
            dangerouslySetInnerHTML={{
              __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`,
            }}
          ></script>
          <script
            defer
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
          />
          <script
            async
            id="googleAdScript"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9145855450425143"
            crossOrigin="anonymous"
          />
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
        </Head>
        <body>
          <amp-auto-ads
            type="adsense"
            data-ad-client="ca-pub-9145855450425143"
          ></amp-auto-ads>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MainDocument;
