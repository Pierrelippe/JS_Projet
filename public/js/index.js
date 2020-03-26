var list = document.getElementById("list");
var infos = document.getElementById("infos");
const slide = document.getElementsByClassName("slide");

var slideIndex = 0;

list.addEventListener("change", listChoice);

function listChoice() {
  if (infos.classList.contains("hidden")) {
    infos.classList.replace("hidden", "flex");
  }
  if (parseInt(list.selectedIndex) > 0) {
    lieu = document.querySelector("#lieu");
    choice = list.options[list.selectedIndex].innerHTML;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${choice}&units=metric&lang=fr&appid=4c76423d909e8b9c3c8db03e1f126a52`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);

        var compt = 0;
        var compt1 = 3;
        var i = 0;
        var isfinish = false;
        var isfinish1 = false;
        var bgchange = true;

        while (i < res.list.length || (!isfinish && !isfinish1)) {
          //On prend le charactère 11 et 12 de ce string, ce qui correspond à l'heure
          var heureTemp =
            res.list[i].dt_txt.charAt(11) + res.list[i].dt_txt.charAt(12);
          //On prend les 3 première données de 15h
          /// METEO DE L'APRES MIDI
          if (heureTemp === "15" && !isfinish) {
            var dateTemp = "";
            date = document.querySelector(`#date${compt}`);
            afficherMeteo(res, heureTemp, i, compt, lieu);
            //On prend que les 11 premiers charactères ce qui correspond à la date
            for (let j = 0; j < 11; j++) {
              dateTemp += res.list[i].dt_txt.charAt(j);
            }
      

            date.innerHTML = dateTemp;
            //Changer la couleur en fonction de l'aprés midi de la première journée
            if (bgchange) {
              changeColorBackground(res.list[i].weather[0].description);
              bgchange = false;
            }

            //Comme j'affiche 3 météos, lorsque les 3 sont affichés, on arrête la boucle while
            if (compt < 2) {
              compt++;
            } else {
              isfinish = true;
            }
          }

          /// METEO DU MATIN (même processus que pour l'après midi)
          if (heureTemp === "09" && !isfinish1) {
            afficherMeteo(res, heureTemp, i, compt1, lieu);

            if (compt1 < 5) {
              compt1++;
            } else {
              isfinish1 = true;
            }
          }

          i++;
        }
      });
  }
}

function changeColorBackground(info) {
  var textcolor = document.getElementsByClassName("txt-color");
  var bgcolor = document.getElementsByClassName("bgColor");

  //Couleur si c'est nuageux
  if (parseInt(info.indexOf("nuageux")) >= 0) {
    console.log("dark");
    for (let i = 0; i < textcolor.length; i++) {
      textcolor[i].style.color = "white";
    }
    for (let j = 0; j < bgcolor.length; j++) {
      bgcolor[j].style.backgroundColor = "#A8A8A8";
    }
  }
  //Couleur si il y a de la pluie
  else if (parseInt(info.indexOf("pluie")) > 0) {
    console.log("NewDark");
    for (let i = 0; i < textcolor.length; i++) {
      textcolor[i].style.color = "white";
    }
    for (let j = 0; j < bgcolor.length; j++) {
      bgcolor[j].style.backgroundColor = "#686868";
    }
  }
  //Couleur pour le reste
  else {
    console.log("white");
    for (let i = 0; i < textcolor.length; i++) {
      textcolor[i].style.color = "black";
    }
    for (let j = 0; j < bgcolor.length; j++) {
      bgcolor[j].style.backgroundColor = "white";
    }
  }
}

function afficherMeteo(res, heureTemp, i, compt, lieu) {
  //On met les informations des balises html dans des variables
  temp = document.querySelector(`#temp${compt}`);
  meteo = document.querySelector(`#meteo${compt}`);
  heure = document.querySelector(`#heure${compt}`);

  //On met nos données dans nos balises html
  lieu.innerHTML = res.city.name;
  temp.innerHTML = res.list[i].main.temp + " °C";
  meteo.innerHTML = res.list[i].weather[0].description;
  //On met l'icone
  document.getElementById(
    `weather${compt}`
  ).src = `http://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png`;
  heure.innerHTML = heureTemp + " h";
}

//Slide
function nextSlide() {
  slideIndex++;
  setSlide(Math.abs(slideIndex));
}

function prevSlide() {
  slideIndex--;
  setSlide(Math.abs(slideIndex));
}

function setSlide(index) {
  if (index % 3 === 0) {
    //On met les div a caché en hidden et celle qu'il faut voir en flex
    slide[0].classList.replace("hidden", "flex");
    if (slide[1].classList.contains("flex")) {
      slide[1].classList.replace("flex", "hidden");
    }
    if (slide[2].classList.contains("flex")) {
      slide[2].classList.replace("flex", "hidden");
    }
    //On change le fond d'écran en finction de la météo en fond
    changeColorBackground(
      document.getElementById(`meteo${index % 3}`).innerHTML
    );
  }
  if (index % 3 === 1) {
    if (slide[0].classList.contains("flex")) {
      slide[0].classList.replace("flex", "hidden");
    }
    slide[1].classList.replace("hidden", "flex");

    if (slide[2].classList.contains("flex")) {
      slide[2].classList.replace("flex", "hidden");
    }

    changeColorBackground(
      document.getElementById(`meteo${index % 3}`).innerHTML
    );
  }
  if (index % 3 === 2) {
    if (slide[0].classList.contains("flex")) {
      slide[0].classList.replace("flex", "hidden");
    }

    if (slide[1].classList.contains("flex")) {
      slide[1].classList.replace("flex", "hidden");
    }
    slide[2].classList.replace("hidden", "flex");
    changeColorBackground(
      document.getElementById(`meteo${index % 3}`).innerHTML
    );
  }
}
