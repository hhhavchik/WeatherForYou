const indexesOfWeatherData = [0, 6, 12, 18, 21];
const indexesOfWeatherDataWeek = [12, 36, 60, 84, 108, 132, 156];

function geoPosition() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      document.getElementById("mainPosition").innerHTML =
        "Weather in your current location";
      console.log("Correctloc");
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getWeatherForGivenLocation(latitude, longitude);
    },
    function (error) {
      if (error.PERMISSION_DENIED) {
        console.log("Not correct!");
      }
    }
  );
}

function getWeatherForGivenLocation(latitute, longitude) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitute}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,rain,showers,snowfall  `
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById("CurrentTemp").innerHTML =
        data.current_weather.temperature;
      addWeatherCurrentTable(data);

      addWeatherTableWeek(data);
    });
}

function addWeatherTableWeek(data) {
  const tableWeatherWeek = document.getElementById("tableWeatherWeek");
  const dateRowElementWeek = document.createElement("tr");
  const tempRowElementWeek = document.createElement("tr");
  tableWeatherWeek.appendChild(dateRowElementWeek);
  tableWeatherWeek.appendChild(tempRowElementWeek);

  indexesOfWeatherDataWeek.forEach(function (indexOfWeatherDataWeek) {
    const weatherDateWeek = data.hourly.time[indexOfWeatherDataWeek];
    console.log(weatherDateWeek); //-> "2020-05-14T04:00:00Z", type string
    const convertedDate = formatDate(weatherDateWeek);
    console.log(convertedDate); //-> "September 26, 2023" type string

    const cellElementWeek = document.createElement("td");

    cellElementWeek.innerHTML = convertedDate;
    dateRowElementWeek.appendChild(cellElementWeek);

    const weatherTempWeek = data.hourly.temperature_2m[indexOfWeatherDataWeek];
    const tempCellElementWeek = document.createElement("td");
    tempCellElementWeek.innerHTML = weatherTempWeek + "℃";

    tempRowElementWeek.appendChild(tempCellElementWeek);
  });
}

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en", options);
};

function addWeatherCurrentTable(data) {
  const tableWeather = document.getElementById("tableWeather");
  const dateRowElement = document.createElement("tr");
  const tempRowElement = document.createElement("tr");
  tableWeather.appendChild(dateRowElement);
  tableWeather.appendChild(tempRowElement);

  indexesOfWeatherData.forEach(function (indexOfWeatherData) {
    const weatherDate = data.hourly.time[indexOfWeatherData];
    const cellElement = document.createElement("td");
    const convertedHours = formatHours(weatherDate);
    cellElement.innerHTML = convertedHours;
    dateRowElement.appendChild(cellElement);

    const weatherTemp = data.hourly.temperature_2m[indexOfWeatherData];
    const tempCellElement = document.createElement("td");
    tempCellElement.innerHTML = weatherTemp + "℃";
    tempRowElement.appendChild(tempCellElement);
  });

  data.current_weather.temperature;
  console.log(data.current_weather.temperature);
}

const formatHours = (dateString) => {
  const optionsHours = { hour: "numeric", minute: "numeric" };
  return new Date(dateString).toLocaleTimeString("it", optionsHours);
};

function addCurrentDateToPage() {
  const kalendarz = document.getElementById("kalendarz");
  const data = new Date();
  let dzien = data.getDate();
  let miesiac = String(data.getMonth() + 1).padStart(2, "0");
  let rok = data.getFullYear();

  kalendarz.innerHTML = dzien + "-" + miesiac + "-" + rok;
}
function addCurrentTimeToPage() {
  const updateElementWithCurrentTime = () => {
    const data = new Date();
    let godzina = String(data.getHours()).padStart(2, "0");
    let minuta = String(data.getMinutes()).padStart(2, "0");
    let sekunda = String(data.getSeconds()).padStart(2, "0");

    czas.innerHTML = godzina + ":" + minuta + ":" + sekunda;
  };
  const czas = document.getElementById("czas");

  const interval = setInterval(updateElementWithCurrentTime, 1000);
}

geoPosition();
addCurrentTimeToPage();
addCurrentDateToPage();

document.getElementById("Weather").innerHTML;

function showWeatherPicture() {
  const weatherImage = document.getElementById("weatherImage");
  const elementImage = document.createElement("img");
  weatherImage.appendChild(elementImage);
}
showWeatherPicture();
