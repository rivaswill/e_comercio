let USER = JSON.parse(localStorage.user);
const img = document.querySelector(".img");
const file = document.querySelector('input[type="file"]');

if(USER.img!==undefined) img.setAttribute('src',USER.img)

file.addEventListener("change", function (e) {
  USER.img = 'img/' + file.value.substr(12);
  console.log(file.value.substr(12))
  img.setAttribute('src',USER.img)
  localStorage.user = JSON.stringify(USER);
});

if (USER.userName === "" && USER.userName == undefined) {
  document.querySelector("h1.tittle").innerText = USER.mail;
} else {
  document.querySelector("h1.tittle").innerText = USER.userName;
}

if (USER.userAbout !== "" && USER.userAbout !== undefined) {
  document.querySelector("span.aboutMe").innerText = USER.userAbout;
  console.log("about");
}
if (USER.userPhone !== "" && USER.userPhone !== undefined) {
  document.querySelector("span.telefono span").innerText = USER.userPhone;
}
if (USER.userFacebook !== "" && USER.userFacebook !== undefined) {
  document.querySelector("span.facebook span").innerText = USER.userFacebook;
}
if (USER.userTwitter !== "" && USER.userTwitter !== undefined) {
  document.querySelector("span.twitter span").innerText = USER.userTwitter;
}

document.querySelector("span.correo span").innerText =
  USER.mail + "@correo.com";

const guardar = document.querySelector("#guardar");
const modificar = document.querySelector("#modificar");
const equis = document.querySelector(".fa-x");

const nombre = document.querySelector(".nombre input");
const nombre2do = document.querySelector(".nombre2do input");
const apellido = document.querySelector(".apellido input");
const apellido2do = document.querySelector(".apellido2do input");
const aboutMe = document.querySelector(".aboutMe input");
const correo = document.querySelector(".correo input");
const facebook = document.querySelector(".facebook input");
const telefono = document.querySelector(".telefono input");
const twitter = document.querySelector(".twitter input");

modificar.addEventListener("click", () => {
  document.querySelector(".card:last-child").classList.toggle("card_active");
});
equis.addEventListener("click", () => {
  document.querySelector(".card:last-child").classList.toggle("card_active");
});

guardar.addEventListener("click", () => {
  let cont = 0;
  const nombres = [
    nombre.value,
    nombre2do.value,
    apellido.value,
    apellido2do.value,
  ];
  let nombreCompleto = "";
  nombres.forEach((e) => {
    if (e.replaceAll(" ", "") !== "") {
      cont++;
      if (cont >= 2) {
        nombreCompleto += " ";
      }
      nombreCompleto += e;
      USER.userName = nombreCompleto;
      document.querySelector("h1.names").innerText = nombreCompleto;
    }
  });
  nombre.value = "";
  nombre2do.value = "";
  apellido.value = "";
  apellido2do.value = "";
  if (aboutMe.value.replaceAll(" ", "") !== "") {
    USER.userAbout = aboutMe.value;
    document.querySelector("span.aboutMe").innerText = USER.userAbout;
  }
  aboutMe.value = "";
  if (correo.value.replaceAll(" ", "") !== "") {
    USER.mail = correo.value;
    document.querySelector("span.correo span").innerText =
      USER.mail + "@correo.com";
  }
  correo.value = "";
  if (telefono.value.replaceAll(" ", "") !== "") {
    USER.userPhone = telefono.value;
    document.querySelector("span.telefono span").innerText = USER.userPhone;
  }
  telefono.value = "";
  if (facebook.value.replaceAll(" ", "") !== "") {
    USER.userFacebook = facebook.value;
    document.querySelector("span.facebook span").innerText = USER.userFacebook;
  }
  facebook.value = "";
  if (twitter.value.replaceAll(" ", "") !== "") {
    USER.userTwitter = twitter.value;
    document.querySelector("span.twitter span").innerText = USER.userTwitter;
  }
  twitter.value = "";

  localStorage.user = JSON.stringify(USER);
  document.querySelector(".card:last-child").classList.toggle("card_active");
});
