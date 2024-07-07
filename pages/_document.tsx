import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

class MainDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const cache = createCache();
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const parseCookies = (cookieString: string | undefined) => {
      return cookieString?.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map((c) => c.trim());
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
    };
    const cookies = { cookies: parseCookies(ctx.req?.headers.cookie) };
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <StyleProvider cache={cache}>
                <App {...props} {...cookies} />
              </StyleProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const style = extractStyle(cache, true);
      return {
        ...initialProps,
        styles: (
          <>
            {sheet.getStyleElement()}
            {initialProps.styles}
            <style dangerouslySetInnerHTML={{ __html: style }}></style>
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MainDocument;
