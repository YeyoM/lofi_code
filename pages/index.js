import React, { Fragment, useState, useEffect, useContext } from 'react'
import { SongsContext } from '../components/context/songsContext.js'
import Head from 'next/head'

import Main from '../components/main/main'

export default function Home ({ songs }) {
  const {
    appTheme,
    setSongs
  } = useContext(SongsContext)

  const [themeColor, setThemeColor] = useState('')

  useEffect(() => {
    if (appTheme === 'dracula') {
      setThemeColor('#282a36')
    } else if (appTheme === 'dark') {
      setThemeColor('#002833')
    } else if (appTheme === 'materialDark') {
      setThemeColor('#151515')
    } else if (appTheme === 'materialOcean') {
      setThemeColor('#263238')
    } else if (appTheme === 'matrix') {
      setThemeColor('#110008')
    } else if (appTheme === 'gruvbox') {
      setThemeColor('#292828')
    }
  }, [appTheme])

  useEffect(() => {
    setSongs(songs.sort(function () { return Math.random() - 0.5 }))
  }, [songs, setSongs])

  return (
    <Fragment>
      <Head>
        <title>Lofi Terminal</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="description"
          content="The Lofi Terminal, a music player that will make any programmer's life easier."
        />
        <meta
          name="google-site-verification"
          content="JOI4AGYf-0LIW42s2z_eHwSuUpBzQxF4hxZMoCveilw"
        />
        <meta
          name="theme-color"
          content={themeColor}
        />
      </Head>
      <Main />
    </Fragment>
  )
}

export async function getStaticProps () {
  const data = await fetch('https://lofi-terminal-default-rtdb.firebaseio.com/songs.json')
  const json = await data.json()
  const songsArray = Object.values(json)
  const songs = songsArray.sort(function () { return Math.random() - 0.5 })

  return {
    props: {
      songs
    },
    revalidate: 36000
  }
}
