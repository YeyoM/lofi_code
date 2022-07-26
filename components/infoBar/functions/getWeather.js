export default async function getWeather(latitude, longitude) {

  const currentHost = process.env.NEXT_PUBLIC_HOST || 'localhost:3000 for dev'

  const response = await fetch(currentHost, {
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