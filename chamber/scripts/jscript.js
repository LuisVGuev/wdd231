/* JS */
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleView');
  const memberContainer = document.getElementById('memberContainer');

  // Toggle View
  if (toggleButton && memberContainer) {
    toggleButton.addEventListener('click', () => {
      const isGrid = memberContainer.classList.contains('grid-view');
      memberContainer.classList.toggle('grid-view', !isGrid);
      memberContainer.classList.toggle('list-view', isGrid);
      toggleButton.textContent = isGrid ? 'Switch to Grid View' : 'Switch to List View';
    });
  }

  // Mobile Menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Footer
  const yearSpan = document.getElementById('year');
  const modifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

  // Load Members
  async function loadMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();

      const spotlightContainer = document.getElementById('memberSpotlightContainer');

      // Charger Members
      if (memberContainer) {
        memberContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();

        members.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('member-card');

          card.innerHTML = `
            <picture>
              <source srcset="${member.image}" type="image/jpeg">
              <img src="${member.image}" alt="${member.name} logo" class="member-image" width="300" height="150" loading="lazy">
            </picture>
            <div class="member-details">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
          `;

          fragment.appendChild(card);
        });

        memberContainer.appendChild(fragment);
      }

      // Spotlights
      if (spotlightContainer) {
        spotlightContainer.innerHTML = '';
        const spotlightMembers = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
        const howMany = Math.min(spotlightMembers.length, Math.floor(Math.random() * 2) + 2);
        const selected = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, howMany);

        selected.forEach((member, index) => {
          const spotlightCard = document.createElement('div');
          spotlightCard.classList.add('member-card');

          spotlightCard.innerHTML = `
            <picture>
              <source srcset="${member.image}" type="image/jpeg">
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

  // Weather
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

  // Wind Chill
  function calculateWindChill(temp, speed) {
    if (temp <= 10 && speed > 4.8) {
      const chill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
      return `${chill.toFixed(1)}°C`;
    }
    return 'N/A';
  }

  // ----------- join.html ------------
  if (window.location.pathname.includes('join.html')) {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    const modalLinks = document.querySelectorAll(".card a");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".modal .close");

    modalLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetModal = document.getElementById(targetId);
        if (targetModal) {
          targetModal.classList.add("active");
          targetModal.querySelector(".close").focus();
        }
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".modal").classList.remove("active");
      });
    });

    modals.forEach(modal => {
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        modals.forEach(modal => modal.classList.remove("active"));
      }
    });
  }

  // Load dynamic data
  loadMembers();
  loadWeather();
});

fetch("https://api.openweathermap.org/data/2.5/forecast?q=São Paulo&units=metric&appid=YOUR_KEY", {
  headers: {
    "Accept-Encoding": "gzip, deflate, br"
  }
});