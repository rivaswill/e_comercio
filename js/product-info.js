const cnt = document.querySelector("#cnt");

let USER = JSON.parse(localStorage.user);
const PRODUCTS_info = PRODUCT_INFO_URL + USER.prodID + EXT_TYPE;
const PRODUCTS_coments = PRODUCT_INFO_COMMENTS_URL + USER.prodID + EXT_TYPE;

const modalInOut=()=>{
  document.querySelector('.modal').classList.toggle('modal_active')
  
  setTimeout(()=>{
    document.querySelector('.modal').classList.toggle('modal_active')
  },1000)
}

const getCartIDs = (idProd) => {
  if (USER.cart===undefined) USER.cart = [];
  if(USER.cart.indexOf(idProd)===-1) USER.cart.push(idProd);
  localStorage.user = JSON.stringify(USER)
  modalInOut()
};
const getProdID = (id) => {
  USER.prodID = id;
  localStorage.user = JSON.stringify(USER);
  window.location = "product-info.html";
};

const createHTM = (data, coments) => {
  // data
  // category: "Autos"  cost: 13500  currency: "USD"
  // description: "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad."
  // id: 50921  name: "Chevrolet Onix Joy"  soldCount: 14
  // images: Array(4) [ "img/prod50921_1.jpg", "img/prod50921_2.jpg", "img/prod50921_3.jpg", … ]
  // relatedProducts: Array [ {…}, {…} ] -> 0: Object { id: 50924, name: "Peugeot 208", image: "img/prod50924_1.jpg" }

  //  commets
  // dateTime: "2020-02-25 18:03:52"  description: "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas"
  // product: 50921  score: 3  user: "juan_pedro"
  let imgProd = ''
  data.images.forEach(e=>{
    imgProd += `
    <div class="card_cnt_img">
      <img
        class="card_img card_prodInf_img"
        src=${e}
        alt="Imagen representativa del producto ${data.name}"
      />
    </div>
    `
  })
  let relatedProducts = ''
  data.relatedProducts.forEach(e=>{
    relatedProducts+=`
      <img
      onclick="getProdID(${e.id})"
      class="card_img card_prodInf_img"
      src="${e.image}"
      alt="Imagen representativa del producto ${data.name}"
    />
    `
  })
  let comentarios = ''
  coments.forEach(e=>{
    comentarios+=makeComment(e.score,e.description,e.user)
  })

  let HTML=`
      <h1 class="tittle">${data.name}</h1>
      <div class="card">
        <div class="card_prodInf_cnt_img">
          ${imgProd}
        </div>
        <section class="btn_fancy_cnt">
          <a id="add" class="btn btn_fancy" onclick='getCartIDs(${data.id})'>añadir al carrito</a>
        </section>
      </div>
      <div class="card">
        <div class="desc">
          <p>cantidad de vendido: ${data.soldCount}</p>
          <p>costo: ${data.cost + ' ' + data.currency}</p>
          <p>
            ${data.description}
          </p>
        </div>
        <h2 class="subtittle">productos relacionados</h2>
        <figure class="card_prodInf_cnt_img">
          ${relatedProducts}
        </figure>
      </div>
      <div class="card">
        <div class="img_profile">
          <img src=${USER.img? USER.img:"img/img_perfil.png"} alt="" srcset="" />
        </div>
        <div class="cnt">
          <span>${USER.userName?USER.userName:USER.mail}</span>
          <div class="cnt_star">
            <i class="fa-solid fa-star star" value="5"></i>
            <i class="fa-solid fa-star star" value="4"></i>
            <i class="fa-solid fa-star star" value="3"></i>
            <i class="fa-solid fa-star star" value="2"></i>
            <i class="fa-solid fa-star star" value="1"></i>
          </div>
        </div>
        <section class="input input_mail_cnt">
          <textarea
            class="input_input"
            name="comment"
            id="comment"
            rows="1"
            required
          ></textarea>
          <label for="comment" class="input_label">
            Ingrese tu comentario
          </label>
        </section>
        <section class="btn_fancy_cnt">
          <a id="post" class="btn btn_fancy" href="#">Comentar</a>
        </section>
        <div class="posts">
          ${comentarios}
        </div>
      </div>
  `
  return HTML;
};

const makeComment=(star,comment,user)=>{
  let calificacion = '';
  for (let i = 1; i <= 5; i++) {
    if (5-star >= i)
    calificacion+=`<i class="fa-solid fa-star"></i>`
    else
    calificacion+=`<i class="fa-solid fa-star orange"></i>`
  }
  let HTML = `
  <div class="input_input user_post">
            <p>${user}</p>
            <div class="cnt_star">
              ${calificacion}
            </div>
            <p>
              ${comment}
            </p>
          </div>
  `
  return HTML
}

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getJSONData(PRODUCTS_info);
  let come = await getJSONData(PRODUCTS_coments);
  cnt.innerHTML = createHTM(data,come)
  
  
const commet = document.querySelector('#comment')
const commetBox= document.querySelector('.posts');
const btnPost = document.querySelector('#post')
const btnCart = document.querySelector('#add')
  //sistema de puntuación
  let star;
  const listStar = document.querySelectorAll(".star");
  listStar.forEach((e) => {
    e.addEventListener("click", () => {
      star = e.getAttribute("value");
      for (let i = 1; i <= listStar.length; i++) {
        if (i <= star)
          document.querySelector(`.star[value="${i}"]`).className =
            "fa-solid fa-star star orange";
        else
          document.querySelector(`.star[value="${i}"]`).className =
            "fa-solid fa-star star";
      }
    });
  });
  
  btnPost.addEventListener('click',()=>{
    let HTML= makeComment(star,commet.value,USER.mail)
    commetBox.innerHTML += HTML
    commet.value = '';
    star=0;
    listStar.forEach(e=>e.className ="fa-solid fa-star star")
  })
});
