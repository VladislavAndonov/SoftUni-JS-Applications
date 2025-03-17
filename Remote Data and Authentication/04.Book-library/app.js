// import { onEdit, onEditSubmit } from "./edit.js";

const url = "http://localhost:3030/jsonstore/collections/books";

const tbody = document.querySelector("tbody");
const form = document.getElementById("bookForm");

document.getElementById("loadBooks").addEventListener("click", loadBooks);
form.addEventListener("submit", onFormSumbit);
tbody.addEventListener("click", onTableClick);

loadBooks();

function onTableClick(event) {
  if (event.target.className == "delete") {
    onDelete(event.target);
  } else if (event.target.className == "edit") {
    onEdit(event.target);
  }
}

async function onDelete(button) {
  const id = button.parentElement.dataset.id;
  await deleteBook(id);
  button.parentElement.parentElement.remove();
}

function onFormSumbit(event){
  if (event.target.dataset.type == "edit"){
    onEditSubmit(event);
  } else {
    onCreate(event);
  }
}

async function onCreate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const author = formData.get("author");
  const title = formData.get("title");

  const result = await createBook({ author, title });
  tbody.appendChild(createRow(result._id, result));
  event.target.reset();
}

async function loadBooks() {
  const books = await request(url);

  const result = Object.entries(books).map(([id, book]) =>
    createRow(id, book)
  );
  tbody.replaceChildren(...result);
}


function createRow(id, book) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>
`;
  return row;
}

async function createBook(book) {
  const result = await request(url, {
    method: "POST",
    body: JSON.stringify(book),
  });
  return result;
}

async function deleteBook(id, book) {
  const result = await request(`${url}/${id}`, {
    method: "DELETE",
  });
  return result;
}

async function request(url, options) {
  if (options && options.body != undefined) {
    Object.assign(options, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const response = await fetch(url, options);

  if (response.ok != true) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}
