function attachEvents() {
  const getWeatherBtn = document.getElementById("submit");
  getWeatherBtn.addEventListener("click", getWeather);
  const locationInputRef = document.getElementById("location");
  const forecastSectionRef = document.getElementById("forecast");
  const currentRef = document.getElementById("current");
  const upcomingRef = document.getElementById("upcoming");
  const locationsUrl = "http://localhost:3030/jsonstore/forecaster/locations";
  const todayUrl = "http://localhost:3030/jsonstore/forecaster/today/";

  async function getWeather(event) {
    const userInput = locationInputRef.value;

    forecastSectionRef.style.display = "block";

    const locationResponse = await fetch(locationsUrl);
    const locationData = await locationResponse.json();

    const currentLocation = locationData.find((x) => x.name == userInput);
    fillTodayData(currentLocation.code);
  }

  async function fillTodayData(code) {
    const todayResponse = await fetch(todayUrl + code);
    const todayData = await todayResponse.json();
    const todayInfo = createTodayForecaseSection(todayData);
    currentRef.appendChild(todayInfo);
  }

  function createTodayForecaseSection(data) {
    const container = document.createElement("div");
    container.classList.add("forecasts");
    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");
    conditionSpan.classList.add("symbol");
    conditionSpan.innerHTML = findSymbol(data.forecast.condition);

    container.appendChild(conditionSpan);

    const spanContainer = document.createElement("span");
    spanContainer.classList.add("condition");

    const spanName = document.createElement("span");
    spanName.classList.add("forecast-data");
    spanName.textContent = data.name;

    const degree = document.createElement("class");
    degree.classList.add("forecast-data");
    degree.innerHTML = `${data.forecast.low + findSymbol("Degrees")}\\${
      data.forecast.high + findSymbol("Degrees")
    }`;

    const condition = document.createElement("span");
    condition.classList.add("forecast-data");
    condition.textContent = data.forecast.condition;

    spanContainer.appendChild(spanName);
    spanContainer.appendChild(degree);
    spanContainer.appendChild(condition);
    container.appendChild(spanContainer);

    return container;
  }

  function findSymbol(condition) {
    switch (condition) {
      case "Sunny":
        return "&#x2600";
      case "Partly sunny":
        return "&#x26C5";
      case "Overcast":
        return "&#x2601";
      case "Rain":
        return "&#x2614";
      case "Degrees":
        return "&#176";
    }
  }
}

attachEvents();
