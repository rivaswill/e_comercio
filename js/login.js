//<i class="fa-solid fa-eye-slash"></i>   fa-eye
const showPsswd_boton = document.querySelector('.show-pass');
const showPsswd_icono = document.querySelector('.fa-solid');

showPsswd_boton.addEventListener('click', ()=>{
    if(showPsswd_icono.className.includes('fa-eye-slash')){
        showPsswd_icono.classList.remove('fa-eye-slash');
        showPsswd_icono.classList.add('fa-eye');
        psswd.type = 'password';
    }else{
        showPsswd_icono.classList.remove('fa-eye');
        showPsswd_icono.classList.add('fa-eye-slash');
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

// Social Media Login Authentication 
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

// console.log(getBasicProfile())