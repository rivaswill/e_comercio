const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json"; //categorias
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json"; //"msg": "¡Has publicado con éxito!"
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"; //productos por categoria -> idCat.json
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"; //info del producto -> idProd.json
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/"; //comentarios del producto -> idProd.json
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json"; //"msg": "¡Has comprado con éxito!"
const EXT_TYPE = ".json";

const getJSONData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
};

//localStorage
const clean = () => {
  localStorage.user = JSON.stringify({ mail: "" });
};

localStorage.user == undefined && clean();

document.addEventListener("DOMContentLoaded", () => {
  //user
  let USER = JSON.parse(localStorage.user);
  let username = document.querySelector(".nav_center .btn_link:nth-child(2)");

  if (!USER.mail)
    (USER.mail = "Iniciar Sesión"), (localStorage.user = JSON.stringify(USER));

  if (username) {
    username.innerText = USER.userName?USER.userName:USER.mail;
    if (USER.mail == "Iniciar Sesión") {
      username.setAttribute("href", "index.html");
      document.querySelector(".nav_center .btn_link").style.display = "none";
    } else {
      username.removeAttribute("href");
      username.innerHTML += `<span class='nav_btn_logo'><i class="fa-solid fa-minus"></i><i class="fa-solid fa-minus"></i></span>`;
      document.querySelector(".nav_center").innerHTML += `
      <div class="drop">
        <a class="nav_btn btn btn_link" href="./cart.html"
        >Mi carrito</a>
      <a class="nav_btn btn btn_link" href="./my-profile.html"
        >Mi perfil</a>
      <a
        href="./index.html"
        class="nav_btn btn btn_link"
        onclick="clean()"
        >Cerrar sesión</a>
      </div>
      `;
    }
  }
  document
    .querySelector(".nav_center .btn_link:nth-child(2)")
    .addEventListener("click", (e) => {
      if (e.target.innerText != "Iniciar Sesión")
        document.querySelector(".drop").classList.toggle("drop_active");
      document
        .querySelector(".nav_btn_logo i:nth-child(1)")
        .classList.toggle("move");
    });
  window.addEventListener("click", (e) => {
    if (
      !e.target.matches(".drop_active") &&
      !e.target.matches(".btn_link:nth-child(2)")
    ) {
      document.querySelector(".drop").className = "drop";
      document.querySelector(".nav_btn_logo i:nth-child(1)").className =
        "fa-solid fa-minus";
    }
  });
});

//tema

if (!localStorage.dataTheme)
  localStorage.setItem("dataTheme", "light");
let theme = localStorage.getItem("dataTheme");

const changeThemeToDark = () => {
  document.documentElement.setAttribute("dataTheme", "dark");
  localStorage.setItem("dataTheme", "dark");
};
const changeThemeToLight = () => {
  document.documentElement.setAttribute("dataTheme", "light");
  localStorage.setItem("dataTheme", "light");
};
theme !== "dark" ? changeThemeToLight() : changeThemeToDark();

const checkbox = document.getElementById("switch");
// Apply retrived them to the website
checkbox.addEventListener("change", () => {
  let theme = localStorage.getItem("dataTheme");
  if (theme === "dark") {
    changeThemeToLight();
  } else {
    changeThemeToDark();
  }
});

//Para ordenar los productos y las categorias
const sortArray = (ORDER, array) => {
  array.sort((a, b) => {
    if (ORDER === "AZ") {
      //ASC
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    } else if (ORDER === "ZA") {
      //DESC
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    } else if (ORDER === "CANT") {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);
      if (aCount > bCount) return -1;
      if (aCount < bCount) return 1;
      return 0;
    } else if (ORDER === "91") {
      //DESC
      return b.cost - a.cost;
    } else if (ORDER === "19") {
      //ASC
      return a.cost - b.cost;
    } else if (ORDER === "SOLD") {
      return b.soldCount - a.soldCount;
    }
  });
  return array;
};
