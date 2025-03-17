import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById("form-sign-up");
section.remove();
const form = section.querySelector("form");
form.addEventListener("submit", onRegister);

export function showRegister() {
  showView(section);
}

async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const repeatPassword = formData.get("repeatPassword").trim();

  if (!email) {
    form.reset();
    alert("Email is required.");
    return
  }
  if (password.length < 6) {
    alert("Passwords should be at least 6 characters long.");
    form.reset();
    return
  }
  if (password != repeatPassword) {
    alert("Repeat password does not match the password.");
    form.reset();
    return
  }
  try {
    const res = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    sessionStorage.setItem(
      "userData",
      JSON.stringify({
        email: data.email,
        id: data._id,
        token: data.accessToken,
      })
    );
    form.reset();
    updateNav();
    showHome();
  } catch (error) {
    alert(error.message);
  }
}
