/* JS */
document.addEventListener('DOMContentLoaded', () => {
  // Toggle View (para memberContainer)
  const toggleButton = document.getElementById('toggleView');
  const memberContainer = document.getElementById('memberContainer');
  if (toggleButton && memberContainer) {
    toggleButton.addEventListener('click', () => {
      const isGrid = memberContainer.classList.contains('grid-view');
      memberContainer.classList.toggle('grid-view', !isGrid);
      memberContainer.classList.toggle('list-view', isGrid);
      toggleButton.textContent = isGrid ? 'Switch to Grid View' : 'Switch to List View';
    });
  }

  // Mobile menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Footer info
  const yearSpan = document.getElementById('year');
  const modifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

  // === DISCOVER PAGE) ===
  fetch('data/places.json')
    .then(response => {
      if (!response.ok) throw new Error("Not charger places.json");
      return response.json();
    })
    .then(data => {
      const grid = document.querySelector('.cards-grid');
      if (!grid) return;

      data.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <h2 class="card-title">${place.name}</h2>
          <figure class="card-image">
            <img src="${place.image}" alt="Photo of ${place.name}" width="300" height="200" loading="lazy">
            <figcaption>${place.name}</figcaption>
          </figure>
          <p class="card-address">${place.address}</p>
          <p class="card-desc">${place.description}</p>
          <button class="card-button">Learn More</button>
        `;

        grid.appendChild(card);
      });
    })
    .catch(error => console.error('Error:', error));

    function showVisitMessage() {
  const messageBox = document.querySelector('.visit-message');
  if (!messageBox) return;

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    messageBox.textContent = 'Welcome! If you have any questions, let us know.';
  } else {
    const timeDiff = now - parseInt(lastVisit, 10);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (days < 1) {
      messageBox.textContent = 'You came back soon! Awesome!';
    } else if (days === 1) {
      messageBox.textContent = 'Your last visit was 1 day ago.';
    } else {
      messageBox.textContent = `Your last visit was ${days} days ago.`;
    }
  }

  // Store the current date as the last visit
  localStorage.setItem('lastVisit', now);
}
 showVisitMessage();

  // === WEATHER ===
  async function loadWeather() {
    const apiKey = '38cfffce84bffb7bb11667b3e40f2056';
    const city = 'São Paulo';
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(weatherURL);
      const data = await res.json();
      const current = data.list[0];

      const tempSpan = document.getElementById('temp-value');
      const windSpan = document.getElementById('wind-value');
      const chillSpan = document.getElementById('windchill-result');

      if (tempSpan) tempSpan.textContent = `${current.main.temp.toFixed(1)}°C`;
      if (windSpan) windSpan.textContent = `${current.wind.speed} m/s`;
      if (chillSpan) chillSpan.textContent = calculateWindChill(current.main.temp, current.wind.speed);
    } catch (error) {
      console.error('Error fetching weather', error);
    }
  }

  function calculateWindChill(temp, speed) {
    if (temp <= 10 && speed > 4.8) {
      const chill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
      return `${chill.toFixed(1)}°C`;
    }
    return 'N/A';
  }

  // === MEMBERS ===
  async function loadMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
      const spotlightContainer = document.getElementById('memberSpotlightContainer');

      if (memberContainer) {
        memberContainer.innerHTML = '';
        members.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('member-card');

          card.innerHTML = `
            <picture>
              <img src="${member.image}" alt="${member.name} logo" class="member-image" width="300" height="150" loading="lazy">
            </picture>
            <div class="member-details">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
          `;
          memberContainer.appendChild(card);
        });
      }

      if (spotlightContainer) {
        const spotlightMembers = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
        const howMany = Math.min(spotlightMembers.length, Math.floor(Math.random() * 2) + 2);
        const selected = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, howMany);

        selected.forEach(member => {
          const spotlightCard = document.createElement('div');
          spotlightCard.classList.add('member-card');

          spotlightCard.innerHTML = `
            <picture>
              <img src="${member.image}" alt="${member.name} logo" class="member-image" width="300" height="150" loading="lazy">
            </picture>
            <div class="member-details">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
          `;
          spotlightContainer.appendChild(spotlightCard);
        });
      }
    } catch (err) {
      console.error("Error loading members:", err);
    }
  }

  // === JOIN PAGE ===
  if (window.location.pathname.includes('join.html')) {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) timestampInput.value = new Date().toISOString();
  } 
  
  // info
  loadMembers();
  loadWeather();
});


