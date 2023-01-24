import conditions from './conditions.js'

const apiKey = 'b90612e8dc3c4889848154600232301'

const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')

function removeCard() {
  const prevCard = document.querySelector('.card')
  if (prevCard) prevCard.remove()
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`
  header.insertAdjacentHTML('afterend', html)
}

function showCard({ name, country, temp, condition, icon }) {
  const html = `
  <div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>
    <div class="card-weather">
     <div class="card-value">${temp}°C</div>
     <img src="${icon}" alt="Weather" class="card-img">
    </div>
    <div class="card-decs">${condition}</div>
  </div>`

  header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  const response = await fetch(url)
  const data = await response.json()
  return data

}

form.onsubmit = async function (e) {

  e.preventDefault()

  let city = input.value.trim()

  const data = await getWeather(city)

  if (data.error) {

    removeCard()
    showError(data.error.message)

  } else {

    removeCard()

    const info = conditions.find((obj) => obj.code === data.current.condition.code)

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon
    }

    showCard(weatherData)

  }
}