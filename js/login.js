//<i class="fa-solid fa-eye-slash"></i>   fa-eye
const SP_boton = document.querySelector('.show-pass');
const SP_icono = document.querySelector('.fa-solid');

SP_boton.addEventListener('click', ()=>{
    if(SP_icono.className.includes('fa-eye-slash')){
        SP_icono.classList.remove('fa-eye-slash');
        SP_icono.classList.add('fa-eye');
        psswd.type = 'password';
    }else{
        SP_icono.classList.remove('fa-eye');
        SP_icono.classList.add('fa-eye-slash');
        psswd.type = 'text';
    }

});

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

const close_btn = document.querySelector('.btn-close');
const danger = document.querySelector('.alert-danger');

close_btn.addEventListener('click', ()=>{
    danger.classList.remove("show");
})

const mail = document.getElementById('email');
const psswd = document.getElementById('psswd');
const btn = document.getElementById('btn-lgn');


btn.addEventListener('click', ()=>{

    let psswdCheck = psswd.value == '';
    let mailCheck = mail.value == '';

    if(psswdCheck || mailCheck){
        showAlertError();
    }else{
        window.location.href='./login.html';
    }
});