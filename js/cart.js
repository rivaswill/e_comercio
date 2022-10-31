const cnt = document.querySelector("tbody");

const getData = async (dt) => {
  let response = await fetch(dt);
  let data = await response.json();
  return data;
};
const getLocalData = () => {
  let res = {};

  let data = JSON.parse(localStorage.productsSell);

  data.proID.forEach((e) => {
    res[e] = res[e] + 1 || 1;
  });

  return data;
};
const envio = () => {
  let total = parseInt(document.querySelector(".total").innerText);
  let envio;
  document
    .querySelectorAll('[type="radio"].envio')
    .forEach((e) => e.checked && (envio = e.value));
  document.querySelector(".totalEnvio").innerText =
    Math.floor(total * (envio / 100)) + total;
  document.querySelector(".costoEnvio").innerText = Math.floor(
    total * (envio / 100)
  );
};
const ope = (e, productos, i) => {
  opes = [];
  document
    .querySelectorAll('input[type="number"]')
    .forEach((e) => opes.push(parseInt(e.value)));
  e.querySelector(".subtotal").innerText = parseInt(productos) * opes[i];

  total = 0;
  document
    .querySelectorAll(".subtotal")
    .forEach((e) => (total += parseInt(e.innerText)));
  document.querySelector(".total").innerText = total;
  envio();
};
opes = [];
let cost = 0;
const insertHTML = (productos, i) => {
  cost += productos.cost;
  document.querySelector(".totalEnvio").innerText =
    cost + Math.floor(cost * 0.05);
  document.querySelector(".costoEnvio").innerText = Math.floor(cost * 0.05);

  opes.push(1);
  let html = `
    <tr onclick='ope(this,${productos.cost},${i})'>
        <th scope="row"><img src="${productos.images[1]}" alt="" style='width:100px'></th >
        <td>${productos.name}</td>
        <td>${productos.cost}</td>
        <td><input type="number" class="form-control w-25"
                   value="1" min="0"></td>
        <td class='subtotal'>${productos.cost}</td>
      </tr> 
          `;

  cnt.innerHTML += html;
  document.querySelector(".total").innerText = cost;
};
const tabla = (productos, i) => {
  opes.push(1);
  let html = `
    <tr onclick='ope(this,${productos.cost},${i})'>
        <th scope="row"><img src="${productos.images[1]}" alt="" style='width:100px'></th >
        <td>${productos.name}</td>
        <td>${productos.cost}</td>
        <td><input type="number" class="form-control w-25"
                   value="1" min="1"></td>
        <td class='subtotal'>${productos.cost}</td>
      </tr> 
          `;

  cnt.innerHTML += html;
};

const useData = () => {
  cnt.innerHTML = "";
  let { proID } = getLocalData();
  proID.forEach(async (e, i) => {
    const PRODUCTS_info = PRODUCT_INFO_URL + e + EXT_TYPE;
    const p_i = await getData(PRODUCTS_info);
    insertHTML(p_i, i);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  useData();
});

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
  "use strict";

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll(".needs-validation");

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const btnRegistrar = document.getElementById("registrar");
const pay = document.querySelector(".payForm");
const inpPay = document.querySelectorAll(".pay");
const inpLabelPay = document.querySelectorAll(".payLab");
const cuenta = document.querySelector(".cuenta");
const vencimiento = document.querySelector(".vencimiento");

const exito =()=> {
  document.querySelector('form').checkValidity() && btnRegistrar.setAttribute("data-bs-target","#exito")
  setTimeout(()=> location.reload() , 5000)
}

const payForm = () => {
  inpPay.forEach(
    (e, i) =>
      !e.checked &&
      ((inpLabelPay[i].style.opacity = ".5"),
      inpLabelPay[i]
        .querySelectorAll("input")
        .forEach((e) => e.setAttribute("disabled", "")))
  );

  inpPay.forEach(
    (e, i) =>
      e.checked &&
      ((inpLabelPay[i].style.opacity = "1"),
      inpLabelPay[i]
        .querySelectorAll("input")
        .forEach(
          (e) =>
            e.getAttribute("disabled") == "" && e.removeAttribute("disabled")
        ))
  );
};
const validar = () => {
  cuenta.value != "" || vencimiento.value != ""
    ? ((pay.style.display = "none"),
      document.querySelector(".btnPayForm").classList.add("btn-secondary"),
      document.querySelector(".btnPayForm").classList.remove("btn-danger")
      )
    : ((pay.style.display = "inline"),
    document.querySelector(".btnPayForm").classList.remove("btn-secondary"),
    document.querySelector(".btnPayForm").classList.add("btn-danger")
    );
};
btnRegistrar.addEventListener("click", () => {
  validar();
  exito();
});
cuenta.addEventListener("input", validar);
vencimiento.addEventListener("input", validar);


