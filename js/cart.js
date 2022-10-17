const cnt = document.querySelector('tbody');

const getData =async(dt)=>{
    let response = await fetch(dt);
    let data = await response.json();
    return data;
};
const getLocalData =()=>{
    let res = { };

    let data = JSON.parse(localStorage.productsSell);

    data.proID.forEach(e=>{
        res[e] = res[e] + 1 || 1
    })

    return data;
}

const ope=(e,productos,i)=>{
    opes = [];
    document.querySelectorAll('input[type="number"]').forEach(e=>opes.push(parseInt(e.value)))
    e.querySelector('.subtotal').innerText = parseInt(productos) * opes[i]

    total=0;
    document.querySelectorAll('.subtotal').forEach(e=>total+=parseInt(e.innerText))
    document.querySelector('.total').innerText = total
}
opes = [];
let cost = 0
const insertHTML =(productos,i)=>{
cost += productos.cost
    opes.push(1)
    let html=`
    <tr onclick='ope(this,${productos.cost},${i})'>
        <th scope="row"><img src="${productos.images[1]}" alt="" style='width:100px'></th >
        <td>${productos.name}</td>
        <td>${productos.cost}</td>
        <td><input type="number" class="form-control w-25"
                   value="1" min="0"></td>
        <td class='subtotal'>${productos.cost}</td>
      </tr> 
          `  
          
    cnt.innerHTML+= html
    document.querySelector('.total').innerText=cost
   
}
const tabla =(productos,i)=>{
    opes.push(1)
    let html=`
    <tr onclick='ope(this,${productos.cost},${i})'>
        <th scope="row"><img src="${productos.images[1]}" alt="" style='width:100px'></th >
        <td>${productos.name}</td>
        <td>${productos.cost}</td>
        <td><input type="number" class="form-control w-25"
                   value="1" min="0"></td>
        <td class='subtotal'>${productos.cost}</td>
      </tr> 
          `  
          
    cnt.innerHTML+= html
   
}



const useData =()=>{
    cnt.innerHTML='';
    let {proID,}=getLocalData()
    proID.forEach(async(e,i)=> {
        const PRODUCTS_info = PRODUCT_INFO_URL + e + EXT_TYPE; 
        const p_i = await getData(PRODUCTS_info);
        insertHTML(p_i,i)
        });
}
document.addEventListener('DOMContentLoaded', ()=>{
           useData() 
})

