const PRODUCTS = PRODUCTS_URL + localStorage.catID + EXT_TYPE;

const list_cnt = document.getElementById("list-container");

const ORDER_ASC_BY_PRICE = document.querySelectorAll('[for*="sort"]')[0];
const ORDER_DESC_BY_PRICE = document.querySelectorAll('[for*="sort"]')[1];
const ORDER_BY_SOLD_COUNT = document.querySelectorAll('[for*="sort"]')[2];
const RANGE_FILTER_COUNT = document.querySelector("#rangeFilterCount");
const CLEAR_RANGE_FILTER = document.querySelector("#clearRangeFilter");
const RANGE_FILTER_COUNT_MIN = document.querySelector("#rangeFilterCountMin");
const RANGE_FILTER_COUNT_MAX = document.querySelector("#rangeFilterCountMax");
const SEARCH_TEXT = document.querySelector("#search");
const SEARCH_BUTTON = document.querySelector("#searchButton");
let ORDER = null;

async function getData(datos) {
  let response = await fetch(datos);
  let data = await response.json();
  return data;
}

insertHTML = (array) => {
  let html = `
        <div class="list-group-item list-group-item-action" onclick='productsInfo(${array.id})'>
        <a href='./product-info.html' class='text-body text-decoration-none'>
            <div class="row">
                <div class="col-3">
                    <img src="${array.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${array.name} - ${array.currency}${array.cost}</h4> 
                        <p>${array.description}</p> 
                        </div>
                        <small class="text-muted">${array.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </a>
        </div>
        `;
  return html;
};

const INSERT_HTML = (dat) => {
  list_cnt.innerHTML = "";
  dat.forEach((dato) => {
    list_cnt.innerHTML += insertHTML(dato);
  });
};
const SORT_CAT = (dat) => {
  dat.sort((a, b) => {
    if (ORDER === "DESC_PRICE") {
      return b.cost - a.cost;
    } else if (ORDER === "ASC_PRICE") {
      return a.cost - b.cost;
    } else if (ORDER === "SOLD") {
      return b.soldCount - a.soldCount;
    }
  });
  INSERT_HTML(dat);
};

const FILTER_MIN_MAX = (dat, min, max) => {
  let m = -Infinity;
  let M = Infinity;
  let result = dat;
  if (max != "") {
    M = parseInt(max);
  }
  if (min != "") {
    m = parseInt(min);
  }
  result = dat.filter((e) => e.cost >= m && e.cost <= M);
  INSERT_HTML(result);
};
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
//obtención de la info de los datos

const productsInfo = (productID) => {
  localStorage.productsInfo == undefined
    ? localStorage.setItem("productsInfo", productID)
    : (localStorage.productsInfo = productID);
};
document.addEventListener("DOMContentLoaded", async function () {
  let datos = await getData(PRODUCTS);
  SORT_CAT(datos.products);

  ORDER_ASC_BY_PRICE.addEventListener("click", () => {
    ORDER = "ASC_PRICE";
    SORT_CAT(datos.products);
  });
  ORDER_DESC_BY_PRICE.addEventListener("click", () => {
    ORDER = "DESC_PRICE";
    SORT_CAT(datos.products);
  });
  ORDER_BY_SOLD_COUNT.addEventListener("click", () => {
    ORDER = "SOLD";
    SORT_CAT(datos.products);
  });
  RANGE_FILTER_COUNT.addEventListener("click", () => {
    FILTER_MIN_MAX(
      datos.products,
      RANGE_FILTER_COUNT_MIN.value,
      RANGE_FILTER_COUNT_MAX.value
    );
  });
  CLEAR_RANGE_FILTER.addEventListener("click", () => {
    RANGE_FILTER_COUNT_MIN.value = "";
    RANGE_FILTER_COUNT_MAX.value = "";
    FILTER_MIN_MAX(datos.products, "", "");
  });
  SEARCH_TEXT.addEventListener("keyup", () => {
    SEARCHING(datos.products);
  });
  SEARCH_BUTTON.addEventListener("click", () => {
    SEARCHING(datos.products);
  });
});
