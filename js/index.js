const Lieu = document.querySelector(".lieu");
const Meteo = document.querySelector(".meteo");
var list = document.getElementById("list");
var button = document.getElementById("button");
var hide = document.getElementById("hide");

list.addEventListener("change", listChoice);

function listChoice() {
  choice = list.options[list.selectedIndex].innerHTML;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${choice}&appid=4c76423d909e8b9c3c8db03e1f126a52`
  )
    .then(res => res.json())
    .then(res => {
      Lieu.innerHTML = res.name;
      Meteo.innerHTML =
        Math.round((parseFloat(res.main.temp) - 273.15) * 100) / 100 + " °C";
    });
}

button.addEventListener("click", showHideTest);

function showHideTest() {
  console.log("je suis là");

  if (hide.classList.contains("hidden")) {
    hide.classList.remove("hidden");
  } else {
    hide.classList.add("hidden");
  }
}
