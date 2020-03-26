var list = document.getElementById("list");
var button = document.getElementById("button");
var hide = document.getElementById("hide");
const Lieu = document.querySelector("#lieu");
var temp;
var meteo;
var heure;
var date;

list.addEventListener("change", listChoice);

function listChoice() {
  if (parseInt(list.selectedIndex) > 0) {
    choice = list.options[list.selectedIndex].innerHTML;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${choice}&units=metric&lang=fr&appid=4c76423d909e8b9c3c8db03e1f126a52`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);

        /// METEO DE L'APRES MIDI
        var compt = 0;
        var i = 0;
        var isfinish = false;
        var bgchange=true;

        while (i < res.list.length && !isfinish) {
          //On prend le charactère 11 et 12 de ce string, ce qui correspond à l'heure
          var heureTemp =
            res.list[i].dt_txt.charAt(11) + res.list[i].dt_txt.charAt(12);
          //On prend les 3 première données de 15h
          if (heureTemp === "15") {
            var dateTemp = "";
            date = document.querySelector(`#date${compt}`);
            temp = document.querySelector(`#temp${compt}`);
            meteo = document.querySelector(`#meteo${compt}`);
            heure = document.querySelector(`#heure${compt}`);

            //On prend que les 11 premiers charactères ce qui correspond à la date
            for (let j = 0; j < 11; j++) {
              dateTemp += res.list[i].dt_txt.charAt(j);
            }
            console.log(dateTemp);
            //On met nos données dans nos balises html
            date.innerHTML = dateTemp;
            Lieu.innerHTML = res.city.name;
            temp.innerHTML = res.list[i].main.temp + " °C";
            meteo.innerHTML = res.list[i].weather[0].description;
            //On met l'icone
            document.getElementById(
              `weather${compt}`
            ).src = `http://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png`;
            heure.innerHTML = heureTemp + " h";

          //Changer la couleur en fonction de l'aprés midi de la première journée
          if(bgchange){
            console.log("Date : "+ res.list[i].dt_txt+" info :"+res.list[i].weather[0].description);
            changeColorBackground(res.list[i].weather[0].description);
            bgchange=false;
          }

            //Comme j'affiche 3 météos, lorsque les 3 sont affichés, on arrête la boucle while
            if (compt < 2) {
              compt++;
            } else {
              isfinish = true;
            }
          }

          i++;
        }



        /// METEO DU MATIN (même processus que pour l'après midi)
        compt = 3;
        i = 0;
        var isfinish = false;
        while (i < res.list.length && !isfinish) {
          var heureTemp =
            res.list[i].dt_txt.charAt(11) + res.list[i].dt_txt.charAt(12);

          if (heureTemp === "09") {
            var dateTemp = "";
            temp = document.querySelector(`#temp${compt}`);
            meteo = document.querySelector(`#meteo${compt}`);
            heure = document.querySelector(`#heure${compt}`);

            for (let j = 0; j < 11; j++) {
              dateTemp += res.list[i].dt_txt.charAt(j);
            }
            console.log(dateTemp);

            Lieu.innerHTML = res.city.name;
            temp.innerHTML = res.list[i].main.temp + " °C";
            meteo.innerHTML = res.list[i].weather[0].description;
            document.getElementById(
              `weather${compt}`
            ).src = `http://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png`;
            heure.innerHTML = heureTemp + " h";
            
            if (compt < 5) {
              compt++;
            } else {
              isfinish = true;
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
  console.log("info :"+info);
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
  else   if (parseInt(info.indexOf("pluie")) > 0) {
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

/*button.addEventListener("click", showHideTest);

function showHideTest() {
  console.log("je suis là");

  if (hide.classList.contains("hidden")) {
    hide.classList.remove("hidden");
  } else {
    hide.classList.add("hidden");
  }
}*/
