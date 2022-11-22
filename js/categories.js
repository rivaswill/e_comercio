const sortASC = document.getElementById("sortAsc");
const sortDESC = document.getElementById("sortDesc");
const sortCANT = document.getElementById("sortByCount");
const catLIST = document.querySelector(".cat_list");
const limpiar = document.getElementById("limpiar");
const max = document.getElementById("max");
const min = document.getElementById("min");

let USER = JSON.parse(localStorage.user);

const getCatID = (id) => {
  USER.catID = id;
  localStorage.user = JSON.stringify(USER);
  window.location = "products.html";
};

const createHTM = (data) => {
  // description: "Los mejores precios en autos 0 kilómetro, de alta y media gama."
  // id: 101              imgSrc: "img/cat101_1.jpg"
  // name: "Autos"        productCount: "5"
  let HTML = "";
  data.forEach((e) => {
    HTML += `
        <div class="card card_cat card_btn" id="${e.name}" onclick="getCatID(${e.id})">
          <div class="card_cnt_img card_cat_cnt_img">
            <img
              class="card_img card_cat_img"
              src="${e.imgSrc}"
              alt="Imgagen representativa de la categoría '${e.name}'"
            />
          </div>
          <div class="card_body card_cat_body">
            <h3 class="subtittle">${e.name}</h3>
            <p>
              vendidos: ${e.productCount}
            </p>
            <p>
              ${e.description}
            </p>
          </div>
        </div>
        `;
  });
  return HTML;
};

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getJSONData(CATEGORIES_URL);
  let dataSort = await getJSONData(CATEGORIES_URL);
  catLIST.innerHTML = createHTM(data);

  sortASC.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortASC.value, dataSort);
    catLIST.innerHTML = createHTM(dataSort);
  });

  sortDESC.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortDESC.value, dataSort);
    catLIST.innerHTML = createHTM(dataSort);
  });

  sortCANT.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortCANT.value, dataSort);
    catLIST.innerHTML = createHTM(dataSort);
  });

  limpiar.addEventListener("click", () => {
    min.value = ""; max.value = "";
    catLIST.innerHTML = createHTM(data);
  });

  max.addEventListener("keyup", (e) => {
    min.value = ""
    if (isNaN(max.valueAsNumber)) catLIST.innerHTML = createHTM(data);
    else
      (catLIST.innerHTML = createHTM( dataSort.filter((e) => max.valueAsNumber >= e.productCount) ));
  });
  min.addEventListener("keyup", (e) => {
    max.value = ""
    if (isNaN(min.valueAsNumber)) catLIST.innerHTML = createHTM(data);
    else
      (catLIST.innerHTML = createHTM( dataSort.filter((e) => min.valueAsNumber <= e.productCount) ));
  });
});
