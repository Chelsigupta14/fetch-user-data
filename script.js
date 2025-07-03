const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

const fetchUsers = () => {
  userList.innerHTML = "";
  errorMsg.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .then(users => {
      users.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";

        const website = user.website.startsWith("http") ? user.website : `https://${user.website}`;

        card.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>📧 Email:</strong> ${user.email}</p>
          <p><strong>🏙️ City:</strong> ${user.address.city}</p>
          <p><strong>🏠 Street:</strong> ${user.address.street}</p>
          <p><strong>🌐 Website:</strong> <a href="${website}" target="_blank">${user.website}</a></p>
        `;

        userList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      errorMsg.textContent = "🚫 Could not load data. Check your internet connection!";
    });
};

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Initial load
fetchUsers();
