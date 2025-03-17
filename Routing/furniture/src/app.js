import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

//for the specific application
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { logout } from "./api/data.js";
import { getUserData } from "./utils.js";

const root = document.querySelector("div.container"); //check the path before using in another app;
document.getElementById("logoutBtn").addEventListener("click", onLogout);

// import * as api from "./api/data.js";
// window.api = api; 

page(decorateContext);
page("/", catalogPage);
page("/login", loginPage);
page("/register", registerPage);

//for the specific application
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/my-furniture", catalogPage);

updateUserNav()
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateUserNav = updateUserNav;
  next();
}

function updateUserNav() {
  const userDate = getUserData();
  if (userDate){
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

async function onLogout(){
  await logout();
  updateUserNav()
  page.redirect("/");
};