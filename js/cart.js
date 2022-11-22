let USER = JSON.parse(localStorage.user);
//cambiar el prodID por el vector

const cnt = document.querySelector(".table_body");
const totalEnvio = document.querySelector(".totalEnvio");
const total = document.querySelector(".total");
const subtotalTotal = document.querySelector(".subtotalTotal");
let TOTAL = 0;

//cambio de moneda
const monedaSwitch = document.querySelector(
  ".envio_moneda> .input_check > input"
);
monedaSwitch.addEventListener("click", () => {
  if (monedaSwitch.checked)
    document.querySelector(".envio_moneda> p").innerText = "USD";
  else document.querySelector(".envio_moneda> p").innerText = "UYU";
  insertHTML();
});

//crea el HTML
const createHTML = (name, cost, currency, id, image) => {
  if (monedaSwitch.checked) {
    if (currency == "UYU") cost /= 40;
  } else {
    if (currency == "USD") cost *= 40;
  }
  TOTAL += cost;
  let HTML = `
  <div class="table_row input_input">
  <div class="table_item">
  <img src="${image}" alt="${name}" srcset="">
  <i class="fa-solid fa-trash" onclick='deleteProd(${id})'></i>
  </div>
  <div class="table_item">${name}</div>
  <div class="table_item">${cost}</div>
  <div class="table_item">
    <i class="fa-solid fa-minus minus" onclick='menosCant(this)'></i>
    <input type="number" class="cantidadProd"
  value="1" min="1">
    <i class="fa-solid fa-plus plus" onclick='masCant(this)'></i>
    </div>
  <div class="table_item subtotalProd">${cost}</div>
  </div>
  `;
  return HTML;
};
const insertHTML = () => {
  cnt.innerHTML = "";
  const products = USER.cart;
  TOTAL = 0;
  if (products.length >= 1) {
    products.forEach(async (e, i) => {
      const PRODUCTS_info = PRODUCT_INFO_URL + e + EXT_TYPE;
      let data = await getJSONData(PRODUCTS_info);
      const { cost, currency, id, images, name } = data;
      cnt.innerHTML += createHTML(name, cost, currency, id, images[0]);
      //hace una suma con los totales de cada uno y les agrega el porcentaje
      if (products.length === i + 1) {
        totalEnvio.innerHTML = parseInt((5 / 100) * TOTAL);
        total.innerHTML = parseInt((5 / 100) * TOTAL) + TOTAL;
        subtotalTotal.innerHTML = TOTAL;
      }
    });
  } else
    cnt.innerHTML = `<div class="table_row input_input"><span class="subtittle">Por favor selecciona un <a class="link" href="products.html">producto</a> o una <a class="link" href="categories.html">categoria</a></span></div>`;
};
const deleteProd = (idProd) => {
  USER.cart = USER.cart.filter((e) => e != idProd);
  localStorage.user = JSON.stringify(USER);
  window.location = "cart.html";
};
//cambios en la cantidad
const tipoEnvio = document.querySelectorAll(".radio_input_envio");
const masCant = (e) => {
  e.previousElementSibling.valueAsNumber++;
  changeCant(e.parentElement, e.previousElementSibling.valueAsNumber, "plus");
};
const menosCant = (e) => {
  e.nextElementSibling.valueAsNumber > 1
    ? (e.nextElementSibling.valueAsNumber--,
      changeCant(e.parentElement, e.nextElementSibling.valueAsNumber, "minus"))
    : (e.nextElementSibling.valueAsNumber = 1);
};
const changeCant = (e, cant, ope) => {
  const value = parseInt(e.previousElementSibling.textContent);
  const subtotalProd = e.nextElementSibling;
  const TOTAL = parseInt(subtotalTotal.innerHTML);
  subtotalProd.textContent = cant * value;
  if (ope === "plus") {
    subtotalTotal.innerHTML = TOTAL + value;
    calcEnvio();
  } else if (ope === "minus") {
    subtotalTotal.innerHTML = TOTAL - value;
    calcEnvio();
  }
};
//calcula el envio
const calcEnvio = () => {
  tipoEnvio.forEach((e) => {
    if (e.checked) {
      TOTAL = parseInt(subtotalTotal.innerHTML);
      totalEnvio.innerHTML = parseInt((e.value / 100) * TOTAL);
      total.innerHTML = parseInt((e.value / 100) * TOTAL) + TOTAL;
    }
  });
};
tipoEnvio.forEach((e) =>
  e.addEventListener("click", () => {
    TOTAL = parseInt(subtotalTotal.innerHTML);
    totalEnvio.innerHTML = parseInt((e.value / 100) * TOTAL);
    total.innerHTML = parseInt((e.value / 100) * TOTAL) + TOTAL;
  })
);
//
const tipoPago = document.querySelectorAll(".radio_input_pay + label");
tipoPago.forEach((e) =>
  e.addEventListener("click", () => {
    tipoPago.forEach((i) => {
      if (e !== i) {
        i.previousElementSibling.setAttribute("disabled", "");
        i.parentElement.style.opacity = ".5";
        i.parentElement
          .querySelectorAll(".input_input")
          .forEach((e) => e.setAttribute("disabled", ""));
      } else {
        i.previousElementSibling.removeAttribute("disabled");
        i.parentElement.style.opacity = "1";
        i.parentElement
          .querySelectorAll(".input_input")
          .forEach((e) => e.removeAttribute("disabled"));
      }
    });
  })
);

