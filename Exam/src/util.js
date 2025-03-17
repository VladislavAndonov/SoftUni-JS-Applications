export function getUserData() {
  return JSON.parse(localStorage.getItem("user"));
}

export function setUserData(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("user");
}


export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

    callback(Object.fromEntries(data), event.target);
  };
}

export function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.querySelector("nav .guest").style.display = "none";
    document.querySelector("nav .user").style.display = "block";
  } else {
    document.querySelector("nav .guest").style.display = "block";
    document.querySelector("nav .user").style.display = "none";
  }
}


export function showError(message) {
  const notifications = document.getElementById('notifications');
  const errorBox = document.getElementById('errorBox');
  const errorBoxText = errorBox.querySelector('span'); // Select the span inside errorBox

  // Set the error message
  errorBoxText.textContent = message;

  // Show the error box
  errorBox.style.display = 'block';

  // Hide the error box after 3 seconds
  setTimeout(() => {
    errorBox.style.display = 'none';
  }, 3000);
}