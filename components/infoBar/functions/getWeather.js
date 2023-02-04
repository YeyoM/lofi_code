export default async function getWeather (latitude, longitude) {
  const currentHost = process.env.NEXT_PUBLIC_HOST

  const response = await fetch(currentHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude,
      longitude
    })
  })
  const data = await response.json()
  return data
}
