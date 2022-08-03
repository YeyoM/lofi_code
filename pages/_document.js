import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class myDocument extends Document {
  render () {
    return <Html lang='en'>
      <Head>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }
}

export default myDocument