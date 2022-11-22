let USER = JSON.parse(localStorage.user);
const PRODUCTS = PRODUCTS_URL + USER.catID + EXT_TYPE;

const sortASC = document.getElementById("sortAsc");
const sortDESC = document.getElementById("sortDesc");
const sortSOLD = document.getElementById("sortByCount");
const prodLIST = document.querySelector(".prod_list");
const limpiar = document.getElementById("limpiar");
const max = document.getElementById("max");
const min = document.getElementById("min");
const search = document.querySelector("#search");
// const SEARCH_BUTTON = document.querySelector("#searchButton");
let ORDER = null;

const getProdID = (id) => {
  USER.prodID = id;
  localStorage.user = JSON.stringify(USER);
  window.location = "product-info.html";
};
const createHTM = (data) => {
  // catID: 101  catName: "Autos"
  // products:
  //  description: "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad."
  //  cost: 13500                 currency: "USD"
  //  id: 50921                   image: "img/prod50921_1.jpg"
  //  name: "Chevrolet Onix Joy"  soldCount: 14
  let HTML = "";
  data.forEach((e) => {
    HTML += `
        <div class="card card_prod card_btn" id="${e.name.replaceAll(
          " ",
          ""
        )}" onclick="getProdID(${e.id})">
          <div class="card_cnt_img card_cat_cnt_img">
            <img
              class="card_img card_prod_img"
              src="${e.image}"
              alt="Imgagen representativa de la categoría '${e.name}'"
            />
          </div>
          <div class="card_body card_prod_body">
            <h3 class="subtittle">${e.name}</h3>
            <p>
              coste: ${e.cost + " " + e.currency}
            </p>
            <p>
              vendidos: ${e.soldCount}
            </p>
            <p>
              vendidos: ${e.description}
            </p>
          </div>
        </div>
        `;
  });
  return HTML;
};

document.addEventListener("DOMContentLoaded", async () => {
  let dt = await getJSONData(PRODUCTS);
  let data = await getJSONData(PRODUCTS);
      data = data.products;
  let dataSort = await getJSONData(PRODUCTS);
      dataSort = dataSort.products;
  prodLIST.innerHTML = createHTM(data);

  sortASC.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortASC.value, dataSort);
    prodLIST.innerHTML = createHTM(dataSort);
  });

  sortDESC.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortDESC.value, dataSort);
    prodLIST.innerHTML = createHTM(dataSort);
  });

  sortSOLD.addEventListener("click", () => {
    min.value = ""; max.value = "";
    sortArray(sortSOLD.value, dataSort);
    prodLIST.innerHTML = createHTM(dataSort);
  });

  limpiar.addEventListener("click", () => {
    min.value = ""; max.value = "";search.value = "";
    prodLIST.innerHTML = createHTM(data);
  });

  max.addEventListener("keyup", (e) => {
    min.value = ""
    if (isNaN(max.valueAsNumber)) prodLIST.innerHTML = createHTM(data);
    else
      (prodLIST.innerHTML = createHTM( dataSort.filter((e) => max.valueAsNumber >= e.cost) ));
  });
  min.addEventListener("keyup", (e) => {
    max.value = ""
    if (isNaN(min.valueAsNumber)) prodLIST.innerHTML = createHTM(data);
    else
      (prodLIST.innerHTML = createHTM( dataSort.filter((e) => min.valueAsNumber <= e.cost) ));
  });
  search.addEventListener("keyup", (e) => {
    min.value = ""; max.value = "";
    prodLIST.innerHTML = createHTM( dataSort.filter(e=>e.name.toLowerCase().indexOf(search.value)!==-1) );
  });
});

const SEARCHING = (dat) => {
  let result = [];
  let txt = SEARCH_TEXT.value.toLowerCase();

  for (let product of dat) {
    let nom = product.name.toLowerCase();
    if (nom.indexOf(txt) !== -1) {
      result.push(product);
    }
  }
  if (result === []) {
    result = dat;
  }
  INSERT_HTML(result);
};