const apiKey = '9beac34fd52948f498f231846232102';

const form = document.querySelector('.form'),
      input = document.querySelector('.input'),
      header = document.querySelector('.header');

function removeCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML('afterend', html);
}

function showCard({name, country, temp, condition}) {
  const html = `
    <div class="card">

      <h2 class="card-city">${name} <span>${country}</span></h2>

        <div class="card-weather">
          <div class="card-value">
            ${Math.round(temp)}<sup>°c</sup>
          </div>
          <img class="card-img" src="img/example.svg">
        </div>

      <div class="card-decription">${condition}</div>

    </div>
  `;
  
  header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response= await fetch(url);
  const data = await response.json();
  return data;
}

form.onsubmit = async function(e) {
  e.preventDefault();

  let city = input.value.trim();
  
  const data = await getWeather(city);

  if (data.error) {
    removeCard();

    showError(data.error.message);

  } else {

    removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text
    };

    showCard(weatherData);
  }
};