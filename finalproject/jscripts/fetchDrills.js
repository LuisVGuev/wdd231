// js/fetchDrills.js
if (window.location.pathname.endsWith('drills.html')) {
  const drillList = document.getElementById('drill-list');
  const filterButtons = document.querySelectorAll('[data-filter]');

  async function loadDrills() {
    try {
      const response = await fetch('data/drills.json');
      if (!response.ok) throw new Error('Failed to fetch drills');
      const drills = await response.json();
      displayDrills(drills);

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const level = button.dataset.filter;
          const filtered = level === 'All' ? drills : drills.filter(d => d.difficulty === level);
          displayDrills(filtered);
        });
      });
    } catch (err) {
      drillList.innerHTML = `<p>Error loading drills: ${err.message}</p>`;
    }
  }

  function displayDrills(drills) {
    drillList.innerHTML = '';
    drills.forEach(drill => {
      const card = document.createElement('div');
      card.className = 'drill-card';
      card.innerHTML = `
        <h3>${drill.name}</h3>
        <p><strong>Skill:</strong> ${drill.skill}</p>
        <p><strong>Level:</strong> ${drill.difficulty}</p>
        <p><strong>Description:</strong> ${drill.description}</p>
        <p><strong>Duration:</strong> ${drill.duration}</p>
      `;
      drillList.appendChild(card);
    });
  }

  loadDrills();
}