document.addEventListener("DOMContentLoaded", () => {
  insertHTML();

  document.querySelector('#ingresar').addEventListener('click',()=>{
    document.querySelector('.data').classList.toggle('data_active')
  })
  document.querySelector('.data i').addEventListener('click',()=>{
    document.querySelector('.data').classList.toggle('data_active')
  })
  
});

const form = document.querySelector(".form");
const warnings = document.querySelectorAll(".warnings p");

const calle = document.querySelector("#calle");
const calle_num = document.querySelector("#calle_num");
const calle_esq = document.querySelector("#calle_esq");
const creditCard = document.querySelector("#creditCard");
const tarjeta = document.querySelector("#tarjeta");
const tarjeta_seguridad = document.querySelector("#tarjeta_seguridad");
const tarjeta_vencimiento = document.querySelector("#tarjeta_vencimiento");
const bankTransfer = document.querySelector("#bankTransfer");
const cuenta = document.querySelector("#cuenta");

document.querySelector("#submit").addEventListener("click", (e) => {
  if (!form.checkValidity()) {
    document
      .querySelectorAll(".form .input_input")
      .forEach((e) => (e.className = "input_input input_input_invalid"));

      if (
        !calle.checkValidity() ||
        !calle_num.checkValidity() ||
        !calle_esq.checkValidity()
      ){warnings[0].innerHTML = `<p>Dirección de envio no valido</p>`;}
        if (
          !tarjeta.checkValidity() ||
          !tarjeta_seguridad.checkValidity() ||
          !tarjeta_vencimiento.checkValidity() ||
          !cuenta.checkValidity()
        ){warnings[1].innerHTML = `<p>Datos de pago no valido</p>`;}

    document.querySelectorAll(".form_address input").forEach((e) =>
      e.addEventListener("input", () => {
        if (
          !calle.checkValidity() ||
          !calle_num.checkValidity() ||
          !calle_esq.checkValidity()
        ){
          warnings[0].innerHTML = `<p>Dirección de envio no valido</p>`;}
          else{ warnings[0].innerHTML = ''}
      })
    );
    document.querySelectorAll(".card .input_input").forEach((e) =>
      e.addEventListener("input", () => {
        if (
          !tarjeta.checkValidity() ||
          !tarjeta_seguridad.checkValidity() ||
          !tarjeta_vencimiento.checkValidity() ||
          !cuenta.checkValidity()
        ){
          warnings[1].innerHTML = `<p>Datos de pago no valido</p>`;}
          else{ warnings[1].innerHTML = ''}
      })
    );
  }else{
    document.querySelector('.modal').classList.toggle('modal_active')
    form.querySelectorAll('.input_input').forEach(e=>e.value='')
    setTimeout(()=>document.querySelector('.modal').classList.toggle('modal_active'),1000)

    setTimeout(()=>{
      USER.cart = [USER.cart.pop()]
      USER.cart.forEach(e=>deleteProd(e)) 
    },1500)
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
