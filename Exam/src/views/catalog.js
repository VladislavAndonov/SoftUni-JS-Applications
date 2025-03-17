import { getAllProducts } from "../data/products.js"
import { html, render } from "../lib.js";
import { getUserData } from "../util.js";

const catalogTemplate = (products) => html`
<h3 class="heading">Market</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${products.length ? products.map(productTemplate) : html`<h3 class="empty">No Items Yet</h3>`}
  </section>`

const productTemplate = (product) => html`
  <div class="item">
    <img src=${product.imageUrl} />
    <h3 class="model">${product.item}</h3>
    <div class="item-info">
      <p class="price">Price: ${product.price}</p>
      <p class="availability">${product.availability}</p>
      <p class="type">Type: ${product.type}</p>
    </div>
    <a class="details-btn" href="/catalog/${product._id}">Uncover More</a>
  </div>
`;

export async function showCatalog(ctx) {
    const user = getUserData();
    const hasUser = !!user;

  const products = await getAllProducts();
  render(catalogTemplate(products));
}
