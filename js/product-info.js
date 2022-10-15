const cnt = document.querySelector('#cnt');

const getData =async(dt)=>{
    let response = await fetch(dt);
    let data = await response.json();
    return data;
};
const getLocalData =()=>{
    let res = { };

    let data = JSON.parse(localStorage.productsInfo);

    data.proID.forEach(e=>{
        res[e] = res[e] + 1 || 1
    })

    return data;
}

let pI
const productsInfo = (productID) =>{
    
    pI = JSON.parse(localStorage.productsInfo )

    if (pI.proID.some(e=>e== productID)) {
        pI.cant[pI.proID.indexOf(productID)]++
    }else{
        pI.proID.push(productID);
        pI.cant.push(1);
    }
    localStorage.setItem("productsInfo", JSON.stringify (pI));
    location.reload();
}
const insertHTML =(pi,pc,index)=>{
    
    let images = '';
    pi.images.forEach(e => {
        images +=`
            <div class="col h-25"><img class="img-fluid" src="${e}" alt="" srcset=""></div>
        `
    });

    let commets ='';
    pc.forEach(e=>{
        let star='';
        for (let i = 0; i < e.score; i++) {
            star +=`
            <i class="bi bi-star-fill orange"></i>
            `
        }
        if (e.score<5) {
            for (let i = 0; i < 5-e.score; i++) {
                star +=`
                <i class="bi bi-star-fill gray"></i>
                `
            }
        }
        
        commets +=`
        <div class="d-flex flex-start mb-4">
            <img class="rounded-circle shadow-1-strong me-3"
              src="https://dummyimage.com/100" alt="avatar" width="65"
              height="65" />
            <div class="card w-100">
              <div class="card-body p-4">
                <div class="">
                  <h5>${e.user}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="small">${e.dateTime}</p>
                    <div>${star}</div>
                  </div>
                  <p>
                    ${e.description}
                  </p>
  
                  <div class="d-flex justify-content-between align-items-center">
                    <span></span>
                    <a href="#!" class="link-muted"><i class="fas fa-reply me-1"></i> Reply</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    })

    let imgRel='';
    let btnRel='';
    let prdRel='';
    pi.relatedProducts.forEach((e,i) => {
        if (i==0) {
            imgRel += `
            <div class="carousel-item active btn" onclick="productsInfo(${e.id})">
                <img src="${e.image}" class="d-block w-100" alt="...">
                <p>${e.name}</p>
            </div>
            `
            btnRel += `
            <button type="button" data-bs-target="#carouselExampleIndicators${pi.id}" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
            `
        }else{
            imgRel += `
            <div class="carousel-item btn" onclick="productsInfo(${e.id})">
                <img src="${e.image}" class="d-block w-100" alt="...">
                <p>${e.name}</p>
            </div>
            `
            btnRel += `
            <button type="button" data-bs-target="#carouselExampleIndicators${pi.id}" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
            `
        }
    });
    prdRel=`
    <div id="carouselExampleIndicators${pi.id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      ${btnRel}
    </div>
    <div class="carousel-inner">
      ${imgRel}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${pi.id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${pi.id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
    `
    
    const cant = getLocalData().cant;
    let html=`
    <div class="product card mt-4  p${pi.id}">
    <div class="card-body">
            <div class="text p-4 row">
                <div class="col"><h2>${pi.name}</h2></div>
                <div class="col-2 d-inline">
                    <h3 class="text-muted small">categoria:</h3>
                    <p class="h3">${pi.category}</p>
                </div>
            </div>
            <hr class="my-4">
            
            <div class="row">
                <div class="col">
                    <h3>Descripción:</h3>
                    <p>${pi.description}</p>
                    <p> <span class="text-muted small">Cantidad:</span> ${cant[index]}</p>
                    <span class="inline-block"> <h3 class="text-muted small">Precio:</h3>
                    <p class="h3">${pi.currency}${pi.cost}</p> </span>
                </div>
                <div class="col-3 ">
                <h3 class="text-muted small">Productos Relacionados:</h3>
                    ${prdRel}
                </div>
            </div>

            <h3>imagenes</h3>
            <div class="row mb-3">
                ${images}
            </div>

            
            <button class="btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions${pi.id}" aria-controls="offcanvasWithBothOptions">ver comentarios..</button>

                <div onclick="comentar(this)" class="offcanvas offcanvas-start w-50" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions${pi.id}" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">${pi.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                
                <div>
                ${commets}
                </div>

                <div class="d-flex flex-start">
                    <img class="rounded-circle shadow-1-strong me-3"
                    src="https://dummyimage.com/100" alt="avatar" width="65"
                    height="65" />
                    <div class="card w-100">
                        <div class="card-body p-4">
                        <div class="">
                            <h5>Add a comment</h5>
                            <div class="form-outline">
                            <textarea class="form-control" id="textAreaExample" rows="4"></textarea>
                            <label class="form-label" for="textAreaExample">¿Cúal es tu punto de vista?</label>
                            </div>
                            <div class="d-flex justify-content-between mt-3">
                            <span></span>
                            <a type="button" class="btn link-muted">
                                Send <i class="fas fa-long-arrow-alt-right ms-1"></i>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                    </div>
                </div>



            

    </div>
    </div>
          `  
          
    cnt.innerHTML+= html
   
}

const comentar=(e)=>{
    const text = e.querySelector('textarea');
    const cnt = e.querySelector('div+div>div');
    let commets = '';
    e.querySelector('.form-outline + div > .btn').addEventListener('click',()=>{
        if (text.value!='') {
            commets +=`
            <div class="d-flex flex-start mb-4">
                <img class="rounded-circle shadow-1-strong me-3"
                  src="https://dummyimage.com/100" alt="avatar" width="65"
                  height="65" />
                <div class="card w-100">
                  <div class="card-body p-4">
                    <div class="">
                      <h5>${localStorage.mail}</h5>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="small">${new Date().toLocaleString('lt-LT')}</p>
                        <div>
                            <i class="bi bi-star-fill gray"></i>
                            <i class="bi bi-star-fill gray"></i>
                            <i class="bi bi-star-fill gray"></i>
                            <i class="bi bi-star-fill gray"></i>
                            <i class="bi bi-star-fill gray"></i>
                        </div>
                      </div>
                      <p>
                        ${text.value}
                      </p>
      
                      <div class="d-flex justify-content-between align-items-center">
                        <span></span>
                        <a href="#!" class="link-muted"><i class="fas fa-reply me-1"></i> Reply</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
            text.value='';

            cnt.innerHTML+=commets
        }
    })
}

const useData =()=>{
    cnt.innerHTML='';
    let {proID,}=getLocalData()
    proID.forEach(async(e,i)=> {
        const PRODUCTS_info = PRODUCT_INFO_URL + e + EXT_TYPE; 
        const p_i = await getData(PRODUCTS_info);
        const PRODUCTS_coments = PRODUCT_INFO_COMMENTS_URL + e + EXT_TYPE; 
        const p_c = await getData(PRODUCTS_coments);
        insertHTML(p_i,p_c,i)
        });
}
document.addEventListener('DOMContentLoaded', ()=>{
           useData() 
})

