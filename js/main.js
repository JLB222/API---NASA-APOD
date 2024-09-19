//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', fetchAPOD)

// import nasaConfig from './nasaConfig.js';

async function fetchAPOD() {
//   const apiKey = nasaConfig.apiKey;
  const yearMonthDay = document.querySelector('input').value
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=z2kfsEPYn6PkZwX5y09RcFyIKoFp7YRzdLCr3afV&date=${yearMonthDay}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)

      const apodContainer = document.getElementById('apodContainer');
      const newDiv = document.createElement('div');
      newDiv.classList.add('apod-item');

      const date = document.createElement('h3')
      date.textContent = data.date

      const description = document.createElement('p');
      description.textContent = data.explanation;

      let mediaElement;
      if (data.media_type === 'video') {
          mediaElement = document.createElement('iframe');
          mediaElement.src = data.url;
          mediaElement.width = "640";
          mediaElement.height = "360";
      } else {
          mediaElement = document.createElement('img');
          mediaElement.src = data.url;
          mediaElement.alt = data.title;
          mediaElement.style.maxWidth = "100%";
      }

      newDiv.appendChild(date)
      newDiv.appendChild(description);
      newDiv.appendChild(mediaElement);
    //   apodContainer.appendChild(newDiv);
      // Insert the new element at the top of the container
        if (apodContainer.firstChild) {
            apodContainer.insertBefore(newDiv, apodContainer.firstChild);
        } else {
            apodContainer.appendChild(newDiv); // If container is empty, just append it
        }

  } catch (error) {
      console.error('Error fetching NASA APOD:', error);
  }
}