import { getProductById, updateProduct } from "../data/products.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, showError } from "../util.js";

const editTemplate = (product, onEdit) => html`
<section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="item" id="item" placeholder="Item" .value=${product.item} />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${product.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${product.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${product.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${product.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value=${product.description}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const product = await getProductById(id);
  render(editTemplate(product, createSubmitHandler(onEdit)));

  async function onEdit({ item, imageUrl, price, availability, type, description }, form) {
    if (!item || !imageUrl || !price || !availability || !type || !description) {
      return showError("All fields are required!");
    }
    try {
      await updateProduct(id, { item, imageUrl, price, availability, type, description });
      page.redirect(`/catalog/${id}`);
    } catch (error) {
      showError("Error occurred while editing the product. Please try again later.");
    }
  }
}
