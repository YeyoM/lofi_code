import '../styles/styles.css'
import { SongsContextProvider } from "../components/context/songsContext"

function MyApp({ Component, pageProps }) {
  return (
    <SongsContextProvider>
      <Component {...pageProps} />
    </ SongsContextProvider>
  )
}

export default MyApp
