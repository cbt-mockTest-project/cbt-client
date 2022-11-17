import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import Globalstyles from '@styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Globalstyles />
      <Component {...pageProps} />
    </>
  );
}
