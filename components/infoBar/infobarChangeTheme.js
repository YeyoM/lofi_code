export default function infobarChangeTheme ({ appTheme, setTimeStyle, setVolumeStyle, setProgressStyle, setDateStyle, setWeatherStyle }) {
  // change the inline styles for the infobar bgcolors
  if (appTheme === 'dracula') {
    setTimeStyle({ backgroundColor: '#7e2a7e' })
    setVolumeStyle({ backgroundColor: '#a60fa6' })
    setProgressStyle({ backgroundColor: '#192c95' })
    setDateStyle({ backgroundColor: '#3b4a9d' })
    setWeatherStyle({ backgroundColor: '#505a90' })
  } else if (appTheme === 'dark') {
    console.log('dark')
    setTimeStyle({ backgroundColor: '#3f492a' })
    setVolumeStyle({ backgroundColor: '#323a21' })
    setProgressStyle({ backgroundColor: '#69a2b0' })
    setDateStyle({ backgroundColor: '#4a737d' })
    setWeatherStyle({ backgroundColor: '#2b4449' })
  } else if (appTheme === 'materialDark') {
    setTimeStyle({ backgroundColor: '#3c4971' })
    setVolumeStyle({ backgroundColor: '#20283d' })
    setProgressStyle({ backgroundColor: '#ff4f51' })
    setDateStyle({ backgroundColor: '#cc3f40' })
    setWeatherStyle({ backgroundColor: '#992f30' })
  } else if (appTheme === 'materialOcean') {
    setTimeStyle({ backgroundColor: '#3b79ad' })
    setVolumeStyle({ backgroundColor: '#29557a' })
    setProgressStyle({ backgroundColor: '#6da34d' })
    setDateStyle({ backgroundColor: '#4a6f34' })
    setWeatherStyle({ backgroundColor: '#283c1c' })
  } else if (appTheme === 'gruvbox') {
    setTimeStyle({ backgroundColor: '#9f342c' })
    setVolumeStyle({ backgroundColor: '#6c231d' })
    setProgressStyle({ backgroundColor: '#fc924d' })
    setDateStyle({ backgroundColor: '#c9743d' })
    setWeatherStyle({ backgroundColor: '#95562d' })
  } else if (appTheme === 'matrix') {
    setTimeStyle({ backgroundColor: '#00cc00' })
    setVolumeStyle({ backgroundColor: '#009900' })
    setProgressStyle({ backgroundColor: '#0000ff' })
    setDateStyle({ backgroundColor: '#0000cc' })
    setWeatherStyle({ backgroundColor: '#000099' })
  }
}
