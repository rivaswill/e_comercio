let USER = JSON.parse(localStorage.user);

const getCatID = (id) => {
  USER.catID = id;
  localStorage.user = JSON.stringify(USER);
  window.location = "products.html";
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Autos").addEventListener("click", () => {
    getCatID(101);
  });
  document.getElementById("Juguetes").addEventListener("click", () => {
    getCatID(102);
  });
  document.getElementById("Muebles").addEventListener("click", () => {
    getCatID(103);
  });
});
