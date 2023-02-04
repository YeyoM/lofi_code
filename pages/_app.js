import '../styles/styles.css'
import Head from 'next/head'
import { SongsContextProvider } from '../components/context/songsContext'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
      </Head>
      <SongsContextProvider>
        <Component {...pageProps} />
      </ SongsContextProvider>
    </>
  )
}

export default MyApp
