import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from "next-auth/client"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import '../styles/global.scss'

const initialOptions = {
  "client-id": "AQzNABUwN16txF2ncoB61gpQLLB9HOs51c1mHofgV93WOiIG7lfMIGzT7Ey65TqY7yFwatSzzc4sqM-V",
  currency: "BRL",
  intent: "capture",
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />;
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp;
