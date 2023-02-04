import 'dotenv/config'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body

    if (!latitude || !longitude) {
      res.status(400).send('Please provide latitude and longitude')
      return
    }

    try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`)
      const weatherData = await weatherResponse.json()
      res.status(200).send(weatherData)
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong')
    }

    return res
  } else {
    res.status(400).send('Please use POST method')
  }
}
