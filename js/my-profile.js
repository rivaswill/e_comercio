let USER = JSON.parse(localStorage.user);
const img = document.querySelector(".img");
const file = document.querySelector('input[type="file"]');

if (USER.img) img.setAttribute("src", USER.img);

file.addEventListener("change", function (e) {
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", () => {
    USER.img = reader.result;
    img.setAttribute("src", USER.img);
    localStorage.user = JSON.stringify(USER);
  });
});

if (!USER.userName) {
  document.querySelector("h1.tittle").innerText = USER.mail;
} else {
  document.querySelector("h1.tittle").innerText = USER.userName;
}

if (USER.userAbout) {
  document.querySelector("span.aboutMe").innerText = USER.userAbout;
  console.log("about");
}
if (USER.userPhone) {
  document.querySelector("span.telefono span").innerText = USER.userPhone;
}
if (USER.userFacebook) {
  document.querySelector("span.facebook span").innerText = USER.userFacebook;
}
if (USER.userTwitter) {
  document.querySelector("span.twitter span").innerText = USER.userTwitter;
}
USER.mail.indexOf("@") == -1
  ? (document.querySelector("span.correo span").innerText =
      USER.mail + "@correo.com")
  : (document.querySelector("span.correo span").innerText = USER.mail);

const guardar = document.querySelector("#guardar"),
  modificar = document.querySelector("#modificar"),
  equis = document.querySelector(".fa-x"),
  nombre = document.querySelector(".nombre input"),
  nombre2do = document.querySelector(".nombre2do input"),
  apellido = document.querySelector(".apellido input"),
  apellido2do = document.querySelector(".apellido2do input"),
  aboutMe = document.querySelector(".aboutMe input"),
  correo = document.querySelector(".correo input"),
  facebook = document.querySelector(".facebook input"),
  telefono = document.querySelector(".telefono input"),
  twitter = document.querySelector(".twitter input");

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
    if (e.replaceAll(" ", "")) {
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
  if (aboutMe.value.replaceAll(" ", "")) {
    USER.userAbout = aboutMe.value;
    document.querySelector("span.aboutMe").innerText = USER.userAbout;
  }
  aboutMe.value = "";
  if (correo.value.replaceAll(" ", "")) {
    USER.mail = correo.value;
    document.querySelector("span.correo span").innerText =
      USER.mail + "@correo.com";
  }
  correo.value = "";
  if (telefono.value.replaceAll(" ", "")) {
    USER.userPhone = telefono.value;
    document.querySelector("span.telefono span").innerText = USER.userPhone;
  }
  telefono.value = "";
  if (facebook.value.replaceAll(" ", "")) {
    USER.userFacebook = facebook.value;
    document.querySelector("span.facebook span").innerText = USER.userFacebook;
  }
  facebook.value = "";
  if (twitter.value.replaceAll(" ", "")) {
    USER.userTwitter = twitter.value;
    document.querySelector("span.twitter span").innerText = USER.userTwitter;
  }
  twitter.value = "";

  localStorage.user = JSON.stringify(USER);
  document.querySelector(".card:last-child").classList.toggle("card_active");
});
