import { deleteProduct, getProductById } from "../data/products.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, onDelete) => html` <section
  id="details"
>
  <div id="details-wrapper">
    <div>
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <p id="details-title">${data.item}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-price">Price: ${data.price}</p>
        <p class="details-availability">${data.availability}</p>
        <p class="type">Type: ${data.type}</p>
        <p id="item-description">${data.description}</p>
      </div>
      <!--Edit and Delete are only for creator-->

      <div id="action-buttons">
        ${isOwner ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}
      </div>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const product = await getProductById(id);

  const user = getUserData();
  const isOwner = user.id == product._ownerId;

  render(detailsTemplate(product, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteProduct(id);
      page.redirect("/catalog");
    }
  }
}
