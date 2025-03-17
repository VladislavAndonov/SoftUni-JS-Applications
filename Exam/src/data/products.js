import { del, get, post, put } from "./request.js";

const endpoints = {
  dashboard: "/data/cyberpunk?sortBy=_createdOn%20desc",
  products: "/data/cyberpunk",
  productById: "/data/cyberpunk/",
};

export async function getAllProducts() {
  return get(endpoints.dashboard);
}

export async function getProductById(id) {
  return get(endpoints.productById + id);
}

export async function createProduct(
  item,
  imageUrl,
  price,
  availability,
  type,
  description
) {
  return post(endpoints.products, {
    item,
    imageUrl,
    price,
    availability,
    type,
    description,
  });
}

export async function updateProduct(id, data) {
  return put(endpoints.productById + id, data);
}

export async function deleteProduct(id) {
  return del(endpoints.productById + id);
}
