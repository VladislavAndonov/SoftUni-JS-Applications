function solve() {
  const infoRef = document.querySelector("#info span");

  const arriveBtn = document.getElementById("arrive");
  const departBtn = document.getElementById("depart");

  const url = `http://localhost:3030/jsonstore/bus/schedule/`;

  const stop = {
    currentStop: "",
    nextStop: "depot",
  };

  async function depart() {
    try {
      const response = await fetch(url + stop.nextStop);
      const data = await response.json();

      stop.currentStop = data.name;
      stop.nextStop = data.next;

      infoRef.textContent = `Next stop ${stop.currentStop}`;

      arriveBtn.disabled = false;
      departBtn.disabled = true;
    } catch (error) {
      infoRef.textContent = "Error";
      arriveBtn.disabled = false;
      departBtn.disabled = false;
    }
  }

  function arrive() {
    infoRef.textContent = `Arriving at ${stop.currentStop}`;
    arriveBtn.disabled = true;
    departBtn.disabled = false;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
