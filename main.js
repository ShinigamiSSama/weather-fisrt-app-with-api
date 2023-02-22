const apiKey = '9beac34fd52948f498f231846232102';

const form = document.querySelector('.form'),
      input = document.querySelector('.input'),
      header = document.querySelector('.header');


form.onsubmit = function(e) {
  e.preventDefault();

  let city = input.value.trim();
  console.log(city);

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // console.log(data.location.name);
      // console.log(data.location.country);
      // console.log(data.current.temp_c);
      // console.log(data.current.condition.text);

      if (data.error) {

        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();

        const html = `<div class="card">${data.error.message}</div>`;

        header.insertAdjacentHTML('afterend', html);

      } else {

        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();

        const html = `
          <div class="card">
      
            <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
      
              <div class="card-weather">
                <div class="card-value">
                  ${Math.round(data.current.temp_c)}<sup>°c</sup>
                </div>
                <img class="card-img" src="img/example.svg">
              </div>

            <div class="card-decription">${data.current.condition.text}</div>

          </div>
        `;

        header.insertAdjacentHTML('afterend', html);

      }
    });
};