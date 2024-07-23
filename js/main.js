//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', fetchAPOD)



// function getFetch(){
//   // const choice = document.querySelector('input').value.toLowerCase()
//   let yearMonthDay = document.querySelector('input').value
//   const url = `https://api.nasa.gov/planetary/apod?api_key=z2kfsEPYn6PkZwX5y09RcFyIKoFp7YRzdLCr3afV&date=${yearMonthDay}`

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         // Function to create the element
//         function createElement(type) {
//           let element;
//           if (type === 'iframe') {
//             element = document.createElement('iframe');
//             element.src = data.url
//             element.width = '1024';
//             element.height = '676';
//           } else if (type === 'img') {
//             element = document.createElement('img');
//             element.src = data.hdurl
//             element.alt = 'Example Image';
//             element.width = '1024';
//             element.height = '676';
//           } else {
//             console.error('Unknown element type:', type);
//             return;
//           }
//         // Append the created element to the body (or any other container)
//         document.getElementById("content-container").appendChild(element);
//         }

//         const elementType = data.media_type === "image" ? 'img' : 'iframe'
//         // Call the function to create the element
//         createElement(elementType);

//         document.querySelector('h3').innerText = data.explanation

        
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }
import nasaConfig from './nasaConfig.js';



async function fetchAPOD() {
  const apiKey = nasaConfig.apiKey;
  const yearMonthDay = document.querySelector('input').value
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${yearMonthDay}`;

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
      apodContainer.appendChild(newDiv);

  } catch (error) {
      console.error('Error fetching NASA APOD:', error);
  }
}