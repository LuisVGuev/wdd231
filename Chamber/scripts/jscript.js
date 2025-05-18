document.addEventListener('DOMContentLoaded', () => {
  // Load members from the JSON file
  fetch('data/members.json')
    .then(response => response.json())
    .then(data => {
      displayMembers(data);
    });

  // Display the current year and the last modified date
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});

// Function to display members
function displayMembers(members) {
  const memberContainer = document.getElementById('memberContainer');
  memberContainer.innerHTML = '';  // Clear current view

  members.forEach(member => {
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card');
    memberCard.innerHTML = `
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    memberContainer.appendChild(memberCard);
  });
}

// Function to toggle between grid and list view
function toggleView(viewType) {
  const memberContainer = document.getElementById('memberContainer');
  
  if (viewType === 'grid') {
    memberContainer.classList.add('grid-view');
    memberContainer.classList.remove('list-view');
  } else {
    memberContainer.classList.add('list-view');
    memberContainer.classList.remove('grid-view');
  }
}

