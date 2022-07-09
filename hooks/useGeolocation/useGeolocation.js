import React, { useEffect, useState } from 'react'

export default function useGeolocation() {
  
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      latitude: "",
      longitude: "",
    }
  })

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    })
  }

  const onError = (error) => {
    setLocation({
      loaded: true,
      error
    })
  }

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: "NOT_SUPPORTED",
        message: "Geolocation is not supported by this browser"
      })
    }
    else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
  }, [])

  return location
}