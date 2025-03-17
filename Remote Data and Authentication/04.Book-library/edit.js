const form = document.getElementById("bookForm");

export async function onEdit(target) {
  const bookId = target.parentElement.dataset.id;
  const res = await fetch(
    "http://localhost:3030/jsonstore/collections/books/" + bookId
  );
  const book = await res.json();

  form.querySelector("[name='title']").value = book.title;
  form.querySelector("[name='author']").value = book.author;
  form.dataset.bookId = bookId;
  
  form.querySelector("h3").textContent = "Edit FORM";
  form.querySelector("#submit").textContent = "Save";
  form.dataset.type = "edit";
}

export async function onEditSubmit(event) {
  event.preventDefault();
  
  try {
    const formData = new FormData(form);
    const title = formData.get("title").trim();
    const author = formData.get("author").trim();
    const bookId = form.dataset.bookId;

    const res = await fetch("http://localhost:3030/jsonstore/collections/books/" + bookId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        author
      })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    form.reset();
    
    form.querySelector("h3").textContent = "FORM";
    form.dataset.type = "create";

  } catch (error) {
    alert(error.message);
  }
}