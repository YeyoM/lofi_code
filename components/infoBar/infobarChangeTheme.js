export default function infobarChangeTheme(props) {
  // change the inline styles for the infobar bgcolors
  if (props.appTheme === "dracula") {
    props.setGeneralStyle({backgroundColor: "#6b126b"})
    props.setProgressStyle({backgroundColor: "#7e2a7e"})
    props.setVolumeStyle({backgroundColor: "#a60fa6"})
    props.setTimeStyle({backgroundColor: "#192c95"})
    props.setDateStyle({backgroundColor: "#3b4a9d"})
    props.setWeatherStyle({backgroundColor: "#505a90"})
  } else if (props.appTheme === "dark") {
    props.setGeneralStyle({backgroundColor: "#6c7d47"})
    props.setProgressStyle({backgroundColor: "#3f492a"})
    props.setVolumeStyle({backgroundColor: "#323a21"})
    props.setTimeStyle({backgroundColor: "#69a2b0"})
    props.setDateStyle({backgroundColor: "#4a737d"})
    props.setWeatherStyle({backgroundColor: "#2b4449"})
  } else if (props.appTheme === "materialDark") {
    props.setGeneralStyle({backgroundColor: "#586ba4"})
    props.setProgressStyle({backgroundColor: "#3c4971"})
    props.setVolumeStyle({backgroundColor: "#20283d"})
    props.setTimeStyle({backgroundColor: "#ff4f51"})
    props.setDateStyle({backgroundColor: "#cc3f40"})
    props.setWeatherStyle({backgroundColor: "#992f30"})
  } else if (props.appTheme === "materialOcean") {
    props.setGeneralStyle({backgroundColor: "#4d9de0"})
    props.setProgressStyle({backgroundColor: "#3b79ad"})
    props.setVolumeStyle({backgroundColor: "#29557a"})
    props.setTimeStyle({backgroundColor: "#6da34d"})
    props.setDateStyle({backgroundColor: "#4a6f34"})
    props.setWeatherStyle({backgroundColor: "#283c1c"})
  } else if (props.appTheme === "gruvbox") {
    props.setGeneralStyle({backgroundColor: "#d2453b"})
    props.setProgressStyle({backgroundColor: "#9f342c"})
    props.setVolumeStyle({backgroundColor: "#6c231d"})
    props.setTimeStyle({backgroundColor: "#fc924d"})
    props.setDateStyle({backgroundColor: "#c9743d"})
    props.setWeatherStyle({backgroundColor: "#95562d"})
  } else if (props.appTheme === "matrix") {
    props.setGeneralStyle({backgroundColor: "#00ff00"})
    props.setProgressStyle({backgroundColor: "#00cc00"})
    props.setVolumeStyle({backgroundColor: "#009900"})
    props.setTimeStyle({backgroundColor: "#0000ff"})
    props.setDateStyle({backgroundColor: "#0000cc"})
    props.setWeatherStyle({backgroundColor: "#000099"})
  }
}