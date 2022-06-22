import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Toaster position="top-center" reverseOrder={false}/>
  </>
}

export default MyApp


