import '../styles/styles.css'
import { Head } from 'next/document'
import { SongsContextProvider } from '../components/context/songsContext'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
      </Head>
      <SongsContextProvider>
        <Component {...pageProps} />
      </ SongsContextProvider>
    </>
  )
}

export default MyApp
