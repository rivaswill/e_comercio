const PRODUCT_101 = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

const list_cnt = document.getElementById("list-container");

async function getData(datos){
    let response = await fetch(datos);
    let data = await response.json();
    return data;
    }

insertHTML=(array)=>{
    let html = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${array.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${array.name}</h4> 
                        <p>${array.description}</p> 
                        </div>
                        <small class="text-muted">${array.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    return html;
}


document.addEventListener("DOMContentLoaded", async function(){

    let datos = await getData(PRODUCT_101);
    datos.products.forEach(dato => {
        list_cnt.innerHTML += insertHTML(dato)
    });
});