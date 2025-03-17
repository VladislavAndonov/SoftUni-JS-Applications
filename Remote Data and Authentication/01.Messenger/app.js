function attachEvents() {
  const url = "http://localhost:3030/jsonstore/messenger";
  document.getElementById("submit").addEventListener("click", addMessage);
  document.getElementById("refresh").addEventListener("click", refreshMessages);

  async function addMessage(e) {
    let nameRef = document.querySelector("input[name='author']");
    let messageRef = document.querySelector("input[name='content']");

    let name = nameRef.value;
    let message = messageRef.value;

    let data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ author: name, content: message }),
    };

    await fetch(url, data);
    nameRef.value = "";
    messageRef.value = "";
  }

  async function refreshMessages(e) {
    let messagesArea = document.getElementById("messages");
    messagesArea.textContent = "";

    const commentsResponse = await fetch(url);
    const commentsData = await commentsResponse.json();

    Object.values(commentsData).forEach((x) => {
      messagesArea.textContent += `${x.author}: ${x.content}\n`;
    });
    messagesArea.textContent = messagesArea.textContent.trim();
  }
}
attachEvents();
