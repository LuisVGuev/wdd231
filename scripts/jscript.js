// OpenWeatherMap API
const apiKey = 'your_api_key_here'; 
const city = 'São Paulo';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const temp = data.main.temp.toFixed(1);
    const wind = data.wind.speed.toFixed(1);

    document.getElementById('temp-value').textContent = `${temp} °C`;
    document.getElementById('wind-value').textContent = `${wind} km/h`;

    const windchill = calculateWindChill(temp, wind);
    document.getElementById('windchill-result').textContent = windchill !== null ? `${windchill} °C` : 'N/A';
  } catch (error) {
    console.error('Weather fetch failed:', error);
  }
}

// Wind Chill Calculation
function calculateWindChill(temp, wind) {
  if (temp <= 10 && wind > 4.8) {
    return (
      13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) +
      0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
  }
  return null;
}

// Business Data
const businessList = [
  {
    businessName: "Clothing Fabric Factory",
    email: "clothingfactory@email.com",
    info: "913696366",
    url: "clothingfactory.com",
    imageUrl: "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg"
    },
  {
    businessName: "Shoe Store",
    email: "storeshoes@email.com",
    info: "806866633",
    url: "storeshoes.com",
    imageUrl: "https://cdn.pixabay.com/photo/2014/12/31/11/41/shoes-584850_1280.jpg"
     },
    {
    businessName: "bakery restaurant",
    email: "bakery_restaurant@email.com",
    info: "193667115",
    url: "bakeryrestaurant.com",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/10/09/bakery-1868925_1280.jpg"
     }, 
];

//HTML structure for a single business card
function createTempleCard(business) {
  const card = document.createElement('div');
  card.classList.add('business-card');

  card.innerHTML = `
    <img src="${business.imageUrl}" alt="${business.templeName}">
    <h4>${business.businessName}</h4>
    <p><strong>Location:</strong> ${business.email}</p>
    <p><strong>Dedicated:</strong> ${business.info}</p>
    <p><strong>Area:</strong> ${business.url} sq ft</p>
  `;

  return card;
}

// Display business gallery
function displayBusiness(businesses) {
  const gallery = document.querySelector('.business-gallery');
  gallery.innerHTML = '';
  businesses.forEach(business => {
    gallery.appendChild(createTempleCard(business));
  });
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  getWeather();
  displayBusiness(businessList); 
});
