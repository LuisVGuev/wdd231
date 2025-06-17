// js/formLogic.js

if (window.location.pathname.endsWith('performance.html')) {
  const form = document.getElementById('performance-form');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const modalResults = document.getElementById('modal-results');

  if (form && modal && closeModal && modalResults) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const attempts = +formData.get('attempts');
      const made = +formData.get('made');
      const dribbleTime = +formData.get('dribbleTime');
      const laps = +formData.get('laps');

      const shootingPercentage = ((made / attempts) * 100).toFixed(1);

      const performance = {
        shootingPercentage,
        dribbleTime,
        laps
      };

      // Save to localStorage
      localStorage.setItem('performance', JSON.stringify(performance));

      // Display in modal
      modalResults.innerHTML = `
        <p><strong>Shooting %:</strong> ${shootingPercentage}%</p>
        <p><strong>Dribble Time:</strong> ${dribbleTime} sec</p>
        <p><strong>Endurance Laps:</strong> ${laps}</p>
      `;

      modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
}
