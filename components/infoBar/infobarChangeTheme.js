export default function infobarChangeTheme ({ appTheme, setProgressStyle, setVolumeStyle, setCurrentProgressStyle, setDateStyle, setWeatherStyle }) {
  // change the inline styles for the infobar bgcolors
  if (appTheme === 'dracula') {
    setProgressStyle({ backgroundColor: '#7e2a7e' })
    setVolumeStyle({ backgroundColor: '#a60fa6' })
    setCurrentProgressStyle({ backgroundColor: '#192c95' })
    setDateStyle({ backgroundColor: '#3b4a9d' })
    setWeatherStyle({ backgroundColor: '#505a90' })
  } else if (appTheme === 'dark') {
    console.log('dark')
    setProgressStyle({ backgroundColor: '#3f492a' })
    setVolumeStyle({ backgroundColor: '#323a21' })
    setCurrentProgressStyle({ backgroundColor: '#69a2b0' })
    setDateStyle({ backgroundColor: '#4a737d' })
    setWeatherStyle({ backgroundColor: '#2b4449' })
  } else if (appTheme === 'materialDark') {
    setProgressStyle({ backgroundColor: '#3c4971' })
    setVolumeStyle({ backgroundColor: '#20283d' })
    setCurrentProgressStyle({ backgroundColor: '#ff4f51' })
    setDateStyle({ backgroundColor: '#cc3f40' })
    setWeatherStyle({ backgroundColor: '#992f30' })
  } else if (appTheme === 'materialOcean') {
    setProgressStyle({ backgroundColor: '#3b79ad' })
    setVolumeStyle({ backgroundColor: '#29557a' })
    setCurrentProgressStyle({ backgroundColor: '#6da34d' })
    setDateStyle({ backgroundColor: '#4a6f34' })
    setWeatherStyle({ backgroundColor: '#283c1c' })
  } else if (appTheme === 'gruvbox') {
    setProgressStyle({ backgroundColor: '#9f342c' })
    setVolumeStyle({ backgroundColor: '#6c231d' })
    setCurrentProgressStyle({ backgroundColor: '#fc924d' })
    setDateStyle({ backgroundColor: '#c9743d' })
    setWeatherStyle({ backgroundColor: '#95562d' })
  } else if (appTheme === 'matrix') {
    setProgressStyle({ backgroundColor: '#00cc00' })
    setVolumeStyle({ backgroundColor: '#009900' })
    setCurrentProgressStyle({ backgroundColor: '#0000ff' })
    setDateStyle({ backgroundColor: '#0000cc' })
    setWeatherStyle({ backgroundColor: '#000099' })
  }
}
