export default async function getWeather(latitude, longitude) {
  const response = await fetch('http://localhost:3000/api/getWeather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  })
  const data = await response.json()
  return data
}