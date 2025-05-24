/* JS */
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleView');
  const memberContainer = document.getElementById('memberContainer');

  // JSON
  async function loadMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();

      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        const image = document.createElement('img');
        image.src = member.image;
        image.alt = `${member.name} photo`;
        image.classList.add('member-image');

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('member-details');
        detailsDiv.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        memberCard.appendChild(image);
        memberCard.appendChild(detailsDiv);
        memberContainer.appendChild(memberCard);
      });
    } catch (err) {
      console.error("Error loading members:", err);
    }
  }

  // toggleButton
  toggleButton.addEventListener('click', () => {
    if (memberContainer.classList.contains('grid-view')) {
      memberContainer.classList.remove('grid-view');
      memberContainer.classList.add('list-view');
      toggleButton.textContent = 'Switch to Grid View';
    } else {
      memberContainer.classList.remove('list-view');
      memberContainer.classList.add('grid-view');
      toggleButton.textContent = 'Switch to List View';
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  loadMembers();
});

// hamburguesa
document.getElementById("hamburger").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
});
