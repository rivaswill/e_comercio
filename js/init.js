const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json"; //categorias
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json"; //"msg": "¡Has publicado con éxito!"
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"; //productos por categoria -> idCat.json
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"; //info del producto -> idProd.json
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"; //comentarios del producto -> idProd.json
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json"; //"msg": "¡Has comprado con éxito!"
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


//localStorage

document.addEventListener('DOMContentLoaded', ()=>{
  
  //user
  let username = document.querySelector('.nav-item:last-child');
  if(localStorage.mail==undefined||localStorage.mail==''){
    localStorage.setItem('mail','Iniciar Sesión');
  }
  if(username != null) {
    if(localStorage.mail=='Iniciar Sesión') {
      username.innerHTML = `
      <a class="nav-link" href="./index.html">
        ${localStorage.mail}
      </a>`
    }else{
      username.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.mail}
      </a>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="./product-info.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" href="./index.html"
                onclick='()=>{localStorage.mail=''}'>Cerrar sesión</a></li>
      </ul>
      `
      document.querySelector('.nav-item:first-child>a').setAttribute('href','./login.html');
  
    }
    username.className+=' dropdown'
  }
  
});

