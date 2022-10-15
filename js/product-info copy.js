const cnt = document.querySelector('#cnt');

const getData =async(dt)=>{
    let response = await fetch(dt);
    let data = await response.json();
    return data;
}
const getLocalData =()=>{
    let res = { };

    let data = JSON.parse(localStorage.productsInfo);

    data.proID.forEach(e=>{
        res[e] = res[e] + 1 || 1
    })

    return data;
}

const insertHTML =(dt,index)=>{
    const catName = dt.catName;
    const cant = getLocalData().cant;
    let comentarios =`
    <section class="accordion-body" onclick="CNT(this)">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-md-12 col-lg-10 col-xl-8">
            <div class="card">
              <div class="card-body p-4">
                <div class="row">
                  <div class="col">
                    <div id="CONTAINER">
                    <div class="cment-princ" onclick="CMNT_sec(this)">
                      <!-- comentario principal -->
                      <div class="d-flex flex-start mt-2">
                        <img class="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65"
                          height="65" />
                        <div class="flex-grow-1 flex-shrink-1">
                          <div>
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="mb-1">
                                Maria Salazar <span class="small"> - hace 2 horas 
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                              </span>
                              </p>
                            </div>
                            <p class="small mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, architecto dolor id nisi non voluptatum nulla explicabo harum obcaecati officia soluta quibusdam odio aspernatur! Expedita.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-end"><a href="#!" onclick="responder(this)"><i class="fas fa-reply fa-xs"></i><span class="small"> responder</span></a></div>

                      <div class="cment-sec">

                        <!-- comentario, secundario -->
                        <div class="d-flex flex-start mt-2 ms-5">
                          <img class="rounded-circle shadow-1-strong"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar"
                              width="65" height="65" />
                          <div class="flex-grow-1 flex-shrink-1">
                            <div>
                              <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-1">
                                  Simona Díaz <span class="small">- hace 3 horas 
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                  </span>
                                </p>
                              </div>
                              <p class="small mb-0">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, itaque.
                              </p>
                            </div>
                          </div>
                        </div>

                        <!-- comentario, secundario -->
                        <div class="d-flex flex-start mt-2 ms-5">
                          <img class="rounded-circle shadow-1-strong"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
                              width="65" height="65" />
                          <div class="flex-grow-1 flex-shrink-1">
                            <div>
                              <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-1">
                                  John Álvarez <span class="small">- hace 4 horas 
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                  </span>
                                </p>
                              </div>
                              <p class="small mb-0">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex repellat iusto tempora, voluptatibus provident eveniet odio eum velit eos reprehenderit maxime atque possimus laborum at.
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                      
                    </div>
                    <div class="cment-princ" onclick="CMNT_sec(this)" >
                      <!-- comentario principal -->
                      <div class="d-flex flex-start mt-4">
                        <img class="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp" alt="avatar" width="65"
                          height="65" />
                        <div class="flex-grow-1 flex-shrink-1">
                          <div>
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="mb-1">
                                Natalia Gimón <span class="small">- hace 2 horas 
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                </span>
                              </p>
                            </div>
                            <p class="small mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur placeat itaque quam sunt nisi quis animi, iusto repudiandae commodi aliquid accusamus, mollitia repellat culpa pariatur odio non illum esse laborum deserunt soluta omnis ipsam enim.
                            </p>
                          </div>                        
                        </div>
                      </div>
                      <div class="d-flex justify-content-end"><a href="#!" onclick="responder(this)"><i class="fas fa-reply fa-xs"></i><span class="small"> responder</span></a></div>
                      <div class="cment-sec">



                      </div>
                    </div>
                  </div>
                    <!-- caja -->
                    <div class="card-footer py-3 border-0 mt-4" style="background-color: transparent;">
                      <div class="d-flex flex-start w-100">
                        <img class="rounded-circle shadow-1-strong me-3"
                          src="https://dummyimage.com/100" alt="avatar" width="40"
                          height="40" />
                        <div class="form-outline w-100">
                          <textarea class="form-control" id="textArea" rows="4"
                            style="background: #fff;"></textarea>
                          <label class="form-label" for="textAreaExample">mensaje</label>
                        </div>
                      </div>
                      <div class="float-end mt-2 pt-1">
                        <button id="cmnt" type="button" class="btn btn-primary btn-sm" onclick="comentar()">comentar</button>
                        <button id="cncl" type="button" class="btn btn-outline-primary btn-sm" onclick="cancelar()">cancelar</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `
    let html
    dt.products.forEach(e => {
        if (getLocalData().proID[index] == e.id){
            html=`
            <div class="product card mt-4">
            <div class="card-body">
                    <div class="text p-4 row">
                        <div class="col"><h2>${e.name}</h2></div>
                        <div class="col-2 d-inline">
                            <h3 class="text-muted small">categoria:</h3>
                            <p class="h3">${catName}</p>
                        </div>
                    </div>
                    <hr class="my-4">
                    
                    <div class="row">
                        <div class="col">
                            <h3>Descripción:</h3>
                            <p>${e.description}</p>
                        </div>
                        <div class="col-2 ">
                            <p> <span class="text-muted small">Cantidad:</span> ${cant[index]}</p>
                            <h3 class="text-muted small">Precio:</h3>
                            <p class="h3">${e.currency}${e.cost}</p> 
                        </div>
                    </div>

                    
                    
                    
                    
                    
                    <h3>imagenes</h3>
                    <img class ="cnt-img" src="${e.image}" alt="">

                    <div class="accordion mt-4" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Comentarios
                            </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                
                                
                            ${comentarios}
                                


                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` 
            cnt.innerHTML+= html
        }
     });
}
const useData =()=>{
cnt.innerHTML='';
getLocalData().catID.forEach(async(e,i)=> {
    const PRODUCTS = PRODUCTS_URL + e + EXT_TYPE; 
    const dt = await getData(PRODUCTS);
    insertHTML(dt,i)
    });
}
document.addEventListener('DOMContentLoaded', ()=>{
           useData() 
})

