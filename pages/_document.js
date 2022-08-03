import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class myDocument extends Document {
  render () {
    return <Html lang='en'>
      <Head>
        <link rel="icon" href="/icon.svg" />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }
}

export default myDocument