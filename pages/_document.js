import Document, { Html, Main, Head, NextScript } from 'next/document'
import React from 'react'
class myDocument extends Document {
  render () {
    return <Html lang='en'>
      <Head>
        <link rel="icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </ Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }
}

export default myDocument