let resp = false;
let CMNT;
let CONTAINER;
let tArea;
let CMNT_SEC;
const CNT =(e)=>{
    CMNT = e;
    CONTAINER = e.querySelector('#CONTAINER');
    tArea = e.querySelector('#textArea');
}
const INSERT =()=>{
    let texto = tArea.value;
    let inner;
    let imagen = 'https://dummyimage.com/100';
    let nombre = localStorage.mail;
    if (resp) {
        inner =`
        <!-- comentario, secundario -->
        <div class="d-flex flex-start mt-2 ms-5">
            <img class="rounded-circle shadow-1-strong me-3"
            src="${imagen}" alt="avatar" width="65"
            height="65" />
            <div class="flex-grow-1 flex-shrink-1">
            <div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="mb-1">
                    ${nombre} <span class="small">- hace 1 min 
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </span>
                </p>
                </div>
                <p class="small mb-0">
                ${texto}
                </p>
                </div>
            </div>
            </div>
            `
            CMNT_SEC.innerHTML += inner;
        }else{
        inner = `
        <div class="cment-princ" onclick="CMNT_sec(this)">
        <!-- comentario principal -->
        <div class="d-flex flex-start mt-4">
          <img class="rounded-circle shadow-1-strong me-3"
            src="${imagen}" alt="avatar" width="65"
            height="65" />
          <div class="flex-grow-1 flex-shrink-1">
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-1">
                    ${nombre} <span class="small">- hace 1 min
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </span>
                </p>
              </div>
              <p class="small mb-0">
                    ${texto}
              </p>
            </div>                        
          </div>
        </div>
        <div class="d-flex justify-content-end"><a href="#!" onclick="responder(this)"><i class="fas fa-reply fa-xs"></i><span class="small"> responder</span></a></div>
        <div class="cment-sec">
    
    
    
        </div>
        </div>
        `;

        CONTAINER.innerHTML += inner;
    }
    
}
const CMNT_sec =(e)=>{
    CMNT_SEC = e.querySelector('.cment-sec');
}
const responder =(e)=>{
    resp = true;
    CMNT.querySelector('.card-footer').classList.add('ms-5');
}
const cancelar=()=>{
    CMNT.querySelector('.card-footer').classList.remove('ms-5');
    resp = false;
}
const comentar=()=>{
    
    INSERT();
    tArea.value = '';
    cancelar();
}