import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/'
import { SongsContextProvider } from '../context/songsContext'
import SongBar from './songBar'

test('Song Bar renders correctly with given song information', () => {
  render(
    <SongsContextProvider>
      <SongBar />
    </SongsContextProvider>
  )
  expect(screen.getByText('Test Title')).toBeInTheDocument()
})