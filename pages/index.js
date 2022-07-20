import React, { Fragment } from 'react'
import Head from 'next/head'

import Main from "../components/main/main"

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Lofi Terminal</title>
        <link rel="icon" href="/icon.svg" />
        <meta 
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta 
          name="description" 
          content="The Lofi Terminal, a music player that will make any programmer's life easier." 
        />
      </Head>
      <Main />
    </Fragment>
  )
}
