function attachEvents() {
  document.getElementById("btnLoad").addEventListener("click", loadContacts);
  document.getElementById("btnCreate").addEventListener("click", createContact);

  const personRef = document.getElementById("person");
  const phoneRef = document.getElementById("phone");

  const baseUrl = "http://localhost:3030/jsonstore/phonebook";

  let phoneBookRef = document.getElementById("phonebook");

  async function loadContacts(e) {
    const response = await fetch(baseUrl);
    const data = await response.json();
    phoneBookRef.textContent = "";
    Object.values(data).forEach((x) => {
      let liElement = document.createElement("li");
      let textNode = document.createTextNode(`${x.person}: ${x.phone}`);

      let btnElement = document.createElement("button");
      btnElement.textContent = "Delete";
      btnElement.addEventListener("click", deleteContact);
      btnElement.dataset.id = x._id;

      liElement.appendChild(textNode);
      liElement.appendChild(btnElement);
      phoneBookRef.appendChild(liElement);
    });
  }
  async function createContact(e) {
    let person = personRef.value;
    let phone = phoneRef.value;

    let data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ person, phone }),
    };

    await fetch(baseUrl, data);
    person = "";
    phone = "";

    loadContacts()
  }

  async function deleteContact(e) {
    let id = e.target.dataset.id;
    await fetch(baseUrl + "/" + id, { method: "DELETE" });

    loadContacts();
  }
}
attachEvents();
